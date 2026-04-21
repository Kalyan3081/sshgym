"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "./ThemeContext";
import { NAV_LINKS } from "../data/content";

export default function Navbar() {
    const { dark, toggle } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);

    return (
        <>
            <nav className={`fixed top-0 inset-x-0 z-50 h-16 px-[5vw] flex items-center justify-between
        backdrop-blur-md transition-all duration-300
        bg-white/90 dark:bg-gym-bg/90
        ${scrolled ? "border-b border-gray-200 dark:border-gym-border" : "border-b border-transparent"}`}>

                <span className="font-bebas text-[22px] tracking-widest text-accent">
                    Gym<span className="text-gray-900 dark:text-gym-text">Logo</span>
                </span>

                <ul className="hidden md:flex gap-8 list-none">
                    {NAV_LINKS.map((link) => (
                        <li key={link.name}>
                            <Link
                                href={link.href}
                                className="font-barlow text-sm font-bold tracking-[0.15em] uppercase
        text-gray-500 dark:text-gym-muted hover:text-accent dark:hover:text-accent transition-colors"
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-3">
                    <button onClick={toggle}
                        className="rounded-full px-4 py-1.5 text-sm font-medium border
              bg-gray-100 dark:bg-gym-surface2 border-gray-200 dark:border-gym-border
              text-gray-800 dark:text-gym-text hover:border-accent transition-all">
                        {dark ? "☀️" : "🌙"}
                    </button>
                    <button className="hidden md:block bg-accent hover:bg-accent-light text-white
            font-barlow font-bold text-sm tracking-widest uppercase
            px-4 py-2 rounded-md transition-colors">
                        Join Now
                    </button>
                    <button onClick={() => setOpen(p => !p)}
                        className="md:hidden flex flex-col gap-[5px] p-1 bg-transparent border-none cursor-pointer">
                        {[0, 1, 2].map(i => (
                            <span key={i} className="block w-[22px] h-[2px] rounded-sm bg-gray-900 dark:bg-gym-text" />
                        ))}
                    </button>
                </div>
            </nav>

            {open && (
                <div className="fixed top-16 inset-x-0 z-40 bg-gray-50 dark:bg-gym-bg2
          border-b border-gray-200 dark:border-gym-border px-[5vw] py-5 md:hidden">
                    {NAV_LINKS.map(l => (
                        <Link key={l.name} href={l.href} onClick={() => setOpen(false)}
                            className="block font-barlow font-bold text-lg tracking-widest uppercase
                text-gray-500 dark:text-gym-muted hover:text-accent py-3
                border-b border-gray-100 dark:border-gym-border transition-colors">
                            {l.name}
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
}