'use client';
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Layout from "../layout/app/page";
import "../../../styles/backend/profile/profile.css";

export default function ProfilePage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        pin: "",
        state: "",
        city: "",
    });

    useEffect(() => {
       const fetchProfile = async ()=> {
        try {
            const res = await fetch('/api/users/profile',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            if (data?.data) {
                const user = data.data;
                setFormData({
                    name: user.name || "",
                    email: user.email || "",
                    phone: user.phone || "",
                    address: user.address || "",
                    pin: user.pin || "",
                    state: user.state || "",
                    city: user.city || "",
                });
            }
            
        } catch (error) {
            console.error("Error fetching profile data:", error);
            
        }
       }
       fetchProfile();
    }, [])
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
            const res = await fetch('/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            const result = await res.json();
    
            if (result.success) {
                alert("Profile updated successfully");
            } else {
                alert("Update failed: " + result.message);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Something went wrong");
        }
    };
    

    return (
        <Layout>
            <div className="profile-container">
                <h2 className="profile-title">Update Profile</h2>
                <form className="profile-form" onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Phone:
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Address:
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Pin Code:
                        <input
                            type="text"
                            name="pin"
                            value={formData.pin}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        State:
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        City:
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <button type="submit">Save Changes</button>
                </form>
            </div>
        </Layout>
    );
}