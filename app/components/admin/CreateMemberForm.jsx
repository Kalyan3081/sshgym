"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import UsernamePreview from "./UsernamePreview";

export default function CreateMemberForm() {
    const [tempName, setTempName] = useState("");
    const [generatedUsername, setGeneratedUsername] = useState("");
    const [isAvailable, setIsAvailable] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleNameChange = async (e) => {
        const name = e.target.value;
        setTempName(name);

        if (name.length > 2) {
            const base = name.toLowerCase().replace(/[^a-z0-9]/g, "");
            setGeneratedUsername(base);
            setIsAvailable(true);
        } else {
            setGeneratedUsername("");
            setIsAvailable(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const password = e.target.password.value;
        const stage = e.target.stage.value;
        const part = e.target.part.value;
        const days = parseInt(e.target.days.value);

        const expiry = new Date();
        expiry.setDate(expiry.getDate() + days);

        const ghostEmail = `${generatedUsername}@gym.local`;

        const { data } = await supabase.auth.signUp({
            email: ghostEmail,
            password,
        });

        if (data?.user) {
            await supabase.from("members").insert([{
                user_id: data.user.id,
                full_name: tempName,
                assigned_stage: stage,
                assigned_part: part,
                expiry_date: expiry.toISOString(),
            }]);

            alert(`Username: ${generatedUsername}\nPassword: ${password}`);
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">

            <input
                value={tempName}
                onChange={handleNameChange}
                placeholder="Full Name"
                className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-xl text-white"
            />

            <UsernamePreview
                username={generatedUsername}
                isAvailable={isAvailable}
            />

            <input
                name="password"
                placeholder="Password"
                className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-xl"
            />

            <div className="flex gap-3">
                <select name="stage" className="flex-1 bg-white/10 p-2 rounded-xl">
                    <option value="1">Stage 1</option>
                    <option value="2">Stage 2</option>
                </select>

                <select name="part" className="flex-1 bg-white/10 p-2 rounded-xl">
                    <option value="1">Part 1</option>
                    <option value="6">Part 6</option>
                </select>
            </div>

            <input
                name="days"
                type="number"
                defaultValue="90"
                className="w-full px-4 py-2 bg-white/10 rounded-xl"
            />

            <button
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-xl font-semibold"
            >
                {loading ? "Creating..." : "Create Member"}
            </button>
        </form>
    );
}