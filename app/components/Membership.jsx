import { PLANS } from "../data/content";

export default function Membership() {
    return (
        <section id="membership" className="py-20 px-[5vw] bg-white dark:bg-gym-bg">
            <div className="max-w-[1100px] mx-auto">
                <p className="font-barlow text-[11px] font-bold tracking-[0.3em] uppercase text-accent mb-3">
                    Membership
                </p>
                <h2 className="font-bebas text-gray-900 dark:text-gym-text leading-[0.92] mb-4"
                    style={{ fontSize: "clamp(40px,8vw,72px)" }}>
                    Pick Your<br />Plan.
                </h2>
                <p className="text-[15px] text-gray-500 dark:text-gym-muted font-light leading-relaxed max-w-md mb-14">
                    Flexible plans for every stage of your fitness journey. No hidden fees, no excuses.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[960px]">
                    {PLANS.map(p => (
                        <div key={p.name}
                            className={`relative rounded-2xl p-9 border transition-all hover:-translate-y-1
                ${p.highlight
                                    ? "border-2 border-accent bg-gray-900 dark:bg-[#141e2a]"
                                    : "border-gray-200 dark:border-gym-border bg-white dark:bg-gym-bg2"}`}>

                            {p.highlight && (
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2
                  bg-accent text-white font-barlow font-bold text-[11px] tracking-widest uppercase
                  px-4 py-1 rounded-full">
                                    Most Popular
                                </div>
                            )}

                            <div className={`font-barlow text-sm font-bold tracking-[0.2em] uppercase mb-4
                ${p.highlight ? "text-accent" : "text-gray-400 dark:text-gym-muted"}`}>
                                {p.name}
                            </div>

                            <div className={`font-bebas text-6xl tracking-wide leading-none
                ${p.highlight ? "text-white" : "text-gray-900 dark:text-gym-text"}`}>
                                {p.price}
                            </div>
                            <div className="text-sm text-gray-400 dark:text-gym-muted font-light mb-7">{p.period}</div>

                            <hr className={`mb-6 ${p.highlight ? "border-white/10" : "border-gray-100 dark:border-gym-border"}`} />

                            <ul className="mb-8 space-y-3">
                                {p.features.map(f => (
                                    <li key={f} className="flex items-center gap-3 text-sm font-light
                    text-gray-500 dark:text-gym-muted">
                                        <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                                        <span className={p.highlight ? "text-gray-200" : ""}>{f}</span>
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-3 rounded-lg font-barlow font-bold text-sm
                tracking-widest uppercase transition-all
                ${p.highlight
                                    ? "bg-accent hover:bg-accent-light text-white hover:-translate-y-0.5"
                                    : "bg-transparent border border-gray-200 dark:border-gym-border text-gray-500 dark:text-gym-muted hover:border-accent hover:text-accent"}`}>
                                Get Started
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}