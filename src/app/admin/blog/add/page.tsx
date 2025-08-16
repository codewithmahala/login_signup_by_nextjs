"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "../../layout/app/page";
import Image from "next/image";
import "../../../../../styles/backend/blog/addedit/addedit.css";



export default function AddBlogPage() {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
    const [image, setImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string>("");
    const [description, setDescription] = useState("");
    const router = useRouter();

    // Fetch categories for the dropdown
    useEffect(() => {
        async function fetchCategories() {
            const response = await fetch("/api/blog/category", { method: "GET" });
            const data = await response.json();
            setCategories(data);
        }
        fetchCategories();
    }, []);

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
            const response = await fetch("/api/blog", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const contentType = response.headers.get("content-type") || "";
                if (contentType.includes("application/json")) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Failed to add blog");
                } else {
                    throw new Error("Unexpected server response");
                }
            }

            alert("Blog added successfully");
            router.push("/admin/blog");
        } catch (error) {
            console.error("Error adding blog:", error);
            alert(error instanceof Error ? error.message : "An unknown error occurred");
        }
    }

    return (
        <Layout>
            <section className="blog-form-section">
                <h1>Add Blog</h1>
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
                    {previewImage && (
                        <div style={{ marginBottom: "1rem" }}>                    
                            <Image
                                src={previewImage}
                                alt="Preview"
                                width={200}
                                height={200}
                                style={{ maxWidth: "100%", height: "auto", display: "block" }}
                            />
                        </div>
                    )}
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
                    <button type="submit">Add Blog</button>
                </form>
            </section>
        </Layout>
    );
}