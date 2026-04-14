"use client";
import { useState, useEffect } from "react";

export default function AboutPage() {
    const [dark, setDark] = useState(true);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
    }, [dark]);

    return (
        <div className="min-h-screen bg-white dark:bg-gym-bg transition-colors duration-300">

            {/* Toggle */}
            {/* <div className="fixed top-4 right-5 z-50">
                <button
                    onClick={() => setDark(p => !p)}
                    className="flex items-center gap-2 bg-gray-100 dark:bg-gym-surface2
                        border border-gray-200 dark:border-gym-border rounded-full
                        px-4 py-1.5 text-sm font-medium text-gray-800 dark:text-gym-text
                        hover:border-accent transition-all">
                    <span>{dark ? "☀️" : "🌙"}</span>

                </button>
            </div> */}

            {/* About Section */}
            <section className="max-w-[900px] mx-auto px-6 pt-20 pb-16">

                {/* Badge */}
                <div className="inline-block bg-accent text-white font-barlow text-[11px]
                    font-bold tracking-[0.25em] uppercase px-4 py-1.5 rounded mb-6">
                    Est. 2015
                </div>

                {/* Title */}
                <h1 className="font-bebas text-accent leading-[0.95] tracking-wide mb-2"
                    style={{ fontSize: "clamp(44px, 10vw, 88px)" }}>
                    Your Gym<br />Name Here
                </h1>

                {/* Subtitle */}
                <p className="font-barlow font-semibold tracking-[0.3em] uppercase
                    text-gray-400 dark:text-gym-muted mb-12"
                    style={{ fontSize: "clamp(14px, 2.5vw, 18px)" }}>
                    How We Got Our Start
                </p>

                {/* Divider */}
                <div className="w-14 h-[3px] bg-accent rounded mb-10" />

                {/* About Card */}
                <div className="relative bg-white dark:bg-gym-surface border border-gray-200
                    dark:border-gym-border rounded-xl px-10 py-9 mb-7 overflow-hidden
                    shadow-lg dark:shadow-black/40">
                    {/* Left accent bar */}
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent to-orange-400 rounded-l-xl" />

                    <blockquote className="font-light italic leading-[1.85] text-gray-700
                        dark:text-gym-muted text-[clamp(15px,2.2vw,17px)]">
                        Founded in 2015,{" "}
                        <strong className="text-accent font-semibold not-italic">YOUR GYM NAME</strong>{" "}
                        has since excelled in the realm of fitness training. Our unwavering dedication
                        to quality, exceptional services, and unparalleled customer care has fostered
                        a loyal community of patrons.
                        <br /><br />
                        Our commitment to improvement is unceasing, and we continuously enhance our
                        offerings to better serve our community. Contact us today to discover how{" "}
                        <strong className="text-accent font-semibold not-italic">YOUR GYM NAME</strong>,
                        under the guidance of our Owner &amp; Trainer{" "}
                        <strong className="text-accent font-semibold not-italic">YOUR NAME</strong>,
                        can assist you in achieving your fitness goals.
                    </blockquote>
                </div>

                {/* Owner Card */}
                <div className="flex items-center gap-5 bg-white dark:bg-gym-surface
                    border border-gray-200 dark:border-gym-border rounded-xl
                    px-9 py-7 shadow-lg dark:shadow-black/40 mb-16">

                    {/* Avatar */}
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-orange-400
                        flex items-center justify-center font-bebas text-2xl text-white shrink-0">
                        YN
                    </div>

                    <div>
                        <p className="font-barlow text-[11px] font-bold tracking-[0.25em] uppercase
                            text-gray-400 dark:text-gym-muted mb-1">
                            Owner & Head Trainer
                        </p>
                        <p className="font-barlow text-xl font-bold tracking-wide text-gray-900 dark:text-gym-text">
                            Your Name Here
                        </p>
                        <p className="text-sm text-accent font-medium tracking-wide mt-0.5">
                            Founder · Your Gym Name
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#060a0d] px-6 pt-14 pb-7">
                <div className="max-w-[900px] mx-auto">

                    <div className="font-bebas text-[32px] tracking-widest text-accent mb-1">
                        Your Gym Name
                    </div>
                    <div className="font-barlow text-xs font-semibold tracking-[0.2em] uppercase
                        text-[#3a4a5a] mb-10">
                        Strength · Discipline · Results
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-9 mb-10">
                        <div>
                            <div className="font-barlow text-[11px] font-bold tracking-[0.25em]
                                uppercase text-accent mb-3">
                                Contact
                            </div>
                            <a href="tel:+919876543210"
                                className="block text-sm text-[#8a9aaa] hover:text-accent
                                leading-[1.9] no-underline transition-colors">
                                +91 98765 43210
                            </a>
                            <a href="mailto:hello@yourgym.com"
                                className="block text-sm text-[#8a9aaa] hover:text-accent
                                leading-[1.9] no-underline transition-colors">
                                hello@yourgym.com
                            </a>
                        </div>
                        <div>
                            <div className="font-barlow text-[11px] font-bold tracking-[0.25em]
                                uppercase text-accent mb-3">
                                Address
                            </div>
                            <p className="text-sm text-[#8a9aaa] leading-[1.9]">Your Gym Address,</p>
                            <p className="text-sm text-[#8a9aaa] leading-[1.9]">Landmark, Opposite Landmark,</p>
                            <p className="text-sm text-[#8a9aaa] leading-[1.9]">City – 000000, State.</p>
                        </div>
                    </div>

                    <hr className="border-[#111820] mb-5" />

                    <div className="flex flex-col sm:flex-row justify-between items-start
                        sm:items-center gap-2 text-xs text-[#2a3a4a]">
                        <span>© 2026 Your Gym. All rights reserved.</span>
                        <span>Designed &amp; Developed by Kalyan</span>
                    </div>

                </div>
            </footer>

        </div>
    );
}