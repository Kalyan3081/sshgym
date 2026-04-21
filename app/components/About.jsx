"use client";

export default function About() {
    return (
        <section id="about" className="min-h-screen bg-white dark:bg-gym-bg transition-colors duration-300">
            <div className="max-w-[900px] mx-auto px-6 pt-20 pb-16">

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
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent to-orange-400 rounded-l-xl" />
                    <blockquote className="font-light italic leading-[1.85] text-gray-700
                        dark:text-gym-muted text-[clamp(15px,2.2vw,17px)]">
                        Founded in 2015,{" "}
                        <strong className="text-accent font-semibold not-italic">YOUR GYM NAME</strong>{" "}
                        has since excelled in the realm of fitness training...
                        {/* your full text here */}
                    </blockquote>
                </div>

                {/* Owner Card */}
                <div className="flex items-center gap-5 bg-white dark:bg-gym-surface
                    border border-gray-200 dark:border-gym-border rounded-xl
                    px-9 py-7 shadow-lg dark:shadow-black/40 mb-16">
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
            </div>
        </section>
    );
}