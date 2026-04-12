export default function Badge({ children, type }) {
    const styles = {
        ok: "bg-green-500/10 text-green-400",
        warn: "bg-yellow-500/10 text-yellow-400",
        bad: "bg-red-500/10 text-red-400",
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs ${styles[type]}`}>
            {children}
        </span>
    );
}