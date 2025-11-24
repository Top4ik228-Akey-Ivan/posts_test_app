import { Card } from "antd";
import type { Post } from "../services/postsApi";

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <Card
      title={post.title}
      style={{ marginBottom: 16 }}
      hoverable
    >
      <p>{post.body}</p>
    </Card>
  );
};
