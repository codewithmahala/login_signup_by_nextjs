'use client';

import React,{ useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";



export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

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
        } catch (error) {
            toast.error("Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

 return (
    <div style={{
      maxWidth: "400px",
      margin: "40px auto",
      padding: "32px",
      borderRadius: "12px",
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      background: "#fff"
    }}>
      <h1 style={{ textAlign: "center", marginBottom: "16px" }}>
        {loading ? "Processing" : "Signup Page"}
      </h1>
      <p style={{ textAlign: "center", marginBottom: "24px", color: "#555" }}>
        Please fill out the form to create an account.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <label htmlFor="email" style={{ fontWeight: "500", marginBottom: "4px" }}>
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "16px"
          }}
        />
        <label htmlFor="password" style={{ fontWeight: "500", marginBottom: "4px" }}>
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "16px"
          }}
        />
        <button
          onClick={onSignup}
          disabled={buttonDisabled}
          style={{
            padding: "12px",
            borderRadius: "6px",
            border: "none",
            background: buttonDisabled ? "#ccc" : "#0070f3",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: buttonDisabled ? "not-allowed" : "pointer",
            transition: "background 0.2s"
          }}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </div>

    </div>
  );

}