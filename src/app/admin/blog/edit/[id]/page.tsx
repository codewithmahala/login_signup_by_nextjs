"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Layout from "../../../layout/app/page";
import "../../../../../../styles/backend/blog/addedit/addedit.css";
import Image from "next/image";

export default function EditBlogPage() {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
    const [currentImage, setCurrentImage] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string>("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const params = useParams();
    const blogId = params.id;

    // Fetch categories for the dropdown
    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch("/api/blog/category", { method: "GET" });
                if (!response.ok) throw new Error("Failed to fetch categories");
                const data = await response.json();
                setCategories(data);
            } catch (err) {
                console.error("Error fetching categories:", err);
                setError("Failed to load categories");
            }
        }
        fetchCategories();
    }, []);

    // Fetch blog details for editing
    useEffect(() => {
        if (blogId) {
            async function fetchBlog() {
                try {
                    const response = await fetch(`/api/blog?id=${blogId}`);
                    if (response.status === 404) {
                        setError("Blog not found");
                        return;
                    }
                    if (!response.ok) throw new Error("Failed to fetch blog details");
                    const data = await response.json();
                    setTitle(data.title);
                    setCategory(data.category?._id || data.category); // handle both populated and id
                    setDescription(data.description);
                    setCurrentImage(data.image);
                } catch (err) {
                    console.error("Error fetching blog:", err);
                    setError("Failed to load blog details");
                }
            }
            fetchBlog();
        } else {
            setError("Invalid blog ID");
        }
    }, [blogId]);

    // Preview selected image
    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files ? e.target.files[0] : null;
        setImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result as string);
            reader.readAsDataURL(file);
        } else {
            setPreviewImage("");
        }
    }

    // Handle form submission
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("category", category);
        formData.append("description", description);
        if (image) {
            formData.append("image", image);
        }

        try {
            const response = await fetch(`/api/blog?id=${blogId}`, {
                method: "PUT",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to update blog");
            }

            alert("Blog updated successfully");
            router.push("/admin/blog");
        } catch (error) {
            console.error("Error updating blog:", error);
            alert(error instanceof Error ? error.message : "An unknown error occurred");
        }
    }

    if (error) {
        return (
            <Layout>
                <section className="blog-form-section">
                    <h1>Error</h1>
                    <p>{error}</p>
                </section>
            </Layout>
        );
    }

    return (
        <Layout>
            <section className="blog-form-section">
                <h1>Edit Blog</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    {/* Show preview if a new image is selected, else show current image */}
                    {previewImage ? (
    <div style={{ marginBottom: "1rem" }}>
        <Image
            src={previewImage}
            alt="Selected"
            width={200}
            height={200}
            style={{ maxWidth: "100%", height: "auto", display: "block" }}
        />
    </div>
) : currentImage ? (
    <div style={{ marginBottom: "1rem" }}>
        <Image
            src={currentImage}
            alt="Current"
            width={200}
            height={200}
            style={{ maxWidth: "100%", height: "auto", display: "block" }}
        />
    </div>
) : null}
<div className="custom-file-input">
    <button
        type="button"
        onClick={() => document.getElementById("blog-image-input")?.click()}
        className="file-upload-btn"
    >
        {image ? "Change Image" : "Choose Image"}
    </button>
    <input
        id="blog-image-input"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageChange}
    />
    <span className="file-name">
        {image ? image.name : "No file chosen"}
    </span>
</div>
                    <button type="submit">Update Blog</button>
                </form>
            </section>
        </Layout>
    );
}