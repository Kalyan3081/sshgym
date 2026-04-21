'use client'
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
    const [stats, setStats] = useState({ total: 0, active: 0, expiring: 0, expired: 0 });
    const [recent, setRecent] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            const { data } = await supabase.from('members').select('*');
            if (data) {
                const now = new Date();
                const in7days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
                const total = data.length;
                const expired = data.filter(m => new Date(m.expiry_date) < now).length;
                const expiring = data.filter(m => {
                    const d = new Date(m.expiry_date);
                    return d >= now && d <= in7days;
                }).length;
                const active = total - expired - expiring;
                setStats({ total, active, expiring, expired });
                setRecent(data.slice(-5).reverse());
            }
            setLoading(false);
        };
        fetchStats();
    }, []);

    const statCards = [
        { label: 'Total Members', value: stats.total, icon: '👥', color: '#3b82f6' },
        { label: 'Active', value: stats.active, icon: '✅', color: '#22c55e' },
        { label: 'Expiring Soon', value: stats.expiring, icon: '⚠️', color: '#f59e0b' },
        { label: 'Expired', value: stats.expired, icon: '❌', color: '#ef4444' },
    ];

    return (
        <>
            <style>{`
                .page-header { margin-bottom: 2rem; }
                .page-title {
                    font-family: 'Syne', sans-serif;
                    font-size: 1.75rem;
                    font-weight: 800;
                    color: #fff;
                    letter-spacing: -0.03em;
                    margin-bottom: 0.3rem;
                }
                .page-sub { color: rgba(255,255,255,0.4); font-size: 0.875rem; }
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin-bottom: 2rem;
                }
                .stat-card {
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 16px;
                    padding: 1.25rem;
                    transition: border-color 0.2s;
                }
                .stat-card:hover { border-color: rgba(255,255,255,0.15); }
                .stat-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem; }
                .stat-icon {
                    width: 36px; height: 36px;
                    border-radius: 10px;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 1rem;
                }
                .stat-value {
                    font-family: 'Syne', sans-serif;
                    font-size: 2rem;
                    font-weight: 800;
                    color: #fff;
                    line-height: 1;
                    margin-bottom: 0.25rem;
                }
                .stat-label { font-size: 0.8rem; color: rgba(255,255,255,0.4); }
                .section-title {
                    font-family: 'Syne', sans-serif;
                    font-size: 1rem;
                    font-weight: 700;
                    color: #fff;
                    margin-bottom: 1rem;
                }
                .member-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0.875rem 1rem;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 12px;
                    margin-bottom: 0.5rem;
                    transition: border-color 0.15s;
                }
                .member-row:hover { border-color: rgba(255,255,255,0.12); }
                .member-avatar {
                    width: 36px; height: 36px;
                    background: linear-gradient(135deg, #3b82f6, #6366f1);
                    border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    font-family: 'Syne', sans-serif;
                    font-weight: 700;
                    color: #fff;
                    font-size: 0.875rem;
                    flex-shrink: 0;
                }
                .member-name-text {
                    font-weight: 500;
                    color: #fff;
                    font-size: 0.9rem;
                }
                .member-stage { font-size: 0.75rem; color: rgba(255,255,255,0.35); margin-top: 0.1rem; }
                .exp-chip {
                    font-size: 0.72rem;
                    padding: 0.25rem 0.6rem;
                    border-radius: 20px;
                    font-weight: 500;
                    white-space: nowrap;
                }
                .chip-ok { background: rgba(34,197,94,0.12); color: #4ade80; }
                .chip-warn { background: rgba(251,146,60,0.12); color: #fb923c; }
                .chip-bad { background: rgba(239,68,68,0.12); color: #f87171; }
                @media (min-width: 640px) {
                    .stats-grid { grid-template-columns: repeat(4, 1fr); }
                    .page-title { font-size: 2rem; }
                }
            `}</style>

            <div className="page-header">
                <div className="page-title">Dashboard</div>
                <div className="page-sub">Overview of your gym members</div>
            </div>

            <div className="stats-grid">
                {statCards.map((s) => (
                    <div className="stat-card" key={s.label}>
                        <div className="stat-top">
                            <div className="stat-icon" style={{ background: `${s.color}20` }}>
                                {s.icon}
                            </div>
                        </div>
                        <div className="stat-value">{loading ? '—' : s.value}</div>
                        <div className="stat-label">{s.label}</div>
                    </div>
                ))}
            </div>

            <div className="section-title">Recently Added</div>
            {loading ? (
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.875rem' }}>Loading...</div>
            ) : recent.length === 0 ? (
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.875rem' }}>No members yet.</div>
            ) : recent.map((m) => {
                const now = new Date();
                const exp = new Date(m.expiry_date);
                const daysLeft = Math.ceil((exp - now) / (1000 * 60 * 60 * 24));
                const chipClass = daysLeft < 0 ? 'chip-bad' : daysLeft <= 7 ? 'chip-warn' : 'chip-ok';
                const chipText = daysLeft < 0 ? 'Expired' : `${daysLeft}d left`;
                return (
                    <div className="member-row" key={m.user_id}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div className="member-avatar">{m.full_name.charAt(0).toUpperCase()}</div>
                            <div>
                                <div className="member-name-text">{m.full_name}</div>
                                <div className="member-stage">Stage {m.assigned_stage} · Part {m.assigned_part}</div>
                            </div>
                        </div>
                        <span className={`exp-chip ${chipClass}`}>{chipText}</span>
                    </div>
                );
            })}
        </>
    );
}