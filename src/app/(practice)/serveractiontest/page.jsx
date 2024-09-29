import { addPost, deletePost } from "@/lib/action";

const ServerActionTestPage = () => {
  return (
    <div>
      <form action={addPost}>
        <input type="text" name="title" placeholder="title" />
        <input type="text" name="desc" placeholder="desc" />
        <input type="text" name="slug" placeholder="slug" />
        <input type="text" name="userId" placeholder="userId" />
        <button type="submit">Add Post</button>
      </form>

      <form action={deletePost}>
        <input type="text" name="postId" placeholder="postId" />
        <button type="submit">Delete Post</button>
      </form>
    </div>
  );
};

export default ServerActionTestPage;
