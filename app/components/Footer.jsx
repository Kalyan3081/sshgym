import Link from "next/link";
import { NAV_LINKS } from "../data/content";

export default function Footer() {
    return (
        <footer className="bg-[#060a0d] px-[5vw] pt-14 pb-7">
            <div className="max-w-[1100px] mx-auto">

                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 mb-12">
                    <div>
                        <div className="font-bebas text-[34px] tracking-widest text-accent mb-2">
                            Your Gym Name
                        </div>
                        <div className="font-barlow text-xs font-semibold tracking-widest uppercase text-[#3a4a5a] mb-5">
                            Strength · Discipline · Results
                        </div>
                        <p className="text-sm text-[#4a5e70] leading-relaxed font-light">
                            Est. 2015. Under expert guidance, we&apos;ve built a community of dedicated
                            athletes committed to real results.
                        </p>
                    </div>

                    <div>
                        <div className="font-barlow text-[11px] font-bold tracking-[0.2em] uppercase text-accent mb-4">
                            Navigation
                        </div>
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="block text-sm text-[#4a5e70] hover:text-accent leading-[1.9] no-underline transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div>
                        <div className="font-barlow text-[11px] font-bold tracking-[0.2em] uppercase text-accent mb-4">
                            Contact
                        </div>
                        <a href=""
                            className="block text-sm text-[#4a5e70] hover:text-accent leading-[1.9] no-underline transition-colors">
                            +91 00000 00000
                        </a>
                        <a href="mailto:hello@yourgym.com"
                            className="block text-sm text-[#4a5e70] hover:text-accent leading-[1.9] no-underline transition-colors">
                            hello@yourgym.com
                        </a>
                        <p className="text-sm text-[#4a5e70] leading-relaxed mt-2">
                            Your Gym Address,<br />City – 000000, State
                        </p>
                    </div>
                </div>

                <hr className="border-[#111820] mb-5" />

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-[#2a3a4a]">
                    <span>© 2026 Your Gym. All rights reserved.</span>
                    <span>Designed &amp; Developed by Kalyan</span>
                </div>

            </div>
        </footer>
    );
}