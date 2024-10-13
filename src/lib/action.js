"use server";

import bcrypt from "bcryptjs";
import { connectToDb } from "./utils";
import { Post, User } from "./models";
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "./auth";

export const addPost = async (formData) => {
  const { title, desc, slug, userId } = Object.fromEntries(formData);

  try {
    connectToDb();

    const newPost = new Post({
      title,
      desc,
      slug,
      userId,
    });

    await newPost.save();
    console.log("Saved to database");

    revalidatePath("/blog");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const deletePost = async (formData) => {
  const { postId } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Post.findByIdAndDelete(postId);
    console.log("Deleted from database");

    revalidatePath("/blog");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const handleGithubLogin = async () => {
  await signIn("github");
};

export const handleLogout = async () => {
  await signOut();
};

export const register = async (_, formData) => {
  const { username, email, password, passwordRepeat, img } =
    Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return { error: "Passwords do not match!" };
  }

  try {
    connectToDb();

    const user = await User.findOne({ username });
    if (user) {
      return { error: "Username already exists!" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      img,
    });
    await newUser.save();
    console.log("Saved to database");

    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const login = async (_, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (error) {
    console.log(error);

    if (error?.type == "CredentialsSignin") {
      return { error: "Invalid username or password" };
    }
    // return { error: "Something went wrong!" };
    throw error; // to handle NEXT_REDIRECT error
  } finally {
    //
  }
};
