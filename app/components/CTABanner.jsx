export default function CTABanner() {
    return (
        <div className="bg-accent px-[5vw] py-20 text-center">
            <p className="font-barlow text-xs font-bold tracking-[0.3em] uppercase text-white/60 mb-4">
                Ready to Start?
            </p>
            <h2 className="font-bebas text-white leading-[0.9] tracking-wide mb-6"
                style={{ fontSize: "clamp(40px,9vw,80px)" }}>
                No More<br />Excuses.
            </h2>
            <p className="text-base text-white/75 font-light max-w-[420px] mx-auto leading-7 mb-10">
                Walk in. Work hard. Walk out stronger. The gym is waiting — are you?
            </p>
            <a href="tel:+918618315270"
                className="inline-block bg-white text-accent font-barlow font-bold text-sm
          tracking-widest uppercase px-10 py-4 rounded-lg no-underline
          transition-all hover:-translate-y-0.5 hover:shadow-xl">
                Call Us Now
            </a>
        </div>
    );
}