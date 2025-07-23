'use client';

import "../../../styles/backend/auth/verifyEmail.css";
import React, { useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export default function VerifyEmailPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleVerify = async () => {
        if (!token) return;
        setLoading(true);
        setError(false);
        try {
            await axios.post("/api/users/verifyemail", { token });
            setVerified(true);
        } catch {
            setError(true);
            setVerified(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="verify-bg">
            <div className="verify-container">
                <h2 className="verify-title">Verify Your Email</h2>
                <button
                    className="verify-btn"
                    onClick={handleVerify}
                    disabled={loading || verified || !token}
                >
                    {loading ? "Verifying..." : verified ? "Verified" : "Verify Email"}
                </button>
                {verified && <p className="verify-success">✅ Email Verified!</p>}
                {error && <p className="verify-error">❌ Verification Failed!</p>}
                {!token && <p className="verify-info">No token found in URL.</p>}
            </div>
        </div>
    );
}