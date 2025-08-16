import { connect } from "@/dbConfig/dbConfig";
import Blog from "@/models/blogModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import path from "path";
import fs from "fs/promises";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";

connect();

// Read logged-in user id from the JWT token cookie set at login
function requireUserId(): string | null {
    const token = cookies().get("token")?.value;
    if (!token) return null;
    try {
        const payload = jwt.verify(token, process.env.TOKEN_SECRET!) as { id: string };
        return payload.id || null;
    } catch {
        return null;
    }
}

// Create a URL-friendly slug
function slugify(input: string) {
    return input
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
}

// Ensure slug is unique
async function createUniqueSlug(title: string) {
    const base = slugify(title);
    let slug = base;
    let i = 1;
    while (await Blog.exists({ slug })) {
        slug = `${base}-${i++}`;
    }
    return slug;
}

// Handle GET requests
export async function GET(request: NextRequest) {
    try {
        const userId = requireUserId();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const owner = new mongoose.Types.ObjectId(userId);
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (id) {
            const blog = await Blog.findOne({ _id: id, userId: owner });
            if (!blog) {
                return NextResponse.json({ error: "Blog not found" }, { status: 404 });
            }
            return NextResponse.json(blog, { status: 200 });
        }

        const blogs = await Blog.find({ userId: owner });
        return NextResponse.json(blogs, { status: 200 });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// Handle POST requests
export async function POST(request: NextRequest) {
    try {
        const userId = requireUserId();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const contentType = request.headers.get("content-type") || "";
        if (!contentType.includes("multipart/form-data")) {
            return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
        }

        const formData = await request.formData();
        const title = formData.get("title");
        const category = formData.get("category");
        const description = formData.get("description");
        const imageFile = formData.get("image") as File | null;

        if (!title || !category || !description || !imageFile) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Save file to public/uploads and set `upload` to the relative URL
        const uploadsDir = path.join(process.cwd(), "public", "uploads");
        await fs.mkdir(uploadsDir, { recursive: true });

        const original = imageFile.name || "upload";
        const safeName = original.toLowerCase().replace(/[^a-z0-9.\-_]/g, "-");
        const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName}`;
        const filePath = path.join(uploadsDir, uniqueName);

        const arrayBuffer = await imageFile.arrayBuffer();
        await fs.writeFile(filePath, Buffer.from(arrayBuffer));

        const upload = `/uploads/${uniqueName}`;

        const slug = await createUniqueSlug(String(title));

        // Use `blogdata` to persist
        const blogdata = {
            title: String(title),
            category: String(category),
            description: String(description),
            image: upload,
            userId: new mongoose.Types.ObjectId(userId), // cast to ObjectId
            slug,
        };

        const newBlog = new Blog(blogdata);
        await newBlog.save();

        return NextResponse.json(newBlog, { status: 201 });
    } catch (error) {
        console.error("Error creating blog:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// Handle PUT requests
export async function PUT(request: NextRequest) {
    try {
        const userId = requireUserId();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const owner = new mongoose.Types.ObjectId(userId);
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (!id) {
            return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
        }

        const contentType = request.headers.get("content-type") || "";
        let updateData: any = {};
        if (contentType.includes("multipart/form-data")) {
            const formData = await request.formData();
            updateData.title = formData.get("title");
            updateData.category = formData.get("category");
            updateData.description = formData.get("description");

            const imageFile = formData.get("image") as File | null;
            if (imageFile && imageFile.size > 0) {
                const uploadsDir = path.join(process.cwd(), "public", "uploads");
                await fs.mkdir(uploadsDir, { recursive: true });
                const original = imageFile.name || "upload";
                const safeName = original.toLowerCase().replace(/[^a-z0-9.\-_]/g, "-");
                const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName}`;
                const filePath = path.join(uploadsDir, uniqueName);
                const arrayBuffer = await imageFile.arrayBuffer();
                await fs.writeFile(filePath, Buffer.from(arrayBuffer));
                updateData.image = `/uploads/${uniqueName}`;
            }
        } else {
            updateData = await request.json();
        }

        if ("userId" in updateData) delete updateData.userId;
        if ("slug" in updateData) delete updateData.slug;

        updateData.updatedAt = new Date();

        const updatedBlog = await Blog.findOneAndUpdate(
            { _id: id, userId: owner },
            updateData,
            { new: true }
        );

        if (!updatedBlog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        return NextResponse.json(updatedBlog, { status: 200 });
    } catch (error) {
        console.error("Error updating blog:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// Handle DELETE requests
export async function DELETE(request: NextRequest) {
    try {
        const userId = requireUserId();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const owner = new mongoose.Types.ObjectId(userId);
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (!id) {
            return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
        }

        const deletedBlog = await Blog.findOneAndDelete({ _id: id, userId: owner });
        if (!deletedBlog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        // Optional: delete the image file from disk
        try {
            if (deletedBlog.image?.startsWith("/uploads/")) {
                const abs = path.join(process.cwd(), "public", deletedBlog.image.replace(/^\/+/, ""));
                await fs.unlink(abs);
            }
        } catch {
            // ignore file removal errors
        }

        return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting blog:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}