import { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthProvider";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    // যতক্ষণ ডাটা লোড হচ্ছে ততক্ষণ লোডিং স্পিনার দেখাবে
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-indigo-600"></span>
            </div>
        );
    }

    // ইউজার থাকলে মেইন পেজ দেখাবে
    if (user) {
        return children;
    }

    // ইউজার না থাকলে লগইন পেজে পাঠিয়ে দিবে
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;