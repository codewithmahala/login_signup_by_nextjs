import mongoose from  "mongoose";

const blogSchema = new mongoose.Schema({
     title: {
          type: String,
          required: [true, "Please provide a title"],
          trim: true,
          maxlength: [100, "Title cannot exceed 100 characters"]
     },
     description: {
          type: String,
          required: [true, "Please provide a description for the blog"],
          trim: true,
          minlength: [20, "Description must be at least 20 characters"]
     },
     image: {
          type: String,
          required: [true, "Please provide an image URL"]
     },
     createdAt: {
          type: Date,
          default: Date.now
     },
     updatedAt: {
          type: Date,
          default: Date.now
     },
});

const Blog = mongoose.model.Blog || mongoose.model("Blog", blogSchema);   
 
export default Blog;