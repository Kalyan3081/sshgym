export default function PageHeader({ title, subtitle }) {
    return (
        <div className="mb-6">
            <h1 className="text-white text-2xl font-bold font-syne">{title}</h1>
            <p className="text-gray-400 text-sm">{subtitle}</p>
        </div>
    );
}