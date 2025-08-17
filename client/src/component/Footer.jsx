import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram, IoLogoGithub } from "react-icons/io5";
import { useLocation } from "react-router-dom";

const FooterPage = ({ onRef }) => {
    const location = useLocation();

    return (
        <footer
            ref={onRef}
            className="bg-gradient-to-b relative z-10 from-slate-900 to-slate-800 border-t border-slate-700 pt-10 pb-6 text-slate-300"
        >
            {/* Top Section */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-10 px-6">
                {/* Brand */}
                <div>
                    <h1 className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
                        B.
                    </h1>
                    <p className="mt-3 text-slate-400 leading-relaxed text-sm max-w-xs">
                        BioLink helps you bring all your online spots together in one clean, easy-to-share link. Whether you're a creator, business, or just someone who wants to connect better—we've got you covered. 🌐✨
                    </p>
                </div>

                {/* Quick Links */}
                <nav aria-label="Quick Links">
                    <h3 className="text-lg font-semibold text-white mb-3">🔗 Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        {[
                            { title: "Home", link: "/" },
                            { title: "Features", link: "/features" },
                            { title: "Explore Users", link: "/explore" },
                            { title: "Pricing", link: "/pricing" },
                        ].map((item, idx) => (
                            <li
                                key={idx}
                                className={`transition-all duration-200 ${location.pathname === item.link
                                    ? "text-pink-400"
                                    : "text-slate-400 hover:text-white"
                                    }`}
                            >
                                <a href={item.link} className="hover:pl-1 transition-all">
                                    {item.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Support */}
                <nav aria-label="Support">
                    <h3 className="text-lg font-semibold text-white mb-3">🛟 Support</h3>
                    <ul className="space-y-2 text-sm">
                        {[
                            { title: "Privacy Policy", link: "#" },
                            { title: "Terms of Service", link: "#" },
                            { title: "Help Center", link: "#" },
                            { title: "Contact", link: "#" },
                        ].map((item, idx) => (
                            <li key={idx} className="text-slate-400 hover:text-white transition-all duration-200">
                                <a href={item.link} className="hover:pl-1 transition-all">
                                    {item.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Newsletter */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">📬 Stay Updated</h3>
                    <p className="text-sm text-slate-400 mb-4">
                        📨 Get tips, updates, and inspiration straight to your inbox.
                    </p>
                    <form className="flex" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            placeholder="Your email"
                            className="flex-1 px-4 py-2 border border-slate-600 rounded-l-lg bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring focus:ring-slate-600 transition-all text-sm"
                            required
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 border border-l-0 border-slate-600 text-white rounded-r-lg text-sm font-medium transition-all hover:brightness-110"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4 px-6">
                {/* Social Links */}
                <div className="flex gap-4 text-slate-400">
                    <a
                        href="https://github.com/ibhimwhar"
                        aria-label="GitHub"
                        className="hover:text-white transition-colors"
                    >
                        <IoLogoGithub size={20} />
                    </a>
                    <a
                        href="https://www.instagram.com/viralface_1"
                        aria-label="Instagram"
                        className="hover:text-white transition-colors"
                    >
                        <IoLogoInstagram size={20} />
                    </a>
                    <a
                        href="https://x.com/ibhimwhar"
                        aria-label="Twitter/X"
                        className="hover:text-white transition-colors"
                    >
                        <FaXTwitter size={20} />
                    </a>
                </div>

                {/* Copyright */}
                <p className="text-slate-500 text-sm text-center md:text-left">
                    &copy; {new Date().getFullYear()} <strong className="text-white">BioLink</strong> — All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default FooterPage;