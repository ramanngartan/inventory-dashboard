import { useState } from "react";
import api from "../services/api.js";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";


export default function Login() {

    const navigate = useNavigate();

    const { fetchProfile } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        try {

            const response = await api.post("/auth/login", {
                email,
                password
            })

            localStorage.setItem("token", response.data);

            await fetchProfile();

            navigate("/dashboard")

        }

        catch (error) {

            console.log(error);

        }
    }

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center">

        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-200 p-8">

            <h1 className="text-3xl font-bold text-slate-900">
            Welcome Back
            </h1>

            <p className="text-slate-500 mt-2">
            Sign in to your inventory dashboard.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
                </label>

                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
                </label>

                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
            >
                Sign In
            </button>

            </form>

        </div>

        </div>
    );
}