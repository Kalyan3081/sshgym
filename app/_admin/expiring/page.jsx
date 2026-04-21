'use client'
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function ExpiringSoon() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('7'); // days

    useEffect(() => {
        const fetchExpiring = async () => {
            const { data } = await supabase
                .from('members')
                .select('*')
                .order('expiry_date', { ascending: true });
            if (data) setMembers(data);
            setLoading(false);
        };
        fetchExpiring();
    }, []);

    const now = new Date();
    const days = parseInt(filter);
    const cutoff = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

    const filtered = members.filter(m => {
        const exp = new Date(m.expiry_date);
        return exp >= now && exp <= cutoff;
    });

    const expired = members.filter(m => new Date(m.expiry_date) < now);

    const daysLeft = (expiry_date) =>
        Math.ceil((new Date(expiry_date) - now) / (1000 * 60 * 60 * 24));

    return (
        <>
            <style>{`
                .page-title {
                    font-family: 'Syne', sans-serif;
                    font-size: 1.75rem;
                    font-weight: 800;
                    color: #fff;
                    letter-spacing: -0.03em;
                    margin-bottom: 0.3rem;
                }
                .page-sub { color: rgba(255,255,255,0.4); font-size: 0.875rem; margin-bottom: 1.5rem; }
                .filter-row { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
                .filter-btn {
                    padding: 0.45rem 1rem;
                    border-radius: 20px;
                    border: 1px solid rgba(255,255,255,0.1);
                    background: rgba(255,255,255,0.04);
                    color: rgba(255,255,255,0.5);
                    font-size: 0.8rem;
                    cursor: pointer;
                    font-family: 'DM Sans', sans-serif;
                    transition: all 0.15s;
                }
                .filter-btn.active {
                    background: rgba(251,146,60,0.15);
                    border-color: rgba(251,146,60,0.3);
                    color: #fb923c;
                }
                .section-label {
                    font-family: 'Syne', sans-serif;
                    font-size: 0.85rem;
                    font-weight: 700;
                    color: rgba(255,255,255,0.5);
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    margin-bottom: 0.75rem;
                    margin-top: 1.5rem;
                    display: flex; align-items: center; gap: 0.5rem;
                }
                .section-label:first-of-type { margin-top: 0; }
                .member-card {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1rem 1.25rem;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 14px;
                    margin-bottom: 0.5rem;
                    transition: border-color 0.15s;
                }
                .member-card:hover { border-color: rgba(255,255,255,0.14); }
                .member-card.expired-card { border-color: rgba(239,68,68,0.15); }
                .avatar {
                    width: 38px; height: 38px;
                    border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    font-family: 'Syne', sans-serif;
                    font-weight: 700; color: #fff; font-size: 0.875rem;
                    flex-shrink: 0; margin-right: 0.75rem;
                }
                .avatar-warn { background: linear-gradient(135deg, #f59e0b, #ef4444); }
                .avatar-bad { background: rgba(239,68,68,0.3); }
                .mname { color: #fff; font-size: 0.9rem; font-weight: 500; }
                .mstage { color: rgba(255,255,255,0.35); font-size: 0.75rem; margin-top: 0.1rem; }
                .days-badge {
                    font-family: 'Syne', sans-serif;
                    font-weight: 700;
                    font-size: 0.9rem;
                    text-align: right;
                }
                .days-sub { font-size: 0.7rem; color: rgba(255,255,255,0.3); font-weight: 400; font-family: 'DM Sans', sans-serif; }
                .empty { color: rgba(255,255,255,0.25); font-size: 0.875rem; padding: 1rem 0; }
            `}</style>

            <div className="page-title">Expiring Soon</div>
            <div className="page-sub">Members whose access is ending</div>

            <div className="filter-row">
                {['3', '7', '14', '30'].map(d => (
                    <button
                        key={d}
                        className={`filter-btn ${filter === d ? 'active' : ''}`}
                        onClick={() => setFilter(d)}
                    >
                        Next {d} days
                    </button>
                ))}
            </div>

            <div className="section-label">
                <span>⚠️</span> Expiring in {filter} days
                <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400, fontSize: '0.75rem' }}>({filtered.length})</span>
            </div>

            {loading ? (
                <div className="empty">Loading...</div>
            ) : filtered.length === 0 ? (
                <div className="empty">No members expiring in the next {filter} days.</div>
            ) : filtered.map(m => {
                const d = daysLeft(m.expiry_date);
                return (
                    <div className="member-card" key={m.user_id}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="avatar avatar-warn">{m.full_name.charAt(0).toUpperCase()}</div>
                            <div>
                                <div className="mname">{m.full_name}</div>
                                <div className="mstage">Stage {m.assigned_stage} · Part {m.assigned_part}</div>
                            </div>
                        </div>
                        <div>
                            <div className="days-badge" style={{ color: d <= 3 ? '#f87171' : '#fb923c' }}>
                                {d}d
                            </div>
                            <div className="days-sub">
                                {new Date(m.expiry_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                            </div>
                        </div>
                    </div>
                );
            })}

            <div className="section-label" style={{ marginTop: '2rem' }}>
                <span>❌</span> Already Expired
                <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400, fontSize: '0.75rem' }}>({expired.length})</span>
            </div>

            {expired.length === 0 ? (
                <div className="empty">No expired members.</div>
            ) : expired.map(m => (
                <div className="member-card expired-card" key={m.user_id}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="avatar avatar-bad">{m.full_name.charAt(0).toUpperCase()}</div>
                        <div>
                            <div className="mname" style={{ color: 'rgba(255,255,255,0.6)' }}>{m.full_name}</div>
                            <div className="mstage">Stage {m.assigned_stage} · Part {m.assigned_part}</div>
                        </div>
                    </div>
                    <div>
                        <div className="days-badge" style={{ color: '#f87171' }}>Expired</div>
                        <div className="days-sub">
                            {new Date(m.expiry_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}