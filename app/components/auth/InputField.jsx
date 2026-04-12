export default function InputField({ label, value, onChange }) {
    return (
        <div>
            <label className="text-xs text-gray-400 uppercase">
                {label}
            </label>
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full mt-1 px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white outline-none focus:border-blue-500"
            />
        </div>
    );
}