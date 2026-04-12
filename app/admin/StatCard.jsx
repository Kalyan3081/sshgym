import Card from "../ui/Card";

export default function StatCard({ label, value, icon }) {
    return (
        <Card>
            <div className="flex justify-between items-center mb-2">
                <span className="text-xl">{icon}</span>
            </div>
            <div className="text-white text-2xl font-bold">{value}</div>
            <div className="text-gray-400 text-sm">{label}</div>
        </Card>
    );
}