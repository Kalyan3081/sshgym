export default function Button({ children, loading, ...props }) {
    return (
        <button
            {...props}
            className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition disabled:opacity-50"
        >
            {loading ? "Loading..." : children}
        </button>
    );
}