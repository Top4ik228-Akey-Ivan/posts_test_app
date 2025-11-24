import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PostsPage } from "./pages/PostsPage";
import { PostDetailsPage } from "./pages/PostDetailsPage";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { CreatePostPage } from "./pages/CreatePostPage";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Извините, страница, которую вы ищете, не найдена."
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          На главную
        </Button>
      }
    />
  );
};

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostsPage />} />
        <Route path="/posts/:id" element={<PostDetailsPage />} />
        <Route path="/create-post" element={<CreatePostPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
