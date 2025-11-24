import { Card } from "antd";
import {
    HeartOutlined,
    HeartFilled,
    DeleteOutlined,
} from "@ant-design/icons";
import { type Post } from "../services/postsApi";
import { useNavigate } from "react-router-dom";

interface PostCardProps {
    post: Post;
    liked: boolean;
    onLike: () => void;
    onDelete: () => void;
}

export const PostCard = ({ post, liked, onLike, onDelete }: PostCardProps) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/posts/${post.id}`);
    };

    return (
        <Card
            hoverable
            onClick={handleCardClick}
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
                        onClick={(e) => {
                            onLike()
                            e.stopPropagation()
                        }
                        }
                    />
                ) : (
                    <HeartOutlined key="like" style={{ fontSize: 20 }} onClick={(e) => {
                        onLike()
                        e.stopPropagation()
                    }} />
                ),
                <DeleteOutlined
                    key="delete"
                    style={{ fontSize: 20 }}
                    onClick={(e) => {
                        onDelete()
                        e.stopPropagation()
                    }
                    }
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
