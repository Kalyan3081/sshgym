import Link from "next/link";
import { NAV_LINKS } from "../data/content";

export default function Footer() {
    return (
        <footer className="bg-[#060a0d] px-[5vw] pt-14 pb-7">
            <div className="max-w-[1100px] mx-auto">

                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 mb-12">
                    <div>
                        <div className="font-bebas text-[34px] tracking-widest text-accent mb-2">
                            Sri Shakthi Hanuman Gym
                        </div>
                        <div className="font-barlow text-xs font-semibold tracking-widest uppercase text-[#3a4a5a] mb-5">
                            Strength · Discipline · Results
                        </div>
                        <p className="text-sm text-[#4a5e70] leading-relaxed font-light">
                            Est. 2018 in Ballari, Karnataka. Under the expert guidance of Santosh Krishna,
                            we&apos;ve built a community of dedicated athletes committed to real results.
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
                        <a href="tel:+918618315270"
                            className="block text-sm text-[#4a5e70] hover:text-accent leading-[1.9] no-underline transition-colors">
                            +91 86183 15270
                        </a>
                        <a href="mailto:santoshkrishna34@gmail.com"
                            className="block text-sm text-[#4a5e70] hover:text-accent leading-[1.9] no-underline transition-colors">
                            santoshkrishna34@gmail.com
                        </a>
                        <p className="text-sm text-[#4a5e70] leading-relaxed mt-2">
                            Gandhi Nagar, Ballari,<br />Karnataka – 583101
                        </p>
                    </div>
                </div>

                <hr className="border-[#111820] mb-5" />

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-[#2a3a4a]">
                    <span>© 2026 sshgym. All rights reserved.</span>
                    <span>
                        Designed &amp; Developed by{" "}
                        Kalyan
                    </span>
                </div>

            </div>
        </footer>
    );
}