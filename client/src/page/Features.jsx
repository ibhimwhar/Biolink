import {
    TbRocket,
    TbShieldCheck,
    TbLayoutDashboard,
    TbChartInfographic,
} from "react-icons/tb";
import { PiUsersThreeLight } from "react-icons/pi";
import { IoSparklesOutline } from "react-icons/io5";

const features = [
    {
        title: "🚀 One Link, Infinite Reach",
        description:
            "Share all your content, profiles, and projects with a single, customizable link. No more juggling URLs.",
        icon: <TbRocket size={28} />,
    },
    {
        title: "🛡️ Privacy You Control",
        description:
            "Decide who sees what. With Clerk authentication, your data stays secure and your audience stays curated.",
        icon: <TbShieldCheck size={28} />,
    },
    {
        title: "🧩 Drag-and-Drop Builder",
        description:
            "Design your card your way. Rearrange sections, add media, and personalize your layout effortlessly.",
        icon: <TbLayoutDashboard size={28} />,
    },
    {
        title: "📊 Real-Time Analytics",
        description:
            "Track views, clicks, and engagement in real time. Know what's working and where to grow.",
        icon: <TbChartInfographic size={28} />,
    },
    {
        title: "🎨 Built for Creators",
        description:
            "Whether you're an artist, developer, or entrepreneur—BioLink adapts to your style and audience.",
        icon: <PiUsersThreeLight size={28} />,
    },
    {
        title: "✨ Always Evolving",
        description:
            "We're constantly adding new integrations, features, and design tools. You grow—we grow.",
        icon: <IoSparklesOutline size={28} />,
    },
];

const FeaturesPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 py-20 px-6 rounded-lg">
            <div className="max-w-6xl mx-auto text-center mb-16">
                <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-4">
                    🌟 Features That Empower You
                </h1>
                <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                    BioLink is more than just a link and it's your digital identity. Explore the tools that make it powerful, personal, and secure. 🧠
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {features.map((feature, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-2xl hover:shadow-sm transition-all p-6 border border-slate-200 hover:border-blue-300"
                    >
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-600 mb-4">
                            {feature.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">
                            {feature.title}
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-20 text-center text-slate-500 text-sm">
                🚀 Ready to launch your digital identity? <span className="font-semibold text-blue-600">Start building with BioLink today!</span>
            </div>
        </div>
    );
};

export default FeaturesPage;