import { PROGRAMS } from "../data/content";

export default function Programs() {
    return (
        <section id="programs" className="py-20 px-[5vw] bg-gray-50 dark:bg-gym-bg2">
            <div className="max-w-[1100px] mx-auto">
                <p className="font-barlow text-[11px] font-bold tracking-[0.3em] uppercase text-accent mb-3">
                    What We Offer
                </p>
                <h2 className="font-bebas text-gray-900 dark:text-gym-text leading-[0.92] mb-4"
                    style={{ fontSize: "clamp(40px,8vw,72px)" }}>
                    Train Hard.<br />Train Smart.
                </h2>
                <p className="text-[15px] text-gray-500 dark:text-gym-muted font-light leading-relaxed max-w-md mb-14">
                    Every program is designed with purpose — to push your limits and produce real,
                    measurable results for the people of Ballari.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {PROGRAMS.map(p => (
                        <div key={p.title}
                            className="bg-white dark:bg-gym-surface border border-gray-200 dark:border-gym-border
                rounded-xl p-8 transition-all duration-300
                hover:border-accent hover:-translate-y-1 hover:shadow-2xl cursor-default">
                            <span className="text-3xl block mb-5">{p.icon}</span>
                            <h3 className="font-barlow text-xl font-bold tracking-wide text-gray-900 dark:text-gym-text mb-3">
                                {p.title}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gym-muted leading-relaxed font-light">{p.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}