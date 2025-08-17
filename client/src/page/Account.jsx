import { useState, useEffect } from 'react';
import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
    useAuth,
} from '@clerk/clerk-react';
import axios from 'axios';
import SideBar from '../component/SideBar';
import { IoAdd, IoHeartOutline } from 'react-icons/io5';
import Verify from "../assets/verified.png";
import { HiOutlineUsers } from 'react-icons/hi2';
import { SlLike } from 'react-icons/sl';
import Loader from '../component/Loader';

const AccountPage = () => {
    const [profile, setProfile] = useState(null);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });

    const { getToken } = useAuth();

    const fetchProfile = async () => {
        try {
            const token = await getToken();
            const res = await axios.get('/auth/profile', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProfile(res.data);
            setFormData({
                firstName: res.data.firstName || '',
                lastName: res.data.lastName || '',
                email: res.data.email || '',
            });
        } catch (err) {
            console.error('Error fetching profile:', err.response?.data || err.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const token = await getToken();
            await axios.put('/auth/profile', formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEditing(false);
            fetchProfile();
        } catch (err) {
            console.error('Error updating profile:', err.response?.data || err.message);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    // if (!profile) {
    //     return (
    //         <div className='min-h-screen flex justify-center items-center'>
    //             <Loader />
    //         </div>
    //     )
    // }

    return (
        <div className='flex'>
            <SideBar />
            <div className="pt-24 flex-1 bg-gradient-to-br from-white to-slate-100 px-4 sm:px-6 lg:px-8 py-10">
                <div className='max-w-4xl ml-auto'>
                    <h1 className="text-xl md:text-3xl mb-6 text-right font-bold text-slate-800">
                        Account Dashboard
                    </h1>

                    <SignedOut>
                        <div className="min-h-screen text-center p-6">
                            <span className='text-9xl'>😢</span>
                            <p className="text-lg text-slate-700 my-4">You're signed out</p>
                            <SignInButton mode="modal">
                                <button className="px-4 py-2 cursor-pointer rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition">
                                    Sign In
                                </button>
                            </SignInButton>
                        </div>
                    </SignedOut>

                    <SignedIn>
                        <div>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                                <div>
                                    <p className="text-slate-700 font-semibold">Welcome back!</p>
                                    <p className="text-sm text-slate-500">🎉 You're signed in</p>
                                </div>
                                <button
                                    onClick={() => setEditing(!editing)}
                                    className="px-3 py-1 text-sm font-semibold border border-slate-300 rounded hover:bg-neutral-100 transition"
                                >
                                    {editing ? 'Cancel' : '✏️ Edit Profile'}
                                </button>
                            </div>

                            {profile && !editing && (
                                <div className="mt-6">
                                    <div className="flex flex-col sm:flex-row items-center gap-4">
                                        <img
                                            src={profile.imageUrl}
                                            alt="Profile"
                                            className="w-16 h-16 rounded-full border border-slate-300"
                                        />
                                        <div className="text-center sm:text-left">
                                            <p className="text-lg font-semibold text-slate-800">
                                                {profile.firstName} {profile.lastName} 👋
                                            </p>
                                            <p className="text-sm text-slate-600">{profile.email}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {editing && (
                                <div className="mt-6 space-y-4 min-h-screen">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                                        />
                                    </div>
                                    <button
                                        onClick={handleSave}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
                                    >
                                        💾 Save Changes
                                    </button>
                                </div>
                            )}

                            {profile && !editing && (
                                <div className="mt-10">
                                    <h2 className="text-xl font-semibold text-slate-800 mb-4">📋 Profile Details</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-700">
                                        <div>
                                            <span className="font-medium text-slate-600">First Name:</span> {profile.firstName}
                                        </div>
                                        <div>
                                            <span className="font-medium text-slate-600">Last Name:</span> {profile.lastName}
                                        </div>
                                        <div>
                                            <span className="font-medium text-slate-600">Email:</span> {profile.email}
                                        </div>
                                        <div>
                                            <span className="font-medium text-slate-600">Username:</span> {profile.username || '—'}
                                        </div>
                                        <div>
                                            <span className="font-medium text-slate-600">Phone:</span> {profile.phoneNumber || '—'}
                                        </div>
                                        <div>
                                            <span className="font-medium text-slate-600">Created At:</span>{' '}
                                            {new Date(profile.createdAt).toLocaleDateString()}
                                        </div>
                                        <div>
                                            <span className="font-medium text-slate-600">Updated At:</span>{' '}
                                            {new Date(profile.updatedAt).toLocaleDateString()}
                                        </div>
                                    </div>

                                    <div className='p-6 mt-10 bg-gray-100 rounded-xl'>

                                        {/* 🔐 Security Settings */}
                                        <div className=''>
                                            <h2 className="text-xl font-semibold text-slate-800 mb-4">🛡️ Security Settings</h2>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-slate-700">
                                                <div className='p-2 bg-white rounded-xl'>
                                                    <span className="font-medium text-slate-600">Password Status:</span> ✅ Updated
                                                </div>
                                                <div className='p-2 bg-white rounded-xl'>
                                                    <span className="font-medium text-slate-600">Two-Factor Authentication:</span>
                                                    <span className="ml-2 inline-block px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">Enabled</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 💳 Billing Info */}
                                        <div className="mt-10">
                                            <h2 className="text-xl font-semibold text-slate-800 mb-4">💳 Billing Information</h2>
                                            <div className="p-2 bg-white rounded-xl grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-slate-700">
                                                <div>
                                                    <span className="font-medium text-slate-600">Plan:</span> Pro
                                                </div>
                                                <div>
                                                    <span className="font-medium text-slate-600">Next Renewal:</span> September 15, 2025
                                                </div>
                                                <div>
                                                    <span className="font-medium text-slate-600">Payment Method:</span> **** **** **** 4242
                                                </div>
                                            </div>
                                        </div>

                                        {/* ⚙️ Preferences */}
                                        <div className="mt-10">
                                            <h2 className="text-xl font-semibold text-slate-800 mb-4">⚙️ Preferences</h2>
                                            <div className="space-y-4 text-sm text-slate-700">
                                                <div className="p-2 bg-white rounded-xl flex items-center justify-between">
                                                    <span className="font-medium text-slate-600">Dark Mode</span>
                                                    <button className="px-3 py-1 gray-100 border border-neutral-100 cursor-pointer rounded-full hover:bg-gray-50 transition text-xs font-semibold">Toggle</button>
                                                </div>
                                                <div className="p-2 bg-white rounded-xl flex items-center justify-between">
                                                    <span className="font-medium text-slate-600">Email Notifications</span>
                                                    <button className="px-3 py-1 gray-100 border border-neutral-100 cursor-pointer rounded-full hover:bg-gray-50 transition text-xs font-semibold">Manage</button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 📜 Activity Log */}
                                        <div className="mt-10">
                                            <h2 className="text-xl font-semibold text-slate-800 mb-4">📜 Recent Activity</h2>
                                            <ul className="space-y-2 text-sm text-slate-700">
                                                <li className='flex-wrap flex gap-2'>
                                                    <span className='p-2 bg-white rounded-xl'>Logged in from Chrome on Windows</span>
                                                    {" "}
                                                    <span className='p-2 bg-white rounded-xl'>Aug 15, 2025</span>
                                                </li>

                                                <li className='flex-wrap flex gap-2'>
                                                    <span className='p-2 bg-white rounded-xl'>Password changed</span>
                                                    {" "}
                                                    <span className='p-2 bg-white rounded-xl'>Aug 10, 2025</span>
                                                </li>

                                                <li className='flex-wrap flex gap-2'>
                                                    <span className='p-2 bg-white rounded-xl'>Logged in from iPhone</span>
                                                    {" "}
                                                    <span className='p-2 bg-white rounded-xl'>Aug 8, 2025</span>
                                                </li>
                                            </ul>
                                        </div>

                                    </div>

                                </div>
                            )}
                        </div>
                    </SignedIn>
                </div>
            </div>
        </div>
    );
};

export default AccountPage;