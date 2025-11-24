import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { type RootState } from "../app/store";
import { Button, Card } from "antd";

export const PostDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const postId = Number(id);

    const post = useSelector((state: RootState) =>
        state.posts.posts.find((p) => p.id === postId)
    );

    if (!post)
        return (
            <div style={{ padding: 40, textAlign: "center" }}>
                Пост не найден
                <div style={{ marginTop: 20 }}>
                    <Button onClick={() => navigate(-1)}>Назад</Button>
                </div>
            </div>
        );

    return (
        <div style={{ maxWidth: 800, margin: "30px auto" }}>
            <Card title={post.title}>
                <p>{post.body}</p>
            </Card>
            <Button
                type="default"
                style={{ marginTop: 20 }}
                onClick={() => navigate(-1)}
            >
                ← Назад
            </Button>
        </div>
    );
};
