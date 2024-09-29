import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const { slug } = params;

    connectToDb();
    const post = await Post.findOne({ slug });

    return NextResponse.json(post);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch the post!");
  }
};

export const DELETE = async (req, { params }) => {
  try {
    const { slug } = params;

    connectToDb();
    await Post.deleteOne({ slug });

    return NextResponse.json("Post deleted");
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete the post!");
  }
};
