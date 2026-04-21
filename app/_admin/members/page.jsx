'use client'
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AllMembers() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchMembers = async () => {
            const { data } = await supabase
                .from('members')
                .select('*')
                .order('expiry_date', { ascending: true });
            if (data) setMembers(data);
            setLoading(false);
        };
        fetchMembers();
    }, []);

    const filtered = members.filter(m =>
        m.full_name.toLowerCase().includes(search.toLowerCase())
    );

    const getStatus = (expiry_date) => {
        const now = new Date();
        const exp = new Date(expiry_date);
        const daysLeft = Math.ceil((exp - now) / (1000 * 60 * 60 * 24));
        if (daysLeft < 0) return { label: 'Expired', class: 'chip-bad', days: daysLeft };
        if (daysLeft <= 7) return { label: `${daysLeft}d left`, class: 'chip-warn', days: daysLeft };
        return { label: `${daysLeft}d left`, class: 'chip-ok', days: daysLeft };
    };

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
                .search-bar {
                    width: 100%;
                    max-width: 360px;
                    padding: 0.75rem 1rem 0.75rem 2.75rem;
                    background: rgba(255,255,255,0.06);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 12px;
                    color: #fff;
                    font-size: 0.875rem;
                    font-family: 'DM Sans', sans-serif;
                    outline: none;
                    margin-bottom: 1.5rem;
                    transition: border-color 0.2s;
                }
                .search-bar:focus { border-color: rgba(59,130,246,0.5); }
                .search-bar::placeholder { color: rgba(255,255,255,0.25); }
                .search-wrap { position: relative; display: inline-block; width: 100%; max-width: 360px; }
                .search-icon { position: absolute; left: 0.9rem; top: 50%; transform: translateY(-50%); font-size: 0.9rem; opacity: 0.4; }
                .table-wrap {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 16px;
                    overflow: hidden;
                }
                .table-head {
                    display: grid;
                    grid-template-columns: 2fr 1fr 1fr 1.2fr;
                    padding: 0.75rem 1.25rem;
                    border-bottom: 1px solid rgba(255,255,255,0.06);
                }
                .th {
                    font-size: 0.7rem;
                    color: rgba(255,255,255,0.3);
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    font-weight: 500;
                }
                .table-row {
                    display: grid;
                    grid-template-columns: 2fr 1fr 1fr 1.2fr;
                    padding: 0.875rem 1.25rem;
                    border-bottom: 1px solid rgba(255,255,255,0.04);
                    align-items: center;
                    transition: background 0.15s;
                }
                .table-row:last-child { border-bottom: none; }
                .table-row:hover { background: rgba(255,255,255,0.03); }
                .member-avatar-sm {
                    width: 30px; height: 30px;
                    background: linear-gradient(135deg, #3b82f6, #6366f1);
                    border-radius: 50%;
                    display: inline-flex; align-items: center; justify-content: center;
                    font-family: 'Syne', sans-serif;
                    font-weight: 700; color: #fff; font-size: 0.75rem;
                    margin-right: 0.6rem;
                    flex-shrink: 0;
                }
                .name-cell { display: flex; align-items: center; }
                .name-text { color: #fff; font-size: 0.875rem; font-weight: 500; }
                .cell-text { color: rgba(255,255,255,0.5); font-size: 0.8rem; }
                .chip-ok { background: rgba(34,197,94,0.12); color: #4ade80; padding: 0.2rem 0.6rem; border-radius: 20px; font-size: 0.72rem; font-weight: 500; }
                .chip-warn { background: rgba(251,146,60,0.12); color: #fb923c; padding: 0.2rem 0.6rem; border-radius: 20px; font-size: 0.72rem; font-weight: 500; }
                .chip-bad { background: rgba(239,68,68,0.12); color: #f87171; padding: 0.2rem 0.6rem; border-radius: 20px; font-size: 0.72rem; font-weight: 500; }
                .empty { padding: 3rem; text-align: center; color: rgba(255,255,255,0.25); font-size: 0.875rem; }

                /* Mobile: hide columns */
                @media (max-width: 520px) {
                    .table-head, .table-row { grid-template-columns: 2fr 1fr; }
                    .col-stage, .col-part, .th-stage, .th-part { display: none; }
                }
            `}</style>

            <div className="page-title">All Members</div>
            <div className="page-sub">{members.length} total members</div>

            <div className="search-wrap">
                <span className="search-icon">🔍</span>
                <input
                    className="search-bar"
                    type="text"
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="table-wrap">
                <div className="table-head">
                    <div className="th">Member</div>
                    <div className="th th-stage">Stage</div>
                    <div className="th th-part">Part</div>
                    <div className="th">Status</div>
                </div>
                {loading ? (
                    <div className="empty">Loading members...</div>
                ) : filtered.length === 0 ? (
                    <div className="empty">No members found.</div>
                ) : filtered.map((m) => {
                    const status = getStatus(m.expiry_date);
                    return (
                        <div className="table-row" key={m.user_id}>
                            <div className="name-cell">
                                <div className="member-avatar-sm">{m.full_name.charAt(0).toUpperCase()}</div>
                                <span className="name-text">{m.full_name}</span>
                            </div>
                            <div className="cell-text col-stage">S{m.assigned_stage}</div>
                            <div className="cell-text col-part">P{m.assigned_part}</div>
                            <div><span className={status.class}>{status.label}</span></div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}