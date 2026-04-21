"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import PageHeader from "@/components/admin/PageHeader";
import StatCard from "@/components/admin/StatCard";
import MemberRow from "@/components/admin/MemberRow";

export default function AdminDashboard() {
    const [stats, setStats] = useState({ total: 0, active: 0 });
    const [recent, setRecent] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const { data } = await supabase.from("members").select("*");

            if (data) {
                setStats({
                    total: data.length,
                    active: data.length,
                });
                setRecent(data.slice(-5).reverse());
            }
        };
        fetch();
    }, []);

    return (
        <div className="p-6">
            <PageHeader title="Dashboard" subtitle="Overview of gym" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <StatCard label="Total" value={stats.total} icon="👥" />
                <StatCard label="Active" value={stats.active} icon="✅" />
            </div>

            <div className="space-y-3">
                {recent.map((m) => (
                    <MemberRow key={m.user_id} member={m} />
                ))}
            </div>
        </div>
    );
}