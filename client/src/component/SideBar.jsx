import { Link, useLocation } from "react-router-dom";
import {
    TbSettings,
    TbCreditCard,
    TbShieldLock,
    TbMessageCircle,
    TbLogout,
} from "react-icons/tb";
import { useUser, SignOutButton } from "@clerk/clerk-react";
import { IoIosArrowUp } from "react-icons/io";
import { useState } from "react";
import { SiStylelint } from "react-icons/si";
import { RiAccountCircleLine } from "react-icons/ri";

const SideBar = () => {
    const location = useLocation();
    const { user, isSignedIn } = useUser();
    const [opensidebar, setOpenSideBar] = useState(true);

    const navItems = [
        {
            section: "Account",
            items: [
                { name: "Overview", icon: <RiAccountCircleLine size={18} />, path: "/account" },
                { name: "Design", icon: <SiStylelint size={18} />, path: "/account/design" },
            ],
        },
        {
            section: "Tools",
            items: [
                { name: "Settings", icon: <TbSettings size={18} />, path: "/account/settings" },
                { name: "Billing", icon: <TbCreditCard size={18} />, path: "/account/billing" },
                { name: "Security", icon: <TbShieldLock size={18} />, path: "/account/security" },
            ],
        },
        {
            section: "Communication",
            items: [
                { name: "Messages", icon: <TbMessageCircle size={18} />, path: "/account/messages" },
            ],
        },
    ];

    if (!isSignedIn) return null;

    return (
        <aside
            className={`${opensidebar ? "translate-x-0" : "-translate-x-full"
                } top-0 transition-transform duration-700 absolute left-0 z-10 border-r border-slate-200 bg-white min-h-full pt-24 px-6 w-full sm:w-64`}
        >
            {/* Toggle Button */}
            <button
                onClick={() => setOpenSideBar((prev) => !prev)}
                className={`absolute ${opensidebar ? "right-5" : "-right-5"} p-2 border border-slate-200 rounded-full font-semibold text-slate-700 flex items-center gap-1 cursor-pointer bg-white transition-all duration-1000 hover:bg-neutral-100`}
            >
                <IoIosArrowUp
                    size={15}
                    className={`transition-transform ${opensidebar ? "-rotate-90" : "rotate-90"}`}
                />
                {!opensidebar && (
                    <>
                        <span className="bg-green-400 p-1 rounded-full absolute right-0 top-0" />
                        <span className="bg-green-400 p-1 rounded-full absolute right-0 top-0 animate-ping" />
                    </>
                )}
            </button>

            {/* 👤 Profile Overview */}
            <div className="mb-10 text-center">
                <img
                    src={user.imageUrl}
                    alt="Profile"
                    className="w-16 h-16 rounded-full mx-auto border border-slate-300"
                />
                <h2 className="mt-2 text-lg font-semibold text-slate-800">
                    {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm text-slate-500">
                    {user.emailAddresses?.[0]?.emailAddress}
                </p>
                <p className="text-xs text-slate-400 mt-2">Member since: 2024</p>
            </div>

            {/* 🧭 Navigation Sections */}
            <nav className="space-y-6">
                {navItems.map((section, sIdx) => (
                    <div key={sIdx}>
                        <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2 tracking-wide">
                            {section.section}
                        </h4>
                        <div className="space-y-2">
                            {section.items.map((item, idx) => (
                                <Link
                                    key={idx}
                                    to={item.path}
                                    onClick={() => setOpenSideBar(false)}
                                    className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${location.pathname === item.path
                                        ? "bg-blue-100 text-blue-700"
                                        : "text-slate-700 hover:bg-slate-100"
                                        }`}
                                >
                                    {item.icon}
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </nav>

            {/* 🚪 Logout */}
            <div className="mt-10 border-t border-slate-200 pt-6">
                <SignOutButton>
                    <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-red-600 hover:bg-red-50 transition">
                        <TbLogout size={18} />
                        Log Out
                    </button>
                </SignOutButton>
            </div>
        </aside>
    );
};

export default SideBar;