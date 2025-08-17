import { Link } from "react-router-dom";
import { TbError404 } from "react-icons/tb";

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex flex-col pt-16 items-center">
            <TbError404 size={180} className="text-blue-500 mb-6" />
            <h1 className="text-4xl font-bold text-slate-800 mb-4">Page Not Found</h1>
            <p className="text-slate-600 text-center text-lg max-w-md mb-6">
                Oops! The page you're looking for doesn't exist or has been moved. Let's get you back on track.
            </p>
            <Link
                to="/"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFoundPage;