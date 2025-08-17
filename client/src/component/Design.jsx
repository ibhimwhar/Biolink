import { useState } from 'react';
import {
    SignedIn,
    SignedOut,
    SignInButton,
    useUser,
} from '@clerk/clerk-react';
import {
    FaInstagram,
    FaGithub,
    FaLinkedin,
    FaGlobe,
} from 'react-icons/fa';
import Verify from '../assets/verified.png';
import { HiOutlineUsers } from 'react-icons/hi2';
import { SlLike } from 'react-icons/sl';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import SideBar from './SideBar';
import { IoAdd, IoHeart, IoHeartOutline } from 'react-icons/io5';
import { FaSquareXTwitter } from 'react-icons/fa6';

const platforms = [
    {
        name: 'instagram',
        label: 'Instagram',
        baseUrl: 'https://instagram.com/',
        icon: <FaInstagram size={15} className="text-pink-500" />,
    },
    {
        name: 'twitter',
        label: 'Twitter/X',
        baseUrl: 'https://x.com/',
        icon: <FaSquareXTwitter size={15} className="text-black" />,
    },
    {
        name: 'github',
        label: 'GitHub',
        baseUrl: 'https://github.com/',
        icon: <FaGithub size={15} className="text-gray-800" />,
    },
    {
        name: 'linkedin',
        label: 'LinkedIn',
        baseUrl: 'https://linkedin.com/in/',
        icon: <FaLinkedin size={15} className="text-blue-700" />,
    },
];

const detectPlatform = (url) => {
    if (!url) return null;
    if (url.includes('instagram.com')) return 'instagram';
    if (url.includes('twitter.com') || url.includes('x.com')) return 'twitter';
    if (url.includes('github.com')) return 'github';
    if (url.includes('linkedin.com')) return 'linkedin';
    return 'default';
};

const platformIcons = {
    instagram: <FaInstagram size={15} className="text-pink-500" />,
    twitter: <FaSquareXTwitter size={15} className="text-black" />,
    github: <FaGithub size={15} className="text-gray-800" />,
    linkedin: <FaLinkedin size={15} className="text-blue-700" />,
    default: <FaGlobe size={15} className="text-slate-500" />,
};

const Design = () => {
    const { user } = useUser();
    const [links, setLinks] = useState([]);
    const [selectedPlatform, setSelectedPlatform] = useState(platforms[0]);
    const [username, setUsername] = useState('');
    const [isLiked, setIsLiked] = useState(false);

    const handleAddLink = (e) => {
        e.preventDefault();
        if (username && selectedPlatform) {
            const fullUrl = selectedPlatform.baseUrl + username;
            setLinks([...links, fullUrl]);
            setUsername('');
        }
    };

    return (
        <>
            <SignedOut>
                <div className="min-h-screen text-center p-6">
                    <span className="text-9xl">😢</span>
                    <p className="text-lg text-slate-700 my-4">You're signed out</p>
                    <SignInButton mode="modal">
                        <button className="px-4 py-2 cursor-pointer rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition">
                            Sign In
                        </button>
                    </SignInButton>
                </div>
            </SignedOut>

            <SignedIn>
                <div className="min-h-screen flex flex-col-reverse gap-10 py-26">
                    <SideBar />

                    {/* Social Media Input */}
                    <div className="mx-auto bg-white border border-slate-200 rounded-xl p-6 md:p-26 grid place-items-center place-content-center">
                        <h3 className="font-semibold text-slate-800 mb-8 text-lg md:text-2xl text-center">
                            Add Your Social Media Username 🔗
                        </h3>

                        <form onSubmit={handleAddLink} className="space-y-4 w-full">
                            {/* Platform Selector */}
                            <div className="flex flex-wrap gap-2 justify-center">
                                {platforms.map((platform) => (
                                    <button
                                        key={platform.name}
                                        type="button"
                                        onClick={() => setSelectedPlatform(platform)}
                                        className={`flex cursor-pointer items-center gap-2 px-3 py-1.5 rounded-full border ${selectedPlatform.name === platform.name
                                            ? 'bg-indigo-100 border-indigo-300 text-indigo-700'
                                            : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                                            }`}
                                    >
                                        {platform.icon}
                                        {platform.label}
                                    </button>
                                ))}
                            </div>

                            {/* Username Input */}
                            <input
                                type="text"
                                placeholder={`Enter your ${selectedPlatform.label} username`}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                                required
                            />

                            {/* Add Button */}
                            <button
                                type="submit"
                                className="w-full cursor-pointer bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
                            >
                                Add {selectedPlatform.label} Link
                            </button>
                        </form>
                    </div>

                    {/* Card Preview */}
                    <div className="flex justify-center items-start">
                        <article className="bg-white rounded-3xl overflow-hidden border border-slate-200 w-72 transition-all duration-300 hover:shadow-sm hover:scale-[1.02] hover:border-transparent hover:ring-2 hover:ring-pink-300">

                            <div className="relative">
                                <img
                                    src={user?.imageUrl}
                                    alt="user profile"
                                    className="w-full h-72 object-cover rounded-3xl bordr p-2"
                                />
                                <button
                                    aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
                                    aria-pressed={isLiked}
                                    onClick={() => setIsLiked(prev => !prev)}
                                    className="absolute top-4 right-4 cursor-pointer bg-white/10 rounded-full p-2"
                                >
                                    {isLiked ? (
                                        <IoHeart size={20} className="text-red-500" />
                                    ) : (
                                        <IoHeartOutline size={20} className="text-white" />
                                    )}
                                </button>
                            </div>

                            <div className="p-4">
                                {/* Name + Verified */}
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-lg font-semibold text-neutral-800 truncate">
                                        {user?.firstName}
                                    </h3>
                                    <img src={Verify} alt="Verified badge" className="w-4 h-4" />
                                </div>

                                {/* Bio */}
                                <p className="text-sm text-neutral-600 mb-4">
                                    Your bio goes here. Keep it short and sweet.
                                </p>

                                {/* Social Links */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {[...new Map(
                                        links.map((link) => {
                                            const platform = detectPlatform(link);
                                            return [platform, { platform, link }];
                                        })
                                    ).values()].map(({ platform, link }, idx) => {
                                        const icon = platformIcons[platform] || platformIcons.default;

                                        const handleRemove = () => {
                                            setLinks((prev) =>
                                                prev.filter((l) => detectPlatform(l) !== platform)
                                            );
                                        };

                                        return (
                                            <div
                                                key={idx}
                                                className="flex items-center gap-2 bg-slate-50 border border-slate-100 p-2 rounded-full"
                                            >
                                                <a
                                                    href={link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-slate-700 hover:text-slate-900"
                                                >
                                                    {icon}
                                                </a>
                                                <button
                                                    onClick={handleRemove}
                                                    className="text-xs cursor-pointer text-red-500 hover:text-red-700 font-semibold"
                                                >
                                                    <IoIosRemoveCircleOutline size={12} />
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Stats */}
                                <div className='flex justify-between items-center'>
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-2 text-xs text-neutral-600">
                                            <span className="flex items-center gap-1 bg-slate-50 border border-slate-100 px-2 py-1 rounded-full">
                                                <HiOutlineUsers size={16} /> 321
                                            </span>
                                            <span className="flex items-center gap-1 bg-slate-50 border border-slate-100 px-2 py-1 rounded-full">
                                                <SlLike size={12} /> 48
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        className="px-3 py-1.5 cursor-pointer flex gap-2 items-center rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition font-medium"
                                    >
                                        Ping <IoAdd size={13} />
                                    </button>
                                </div>

                            </div>
                        </article>
                    </div>
                </div>
            </SignedIn>
        </>
    );
};

export default Design;