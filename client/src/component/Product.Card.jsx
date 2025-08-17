import { IoHeartOutline, IoHeart, IoAdd } from "react-icons/io5";
import Verify from "../assets/verified.png";
import { HiOutlineUsers } from "react-icons/hi2";
import { SlLike } from "react-icons/sl";
import { useState } from "react";

const placeholderImage = "https://placehold.co/600x400?text=Image+Unavailable";

const ProductCard = ({ item }) => {
    if (!item) return null;

    const [isLiked, setIsLiked] = useState(false);

    const toggleLike = () => {
        setIsLiked((prev) => !prev);
    };

    const handleImageError = (e) => {
        if (e.target.src !== placeholderImage) {
            e.target.src = placeholderImage;
        }
    };

    return (
        <div className="flex justify-center w-fit">
            <article className="relative bg-white rounded-3xl overflow-hidden border border-slate-200 w-72 transition-all duration-300 hover:shadow-sm hover:scale-[1.02] hover:border-transparent hover:ring-2 hover:ring-pink-300">
                <div className="p-2">
                    {/* Image + Like Button */}
                    <div className="relative group">
                        <img
                            src={item.image || placeholderImage}
                            alt={`${item.user}'s profile`}
                            onError={handleImageError}
                            className="w-full h-72 object-cover rounded-2xl transition-transform duration-300 group-hover:scale-102 cursor-pointer"
                        />
                        <button
                            aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
                            aria-pressed={isLiked}
                            onClick={toggleLike}
                            className="absolute top-3 right-3 cursor-pointer bg-white/10 rounded-full p-2"
                        >
                            {isLiked ? (
                                <IoHeart size={24} className="text-red-500" />
                            ) : (
                                <IoHeartOutline size={24} className="text-white" />
                            )}
                        </button>
                    </div>

                    {/* Info Section */}
                    <div className="pt-4 pb-2 px-1">
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg sm:text-xl font-semibold text-neutral-800 truncate">
                                {item.user}
                            </h3>
                            <img src={Verify} alt="Verified badge" className="w-4 h-4" />
                        </div>

                        <p className="text-sm text-neutral-600 mt-1 mb-4 line-clamp-2">
                            {item.description}
                        </p>

                        {/* Stats + Follow */}
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2 text-xs text-neutral-600">
                                <span className="flex items-center gap-1 bg-slate-50 border border-slate-100 px-2 py-1 rounded-full">
                                    <HiOutlineUsers size={16} /> 321
                                </span>
                                <span className="flex items-center gap-1 bg-slate-50 border border-slate-100 px-2 py-1 rounded-full">
                                    <SlLike size={12} /> 48
                                </span>
                            </div>

                            <button
                                className="px-3 py-1.5 cursor-pointer flex gap-2 items-center rounded-full border border-slate-200 bg-white hover:bg-slate-100 transition font-medium"
                                aria-label={`Follow ${item.user}`}
                            >
                                Ping <IoAdd size={13} />
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default ProductCard;