import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';

export const ContextValue = createContext();

export const ContextContainer = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const { getToken } = useAuth();

    const fetchProfile = async () => {
        try {
            const token = await getToken();
            const res = await axios.get('/auth/profile', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProfile(res.data);
        } catch (err) {
            console.error('Error fetching profile:', err.response?.data || err.message);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const sampleItems = [
        {
            id: 1,
            user: "Sophie Bennett",
            description: "Digital artist crafting surreal and vibrant dreamscapes.",
            image: "https://randomuser.me/api/portraits/thumb/women/75.jpg",
        },
        {
            id: 2,
            user: "Liam Carter",
            description: "Photographer exploring cosmic landscapes and stargazing art.",
            image: "https://randomuser.me/api/portraits/med/men/75.jpg",
        },
        {
            id: 3,
            user: "Isabella Cruz",
            description: "Minimalist illustrator focusing on emotion-driven portraits.",
            image: "https://randomuser.me/api/portraits/women/65.jpg",
        },
        {
            id: 4,
            user: "Noah Kim",
            description: "Jewelry designer blending ancient elegance with modern style.",
            image: "https://placehold.co/600x400",
        },
        {
            id: 5,
            user: "Aria Thompson",
            description: "UX designer passionate about human-centered design.",
            image: "https://randomuser.me/api/portraits/women/45.jpg",
        },
    ];


    return (
        <ContextValue.Provider value={{
            profile,
            setProfile,
            sampleItems
        }}>
            {children}
        </ContextValue.Provider>
    );
};


export const useContextValue = () => useContext(ContextValue);