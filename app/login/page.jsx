'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [showPass, setShowPass] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');

        const ghostEmail = `${username.trim().toLowerCase()}@gym.local`;

        const { data, error } = await supabase.auth.signInWithPassword({
            email: ghostEmail,
            password: password,
        });

        if (error) {
            setErrorMsg('Invalid username or password.');
            setLoading(false);
            return;
        }

        const { data: member } = await supabase
            .from('members')
            .select('expiry_date')
            .eq('user_id', data.user.id)
            .single();

        if (!member || new Date(member.expiry_date) < new Date()) {
            setErrorMsg('Your membership has expired. Contact the gym.');
            await supabase.auth.signOut();
            setLoading(false);
            return;
        }

        router.push('/workout');
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
                * { box-sizing: border-box; margin: 0; padding: 0; }
                body { background: #080e1f; }
                .login-wrap {
                    min-height: 100vh;
                    background: #080e1f;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1.5rem;
                    font-family: 'DM Sans', sans-serif;
                    position: relative;
                    overflow: hidden;
                }
                .bg-glow {
                    position: absolute;
                    width: 500px; height: 500px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%);
                    top: -100px; left: -100px;
                    pointer-events: none;
                }
                .bg-glow2 {
                    position: absolute;
                    width: 400px; height: 400px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%);
                    bottom: -50px; right: -50px;
                    pointer-events: none;
                }
                .card {
                    width: 100%;
                    max-width: 400px;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 24px;
                    padding: 2.5rem 2rem;
                    position: relative;
                    backdrop-filter: blur(20px);
                }
                .logo-wrap {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin-bottom: 2rem;
                }
                .logo-icon {
                    width: 44px; height: 44px;
                    background: linear-gradient(135deg, #3b82f6, #6366f1);
                    border-radius: 12px;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 1.3rem;
                }
                .logo-text {
                    font-family: 'Syne', sans-serif;
                    font-weight: 800;
                    font-size: 1.3rem;
                    color: #fff;
                    letter-spacing: -0.03em;
                }
                .logo-sub {
                    font-size: 0.7rem;
                    color: rgba(255,255,255,0.4);
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    margin-top: 1px;
                }
                h1 {
                    font-family: 'Syne', sans-serif;
                    font-size: 1.6rem;
                    font-weight: 700;
                    color: #fff;
                    margin-bottom: 0.4rem;
                    letter-spacing: -0.03em;
                }
                .subtitle {
                    font-size: 0.875rem;
                    color: rgba(255,255,255,0.4);
                    margin-bottom: 2rem;
                }
                .field { margin-bottom: 1rem; }
                label {
                    display: block;
                    font-size: 0.8rem;
                    font-weight: 500;
                    color: rgba(255,255,255,0.5);
                    margin-bottom: 0.4rem;
                    letter-spacing: 0.04em;
                    text-transform: uppercase;
                }
                .input-wrap { position: relative; }
                input[type="text"], input[type="password"] {
                    width: 100%;
                    padding: 0.875rem 1rem;
                    background: rgba(255,255,255,0.06);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 12px;
                    color: #fff;
                    font-size: 0.95rem;
                    font-family: 'DM Sans', sans-serif;
                    outline: none;
                    transition: border-color 0.2s, background 0.2s;
                }
                input:focus {
                    border-color: rgba(59,130,246,0.6);
                    background: rgba(59,130,246,0.08);
                }
                input::placeholder { color: rgba(255,255,255,0.2); }
                .toggle-pass {
                    position: absolute;
                    right: 1rem; top: 50%;
                    transform: translateY(-50%);
                    background: none; border: none;
                    color: rgba(255,255,255,0.4);
                    cursor: pointer; font-size: 1rem;
                    padding: 0;
                }
                .error-box {
                    background: rgba(239,68,68,0.1);
                    border: 1px solid rgba(239,68,68,0.3);
                    border-radius: 10px;
                    padding: 0.75rem 1rem;
                    color: #f87171;
                    font-size: 0.85rem;
                    margin-bottom: 1rem;
                    display: flex; align-items: center; gap: 0.5rem;
                }
                .btn {
                    width: 100%;
                    padding: 1rem;
                    background: linear-gradient(135deg, #3b82f6, #6366f1);
                    border: none;
                    border-radius: 12px;
                    color: #fff;
                    font-size: 1rem;
                    font-weight: 600;
                    font-family: 'Syne', sans-serif;
                    cursor: pointer;
                    margin-top: 0.5rem;
                    transition: opacity 0.2s, transform 0.1s;
                    letter-spacing: 0.01em;
                }
                .btn:hover { opacity: 0.9; transform: translateY(-1px); }
                .btn:active { transform: translateY(0); }
                .btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
                .divider {
                    text-align: center;
                    color: rgba(255,255,255,0.2);
                    font-size: 0.75rem;
                    margin-top: 1.5rem;
                    letter-spacing: 0.05em;
                }
            `}</style>
            <div className="login-wrap">
                <div className="bg-glow" />
                <div className="bg-glow2" />
                <div className="card">
                    <div className="logo-wrap">
                        <div className="logo-icon">🏋️</div>
                        <div>
                            <div className="logo-text">SSHGym</div>
                            <div className="logo-sub">Member Portal</div>
                        </div>
                    </div>
                    <h1>Welcome back</h1>
                    <p className="subtitle">Sign in to access your workout plan</p>

                    {errorMsg && (
                        <div className="error-box">
                            <span>⚠️</span> {errorMsg}
                        </div>
                    )}

                    <form onSubmit={handleLogin}>
                        <div className="field">
                            <label>Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="e.g. ravi123"
                                required
                                autoComplete="username"
                            />
                        </div>
                        <div className="field">
                            <label>Password</label>
                            <div className="input-wrap">
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Your password"
                                    required
                                    autoComplete="current-password"
                                    style={{ paddingRight: '3rem' }}
                                />
                                <button type="button" className="toggle-pass" onClick={() => setShowPass(!showPass)}>
                                    {showPass ? '🙈' : '👁️'}
                                </button>
                            </div>
                        </div>
                        <button type="submit" className="btn" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign In →'}
                        </button>
                    </form>
                    <p className="divider">Scan QR code at gym entrance to access this page</p>
                </div>
            </div>
        </>
    );
}