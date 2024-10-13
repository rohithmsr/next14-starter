import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "./utils";
import { User } from "./models";
import bcrypt from "bcryptjs";
import { authConfig } from "@/lib/auth.config";

const login = async (credentials) => {
  const { username, password } = credentials;

  try {
    connectToDb();
    const user = await User.findOne({ username: username });
    if (!user) {
      throw new Error("Username not found, please check your username");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error("Wrong credentials");
    }

    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (err) {
          console.log(err);
          return null;
        }
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "github") {
        try {
          connectToDb();
          const user = await User.findOne({ email: profile.email });

          if (!user) {
            const newUser = new User({
              email: profile.email,
              username: profile.login,
              img: profile.avatar_url,
            });

            await newUser.save();
          }
        } catch (err) {
          console.log(err);
          return false;
        }
      }
      return true;
    },
    ...authConfig.callbacks,
  },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({ ...authConfig, ...authOptions });
