export const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Programs", href: "#programs" },
    { name: "Membership", href: "#membership" },
    { name: "Contact", href: "#contact" },
];

export const STATS = [
    { val: "2015", label: "Est." },
    { val: "800+", label: "Members" },
    { val: "8+", label: "Programs" },
    { val: "5", label: "Expert Trainers" },
];

export const PROGRAMS = [
    { icon: "💪", title: "Strength Training", desc: "Build raw power with progressive overload programs tailored to your body." },
    { icon: "🔥", title: "Fat Burn", desc: "High-intensity circuits designed to torch calories and reveal your physique." },
    { icon: "🧘", title: "Flexibility & Core", desc: "Mobility drills and core-focused sessions for injury-free performance." },
    { icon: "🥊", title: "Combat Fitness", desc: "Boxing-inspired conditioning that builds cardio and mental toughness." },
];

export const PLANS = [
    {
        name: "Starter", price: "₹799", period: "/mo", highlight: false,
        features: ["Gym Access", "Locker Room", "Basic Guidance", "2 Group Classes"],
    },
    {
        name: "Pro", price: "₹1,299", period: "/mo", highlight: true,
        features: ["Everything in Starter", "Personal Training (4x)", "Diet Consultation", "All Group Classes", "Progress Tracking"],
    },
    {
        name: "Elite", price: "₹1,999", period: "/mo", highlight: false,
        features: ["Everything in Pro", "Daily PT Sessions", "Nutrition Plan", "Body Composition", "Priority Access"],
    },
];

export const CONTACT_INFO = [
    { icon: "📞", title: "Phone", value: "+91  00000 00000" },
    { icon: "✉️", title: "Email", value: "hello@yourgym.com", href: "mailto:hello@yourgym.com" },
    { icon: "🕐", title: "Hours", value: "Mon–Sat: 5:30 AM – 9:00 PM\nSunday: 6:00 AM – 12:00 PM" },
    { icon: "📍", title: "Address", value: "Your Gym Address,\nCity – 000000, State" },
];