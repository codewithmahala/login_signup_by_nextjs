'use client';

import "../../../styles/backend/auth/login.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({ email: "", password: "" });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        setLoading(true);
        try {
            const response = await axios.post("/api/users/login", user);
            if (response.data.success) {
                toast.success("Login successful!");
                router.push("/dashboard");
            } else {
                toast.error(response.data.error || "Login failed. Please try again.");
            }
        } catch {
            toast.error("Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setButtonDisabled(!(user.email.length > 0 && user.password.length > 0));
    }, [user]);

    return (
        <div className="login-bg">
            <Toaster position="top-center" />
            <div className="login-container">
                <h1 className="login-title">{loading ? "Processing..." : "Login"}</h1>
                <p className="login-desc">Welcome back! Please login to your account.</p>
                <form className="login-form" onSubmit={e => { e.preventDefault(); onLogin(); }}>
                    <div>
                        <label htmlFor="email" className="login-label">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="login-input"
                            placeholder="Enter your email"
                            value={user.email}
                            onChange={e => setUser({ ...user, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="login-label">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="login-input"
                            placeholder="Enter your password"
                            value={user.password}
                            onChange={e => setUser({ ...user, password: e.target.value })}
                        />
                    </div>
                    <button
                        type="submit"
                        className="login-btn"
                        disabled={buttonDisabled}
                    >
                        {loading ? "Logging in..." : "Log In"}
                    </button>
                </form>
                <div className="login-footer">
                    Don't have an account? <a href="/signup">Sign Up</a>
                </div>
            </div>
        </div>
    );
}