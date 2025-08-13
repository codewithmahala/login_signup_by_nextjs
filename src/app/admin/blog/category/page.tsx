'use client';

import { useState, useEffect } from 'react';
import Layout from "../../layout/app/page";
import "../../../../../styles/backend/blog/category/category.css";

export default function CategoryPage() {
    const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
    const [newCategory, setNewCategory] = useState('');
    const [editCategoryId, setEditCategoryId] = useState<string | null>(null);
    const [editCategoryName, setEditCategoryName] = useState('');

    // Fetch categories from the database
    useEffect(() => {
        async function fetchCategories() {
            const response = await fetch('/api/blog/category', { method: 'GET' });
            const data = await response.json();
            setCategories(data);
        }
        fetchCategories();
    }, []);

    // Add a new category
    async function handleAddCategory() {
        if (!newCategory.trim()) return alert('Category name cannot be empty');
        const response = await fetch('/api/blog/category', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newCategory }),
        });
        const data = await response.json();
        setCategories([...categories, data]);
        setNewCategory('');
    }

    // Edit a category
    async function handleEditCategory(id: string) {
        if (!editCategoryName.trim()) {
            alert('Category name cannot be empty');
            return;
        }
    
        try {
            const response = await fetch(`/api/blog/category`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, name: editCategoryName }), // Send `id` and `name`
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update category');
            }
    
            const updatedCategory = await response.json();
    
            // Update the state with the updated category
            setCategories(categories.map(cat => (cat._id === id ? updatedCategory : cat)));
            setEditCategoryId(null);
            setEditCategoryName('');
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error:', error.message);
            } else {
                console.error('An unknown error occurred:', error);
            }
            alert(error instanceof Error ? error.message : 'An unknown error occurred');
        }
    }

    // Delete a category
    async function handleDeleteCategory(id: string) {
        const confirmDelete = confirm('Are you sure you want to delete this category?');
        if (!confirmDelete) return;
    
        try {
            const response = await fetch(`/api/blog/category?id=${id}`, { method: 'DELETE' });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete category');
            }
    
            // Update the state to remove the deleted category
            setCategories(categories.filter(cat => cat._id !== id));
            alert('Category deleted successfully');
        } catch (error) {
            console.error('Error deleting category:', error);
            alert(error instanceof Error ? error.message : 'An unknown error occurred');
        }
    }

    return (
        <Layout>
            <section className="category-section" style={{ marginTop: '5rem' }}>
                <h1>Blog Categories</h1>
                <p>Manage your blog categories</p>

                {/* Add Category */}
                <div className="add-category">
                    <input
                        type="text"
                        placeholder="Enter new category"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <button onClick={handleAddCategory}>Add Category</button>
                </div>

                {/* Categories Table */}
                <table className="category-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category._id}>
                                <td>
                                    {editCategoryId === category._id ? (
                                        <input
                                            type="text"
                                            value={editCategoryName}
                                            onChange={(e) => setEditCategoryName(e.target.value)}
                                        />
                                    ) : (
                                        category.name
                                    )}
                                </td>
                                <td>
                                    {editCategoryId === category._id ? (
                                        <>
                                            <button onClick={() => handleEditCategory(category._id)}>Save</button>
                                            <button onClick={() => setEditCategoryId(null)}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => {
                                                setEditCategoryId(category._id);
                                                setEditCategoryName(category.name);
                                            }}>Edit</button>
                                            <button onClick={() => handleDeleteCategory(category._id)}>Delete</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </Layout>
    );
}