import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { connectToDb } from "./utils";
import { User } from "./models";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
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
  },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authOptions);
