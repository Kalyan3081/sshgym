"use client";
import { useEffect, useState } from "react";
import QRCard from "./QRCard";
import TimerRing from "./TimerRing";

export default function KioskScreen() {
    const [url, setUrl] = useState("");
    const [time, setTime] = useState(60);

    useEffect(() => {
        const gen = () => {
            const token = Math.random().toString(36).slice(2);
            const host = window.location.host;
            setUrl(`http://${host}/api/scan/${token}`);
            setTime(60);
        };

        gen();

        const t = setInterval(() => {
            setTime((p) => {
                if (p <= 1) {
                    gen();
                    return 60;
                }
                return p - 1;
            });
        }, 1000);

        return () => clearInterval(t);
    }, []);

    if (!url) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#080e1f] text-gray-400">
                Loading Kiosk...
            </div>
        );
    }

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center gap-6 bg-[#080e1f] px-4 overflow-hidden font-dm">

            {/* 🔵 Background Glow */}
            <div className="absolute w-[700px] h-[700px] bg-blue-500/20 rounded-full blur-[120px]" />

            {/* Title */}
            <h1 className="font-syne text-white text-3xl md:text-5xl font-extrabold tracking-tight text-center">
                Scan to Unlock Workout
            </h1>

            <p className="text-gray-400 text-center text-sm">
                Use your phone camera to scan the QR code
            </p>

            {/* QR */}
            <QRCard url={url} />

            {/* Timer */}
            <TimerRing time={time} />

            <p className="text-gray-500 text-xs text-center">
                🔒 QR code is single-use and expires automatically
            </p>
        </div>
    );
}