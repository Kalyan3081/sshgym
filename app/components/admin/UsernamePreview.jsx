export default function UsernamePreview({ username, isAvailable }) {
    return (
        <div className="p-4 rounded-xl border border-white/10 bg-white/5">
            <p className="text-xs text-gray-400">
                Username preview:
            </p>

            <h3 className={`text-lg font-bold ${isAvailable ? "text-green-400" : "text-red-400"
                }`}>
                {username || "Waiting..."}
            </h3>

            {isAvailable && <p className="text-green-400 text-xs">Available</p>}
            {isAvailable === false && <p className="text-red-400 text-xs">Taken</p>}
        </div>
    );
}