"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "../layout/app/page";
import "../../../../styles/backend/blog/blog.css";

export default function BlogIndexPage() {
    interface Blog {
        _id: string;
        title: string;
        description: string;
    }

    const [blogs, setBlogs] = useState<Blog[]>([]);
    const router = useRouter();

    // Fetch blogs from the database
    useEffect(() => {
        async function fetchBlogs() {
            const response = await fetch("/api/blog", { method: "GET" });
            const data = await response.json();
            setBlogs(data);
        }
        fetchBlogs();
    }, []);

    // Delete a blog
    async function handleDeleteBlog(id: string) {
        const confirmDelete = confirm("Are you sure you want to delete this blog?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`/api/blog?id=${id}`, { method: "DELETE" });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to delete blog");
            }

            setBlogs(blogs.filter((blog) => blog._id !== id));
            alert("Blog deleted successfully");
        } catch (error) {
            console.error("Error deleting blog:", error);
            alert(error instanceof Error ? error.message : "An unknown error occurred");
        }
    }

    return (
        <Layout>
            <section className="blog-section">
                <h1>Blog Management</h1>
                <button onClick={() => router.push("/admin/blog/add")}>Add New Blog</button>
                <table className="blog-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((blog) => (
                            <tr key={blog._id}>
                                <td>{blog.title}</td>
                                <td>{blog.description}</td>
                                <td>
                                    <button onClick={() => router.push(`/admin/blog/edit/${blog._id}`)}>Edit</button>
                                    <button onClick={() => handleDeleteBlog(blog._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </Layout>
    );
}