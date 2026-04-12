export default function TimerRing({ time }) {
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const progress = (time / 60) * circumference;

    return (
        <div className="flex flex-col items-center gap-2">

            <p className="text-xs tracking-widest text-gray-400 uppercase">
                Refreshes in
            </p>

            <div className="relative">
                <svg width="120" height="120" className="-rotate-90">

                    {/* Track */}
                    <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        className="stroke-white/10 fill-none"
                        strokeWidth="6"
                    />

                    {/* Progress */}
                    <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        strokeWidth="6"
                        strokeLinecap="round"
                        className="stroke-blue-500 fill-none transition-all duration-1000"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference - progress}
                    />

                </svg>

                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-syne text-white text-2xl font-bold">
                        {time}
                    </span>
                    <span className="text-[10px] text-gray-400">
                        seconds
                    </span>
                </div>
            </div>
        </div>
    );
}