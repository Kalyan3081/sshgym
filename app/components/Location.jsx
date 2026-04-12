import { CONTACT_INFO } from "../data/content";

export default function Location() {
    return (
        <section id="contact" className="py-20 px-[5vw] bg-gray-50 dark:bg-gym-bg2">
            <div className="max-w-[1100px] mx-auto">
                <p className="font-barlow text-[11px] font-bold tracking-[0.3em] uppercase text-accent mb-3">
                    Find Us
                </p>
                <h2 className="font-bebas text-gray-900 dark:text-gym-text leading-[0.92] mb-12"
                    style={{ fontSize: "clamp(40px,8vw,72px)" }}>
                    We&apos;re in<br />Ballari.
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
                    {/* Map placeholder */}
                    <div className="bg-white dark:bg-gym-surface border border-gray-200 dark:border-gym-border rounded-2xl aspect-4/3 flex flex-col items-center justify-center gap-4 p-6">
                        <span className="text-5xl">📍</span>
                        <p className="text-sm text-gray-400 dark:text-gym-muted text-center leading-relaxed">
                            Gandhi Nagar, Beside Renuka&apos;s Kitchen,<br />
                            Opp. Government Hospital, Ballari – 583101
                        </p>
                        <a href="https://maps.google.com/?q=Gandhi+Nagar+Ballari+Karnataka+583101"
                            target="_blank" rel="noreferrer"
                            className="font-barlow font-bold text-sm tracking-widest uppercase text-accent
                border border-accent rounded-md px-5 py-2 no-underline
                hover:bg-accent hover:text-white transition-all">
                            Open in Maps →
                        </a>
                    </div>

                    {/* Info rows */}
                    <div className="flex flex-col gap-4">
                        {CONTACT_INFO.map(item => (
                            <div key={item.title}
                                className="flex gap-4 p-5 bg-white dark:bg-gym-surface
                  border border-gray-200 dark:border-gym-border rounded-xl">
                                <div className="w-11 h-11 rounded-lg bg-orange-500/10 border border-accent
                  flex items-center justify-center text-xl shrink-0">
                                    {item.icon}
                                </div>
                                <div>
                                    <div className="font-barlow text-[11px] font-bold tracking-[0.2em] uppercase
                    text-gray-400 dark:text-gym-muted mb-1">
                                        {item.title}
                                    </div>
                                    <div className="text-sm text-gray-700 dark:text-gym-text leading-relaxed">
                                        {item.href
                                            ? <a href={item.href} className="text-accent hover:underline no-underline">{item.value}</a>
                                            : item.value.split("\n").map((l, i) => <span key={i} className="block">{l}</span>)
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}