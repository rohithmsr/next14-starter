import PostCard from "../../components/postCard/PostCard";
import styles from "./blog.module.css";

const BlogPage = () => {
  return (
    <div className={styles.container}>
      <PostCard
        post={{
          img: "https://images.pexels.com/photos/762041/pexels-photo-762041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          title: "Post title",
          desc: "My dear thala",
          body: "Lorem ipsum, ilthakasa iya,thakal",
          createdAt: "2024-04-21",
          slug: "post-slug-1",
        }}
      />
      <PostCard
        post={{
          img: "https://images.pexels.com/photos/762041/pexels-photo-762041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          title: "Post title",
          desc: "My dear thala",
          body: "Lorem ipsum, ilthakasa iya,thakal",
          createdAt: "2024-04-21",
          slug: "post-slug-2",
        }}
      />
      <PostCard
        post={{
          img: "https://images.pexels.com/photos/762041/pexels-photo-762041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          title: "Post title",
          desc: "My dear thala",
          body: "Lorem ipsum, ilthakasa iya,thakal",
          createdAt: "2024-04-21",
          slug: "post-slug-3",
        }}
      />
    </div>
  );
};

export default BlogPage;
