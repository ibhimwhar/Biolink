import { useUser } from "@clerk/clerk-react";
import { TbMessageCircle, TbSend } from "react-icons/tb";

const MessagesPage = () => {
    const { user } = useUser();

    return (
        <div className="min-h-screen bg-white px-6 py-10">
            {/* 📬 Page Title */}
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <TbMessageCircle size={24} />
                Messages 💬
            </h2>

            <div className="border border-slate-200 rounded-lg p-4 bg-neutral-50 shadow-sm">
                {/* 👤 Header */}
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <p className="text-sm text-slate-600">Signed in as 👤</p>
                        <p className="font-semibold text-slate-800">
                            {user?.emailAddress?.[0]?.emailAddress}
                        </p>
                    </div>
                    <button className="px-3 py-1 text-sm font-semibold border border-slate-300 rounded hover:bg-white transition">
                        🆕 New Message
                    </button>
                </div>

                {/* 📥 Message List */}
                <div className="space-y-4">
                    {/* Example message */}
                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                        <p className="text-slate-700 font-medium">Jane Doe 🧑‍💼</p>
                        <p className="text-sm text-slate-500">
                            Hey! Just checking in. Let me know when you're free 😊
                        </p>
                        <p className="text-xs text-slate-400 mt-1">⏰ 2 hours ago</p>
                    </div>

                    {/* Add more messages here */}
                </div>

                {/* ✍️ Message Input */}
                <div className="mt-6 flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="✍️ Type your message..."
                        className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                    <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                        <TbSend size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MessagesPage;