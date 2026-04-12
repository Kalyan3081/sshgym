export default function Tabs({ activeTab, setActiveTab }) {
    const tabs = [
        { id: "add", label: "➕ Add Member" },
        { id: "all", label: "📋 All Members" },
        { id: "expiring", label: "⚠️ Expiring Soon" },
    ];

    return (
        <div className="flex gap-4 border-b border-white/10 pb-4 mb-6">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`text-sm font-medium transition ${activeTab === tab.id
                            ? "text-white border-b-2 border-blue-500 pb-1"
                            : "text-gray-400 hover:text-white"
                        }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}