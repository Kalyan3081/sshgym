'use client'
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function CreateMember() {
    const [tempName, setTempName] = useState('');
    const [generatedUsername, setGeneratedUsername] = useState('');
    const [isAvailable, setIsAvailable] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null); // { username, password }

    const handleNameChange = async (e) => {
        const name = e.target.value;
        setTempName(name);
        setSuccess(null);

        if (name.length > 2) {
            const { data } = await supabase
                .from('members')
                .select('full_name')
                .ilike('full_name', name.trim())
                .maybeSingle();

            const base = name.toLowerCase().replace(/[^a-z0-9]/g, '');
            if (data) {
                const randomSuffix = Math.floor(100 + Math.random() * 900);
                setGeneratedUsername(`${base}${randomSuffix}`);
                setIsAvailable(false);
            } else {
                setGeneratedUsername(base);
                setIsAvailable(true);
            }
        } else {
            setGeneratedUsername('');
            setIsAvailable(null);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        setLoading(true);

        const password = e.target.password.value;
        const stage = e.target.stage.value;
        const part = e.target.part.value;
        const days = parseInt(e.target.days.value);
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + days);

        const ghostEmail = `${generatedUsername}@gym.local`;

        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: ghostEmail,
            password: password,
        });

        if (authData?.user) {
            const { error: dbError } = await supabase.from('members').insert([{
                user_id: authData.user.id,
                full_name: tempName,
                assigned_stage: stage,
                assigned_part: part,
                expiry_date: expiryDate.toISOString(),
            }]);

            if (dbError) {
                alert('Database Error: ' + dbError.message);
            } else {
                setSuccess({ username: generatedUsername, password });
                setTempName('');
                setGeneratedUsername('');
                setIsAvailable(null);
                e.target.reset();
            }
        } else {
            alert('Auth Error: ' + authError?.message);
        }
        setLoading(false);
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
                .page-sub { color: rgba(255,255,255,0.4); font-size: 0.875rem; margin-bottom: 2rem; }
                .form-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 20px;
                    padding: 1.75rem;
                    max-width: 480px;
                }
                .field { margin-bottom: 1.25rem; }
                label {
                    display: block;
                    font-size: 0.75rem;
                    font-weight: 500;
                    color: rgba(255,255,255,0.45);
                    margin-bottom: 0.4rem;
                    text-transform: uppercase;
                    letter-spacing: 0.06em;
                }
                input[type="text"], input[type="password"], input[type="number"], select {
                    width: 100%;
                    padding: 0.825rem 1rem;
                    background: rgba(255,255,255,0.06);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 12px;
                    color: #fff;
                    font-size: 0.9rem;
                    font-family: 'DM Sans', sans-serif;
                    outline: none;
                    transition: border-color 0.2s, background 0.2s;
                }
                input:focus, select:focus {
                    border-color: rgba(59,130,246,0.5);
                    background: rgba(59,130,246,0.06);
                }
                input::placeholder { color: rgba(255,255,255,0.2); }
                select option { background: #1a2035; }
                .username-preview {
                    padding: 1rem;
                    border-radius: 12px;
                    margin-bottom: 1.25rem;
                    border: 1px solid;
                }
                .preview-ok { background: rgba(34,197,94,0.08); border-color: rgba(34,197,94,0.2); }
                .preview-warn { background: rgba(239,68,68,0.08); border-color: rgba(239,68,68,0.2); }
                .preview-neutral { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.08); }
                .preview-label { font-size: 0.72rem; color: rgba(255,255,255,0.35); margin-bottom: 0.3rem; }
                .preview-value {
                    font-family: 'Syne', sans-serif;
                    font-size: 1.3rem;
                    font-weight: 700;
                    margin-bottom: 0.2rem;
                }
                .preview-note { font-size: 0.75rem; }
                .row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
                .btn-create {
                    width: 100%;
                    padding: 1rem;
                    background: linear-gradient(135deg, #3b82f6, #6366f1);
                    border: none;
                    border-radius: 12px;
                    color: #fff;
                    font-size: 0.95rem;
                    font-weight: 600;
                    font-family: 'Syne', sans-serif;
                    cursor: pointer;
                    transition: opacity 0.2s, transform 0.1s;
                    margin-top: 0.5rem;
                }
                .btn-create:hover { opacity: 0.9; transform: translateY(-1px); }
                .btn-create:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
                .success-card {
                    background: rgba(34,197,94,0.08);
                    border: 1px solid rgba(34,197,94,0.25);
                    border-radius: 16px;
                    padding: 1.5rem;
                    margin-bottom: 1.5rem;
                    max-width: 480px;
                }
                .success-title {
                    font-family: 'Syne', sans-serif;
                    font-weight: 700;
                    color: #4ade80;
                    font-size: 1rem;
                    margin-bottom: 1rem;
                    display: flex; align-items: center; gap: 0.5rem;
                }
                .cred-row {
                    display: flex; justify-content: space-between; align-items: center;
                    padding: 0.75rem 1rem;
                    background: rgba(255,255,255,0.05);
                    border-radius: 10px;
                    margin-bottom: 0.5rem;
                }
                .cred-label { font-size: 0.75rem; color: rgba(255,255,255,0.4); }
                .cred-value { font-family: 'Syne', sans-serif; font-weight: 700; color: #fff; font-size: 1rem; letter-spacing: 0.02em; }
            `}</style>

            <div className="page-title">Create Member</div>
            <div className="page-sub">Generate login credentials for a new gym member</div>

            {success && (
                <div className="success-card">
                    <div className="success-title">✅ Member Created Successfully</div>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.75rem' }}>
                        Share these credentials with the member:
                    </div>
                    <div className="cred-row">
                        <span className="cred-label">USERNAME</span>
                        <span className="cred-value">{success.username}</span>
                    </div>
                    <div className="cred-row">
                        <span className="cred-label">PASSWORD</span>
                        <span className="cred-value">{success.password}</span>
                    </div>
                </div>
            )}

            <div className="form-card">
                <form onSubmit={handleCreate}>
                    <div className="field">
                        <label>Member's Full Name</label>
                        <input
                            type="text"
                            value={tempName}
                            onChange={handleNameChange}
                            placeholder="e.g. Ravi Kumar"
                            required
                        />
                    </div>

                    {/* Username preview */}
                    <div className={`username-preview ${isAvailable === true ? 'preview-ok' : isAvailable === false ? 'preview-warn' : 'preview-neutral'}`}>
                        <div className="preview-label">Login Username (auto-generated)</div>
                        <div className="preview-value" style={{ color: isAvailable === true ? '#4ade80' : isAvailable === false ? '#f87171' : 'rgba(255,255,255,0.3)' }}>
                            {generatedUsername || 'Waiting for name...'}
                        </div>
                        {isAvailable === false && <div className="preview-note" style={{ color: '#f87171' }}>⚠️ Name taken — using suggested variation</div>}
                        {isAvailable === true && <div className="preview-note" style={{ color: '#4ade80' }}>✓ Username available</div>}
                    </div>

                    <div className="field">
                        <label>Create Password</label>
                        <input name="password" type="text" placeholder="Min 6 characters" required />
                    </div>

                    <div className="row" style={{ marginBottom: '1.25rem' }}>
                        <div>
                            <label>Stage</label>
                            <select name="stage">
                                <option value="1">Stage 1</option>
                                <option value="2">Stage 2</option>
                            </select>
                        </div>
                        <div>
                            <label>Part</label>
                            <select name="part">
                                <option value="1">Part 1</option>
                                <option value="2">Part 2</option>
                                <option value="3">Part 3</option>
                                <option value="4">Part 4</option>
                                <option value="5">Part 5</option>
                                <option value="6">Part 6</option>
                            </select>
                        </div>
                    </div>

                    <div className="field">
                        <label>Access Duration (Days)</label>
                        <input name="days" type="number" defaultValue="90" required />
                    </div>

                    <button type="submit" className="btn-create" disabled={loading || !generatedUsername}>
                        {loading ? 'Creating...' : '✓ Create Member Account'}
                    </button>
                </form>
            </div>
        </>
    );
}