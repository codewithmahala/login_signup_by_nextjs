import mongoose from 'mongoose';

const blogCategorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please provide a category name"],
        trim: true,
        maxlength: [50, "Category name cannot exceed 50 characters"]
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

const BlogCategory = mongoose.models.BlogCategory || mongoose.model('BlogCategory', blogCategorySchema);
export default BlogCategory;