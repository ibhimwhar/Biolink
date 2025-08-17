import { useEffect, useRef, useState, useMemo } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
    useUser,
} from "@clerk/clerk-react";
import {
    TbMenu,
    TbArrowUpRight,
    TbX,
    TbHomeEco,
    TbMessageCircle,
} from "react-icons/tb";
import { LuUserRound } from "react-icons/lu";
import Loader from "./Loader";

const Header = ({ onTheme }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const menuRef = useRef();
    const { user, isLoaded } = useUser();

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    const navLinks = useMemo(
        () => [
            { name: "🏠 Home", to: "/" },
            { name: "✨ Features", to: "/features" },
            { name: "🔍 Explore", to: "/explore" },
            { name: "💸 Pricing", to: "/pricing" },
        ],
        []
    );

    return (
        <header>
            <div
                className={`fixed top-0 left-0 w-full z-50 px-6 py-3 flex items-center justify-between ${onTheme ? "bg-white sm:bg-white/50" : "bg-white/50"
                    } backdrop-blur-xl border-b border-slate-200`}
            >
                {/* 🎨 Logo */}
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
                    B.
                </h1>

                {/* 🧭 Center Navigation (desktop) */}
                <nav className="hidden sm:flex items-center gap-6 bg-white/5 backdrop-blur-3xl px-2 p-1 rounded-full">
                    <ul className="flex gap-2">
                        {navLinks.map((link, idx) => (
                            <li key={idx}>
                                <NavLink
                                    to={link.to}
                                    className={`relative px-4 py-1 border border-slate-200 rounded-full font-semibold bg-neutral-100 backdrop-blur-sm hover:bg-white shadow-xs hover:shadow-md transition-all duration-300 ${location.pathname === link.to
                                        ? "text-blue-500"
                                        : "text-slate-700"
                                        }`}
                                >
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-2 ml-2">
                        <NavLink to="/account">
                            <button
                                aria-label="Profile"
                                className="px-4 py-1 border border-slate-200 rounded-full font-semibold text-slate-700 flex items-center gap-1 cursor-pointer bg-white transition-all duration-300 hover:bg-neutral-100 hover:backdrop-blur-sm hover:shadow-xs"
                            >
                                👤 Profile <TbArrowUpRight size={13} />
                            </button>
                        </NavLink>
                        <NavLink to="/account/messages">
                            <button
                                aria-label="Messages"
                                className="p-2 border border-slate-200 rounded-full font-semibold text-slate-700 flex items-center gap-1 cursor-pointer bg-white transition-all duration-300 hover:bg-neutral-100 hover:backdrop-blur-sm hover:shadow-xs"
                            >
                                <TbMessageCircle size={12} />
                            </button>
                        </NavLink>
                    </div>
                </nav>

                {/* 🎛️ Right actions */}
                <div className="flex items-center gap-4">
                    {/* 📱 Menu button (mobile) */}
                    <button
                        aria-label="Toggle menu"
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="p-1.5 rounded flex items-center justify-center cursor-pointer text-slate-700 border border-neutral-200 bg-white focus:ring ring-blue-500 transition-all duration-300 sm:hidden"
                    >
                        {menuOpen ? <TbX size={18} /> : <TbMenu size={18} strokeWidth={2} />}
                    </button>

                    {isLoaded === false ? <Loader /> : (
                        <>
                            <SignedIn>
                                <button className="flex items-center gap-2">
                                    <UserButton
                                        appearance={{
                                            elements: {
                                                rootBox:
                                                    "ring-2 ring-blue-100 rounded-full border border-neutral-200 transition-all duration-300",
                                            },
                                        }}
                                    />
                                    <span className="rounded-full font-semibold text-slate-700">
                                        {user?.firstName} 👋
                                    </span>
                                </button>
                            </SignedIn>

                            <SignedOut>
                                <SignInButton mode="modal">
                                    <button
                                        aria-label="Create Account"
                                        className="rounded-full font-semibold text-slate-700 cursor-pointer flex gap-1 items-center"
                                    >
                                        <LuUserRound size={18} /> Create Account
                                    </button>
                                </SignInButton>
                            </SignedOut>
                        </>
                    )}
                </div>
            </div>

            {/* 📱 Mobile Dropdown Menu */}
            <nav
                ref={menuRef}
                className={`z-40 fixed w-full transition-transform duration-500 ease-in-out sm:hidden border pt-16 ${menuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
                    } ${onTheme ? "bg-white" : "bg-white/80"} backdrop-blur-sm p-3 px-6 border-b border-slate-200`}
            >
                <ul className="flex flex-col gap-2">
                    {navLinks.map((link, idx) => (
                        <li key={idx}>
                            <Link
                                to={link.to}
                                className={`flex items-center gap-3 hover:px-3 py-3 rounded-lg font-semibold hover:bg-white hover:border border-slate-200 transition-all duration-200 ${location.pathname === link.to
                                    ? "text-blue-500"
                                    : "text-slate-700"}`}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="mt-4 flex gap-2">
                    <NavLink
                        to="/account"
                        className={`${onTheme} flex-1 px-4 rounded-lg flex justify-center items-center font-semibold border border-slate-200 bg-white/50 hover:bg-neutral-100 transition text-center`}
                    >
                        👤 Profile
                    </NavLink>

                    <NavLink to="/account/messages">
                        <button
                            aria-label="Messages"
                            className="p-2 border border-slate-200 rounded-lg hover:bg-neutral-100 transition"
                        >
                            <TbMessageCircle size={16} />
                        </button>
                    </NavLink>
                </div>
            </nav>
        </header>
    );
};

export default Header;