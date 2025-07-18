'use client';

import React from "react";
import "../../../../styles/backend/layout/header.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

export default function Header() {
    const router = useRouter();
    const handleLogout = async ()=>{
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout successful!");
            router.push("/login");
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Logout failed:", error.message);
            } else {
                console.error("Logout failed:", error);
            }
            
        }
    }
    return (
        <header className="main-header">
            <div className="header-container">
                <div className="header-logo">
                    <Link href="/dashboard">
                        <span style={{ color: "#2575fc", fontWeight: 700 }}>My</span>
                        <span style={{ color: "#6a11cb", fontWeight: 700 }}>App</span>
                    </Link>
                </div>
                <div className="header-actions">
                    <button className="header-logout" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
}