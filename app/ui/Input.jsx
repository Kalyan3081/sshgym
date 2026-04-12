export default function Input({ label, ...props }) {
    return (
        <div>
            <label className="text-xs uppercase text-gray-400 block mb-1">
                {label}
            </label>
            <input
                {...props}
                className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-white outline-none focus:border-blue-500"
            />
        </div>
    );
}