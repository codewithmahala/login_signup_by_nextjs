'use client';

import React from "react";
import "../../../../styles/backend/layout/header.css";

export default function Header() {
    return (
        <header className="main-header">
            <div className="header-container">
                <div className="header-logo">
                    <a href="/dashboard">
                        <span style={{ color: "#2575fc", fontWeight: 700 }}>My</span>
                        <span style={{ color: "#6a11cb", fontWeight: 700 }}>App</span>
                    </a>
                </div>
                <div className="header-actions">
                    <button className="header-logout" onClick={() => alert("Logging out...")}>
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
}