'use client'
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('add');
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(false);

    // Form State
    const [tempName, setTempName] = useState('');
    const [generatedUsername, setGeneratedUsername] = useState('');
    const [isAvailable, setIsAvailable] = useState(null); // null, true, or false

    useEffect(() => {
        if (activeTab !== 'add') fetchMembers();
    }, [activeTab]);

    const fetchMembers = async () => {
        const { data } = await supabase.from('members').select('*').order('expiry_date', { ascending: true });
        if (data) setMembers(data);
    };

    // NEW: Improved Auto-Generate & Check Logic
    const handleNameChange = async (e) => {
        const name = e.target.value;
        setTempName(name);

        if (name.length > 2) {
            // 1. Check if the Full Name already exists in the DB
            const { data } = await supabase
                .from('members')
                .select('full_name')
                .ilike('full_name', name.trim())
                .maybeSingle();

            if (data) {
                // Name taken! Generate a unique variation
                const base = name.toLowerCase().replace(/[^a-z0-9]/g, '');
                const randomSuffix = Math.floor(100 + Math.random() * 900);
                setGeneratedUsername(`${base}${randomSuffix}`);
                setIsAvailable(false);
            } else {
                // Name is unique! Use the clean version as username
                const base = name.toLowerCase().replace(/[^a-z0-9]/g, '');
                setGeneratedUsername(base);
                setIsAvailable(true);
            }
        } else {
            setGeneratedUsername('');
            setIsAvailable(null);
        }
    };

    const handleCreateMember = async (e) => {
        e.preventDefault();
        setLoading(true);

        const password = e.target.password.value;
        const stage = e.target.stage.value;
        const part = e.target.part.value;
        const days = parseInt(e.target.days.value);
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + days);

        // SECRET: This is the ONLY place the email exists
        const ghostEmail = `${generatedUsername}@gym.local`;

        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: ghostEmail,
            password: password,
        });

        if (authData?.user) {
            const { error: dbError } = await supabase.from('members').insert([{
                user_id: authData.user.id,
                full_name: tempName, // Stores the original "Ravi" or "Ravi123"
                assigned_stage: stage,
                assigned_part: part,
                expiry_date: expiryDate.toISOString(),
            }]);

            if (dbError) {
                alert("Database Error: " + dbError.message);
            } else {
                alert(`SUCCESS!\nGive these to the member:\n\nUsername: ${generatedUsername}\nPassword: ${password}`);
                setTempName('');
                setGeneratedUsername('');
                setIsAvailable(null);
                e.target.reset();
            }
        } else {
            alert("Error: " + authError?.message);
        }
        setLoading(false);
    };

    // ... (Your existing expiringMembers logic remains the same)

    return (
        <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <h1>Admin Dashboard</h1>

            {/* TABS */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '2px solid #eee', paddingBottom: '1rem' }}>
                <button onClick={() => setActiveTab('add')} style={{ fontWeight: activeTab === 'add' ? 'bold' : 'normal', border: 'none', background: 'none', cursor: 'pointer' }}>➕ Add Member</button>
                <button onClick={() => setActiveTab('all')} style={{ fontWeight: activeTab === 'all' ? 'bold' : 'normal', border: 'none', background: 'none', cursor: 'pointer' }}>📋 All Members</button>
                <button onClick={() => setActiveTab('expiring')} style={{ fontWeight: activeTab === 'expiring' ? 'bold' : 'normal', color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>⚠️ Expiring Soon</button>
            </div>

            {activeTab === 'add' && (
                <form onSubmit={handleCreateMember} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
                    <label>Member's Full Name:</label>
                    <input
                        value={tempName}
                        onChange={handleNameChange}
                        type="text"
                        placeholder="e.g. Ravi"
                        required
                        style={{ padding: '0.7rem', borderRadius: '5px', border: '1px solid #ccc' }}
                    />

                    {/* STATUS BADGE */}
                    <div style={{ padding: '1rem', backgroundColor: isAvailable === false ? '#fff1f2' : '#f0fdf4', borderRadius: '5px', border: `1px solid ${isAvailable === false ? '#fecdd3' : '#bbf7d0'}` }}>
                        <small style={{ color: '#666' }}>Member will login with this Username:</small>
                        <h3 style={{ margin: '5px 0', color: isAvailable === false ? '#e11d48' : '#16a34a' }}>
                            {generatedUsername || 'Waiting for name...'}
                        </h3>
                        {isAvailable === false && <small style={{ color: '#e11d48' }}>⚠️ Original name taken. Use this suggested one.</small>}
                        {isAvailable === true && <small style={{ color: '#16a34a' }}>✅ Username available!</small>}
                    </div>

                    <label>Create Password:</label>
                    <input name="password" type="text" placeholder="Min 6 characters" required style={{ padding: '0.7rem', borderRadius: '5px', border: '1px solid #ccc' }} />

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ flex: 1 }}>
                            <label><small>Stage</small></label>
                            <select name="stage" style={{ padding: '0.5rem', width: '100%' }}><option value="1">Stage 1</option><option value="2">Stage 2</option></select>
                        </div>
                        <div style={{ flex: 1 }}>
                            <label><small>Part</small></label>
                            <select name="part" style={{ padding: '0.5rem', width: '100%' }}><option value="1">Part 1</option><option value="6">Part 6</option></select>
                        </div>
                    </div>

                    <label>Access Duration (Days):</label>
                    <input name="days" type="number" defaultValue="90" required style={{ padding: '0.7rem', borderRadius: '5px', border: '1px solid #ccc' }} />

                    <button type="submit" disabled={loading || !generatedUsername} style={{ padding: '1rem', background: '#000', color: '#fff', cursor: 'pointer', borderRadius: '5px', fontWeight: 'bold' }}>
                        {loading ? 'Creating Account...' : 'Confirm & Save Member'}
                    </button>
                </form>
            )}

            {/* ... (Keep your table code for 'all' and 'expiring' tabs) */}
        </div>
    );
}