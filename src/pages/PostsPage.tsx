import { useState } from "react";
import { useGetPostsQuery, type Post } from "../services/postsApi";
import { PostCard } from "../components/PostCard";
import { Spin, Pagination } from "antd";

export const PostsPage = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);

    const { data, isLoading, error } = useGetPostsQuery({
        page: currentPage,
        limit: pageSize,
    });

    const handlePageChange = (page: number, newPageSize?: number) => {
        setCurrentPage(page);
        if (newPageSize && newPageSize !== pageSize) {
            setPageSize(newPageSize);
            setCurrentPage(1);
        }
    };

    if (isLoading) return <Spin size="large" style={{ display: "block", margin: "50px auto" }} />;
    if (error) return <div>Error loading posts</div>;

    return (
        <div style={{ maxWidth: 800, margin: "20px auto" }}>
            {data?.map((post: Post) => (
                <PostCard key={post.id} post={post} />
            ))}

            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={100}
                onChange={handlePageChange}
                style={{ display: 'flex', justifyContent: 'center' }}
            />
        </div>
    );
};
