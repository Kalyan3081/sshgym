'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function WorkoutPage() {
    const [memberData, setMemberData] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pdfLoading, setPdfLoading] = useState(true);
    const [expired, setExpired] = useState(false);
    const [noPdf, setNoPdf] = useState(false);
    const router = useRouter();

    useEffect(() => {
        let mounted = true;
        const timer = setTimeout(() => { if (mounted && loading) setLoading(false); }, 8000);

        const checkAccess = async () => {
            try {
                const { data: { session }, error: sessionError } = await supabase.auth.getSession();
                if (sessionError || !session) { router.push('/login'); return; }

                // Fetch member data
                const { data: member } = await supabase
                    .from('members')
                    .select('*')
                    .eq('user_id', session.user.id)
                    .maybeSingle();

                if (!mounted) return;
                if (!member) { router.push('/login'); return; }

                if (new Date() > new Date(member.expiry_date)) {
                    setExpired(true);
                    setLoading(false);
                    return;
                }

                setMemberData(member);

                // Call API route to get signed URL — token never exposed to client
                const res = await fetch('/api/get-pdf', {
                    headers: {
                        'Authorization': `Bearer ${session.access_token}`
                    }
                });

                if (!mounted) return;

                if (res.ok) {
                    const { url } = await res.json();
                    setPdfUrl(url);
                } else {
                    setNoPdf(true);
                }

                setLoading(false);
            } catch (err) {
                if (mounted) setLoading(false);
            }
        };

        checkAccess();
        return () => { mounted = false; clearTimeout(timer); };
    }, [router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    const daysLeft = memberData
        ? Math.max(0, Math.ceil((new Date(memberData.expiry_date) - new Date()) / (1000 * 60 * 60 * 24)))
        : 0;

    if (loading) return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700&family=DM+Sans:wght@400&display=swap');
                * { box-sizing: border-box; margin: 0; padding: 0; }
                body { background: #080e1f; }
                .loading-screen {
                    min-height: 100vh; background: #080e1f;
                    display: flex; align-items: center; justify-content: center;
                    font-family: 'DM Sans', sans-serif; color: rgba(255,255,255,0.5);
                    flex-direction: column; gap: 1rem;
                }
                .spinner {
                    width: 36px; height: 36px;
                    border: 3px solid rgba(59,130,246,0.2);
                    border-top-color: #3b82f6;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                }
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
            <div className="loading-screen">
                <div className="spinner" />
                <span>Loading your workout...</span>
            </div>
        </>
    );

    if (expired) return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400&display=swap');
                * { box-sizing: border-box; margin: 0; padding: 0; }
                body { background: #080e1f; }
                .exp { min-height: 100vh; background: #080e1f; display: flex; align-items: center; justify-content: center; padding: 2rem; font-family: 'DM Sans', sans-serif; text-align: center; flex-direction: column; gap: 1rem; }
                h1 { font-family: 'Syne', sans-serif; color: #f87171; font-size: 2rem; }
                p { color: rgba(255,255,255,0.4); }
            `}</style>
            <div className="exp">
                <div style={{ fontSize: '3rem' }}>⏰</div>
                <h1>Membership Expired</h1>
                <p>Your access has ended. Please see the front desk to renew.</p>
            </div>
        </>
    );

    if (!memberData) return null;

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
                * { box-sizing: border-box; margin: 0; padding: 0; }
                body { background: #080e1f; }
                .workout-wrap {
                    min-height: 100vh;
                    background: #080e1f;
                    font-family: 'DM Sans', sans-serif;
                    display: flex;
                    flex-direction: column;
                }
                .bg-glow {
                    position: fixed;
                    width: 600px; height: 600px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%);
                    top: -200px; right: -200px;
                    pointer-events: none; z-index: 0;
                }
                .watermark {
                    position: fixed;
                    top: 50%; left: 50%;
                    transform: translate(-50%, -50%) rotate(-20deg);
                    opacity: 0.035;
                    font-family: 'Syne', sans-serif;
                    font-size: clamp(1.5rem, 6vw, 3.5rem);
                    font-weight: 800;
                    color: #fff;
                    pointer-events: none;
                    white-space: nowrap;
                    z-index: 0;
                    user-select: none;
                }
                .topbar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1rem 1.25rem;
                    border-bottom: 1px solid rgba(255,255,255,0.06);
                    position: sticky; top: 0;
                    background: rgba(8,14,31,0.95);
                    backdrop-filter: blur(12px);
                    z-index: 10;
                    flex-shrink: 0;
                }
                .member-info { display: flex; flex-direction: column; gap: 0.15rem; }
                .member-name {
                    font-family: 'Syne', sans-serif;
                    font-size: 1rem; font-weight: 700;
                    color: #fff; letter-spacing: -0.02em;
                }
                .member-meta { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
                .member-expiry { font-size: 0.75rem; color: rgba(255,255,255,0.35); }
                .expiry-badge {
                    display: inline-flex; align-items: center; gap: 0.2rem;
                    padding: 0.15rem 0.5rem; border-radius: 20px;
                    font-size: 0.68rem; font-weight: 500;
                }
                .badge-ok { background: rgba(34,197,94,0.15); color: #4ade80; }
                .badge-warn { background: rgba(251,146,60,0.15); color: #fb923c; }
                .topbar-right { display: flex; align-items: center; gap: 0.75rem; }
                .stage-pill {
                    padding: 0.3rem 0.75rem;
                    background: rgba(59,130,246,0.15);
                    border: 1px solid rgba(59,130,246,0.25);
                    border-radius: 20px;
                    font-size: 0.75rem; font-weight: 600;
                    color: #60a5fa;
                    font-family: 'Syne', sans-serif;
                    white-space: nowrap;
                }
                .logout-btn {
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 8px;
                    color: rgba(255,255,255,0.4);
                    padding: 0.4rem 0.75rem;
                    font-size: 0.75rem;
                    font-family: 'DM Sans', sans-serif;
                    cursor: pointer;
                    transition: all 0.2s;
                    white-space: nowrap;
                }
                .logout-btn:hover { color: #fff; border-color: rgba(255,255,255,0.2); }
                .pdf-area {
                    flex: 1; display: flex; flex-direction: column;
                    position: relative; z-index: 1; min-height: 0;
                }
                .pdf-frame {
                    width: 100%; flex: 1; border: none;
                    min-height: calc(100vh - 64px);
                }
                .pdf-shimmer {
                    position: absolute; inset: 0;
                    background: #080e1f;
                    display: flex; align-items: center; justify-content: center;
                    flex-direction: column; gap: 0.75rem;
                    color: rgba(255,255,255,0.25); font-size: 0.875rem;
                }
                .pdf-spinner {
                    width: 28px; height: 28px;
                    border: 2px solid rgba(59,130,246,0.2);
                    border-top-color: #3b82f6;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                }
                @keyframes spin { to { transform: rotate(360deg); } }
                .no-pdf {
                    flex: 1; display: flex; flex-direction: column;
                    align-items: center; justify-content: center;
                    gap: 1rem; color: rgba(255,255,255,0.25);
                    text-align: center; padding: 3rem;
                }
                .no-pdf h3 { font-family: 'Syne', sans-serif; color: rgba(255,255,255,0.3); }
                .no-pdf p { font-size: 0.85rem; }
                @media (min-width: 640px) {
                    .topbar { padding: 1.1rem 1.75rem; }
                    .member-name { font-size: 1.1rem; }
                }
            `}</style>

            <div className="workout-wrap">
                <div className="bg-glow" />
                <div className="watermark">{memberData.full_name} · {memberData.user_id.substring(0, 8)}</div>

                <div className="topbar">
                    <div className="member-info">
                        <div className="member-name">👋 {memberData.full_name}</div>
                        <div className="member-meta">
                            <span className="member-expiry">
                                Expires {new Date(memberData.expiry_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                            <span className={`expiry-badge ${daysLeft <= 7 ? 'badge-warn' : 'badge-ok'}`}>
                                {daysLeft <= 7 ? '⚠️' : '✓'} {daysLeft}d
                            </span>
                        </div>
                    </div>
                    <div className="topbar-right">
                        <span className="stage-pill">S{memberData.assigned_stage} · P{memberData.assigned_part}</span>
                        <button className="logout-btn" onClick={handleLogout}>Sign out</button>
                    </div>
                </div>

                <div className="pdf-area">
                    {noPdf ? (
                        <div className="no-pdf">
                            <div style={{ fontSize: '3rem', opacity: 0.4 }}>📄</div>
                            <h3>Plan Not Available</h3>
                            <p>Stage {memberData.assigned_stage}, Part {memberData.assigned_part} hasn't been uploaded yet.<br />Please contact gym staff.</p>
                        </div>
                    ) : pdfUrl ? (
                        <>
                            {pdfLoading && (
                                <div className="pdf-shimmer">
                                    <div className="pdf-spinner" />
                                    <span>Loading your plan...</span>
                                </div>
                            )}
                            <iframe
                                src={pdfUrl}
                                className="pdf-frame"
                                onLoad={() => setPdfLoading(false)}
                                allow="autoplay"
                                style={{ display: pdfLoading ? 'none' : 'block' }}
                            />
                        </>
                    ) : (
                        <div className="pdf-shimmer">
                            <div className="pdf-spinner" />
                            <span>Fetching your plan...</span>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}