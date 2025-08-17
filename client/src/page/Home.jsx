import { SignedOut, SignInButton } from "@clerk/clerk-react";
import Image from "../assets/developer.png"
import { TbArrowUpRight } from "react-icons/tb";
import { IoLogoInstagram, IoLogoGithub, IoChevronDown, IoStar, IoHeartOutline } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import ProductCard from "../component/Product.Card";
import { useEffect, useRef, useState } from "react";
import { SlLike } from "react-icons/sl";
import { CiUser } from "react-icons/ci";
import { PiFolderLight } from "react-icons/pi";
import Verify from "../assets/verified.png";
import { useContextValue } from "../component/Context";

const HomePage = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const { sampleItems } = useContextValue()


    const features = [
        {
            title: "🔗 One Link for Everything",
            content:
                `Okay, let's start here, because this one's a game-changer.
                You know how online life gets messy? You've got your Instagram here, your LinkedIn over there, maybe a Behance or GitHub if you're into design or coding, and then there's that random blog you haven't updated in a year but still want people to see. Now imagine meeting someone who wants to check you out online and how do you even start sending all those links without feeling like you're dumping your bookmarks folder into their DMs?
                This is exactly where BioLink comes in like a breath of fresh air. Instead of juggling a dozen handles and remembering which one has the dots, underscores, or extra letters, you just send one link. That's it. That single link is like a master key to everything you are online and a neat, tidy hub where your social media, your work, your projects, and even your favorite playlists live together.
                The best part? People actually use it because it's easy. No one likes the “Oh, wait, let me send you my other profile too” dance. They click one thing, and they see everything. No confusion, no friction. It's not just convenient and it's kind of… polite, you know? You're respecting their time while making sure nothing important gets lost in the shuffle.`
        },
        {
            title: "🎨 Fully Customizable",
            content:
                `Now, here's where things start to feel personal. Remember when we were kids and we'd rearrange our rooms every couple of months just because it felt good to have a new “vibe”? BioLink is basically that, but for your online presence.
                We're talking total control over how your page looks. You can go bold with bright, electric colors that pop off the screen, or you can keep it low-key and minimal with soft tones and clean lines. The fonts? Your choice. Button shapes? Yep, all you. Even the background can be tailored and a subtle gradient, a crisp solid, or maybe something textured if you want to stand out.
                Here's the thing and when people land on your BioLink, they're not just seeing your content, they're feeling you. It's the difference between walking into a bare, fluorescent-lit waiting room and stepping into a coffee shop that somehow feels like home. You set the tone, and that tone can make someone want to stick around.`
        },
        {
            title: "📱 Mobile-First Design",
            content:
                `We both know where most traffic comes from these days and the tiny glowing rectangles we carry everywhere. BioLink isn't just “compatible” with mobile, it's built for it from the ground up.
                That means no weird squishing of images, no buttons you have to zoom in to tap, and no layouts that make you scroll sideways (seriously, why do some sites still do that?). Everything is smooth, responsive, and perfectly sized for thumbs. But it's not like they forgot about desktops and the design stretches and adapts so it still looks sharp on a 27-inch monitor.
                Think of it like clothes that somehow fit you perfectly whether you're lounging on the couch or going out to a nice dinner. No compromises.`
        },
        {
            title: "📈 Real-Time Analytics",
            content:
                `Alright, I'll admit it and this is the part that gets addictive. Imagine dropping a new piece of content and maybe a video, maybe an article, maybe just a fun tweet and and then opening up your dashboard to see exactly how many people clicked it. In real time. Like, right now.
                It's not just about the thrill of watching the numbers tick up (although, let's be real, that's pretty fun). It's about understanding your audience. You start noticing patterns and when people are most active, what they click on first, which links are getting ignored. It's like having a window into the mind of your followers, without the creepy “I'm watching you” vibes.
                And once you've got that kind of data, you can make smarter moves. Swap out a link that's underperforming. Push something new when you know traffic spikes. It's like playing chess when everyone else is still figuring out checkers.`
        },
        {
            title: "🔒 Secure with Clerk",
            content:
                `Let's talk trust, because without it, the whole thing falls apart.
                BioLink uses Clerk for authentication, which basically means your account and data are behind the kind of security people use for serious business and not just a flimsy password and a prayer.
                You decide what's public and what's not. If you've got links you only want clients to see, you can lock them. If you need to make sure random strangers can't dig too deep, you can keep them out. And the best part? You don't have to think about it and it's just baked in.
                You know that feeling when you leave the house and can't remember if you locked the door? Yeah, you won't have that here. Clerk's got you.`
        },
        {
            title: "⚡ Instant Search",
            content:
                `Here's a small thing that's actually a huge thing. You know when you're trying to find someone's page, but you can't remember their full username? You get one letter wrong, and suddenly you're in a completely different person's profile.
                BioLink's instant search is like the autocomplete in your phone's messages and it knows what you're looking for before you even finish typing. Start entering a name, and it's already narrowing things down. No dead ends, no endless scrolling. Just quick, painless finding.`
        },
        {
            title: "⚙️ Future-Ready",
            content:
                `This isn't one of those “set it and forget it” tools that never changes. BioLink is constantly evolving. Think more integrations, more design options, better analytics, and features you haven't even thought of yet.
                It's like your favorite app that keeps getting updates that actually make it better (and not the kind where they move all the buttons and ruin everything). You're not just getting what's here today and you're buying into a platform that grows with you.`
        },
        {
            title: "🌍 Share Anywhere",
            content:
                `Finally, the simplest but most powerful part and you can put your BioLink anywhere. Instagram bio? Done. TikTok? Yep. Email signature? Sure. Printed on a business card? Why not. You could even slap it on a poster, and anyone with a phone can scan or type it in.
                It's short, it's easy to remember, and it works on any device. Which means no matter where someone finds you, you can bring them to your full, curated hub in one step. No friction, no guessing, no “Did I send the right link?” moments.`
        },
    ];

    const toggleDropdown = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const [randomItems, setRandomItems] = useState([]);

    useEffect(() => {
        // Shuffle and pick 3
        const shuffled = [...sampleItems].sort(() => Math.random() - 0.5);
        setRandomItems(shuffled.slice(0, 3));
    }, []);

    // Check scroll position
    const checkScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    };

    useEffect(() => {
        checkScroll();
    }, []);

    const scrollByAmount = (amount) => {
        scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    };

    return (
        <>
            <div className="max-w-4xl mx-auto sm:px-6 pt-20 pb-16 text-center">

                {/* Title */}
                <h1 className="text-slate-700 text-4xl md:text-6xl font-bold text-center leading-tight">
                    Easy.{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
                        BioLink
                    </span>{" "}
                    Socials  <br /> Built for You.
                </h1>


                {/* Intro */}
                <p className="mt-4 text-[16px] text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                    Ever been asked, “Hey, what's your Instagram?” and five minutes later you're still
                    sending your Twitter, TikTok, LinkedIn, and that{" "}
                    <em>one</em> portfolio link you keep buried in your notes app? Yeah… I've been there too.
                </p>
                <p className="mt-4 text-[15px] text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                    That's why I built <strong>BioLink</strong>  one simple page that holds all the places people can find you,
                    wrapped up in a design that's as clean as your favorite Apple keynote.
                </p>

                <div className="mt-4 flex items-center justify-between">
                    <p className="text-neutral-600 text-left">Backed by <em>Clerk</em>.</p>

                    <div className="flex gap-3 justify-end items-center">
                        <a href="https://github.com/ibhimwhar" className="hover:text-slate-500 transition-colors"><IoLogoGithub size={20} /></a>
                        <a href="https://www.instagram.com/viralface_1" className="hover:text-slate-500 transition-colors"><IoLogoInstagram size={20} /></a>
                        <a href="https://x.com/ibhimwhar" className="hover:text-slate-500 transition-colors"><FaXTwitter size={20} /></a>
                        <img src={Image} alt="Developer" className="w-5 h-5 rounded-full bg-white p-[1px]" />
                    </div>
                </div>


                {/* Features */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    <div className="p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow hover:shadow-md transition">
                        <h3 className="text-xl font-semibold text-neutral-800">🎯 All in One</h3>
                        <p className="mt-2 text-neutral-600">
                            Your Instagram, YouTube, store, blog and all neatly stacked in one beautiful page.
                        </p>
                    </div>
                    <div className="p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow hover:shadow-md transition">
                        <h3 className="text-xl font-semibold text-neutral-800">🎨 Make It Yours</h3>
                        <p className="mt-2 text-neutral-600">
                            Pick colors, choose layouts, and tweak styles until it feels <em>exactly</em> like you.
                        </p>
                    </div>
                    <div className="p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow hover:shadow-md transition">
                        <h3 className="text-xl font-semibold text-neutral-800">📈 See What Works</h3>
                        <p className="mt-2 text-neutral-600">
                            Check clicks, visits, and engagement and so you know what's hot and what's not.
                        </p>
                    </div>
                </div>

                <div className="mt-16 space-x-6 flex justify-center items-center">
                    <a
                        href="/account"
                        className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white font-semibold hover:via-pink-400 hover:to-pink-400 transition-colors duration-700"
                    >
                        Build My BioLink
                    </a>

                    <SignedOut>
                        <SignInButton mode="modal">
                            <button
                                className="px-6 py-3 rounded-full flex gap-2 items-center cursor-pointer font-semibold border border-slate-300 text-slate-700 bg-white/70 backdrop-blur-sm hover:shadow-lg hover:ring ring-pink-400 hover:text-pink-500 transition-all duration-300"
                            >
                                Sign In <TbArrowUpRight size={13} />
                            </button>
                        </SignInButton>
                    </SignedOut>
                </div>

                <div className="mt-16 text-left flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Left Content */}
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold text-slate-800 mb-8">
                            One Card. Every Link. Zero Hassle.
                        </h1>

                        <p className="text-slate-600 leading-relaxed max-w-md mb-4">
                            Imagine sharing just <em>one</em> link—and boom, people instantly get access to all your socials, your portfolio, even that secret blog you've been quietly proud of. That's your card.
                        </p>

                        <p className="text-slate-600 leading-relaxed max-w-md mb-4">
                            Looking someone up? It's like browsing your favorite playlist—fast, intuitive, and kind of addictive. No more digging through usernames or outdated handles.
                        </p>

                        <p className="text-slate-600 leading-relaxed max-w-md mb-4">
                            And yep, it's locked down with <strong>Clerk authentication</strong>. Translation: you decide who sees what, and your data stays exactly where it belongs—safe and sound.
                        </p>

                        <p className="text-slate-600 leading-relaxed max-w-md">
                            What's next? Think real-time stats, drag-and-drop design tools, and seamless integrations with the apps you already use. We're just getting started.
                        </p>
                    </div>

                    {/* Profile Card Section */}
                    <div className="relative w-fit h-[280px] flex justify-center items-center mx-auto">
                        {/* Left card */}
                        <div className="absolute transform scale-45 opacity-60 -translate-x-18 hover:scale-50 transition-all duration-300">
                            <ProductCard item={randomItems[0]} />
                        </div>

                        {/* Center card */}
                        <div className="z-10 transform scale-60 hover:scale-65 transition-all duration-300">
                            <ProductCard item={randomItems[1]} />
                        </div>

                        {/* Right card */}
                        <div className="absolute transform scale-45 opacity-60 translate-x-18 hover:scale-50 transition-all duration-300">
                            <ProductCard item={randomItems[2]} />
                        </div>
                    </div>

                </div>

                <div className="relative w-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 rounded-3xl overflow-hidden shadow-lg my-12">
                    {/* Content */}
                    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12 text-center text-white relative z-10">
                        <h2 className="text-2xl md:text-4xl font-bold mb-4">
                            Share Your BioLink. Connect Everywhere.
                        </h2>
                        <p className="text-sm md:text-lg opacity-90 max-w-2xl mx-auto">
                            Create your card in seconds, discover others instantly, and stay secure with Clerk-powered authentication.
                        </p>
                        <div className="mt-6 grid md:flex justify-center gap-4">
                            <a
                                href="/account"
                                className="px-16 sm:px-6 py-3 bg-white text-pink-500 rounded-full font-semibold shadow hover:shadow-md hover:scale-105 transition-all duration-300"
                            >
                                Build My BioLink
                            </a>
                            <a
                                href="/explore"
                                className="px-16 sm:px-6 py-3 border border-white/70 rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
                            >
                                Explore Users
                            </a>
                        </div>
                    </div>

                    {/* Overlay effect */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
                </div>

                {/* After your existing gradient banner */}
                <div className="max-w-5xl mx-auto px-4 sm:px-8 py-16 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
                        What's Next?
                    </h2>
                    <p className="mt-4 text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                        Whether you're a creator, a small business, or just someone who wants to make it
                        easier for people to find you and BioLink is your all-in-one digital calling card.
                    </p>

                </div>

            </div>

            <section className="bg-white py-16 rounded-3xl shadow-inner">
                <div className="max-w-3xl mx-auto px-4 sm:px-8">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-800 text-center mb-8">
                        Burning Curiosities?
                    </h2>

                    <div className="space-y-4">
                        {features.map((feature, idx) => (
                            <div
                                key={idx}
                                className="bg-white relative cursor-pointer rounded-xl shadow overflow-hidden"
                            >
                                <span
                                    className="w-full text-sm flex justify-between items-center px-5 py-4 text-left font-semibold text-slate-800 hover:bg-slate-50 transition"
                                    onClick={() => toggleDropdown(idx)}
                                >
                                    {feature.title}
                                    <IoChevronDown
                                        className={`w-5 h-5 transform transition-transform duration-300 ${openIndex === idx ? "rotate-180" : ""}`}
                                    />
                                </span>

                                <div
                                    className={`px-5 transition-all duration-300 ease-in-out overflow-y-auto hide-scrollbar ${openIndex === idx ? "max-h-96" : "max-h-0"}`}
                                >
                                    <p className="text-neutral-600 cursor-auto leading-relaxed pt-3 pb-14">
                                        {feature.content}
                                    </p>

                                    {/* This stays inside the border of the scroll area */}
                                    <span className={`absolute bottom-0 left-0 w-full bg-gradient-to-t ${openIndex === idx ? 'h-16' : 'h-0'} from-white from-35%% to-transparent pointer-events-none`} />
                                </div>

                            </div>
                        ))}
                        <p className="text-neutral-600 text-center mt-14 leading-relaxed">
                            This isn't just “eight features.” It's an entire way to take control of your online presence, cut through the chaos, and make connecting with you feel effortless. The kind of thing that, once you've set it up, you honestly can't imagine living without.
                        </p>
                    </div>
                </div>
            </section>

            <div className="relative">
                <h2 className="mt-16 mb-6 text-3xl md:text-4xl font-bold text-slate-800">
                    Latest Users
                </h2>

                {/* Scrollable Content */}
                <div
                    ref={scrollRef}
                    onScroll={checkScroll}
                    className="flex gap-6 py-16 rounded-2xl overflow-x-auto scroll-smooth hide-scrollbar px-4 sm:px-6 md:px-8 lg:px-10"
                >
                    {sampleItems.map((item) => (
                        <div key={item.id}>
                            <ProductCard item={item} />
                        </div>
                    ))}
                </div>

                {/* Arrow Controls */}
                <div className="mb-28 p-6 flex justify-center gap-3">
                    {/* Left Arrow */}
                    <button
                        onClick={() => scrollByAmount(-300)}
                        className={`${canScrollLeft ? "scale-100 opacity-100 hover:scale-105" : "scale-70 opacity-50"} bg-white rounded-full p-2 cursor-pointer text-slate-700 border border-neutral-200 focus:ring ring-blue-200 transition-all duration-300`}
                    >
                        <IoChevronDown size={20} className="rotate-90" />
                    </button>

                    {/* Right Arrow */}
                    <button
                        onClick={() => scrollByAmount(300)}
                        className={`${canScrollRight ? "scale-100 opacity-100 hover:scale-105" : "scale-70 opacity-50"} bg-white rounded-full p-2 cursor-pointer text-slate-700 border border-neutral-200 focus:ring ring-blue-200 transition-all duration-300`}
                    >
                        <IoChevronDown size={20} className="-rotate-90" />
                    </button>
                </div>

                <h2 className="mt-16 mb-10 text-center text-3xl md:text-4xl font-bold text-slate-800">
                    👍 From our happy <em className="text-blue-500">users<span className="text-2xl">🩵</span></em>
                </h2>

                <div className="flex items-center justify-center gap-6 flex-wrap mb-26">
                    {[
                        {
                            user: "Sophie Turner", thumbnail: "https://randomuser.me/api/portraits/women/44.jpg", description:
                                `I used to struggle with managing all my social links and online profiles.
                                With BioLink, I can finally have one clean, beautifully designed page
                                where everything lives. The setup was so quick, and I love that I can
                                update it anytime without needing any tech skills. My engagement has
                                gone up because people actually click on my links now.`
                        },
                        {
                            user: "James Miller", thumbnail: "https://randomuser.me/api/portraits/men/32.jpg", description:
                                `As a small business owner, I needed something that didn't just look
                                professional, but also made it easy for customers to find everything
                                in one place. BioLink exceeded my expectations. It's fast, easy to edit,
                                and the design is so clean that it feels custom-made. My customers keep
                                telling me how much easier it is to connect with my services now.`
                        },
                        {
                            user: "Maria Lopez", thumbnail: "https://randomuser.me/api/portraits/women/65.jpg", description:
                                `I'm not very tech-savvy, but BioLink made me feel like a pro.
                                I was able to set everything up in just a few minutes, and now
                                my followers can find my content, store, and socials without
                                any confusion. I even got compliments about how 'professional'
                                my link page looks — it's honestly the easiest win I've had online.`
                        },
                    ].map((feed, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-2xl shadow-lg max-w-sm z-10 scale-100 hover:scale-105 transition-all duration-300 flex flex-col justify-between"
                        >
                            {/* Rating & Header */}
                            <div className="flex justify-between items-center mb-4">
                                {/* Stars */}
                                <div className="flex text-yellow-400">
                                    {Array.from({ length: 5 }).map((_, idx) => (
                                        <IoStar key={idx} size={18} />
                                    ))}
                                </div>

                                {/* Feedback title */}
                                <div className="flex items-center gap-2 text-slate-700 text-sm font-medium">
                                    <span className="bg-slate-800 p-1 rounded-full flex items-center justify-center">
                                        <SlLike size={10} className="text-white" />
                                    </span>
                                    Feedback
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-neutral-600 italic leading-relaxed mb-4">
                                “{feed.description}”
                            </p>

                            {/* User Info */}
                            <div className="flex items-center gap-3 mt-auto">
                                <img
                                    src={feed.thumbnail}
                                    alt={`User ${index}`}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <span className="text-sm font-medium text-slate-800">{feed.user}</span>
                            </div>
                        </div>
                    ))}

                </div>

            </div>

        </>
    );
};

export default HomePage;
