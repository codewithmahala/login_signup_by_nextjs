import {connect} from '@/dbConfig/dbConfig';
import BlogCategory from '@/models/blogCategoryModel';
import { NextRequest, NextResponse } from 'next/server';
connect();

export async function GET() {

    const categories = await BlogCategory.find();
    return NextResponse.json(categories, { status: 200 });
}

export async function POST(request: NextRequest) {

    const data = await request.json();
    const newCategory = new BlogCategory(data);
    await newCategory.save();
    return NextResponse.json(newCategory, { status: 201 });
}
export async function PUT(request: NextRequest) {
    try {
        const { id, name } = await request.json();

        // Validate input
        if (!id || !name) {
            return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
        }

        // Update the category in the database
        const updatedCategory = await BlogCategory.findByIdAndUpdate(
            id,
            { name },
            { new: true } // Return the updated document
        );

        if (!updatedCategory) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }

        return NextResponse.json(updatedCategory, { status: 200 });
    } catch (error) {
        console.error('Error updating category:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id'); // Extract `id` from query parameters

        if (!id) {
            return NextResponse.json({ error: 'Category ID is required' }, { status: 400 });
        }

        const deletedCategory = await BlogCategory.findByIdAndDelete(id);

        if (!deletedCategory) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Category deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting category:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}