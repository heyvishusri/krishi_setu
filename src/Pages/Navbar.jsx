import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom'; // Import Outlet
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    // Sidebar icons
    faStore,
    faTractor,
    faTruck,
    faUserTie,
    faUser,
    faNewspaper,
    faCloudSunRain,
    faClipboardList,
    faShoppingCart,
    // Header icons (ensure these are imported)
    faUserCircle,
    faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
   
   
 // State for Sidebar sections
 const [expandedSection, setExpandedSection] = useState(null);
 // State for Header profile dropdown
 const [showProfileDropdown, setShowProfileDropdown] = useState(false);

 const navigate = useNavigate();

 // --- Sidebar Logic ---
 
 const toggleSection = (section) => {
     setExpandedSection(expandedSection === section ? null : section);
 };

 // --- Header Logic ---
 const handleLogout = () => {
     console.log("Logout Action Triggered");
     // --- TODO: Add your actual logout logic ---
     setShowProfileDropdown(false); // Close dropdown
     navigate('/'); // Redirect to login page
 };

 // --- Profile Picture Placeholder ---
 const userProfilePic = "/images/dp.jpeg"; // Default or fetched user image (Ensure this path is correct)
    return (
        <div className="flex min-h-screen bg-gray-100"> {/* Overall container: Sidebar + Main Area */}

            {/* ==================== Sidebar ==================== */}
            <div className="w-64 p-4 bg-green-100 shadow-lg flex flex-col flex-shrink-0">
                {/* Logo Section */}
                <div className="flex items-center mb-6">
                    <img
                        src="/images/logo.jpeg" // Use your actual logo path
                        alt="KrishiSetu Logo"
                        className="mr-3 rounded-full"
                        width={30}
                        height={30}
                    />
                    <span className="text-2xl font-bold text-green-800">KRISHISETU</span>
                </div>

                {/* Navigation */}
                <nav className="space-y-2 flex-grow">
                    {/* --- Krishi Bazar Section --- */}
                    <div>
                        <button
                            onClick={() => toggleSection("krishiBazar")}
                            className={`flex items-center w-full p-3 text-black rounded-lg hover:bg-green-300 ${expandedSection === "krishiBazar" ? 'bg-green-200' : ''}`} // Optional: highlight active section
                        >
                            <FontAwesomeIcon icon={faStore} className="mr-3" size="lg" />
                            Krishi Bazar
                        </button>
                        {expandedSection === "krishiBazar" && (
                            <div className="pl-6 mt-1 space-y-1">
                                <Link to="/dashboard/Farmer" className="block w-full p-2 text-sm text-black rounded-lg hover:bg-green-400"> {/* Use Link directly for cleaner code */}
                                    <FontAwesomeIcon icon={faTractor} className="mr-3" /> Farmer
                                </Link>
                                <Link to="/dashboard/driver" className="block w-full p-2 text-sm text-black rounded-lg hover:bg-green-400">
                                    <FontAwesomeIcon icon={faTruck} className="mr-3" /> Driver
                                </Link>
                                <Link to="/dashboard/seller" className="block w-full p-2 text-sm text-black rounded-lg hover:bg-green-400">
                                    <FontAwesomeIcon icon={faUserTie} className="mr-3" /> Seller
                                </Link>
                                <Link to="/dashboard/buyer" className="block w-full p-2 text-sm text-black rounded-lg hover:bg-green-400">
                                    <FontAwesomeIcon icon={faUser} className="mr-3" /> Buyer
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* --- Krishi Posts Section --- */}
                    <div>
                        <button
                            onClick={() => toggleSection("krishiPosts")}
                            className={`flex items-center w-full p-3 text-black rounded-lg hover:bg-green-300 ${expandedSection === "krishiPosts" ? 'bg-green-200' : ''}`}
                        >
                            <FontAwesomeIcon icon={faNewspaper} className="mr-3" size="lg" />
                            Krishi Posts
                        </button>
                        {expandedSection === "krishiPosts" && (
                            <div className="pl-6 mt-1 space-y-1">
                                <Link to="/dashboard/farmer-post" className="block w-full p-2 text-sm text-black rounded-lg hover:bg-green-400">
                                    <FontAwesomeIcon icon={faClipboardList} className="mr-3" /> Farmer Post
                                </Link>
                                <Link to="/dashboard/driver-post" className="block w-full p-2 text-sm text-black rounded-lg hover:bg-green-400">
                                    <FontAwesomeIcon icon={faTruck} className="mr-3" /> Driver Post
                                </Link>
                                <Link to="/dashboard/seller-post" className="block w-full p-2 text-sm text-black rounded-lg hover:bg-green-400">
                                    <FontAwesomeIcon icon={faStore} className="mr-3" /> Seller Post
                                </Link>
                                <Link to="/dashboard/buyer-post" className="block w-full p-2 text-sm text-black rounded-lg hover:bg-green-400">
                                    <FontAwesomeIcon icon={faShoppingCart} className="mr-3" /> Buyer Post
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* --- Weather Section --- */}
                    <Link to="/dashboard/weather" className="block w-full p-3 text-black rounded-lg hover:bg-green-300"> {/* Use Link directly */}
                            <FontAwesomeIcon icon={faCloudSunRain} className="mr-3" size="lg" />
                            Weather
                    </Link>
                </nav>
            </div>
            {/* ================= End Sidebar ==================== */}


            {/* ==================== Main Content Area ==================== */}
            <div className="flex-1 flex flex-col"> {/* Stacks Header and Content vertically */}

                {/* --- Header Bar (The Top Row) --- */}
                {/* `justify-start` keeps items at the start (left) */}
                {/* `px-4` provides horizontal padding */}
                {/* `items-center` vertically aligns items */}
                {/* `sticky top-0 z-30` makes it stick */}
                <div className="bg-white shadow-md px-4 py-2 flex justify-start items-center sticky top-0 z-30 w-full">

                    {/* Left side of header - Profile Dropdown */}
                    {/* `relative` is needed for the absolute positioned dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                            className="flex items-center p-1 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            aria-label="User menu"
                            aria-haspopup="true"
                        >
                            <img
                                src={userProfilePic} // Ensure this image path is correct and accessible
                                alt="Profile"
                                className="w-8 h-8 rounded-full object-cover"
                            />
                        </button>

                        {/* Dropdown Panel */}
                        {showProfileDropdown && (
                            <div
                                // `absolute left-0` positions dropdown below the icon on the left
                                className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-50 ring-1 ring-black ring-opacity-5"
                                role="menu"
                                aria-orientation="vertical"
                            >
                                <button
                                    onClick={() => {
                                        navigate('/profile');
                                        setShowProfileDropdown(false);
                                    }}
                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                                    role="menuitem"
                                >
                                    <FontAwesomeIcon icon={faUserCircle} className="mr-2 w-4 h-4" />
                                    Profile
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-green-50"
                                    role="menuitem"
                                >
                                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 w-4 h-4" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                    {/* --- End Profile Dropdown Container --- */}

                    {/* You could add other header elements here if needed later */}
                    {/* e.g., <span className="ml-4 text-xl font-semibold">Dashboard</span> */}

                </div>
                {/* --- End Header Bar --- */}


                {/* --- Page Content (Rendered Below Header) --- */}
                <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto bg-gray-100"> {/* Use main bg color here */}
                    <Outlet /> {/* Child routes are rendered here */}
                </main>
                {/* --- End Page Content --- */}

            </div>
            {/* ================= End Main Content Area ==================== */}
        </div>
    );
};

export default Navbar;