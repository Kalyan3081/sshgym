"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import InputField from "./InputField";
import PasswordField from "./PasswordField";
import ErrorBox from "./ErrorBox";

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");

        const ghostEmail = `${username}@gym.local`;

        const { data, error } = await supabase.auth.signInWithPassword({
            email: ghostEmail,
            password,
        });

        if (error) {
            setErrorMsg("Invalid credentials");
            setLoading(false);
            return;
        }

        router.push("/workout");
    };

    return (
        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <h1 className="text-white text-2xl font-bold mb-2">Welcome back</h1>
            <p className="text-gray-400 text-sm mb-6">
                Sign in to access your workout
            </p>

            {errorMsg && <ErrorBox msg={errorMsg} />}

            <form onSubmit={handleLogin} className="space-y-4">
                <InputField
                    label="Username"
                    value={username}
                    onChange={setUsername}
                />

                <PasswordField
                    value={password}
                    onChange={setPassword}
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition"
                >
                    {loading ? "Signing in..." : "Sign In →"}
                </button>
            </form>
        </div>
    );
}