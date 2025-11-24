import { useGetPostsQuery } from "../services/postsApi";
import { PostCard } from "../components/PostCard";
import { Spin } from "antd";

export const PostsPage = () => {
  const { data, isLoading, error } = useGetPostsQuery();

  if (isLoading) return <Spin size="large" />;
  if (error) return <div>Error loading posts</div>;

  return (
    <div style={{ maxWidth: 800, margin: "20px auto" }}>
      {data?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};
