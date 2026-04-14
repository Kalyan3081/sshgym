export default function OwnerQuote() {
    return (
        <section className="py-20 px-[5vw] bg-white dark:bg-gym-bg">
            <div className="max-w-[700px] mx-auto text-center">
                <div className="font-bebas text-[100px] leading-[0.6] text-accent opacity-30 mb-5">&ldquo;</div>
                <p className="font-light italic text-gray-900 dark:text-gym-text leading-relaxed mb-8"
                    style={{ fontSize: "clamp(18px,3vw,24px)" }}>
                    Our commitment to improvement is unceasing. We continuously enhance our offerings
                    to better serve our community and help every member achieve their fitness goals.
                </p>
                <div className="font-bebas text-[28px] tracking-[0.15em] text-accent">Your Name Here</div>
                <div className="font-barlow text-sm font-semibold tracking-widest uppercase text-gray-400 dark:text-gym-muted mt-1">
                    Owner &amp; Head Trainer
                </div>
            </div>
        </section>
    );
}