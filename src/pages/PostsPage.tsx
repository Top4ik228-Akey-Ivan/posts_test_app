import { useEffect, useMemo, useState } from "react";
import { useDeletePostFromApiMutation, useGetPostsQuery } from "../services/postsApi";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../app/store";
import { setPosts, deletePost, toggleLike } from "../app/postsSlice";
import { message, Pagination, Spin, Tabs } from "antd";
import { PostCard } from "../components/PostCard";

export const PostsPage = () => {
    const dispatch = useDispatch();

    const posts = useSelector((state: RootState) => state.posts.posts);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [activeTab, setActiveTab] = useState("all");

    const { data, isLoading } = useGetPostsQuery({
        page: currentPage,
        limit: pageSize,
    });
    const [deletePostFromApi] = useDeletePostFromApiMutation();

    useEffect(() => {
        if (data) {
            dispatch(setPosts(data));
        }
    }, [data, dispatch]);

    const handleDelete = async (id: number) => {
        dispatch(deletePost(id));
        try {
            await deletePostFromApi(id).unwrap
            message.success('Пост удален');
        } catch (err) {
            message.error('Ошибка удаления');
            console.error(err);
        }
    };

    const handleLike = (id: number) => {
        dispatch(toggleLike(id));
    };

    const filteredPosts = useMemo(() => {
        return activeTab === "liked"
            ? posts.filter((p) => p.liked)
            : posts
    }, [posts, activeTab])


    if (isLoading)
        return <Spin size="large" style={{ display: "block", margin: "40px auto" }} />;

    return (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    items={[
                        { key: "all", label: "Все посты" },
                        { key: "liked", label: "Понравившиеся" },
                    ]}
                />
            </div>


            {filteredPosts.map((post) => (
                <PostCard
                    key={post.id}
                    post={post}
                    liked={post.liked ?? false}
                    onLike={() => handleLike(post.id)}
                    onDelete={() => handleDelete(post.id)}
                />
            ))}

            {activeTab === "all" && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Pagination
                        total={100}
                        current={currentPage}
                        pageSize={pageSize}
                        onChange={(page, size) => {
                            setCurrentPage(page);
                            setPageSize(size);
                        }}
                        showSizeChanger
                        pageSizeOptions={["10", "20", "50", "100"]}
                        style={{ textAlign: "center", marginTop: 20 }}
                    />
                </div>
            )}

            {activeTab === "liked" && filteredPosts.length === 0 && (
                <div style={{ textAlign: "center", marginTop: 40, fontSize: 18 }}>
                    Нет понравившихся постов ❤️
                </div>
            )}
        </div>
    );
};
