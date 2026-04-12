export default function ErrorBox({ msg }) {
    return (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm">
            ⚠️ {msg}
        </div>
    );
}