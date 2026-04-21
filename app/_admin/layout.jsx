'use client'
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const navItems = [
    { href: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
    { href: '/admin/create', icon: '➕', label: 'Create Member' },
    { href: '/admin/members', icon: '👥', label: 'All Members' },
    { href: '/admin/expiring', icon: '⚠️', label: 'Expiring Soon' },
];

export default function AdminLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
                * { box-sizing: border-box; margin: 0; padding: 0; }
                body { background: #080e1f; }
                .admin-shell {
                    min-height: 100vh;
                    background: #080e1f;
                    font-family: 'DM Sans', sans-serif;
                    display: flex;
                }
                /* SIDEBAR */
                .sidebar {
                    width: 240px;
                    background: rgba(255,255,255,0.03);
                    border-right: 1px solid rgba(255,255,255,0.06);
                    display: flex;
                    flex-direction: column;
                    padding: 1.5rem 1rem;
                    position: fixed;
                    top: 0; left: 0;
                    height: 100vh;
                    z-index: 100;
                    transition: transform 0.3s ease;
                }
                .sidebar-logo {
                    display: flex; align-items: center; gap: 0.75rem;
                    padding: 0.5rem 0.75rem;
                    margin-bottom: 2rem;
                }
                .logo-icon {
                    width: 38px; height: 38px;
                    background: linear-gradient(135deg, #3b82f6, #6366f1);
                    border-radius: 10px;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 1.1rem;
                }
                .logo-name {
                    font-family: 'Syne', sans-serif;
                    font-weight: 800;
                    font-size: 1.1rem;
                    color: #fff;
                    letter-spacing: -0.03em;
                }
                .logo-role {
                    font-size: 0.65rem;
                    color: rgba(255,255,255,0.3);
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                }
                .nav-section-label {
                    font-size: 0.65rem;
                    color: rgba(255,255,255,0.25);
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    padding: 0 0.75rem;
                    margin-bottom: 0.5rem;
                }
                .nav-link {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.7rem 0.75rem;
                    border-radius: 10px;
                    color: rgba(255,255,255,0.45);
                    font-size: 0.875rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.15s;
                    text-decoration: none;
                    margin-bottom: 0.2rem;
                    border: none;
                    background: none;
                    width: 100%;
                    text-align: left;
                }
                .nav-link:hover { color: #fff; background: rgba(255,255,255,0.06); }
                .nav-link.active {
                    color: #fff;
                    background: linear-gradient(135deg, rgba(59,130,246,0.2), rgba(99,102,241,0.15));
                    border: 1px solid rgba(59,130,246,0.2);
                }
                .nav-icon { font-size: 1rem; width: 20px; text-align: center; }
                /* MAIN */
                .admin-main {
                    margin-left: 240px;
                    flex: 1;
                    padding: 2rem;
                    min-height: 100vh;
                }
                /* MOBILE TOPBAR */
                .mobile-topbar {
                    display: none;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1rem 1.25rem;
                    background: rgba(255,255,255,0.03);
                    border-bottom: 1px solid rgba(255,255,255,0.06);
                    position: sticky; top: 0; z-index: 50;
                }
                .hamburger {
                    background: none; border: none;
                    color: #fff; font-size: 1.3rem; cursor: pointer;
                }
                .overlay {
                    display: none;
                    position: fixed; inset: 0;
                    background: rgba(0,0,0,0.6);
                    z-index: 99;
                }
                @media (max-width: 768px) {
                    .sidebar {
                        transform: translateX(-100%);
                    }
                    .sidebar.open {
                        transform: translateX(0);
                    }
                    .admin-main {
                        margin-left: 0;
                        padding: 1.25rem;
                    }
                    .mobile-topbar { display: flex; }
                    .overlay.open { display: block; }
                }
            `}</style>
            <div className="admin-shell">
                {/* Mobile overlay */}
                <div className={`overlay ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)} />

                {/* Sidebar */}
                <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
                    <div className="sidebar-logo">
                        <div className="logo-icon">🏋️</div>
                        <div>
                            <div className="logo-name">SSHGym</div>
                            <div className="logo-role">Admin Panel</div>
                        </div>
                    </div>

                    <div className="nav-section-label">Navigation</div>
                    {navItems.map((item) => (
                        <button
                            key={item.href}
                            className={`nav-link ${pathname === item.href ? 'active' : ''}`}
                            onClick={() => { router.push(item.href); setMenuOpen(false); }}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            {item.label}
                        </button>
                    ))}
                </aside>

                {/* Main content */}
                <main className="admin-main">
                    {/* Mobile topbar */}
                    <div className="mobile-topbar">
                        <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#fff', fontSize: '1rem' }}>SSHGym Admin</div>
                        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
                    </div>
                    {children}
                </main>
            </div>
        </>
    );
}