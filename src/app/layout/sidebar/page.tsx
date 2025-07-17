'use client';

import React, { useState } from "react";
import "../../../../styles/backend/layout/sidebar.css";

export default function Sidebar() {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const handleDropdown = (menu: string) => {
        setOpenDropdown(openDropdown === menu ? null : menu);
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <span style={{ color: "#fff" }}>My</span>
                <span>Dashboard</span>
            </div>
            <nav className="sidebar-nav">
                <ul>
                    <li>
                        <a href="/dashboard" className="sidebar-link">🏠 Dashboard</a>
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
                                    <a href="/profile" className="sidebar-dropdown-link">Profile</a>
                                </li>
                                <li>
                                    <a href="/settings" className="sidebar-dropdown-link">Settings</a>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <a href="/support" className="sidebar-link">💬 Support</a>
                    </li>
                </ul>
            </nav>
            <div>
                <button className="sidebar-logout" onClick={() => alert("Logging out...")}>
                    Logout
                </button>
            </div>
        </aside>
    );
}