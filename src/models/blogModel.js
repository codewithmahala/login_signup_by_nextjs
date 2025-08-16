import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please provide a user ID"],
      ref: "User",
      index: true,
    },
    slug: {
      type: String,
      required: [true, "Please provide a slug"],
      unique: true,
      trim: true,
      maxlength: [100, "Slug cannot exceed 100 characters"],
      index: true,
    },
    category: {
      type: String,
      required: [true, "Please provide a category for the blog"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description for the blog"],
      minlength: [3, "Description cannot be less than 100 characters"],
    },
    image: {
      type: String,
      required: [true, "Please provide an image"],
    },
  },
  { timestamps: true }
);

// Important in Next.js dev: drop cached model so schema updates take effect
if (mongoose.models.Blog) {
  delete mongoose.models.Blog;
}

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;