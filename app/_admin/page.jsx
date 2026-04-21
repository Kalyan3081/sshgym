// "use client";
// import { useState } from "react";
// import Tabs from "../components/admin/Tabs";
// import CreateMemberForm from "../components/admin/CreateMemberForm";

// export default function AdminPage() {
//     const [activeTab, setActiveTab] = useState("add");

//     return (
//         <div className="min-h-screen bg-[#080e1f] text-white p-6 max-w-4xl mx-auto">

//             <h1 className="text-2xl font-bold mb-6 font-syne">
//                 Admin Dashboard
//             </h1>

//             <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

//             {activeTab === "add" && <CreateMemberForm />}
//         </div>
//     );
// }