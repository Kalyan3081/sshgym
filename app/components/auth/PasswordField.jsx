import { useState } from "react";

export default function PasswordField({ value, onChange }) {
    const [show, setShow] = useState(false);

    return (
        <div>
            <label className="text-xs text-gray-400 uppercase">
                Password
            </label>

            <div className="relative mt-1">
                <input
                    type={show ? "text" : "password"}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white pr-10"
                />
                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-2 text-gray-400"
                >
                    {show ? "🙈" : "👁️"}
                </button>
            </div>
        </div>
    );
}