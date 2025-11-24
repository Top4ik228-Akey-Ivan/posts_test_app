import { Card } from "antd";
import {
  HeartOutlined,
  HeartFilled,
  DeleteOutlined,
} from "@ant-design/icons";
import { type Post } from "../services/postsApi";

interface PostCardProps {
  post: Post;
  liked: boolean;
  onLike: () => void;
  onDelete: () => void;
}

export const PostCard = ({ post, liked, onLike, onDelete }: PostCardProps) => {
  return (
    <Card
      title={post.title}
      style={{
        height: 250,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginBottom: 16,
      }}
      actions={[
        liked ? (
          <HeartFilled
            key="like"
            style={{ color: "red", fontSize: 20 }}
            onClick={onLike}
          />
        ) : (
          <HeartOutlined key="like" style={{ fontSize: 20 }} onClick={onLike} />
        ),
        <DeleteOutlined
          key="delete"
          style={{ fontSize: 20 }}
          onClick={onDelete}
        />,
      ]}
    >
      <div
        style={{
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 4,
          WebkitBoxOrient: "vertical",
        }}
      >
        {post.body}
      </div>
    </Card>
  );
};
