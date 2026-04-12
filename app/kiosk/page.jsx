'use client'
import { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

export default function FrontDeskKiosk() {
    const [scanUrl, setScanUrl] = useState('');
    const [timeLeft, setTimeLeft] = useState(60);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const generateNewCode = () => {
            const randomToken = Math.random().toString(36).substring(2, 15);
            const host = window.location.host;
            setScanUrl(`http://${host}/api/scan/${randomToken}`);
            setTimeLeft(60);
        };

        generateNewCode();

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) { generateNewCode(); return 60; }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const progress = (timeLeft / 60) * circumference;

    if (!mounted || !scanUrl) return (
        <>
            <style>{`body { background: #080e1f; }`}</style>
            <div style={{ minHeight: '100vh', background: '#080e1f', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)', fontFamily: 'sans-serif' }}>
                Loading Kiosk...
            </div>
        </>
    );

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
                * { box-sizing: border-box; margin: 0; padding: 0; }
                body { background: #080e1f; }
                .kiosk-wrap {
                    min-height: 100vh;
                    background: #080e1f;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                    font-family: 'DM Sans', sans-serif;
                    position: relative;
                    overflow: hidden;
                    gap: 2rem;
                }
                .bg-glow {
                    position: absolute;
                    width: 700px; height: 700px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%);
                    top: 50%; left: 50%;
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                }
                .kiosk-title {
                    font-family: 'Syne', sans-serif;
                    font-size: clamp(1.75rem, 5vw, 2.5rem);
                    font-weight: 800;
                    color: #fff;
                    letter-spacing: -0.03em;
                    text-align: center;
                }
                .kiosk-sub {
                    color: rgba(255,255,255,0.35);
                    font-size: 1rem;
                    text-align: center;
                    margin-top: -1.5rem;
                }
                .qr-card {
                    background: #fff;
                    padding: 1.5rem;
                    border-radius: 24px;
                    box-shadow: 0 0 60px rgba(59,130,246,0.2);
                    position: relative;
                }
                .timer-wrap {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.5rem;
                }
                .timer-label {
                    font-size: 0.8rem;
                    color: rgba(255,255,255,0.3);
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                }
                .timer-ring { transform: rotate(-90deg); }
                .timer-track { fill: none; stroke: rgba(255,255,255,0.08); stroke-width: 6; }
                .timer-progress {
                    fill: none;
                    stroke: #3b82f6;
                    stroke-width: 6;
                    stroke-linecap: round;
                    transition: stroke-dashoffset 1s linear;
                }
                .timer-number {
                    font-family: 'Syne', sans-serif;
                    font-size: 1.5rem;
                    font-weight: 800;
                    fill: #fff;
                }
                .timer-s { font-size: 0.75rem; fill: rgba(255,255,255,0.4); font-family: 'DM Sans', sans-serif; }
                .footer-note {
                    color: rgba(255,255,255,0.2);
                    font-size: 0.8rem;
                    text-align: center;
                    letter-spacing: 0.03em;
                }
            `}</style>
            <div className="kiosk-wrap">
                <div className="bg-glow" />
                <div className="kiosk-title">Scan to Unlock Workout</div>
                <div className="kiosk-sub">Use your phone camera to scan the QR code</div>

                <div className="qr-card">
                    <QRCodeCanvas value={scanUrl} size={260} />
                </div>

                <div className="timer-wrap">
                    <div className="timer-label">Refreshes in</div>
                    <svg width="120" height="120" className="timer-ring">
                        <circle className="timer-track" cx="60" cy="60" r={radius} />
                        <circle
                            className="timer-progress"
                            cx="60" cy="60" r={radius}
                            strokeDasharray={circumference}
                            strokeDashoffset={circumference - progress}
                        />
                        <text x="60" y="56" textAnchor="middle" className="timer-number" dominantBaseline="middle">{timeLeft}</text>
                        <text x="60" y="74" textAnchor="middle" className="timer-s">seconds</text>
                    </svg>
                </div>

                <div className="footer-note">🔒 QR code is single-use and expires automatically</div>
            </div>
        </>
    );
}