import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Background_Image from "../assets/explore.background.image.jpg";
import ProductCard from "../component/Product.Card";
import { useContextValue } from "../component/Context";

const ExplorePage = () => {
    const { sampleItems } = useContextValue();

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [followerRange, setFollowerRange] = useState("All");
    const [likeRange, setLikeRange] = useState("All");

    const categories = ["All", "Art 🎨", "Design 🧩", "Photography 📸", "Jewelry 💎", "Illustration ✏️"];
    const followerRanges = ["All", "0-500", "500-1000", "1000+"];
    const likeRanges = ["All", "0-300", "300-600", "600+"];

    const enrichedItems = sampleItems.map((item, index) => ({
        ...item,
        category: categories[index % categories.length],
        followers: 100 + index * 150,
        likes: 50 + index * 100,
    }));

    const inRange = (value, range) => {
        if (range === "All") return true;
        if (range.endsWith("+")) return value >= parseInt(range);
        const [min, max] = range.split("-").map(Number);
        return value >= min && value <= max;
    };

    const filteredItems = enrichedItems.filter((item) => {
        const matchesSearch =
            item.user.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase());

        const matchesCategory = category === "All" || item.category === category;
        const matchesFollowers = inRange(item.followers, followerRange);
        const matchesLikes = inRange(item.likes, likeRange);

        return matchesSearch && matchesCategory && matchesFollowers && matchesLikes;
    });

    return (
        <div className="pb-20">
            {/* Banner */}
            <div className="mb-28 relative">
                <div
                    className="relative w-full h-72 sm:h-80 md:h-96 rounded-2xl overflow-hidden"
                    style={{
                        backgroundImage: `url(${Background_Image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-transparent"></div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
                        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 drop-shadow-lg">
                            Discover Creativity <span className="text-3xl sm:text-5xl">✨</span>
                        </h1>

                        {/* Frosted Search Bar */}
                        <div className="w-full max-w-xl flex items-center px-4 py-2 border border-slate-300 rounded-lg bg-black/10 transition-all focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-200">
                            <IoSearchOutline size={22} className="text-white/80" />
                            <input
                                type="text"
                                placeholder="Search creators, artworks, and profiles..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="flex-1 px-3 py-1 text-sm text-white placeholder-white/70 bg-transparent focus:outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="mt-16 w-full">
                    <div className="bg-white shadow-inner rounded-xl p-4 max-w-6xl mx-auto overflow-x-auto hide-scrollbar flex flex-wrap justify-center gap-3">
                        {/* Category Buttons */}
                        <div className="flex gap-2 flex-wrap">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setCategory(cat)}
                                    className={`cursor-pointer px-4 py-2 text-sm rounded-full border ${category === cat
                                        ? "bg-blue-100 text-blue-700 border-blue-300"
                                        : "bg-white text-slate-700 border-slate-200 hover:bg-neutral-100"
                                        } transition font-medium`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Follower Range Buttons */}
                        <div className="flex gap-2 flex-wrap">
                            {followerRanges.map((range) => (
                                <button
                                    key={range}
                                    onClick={() => setFollowerRange(range)}
                                    className={`cursor-pointer px-4 py-2 text-sm rounded-full border ${followerRange === range
                                        ? "bg-blue-100 text-blue-700 border-blue-300"
                                        : "bg-white text-slate-700 border-slate-200 hover:bg-neutral-100"
                                        } transition font-medium`}
                                >
                                    {range}
                                </button>
                            ))}
                        </div>

                        {/* Like Range Buttons */}
                        <div className="flex gap-2 flex-wrap">
                            {likeRanges.map((range) => (
                                <button
                                    key={range}
                                    onClick={() => setLikeRange(range)}
                                    className={`cursor-pointer px-4 py-2 text-sm rounded-full border ${likeRange === range
                                        ? "bg-blue-100 text-blue-700 border-blue-300"
                                        : "bg-white text-slate-700 border-slate-200 hover:bg-neutral-100"
                                        } transition font-medium`}
                                >
                                    {range}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <div className="mt-16 grid gap-y-16 place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredItems.length > 0 ? (
                    filteredItems.map((item) => <ProductCard key={item.id} item={item} />)
                ) : (
                    <div className="col-span-full text-center space-y-6">
                        <p className="text-neutral-500">No results found. Try adjusting your filters 🔧</p>
                        <span className="text-4xl">😔</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExplorePage;