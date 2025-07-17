'use client';

import "../../../styles/backend/auth/signup.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({ email: "", password: "" });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        setLoading(true);
        try {
            const response = await axios.post("/api/users/signup", user);
            if (response.data.success) {
                toast.success("Signup successful! Please log in.");
                router.push("/login");
            } else {
                toast.error(response.data.error || "Signup failed. Please try again.");
            }
        } catch {
            toast.error("Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setButtonDisabled(!(user.email.length > 0 && user.password.length > 0));
    }, [user]);

    return (
        <div className="signup-bg">
            <Toaster position="top-center" />
            <div className="signup-container">
                <h1 className="signup-title">{loading ? "Processing..." : "Sign Up"}</h1>
                <p className="signup-desc">Create your account to get started.</p>
                <form className="signup-form" onSubmit={e => { e.preventDefault(); onSignup(); }}>
                    <div>
                        <label htmlFor="email" className="signup-label">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="signup-input"
                            placeholder="Enter your email"
                            value={user.email}
                            onChange={e => setUser({ ...user, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="signup-label">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="signup-input"
                            placeholder="Enter your password"
                            value={user.password}
                            onChange={e => setUser({ ...user, password: e.target.value })}
                        />
                    </div>
                    <button
                        type="submit"
                        className="signup-btn"
                        disabled={buttonDisabled}
                    >
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>
                </form>
                <div className="signup-footer">
                    Already have an account? <a href="/login">Login</a>
                </div>
            </div>
        </div>
    );
}