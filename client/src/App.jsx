import { Route, Routes, useLocation } from "react-router-dom";
import AccountPage from "./page/Account";
import Header from "./component/Header";
import FooterPage from "./component/Footer";
import HomePage from "./page/Home";
import { IoIosArrowUp } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import ExplorePage from "./page/Explore";
import FeaturesPage from "./page/Features";
import PricingPage from "./page/Pricing";
import MessagesPage from "./page/Messages";
import Design from "./component/Design";
import NotFoundPage from "./component/NotFound";

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [footerThemeEffect, setFooterThemeEffect] = useState(false);
  const footerThemeRef = useRef();

  // Show button when scroll is 300px down
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const footerTop = footerThemeRef.current?.offsetTop || 0;
      const windowHeight = window.innerHeight;

      // Show scroll-to-top button after 300px
      setIsVisible(scrollPos > 300);

      // Change theme when bottom part reaches footer
      if (scrollPos + windowHeight >= footerTop) {
        setFooterThemeEffect(true);
      } else {
        setFooterThemeEffect(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const location = useLocation();

  return (
    <div className="text-neutral-900 relative overflow-x-hidden bg-gradient-to-br from-[#f8f9fa] via-[#f1f2f6] to-[#f8f9fa]">
      {/* Blurry background shapes */}
      {location.pathname === "/" && (
        <>
          <div className="fixed -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 blur-[120px] opacity-40"></div>
          <div className="fixed top-1/4 right-[10%] w-[250px] h-[250px] rounded-full bg-gradient-to-tr from-yellow-200 via-green-200 to-blue-200 blur-[100px] opacity-35"></div>
          <div className="fixed bottom-1/3 left-[20%] w-[300px] h-[300px] rounded-full bg-gradient-to-tl from-orange-200 via-pink-200 to-purple-200 blur-[110px] opacity-40"></div>
          <div className="fixed bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-gradient-to-bl from-green-200 via-blue-200 to-purple-200 blur-[130px] opacity-30"></div>
        </>
      )}
      <div className="relative z-10 text-[12px]">
        {/* Header */}
        <Header onTheme={footerThemeEffect} />

        {/* Main content */}
        <main className={`${location.pathname === "/account" ? null : "max-w-6xl mx-auto p-5 pt-24"}`}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/account/messages" element={<MessagesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/account/design" element={<Design />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <div ref={footerThemeRef}>
          <FooterPage />
        </div>
      </div>

      {/* Scroll-to-top button */}
      <button
        onClick={scrollToTop}
        className={`
          ${isVisible ? "scale-100" : "scale-0"} fixed z-50 hover:scale-105 bottom-6 right-6 
        ${footerThemeEffect === false ? "bg-white text-slate-700 border-neutral-200" : "bg-slate-900 text-white border-slate-700"} 
        shadow-md rounded-full p-3 flex items-center justify-center cursor-pointer border focus:ring ring-blue-300 transition-all duration-300`}
      >
        <IoIosArrowUp size={20} />
      </button>
    </div>
  );
}

export default App;