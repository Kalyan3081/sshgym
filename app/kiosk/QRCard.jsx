import { QRCodeCanvas } from "qrcode.react";

export default function QRCard({ url }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-[0_0_60px_rgba(59,130,246,0.25)]">
            <QRCodeCanvas value={url} size={240} />
        </div>
    );
}