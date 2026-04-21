import Badge from "../ui/Badge";

export default function MemberRow({ member }) {
    const now = new Date();
    const exp = new Date(member.expiry_date);
    const days = Math.ceil((exp - now) / (1000 * 60 * 60 * 24));

    let type = "ok";
    if (days < 0) type = "bad";
    else if (days <= 7) type = "warn";

    return (
        <div className="flex justify-between items-center bg-white/5 border border-white/10 rounded-xl p-3">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    {member.full_name[0]}
                </div>
                <div>
                    <div className="text-white text-sm">{member.full_name}</div>
                    <div className="text-gray-400 text-xs">
                        S{member.assigned_stage} · P{member.assigned_part}
                    </div>
                </div>
            </div>

            <Badge type={type}>
                {days < 0 ? "Expired" : `${days}d`}
            </Badge>
        </div>
    );
}