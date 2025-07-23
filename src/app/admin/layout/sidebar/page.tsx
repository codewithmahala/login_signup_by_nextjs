'use client';

import React, { useState } from "react";
import "../../../../styles/backend/layout/sidebar.css";
import Link from "next/link";
import { useRouter } from "next/navigation"; // ✅ correct
import toast from "react-hot-toast";
import axios from "axios";

export default function Sidebar() {
    const router = useRouter();
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const handleDropdown = (menu: string) => {
        setOpenDropdown(openDropdown === menu ? null : menu);
    };

    const handleLogout  = async () =>{
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout successful!");
            router.push("/login");
        } catch (error) {
            if (axios.isAxiosError(error)) {
            console.error("Axios error:", error.response?.data || error.message);
            } else {
            console.error("Unexpected error:", error);
            }
            console.error("Logout failed:", error);
            
        }
    }
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <span style={{ color: "#fff" }}>My</span>
                <span>Dashboard</span>
            </div>
            <nav className="sidebar-nav">
                <ul>
                    <li>
                        <Link href="/dashboard" className="sidebar-link">🏠 Dashboard</Link>
                    </li>
                    <li>
                        <button
                            className="sidebar-dropdown-btn"
                            onClick={() => handleDropdown("account")}
                        >
                            👤 Account <span>{openDropdown === "account" ? "▲" : "▼"}</span>
                        </button>
                        {openDropdown === "account" && (
                            <ul className="sidebar-dropdown-list">
                                <li>
                                    <Link href="/profile" className="sidebar-dropdown-link">Profile</Link>
                                </li>
                                <li>
                                    <Link href="/settings" className="sidebar-dropdown-link">Settings</Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <Link href="/support" className="sidebar-link">💬 Support</Link>
                    </li>
                </ul>
            </nav>
            <div>
                <button className="sidebar-logout" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </aside>
    );
}