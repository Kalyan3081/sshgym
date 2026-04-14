import Link from "next/link";
import { STATS } from "../data/content";

export default function Hero() {
    return (
        <>
            <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-gym-bg">

                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-[0.35]"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(0deg,#1f2d3d 0,#1f2d3d 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,#1f2d3d 0,#1f2d3d 1px,transparent 1px,transparent 60px)"
                    }} />

                {/* Glow orb */}
                <div className="absolute top-[10%] -right-[5%] w-[600px] h-[600px] rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(232,128,10,0.15) 0%, transparent 70%)" }} />

                <div className="relative z-10 w-full max-w-[1100px] mx-auto px-[5vw] pt-32 pb-20">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 border border-accent bg-orange-500/10
            px-3 py-1.5 rounded mb-7 font-barlow text-xs font-bold tracking-[0.2em] uppercase text-accent
            animate-fade-up [animation-delay:0.1s]">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
                        Est. 2015 · Your City
                    </div>

                    <h1 className="font-bebas leading-[0.88] tracking-wide text-gray-900 dark:text-gym-text mb-1
            animate-fade-up [animation-delay:0.2s]"
                        style={{ fontSize: "clamp(68px,15vw,160px)" }}>
                        <span className="text-accent">Forge</span><br />Your<br />Strength
                    </h1>

                    <p className="font-barlow tracking-[0.5em] uppercase text-gray-500 dark:text-gym-muted mb-10
            animate-fade-up [animation-delay:0.3s]"
                        style={{ fontSize: "clamp(18px,4vw,32px)" }}>
                        Your Gym Name Here
                    </p>

                    <p className="max-w-[500px] text-base leading-7 text-gray-500 dark:text-gym-muted font-light mb-12
            animate-fade-up [animation-delay:0.4s]">
                        Where discipline meets dedication. Train under expert guidance
                        and transform your body, mind, and life — one rep at a time.
                    </p>

                    <div className="flex gap-4 flex-wrap animate-fade-up [animation-delay:0.5s]">
                        <button className="bg-accent hover:bg-accent-light text-white font-barlow font-bold
              text-sm tracking-widest uppercase px-9 py-4 rounded-md transition-all hover:-translate-y-0.5">
                            Start Training
                        </button>
                        <Link href="#programs"
                            className="border border-gray-300 dark:border-gym-border text-gray-900 dark:text-gym-text
                hover:border-accent hover:text-accent font-barlow font-bold text-sm tracking-widest uppercase
                px-9 py-4 rounded-md transition-all hover:-translate-y-0.5 no-underline">
                            Explore Programs →
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats strip */}
            <div className="bg-accent grid grid-cols-2 sm:grid-cols-4">
                {STATS.map((s, i) => (
                    <div key={s.label}
                        className={`text-center py-5 ${i < STATS.length - 1 ? "border-r border-white/20" : ""}`}>
                        <div className="font-bebas text-4xl text-white tracking-wide">{s.val}</div>
                        <div className="font-barlow text-[11px] font-bold tracking-[0.2em] uppercase text-white/60 mt-1">{s.label}</div>
                    </div>
                ))}
            </div>
        </>
    );
}