import { useEffect, useState } from "react";
import { X } from "lucide-react";

export const Alerts = ({ messages = [], duration = 5000 }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), duration);
        return () => clearTimeout(timer);
    }, [duration]);

    if (!visible || messages.length === 0) return null;

    return (
        <div className="fixed bottom-4 left-4 z-50 space-y-2">
            {messages.map((msg, idx) => (
                <div
                    key={idx}
                    className="bg-red-100 text-red-800 border border-red-300 px-4 py-3 rounded-md shadow-md relative max-w-sm"
                >
                    <p className="text-sm">{msg}</p>
                    <button
                        className="absolute top-1 right-1 text-red-500 hover:text-red-700"
                        onClick={() => setVisible(false)}
                    >
                        <X size={16} />
                    </button>
                </div>
            ))}
        </div>
    );
};
