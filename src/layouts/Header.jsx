// Header.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

// Assuming your backend runs here
const BACKEND_URL = "http://localhost:5000";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Stores user info for display

  // Function to load user info from localStorage
  const fetchUserInfo = () => {
    try {
      const userInfoString = localStorage.getItem("userInfo");
      if (userInfoString) {
        const userInfo = JSON.parse(userInfoString);
        setUser(userInfo);
        // console.log("Header: User info loaded/updated", userInfo); // Keep for debugging if needed
      } else {
        setUser(null); // Clear user if no info found
        console.log("Header: No user info found in localStorage.");
      }
    } catch (error) {
      console.error(
        "Header: Failed to parse user info from localStorage",
        error
      );
      setUser(null); // Clear user on parse error
      localStorage.removeItem("userInfo"); // Clear corrupted data
    }
  };

  // Effect to load user info on initial mount AND listen for storage changes
  useEffect(() => {
    fetchUserInfo(); // Initial load

    const handleStorageChange = (event) => {
      // Listen for changes specifically to the 'userInfo' key or removal
      if (
        event.key === "userInfo" ||
        (event.key === null && !localStorage.getItem("userInfo"))
      ) {
        console.log(
          "Header: 'storage' event detected for 'userInfo'. Refetching..."
        );
        fetchUserInfo(); // Re-fetch user info if 'userInfo' changed
      }
    };

    window.addEventListener("storage", handleStorageChange);
    console.log("Header: 'storage' event listener added.");

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      console.log("Header: 'storage' event listener removed.");
    };
  }, []); // Empty dependency array: runs only on mount and unmount

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    toast.success("Logged out successfully!");
    setUser(null); // Clear user state immediately
    navigate("/login"); // Redirect to login
  };

  // --- Profile navigation handler ---
  const handleProfileClick = () => {
    // *** CORRECTED PATH: Use the actual path defined in your Router setup ***
    // Assuming it's lowercase '/dashboard/profile' based on common conventions
    const profilePath = "/dashboard/profile";
    console.log(`Header: Navigating to ${profilePath} ...`);
    navigate(profilePath);
  };

  return (
    <header className="flex items-center justify-between p-4 font-bold text-white shadow-md bg-emerald-800">
      <Link to="/dashboard" className="text-xl hover:text-gray-200">
        KrishiSetu
      </Link>
      <nav className="flex items-center space-x-4">
        {user ? (
          <>
            {/* Profile Clickable Area */}
            <div
              className="flex items-center space-x-2 cursor-pointer group"
              onClick={handleProfileClick} // Use the handler
              title="Update Profile" // Add tooltip
            >
              <img
                // Construct image URL safely
                src={
                  user.profilePicture &&
                  user.profilePicture !== "/uploads/default_avatar.png"
                    ? `${BACKEND_URL}${user.profilePicture}` // Use server path if not default
                    : "/images/dp.jpeg" // Local default/fallback
                }
                alt="Profile"
                className="object-cover w-8 h-8 transition-shadow duration-200 rounded-full ring-1 ring-offset-1 ring-offset-emerald-800 ring-white group-hover:ring-emerald-300"
                // Fallback in case image loading fails
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.src = "/images/dp.jpeg"; // Set to default local image
                }}
              />
              <span className="text-sm group-hover:text-emerald-200">
                {user.name || "User"} {/* Display name, fallback if needed */}
              </span>
            </div>
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-white rounded-md shadow-sm hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-emerald-800 focus:ring-white"
            >
              Logout
            </button>
          </>
        ) : (
          // Render login/signup if no user data in state
          <>
            <Link
              to="/login"
              className="px-3 py-1.5 text-sm rounded-md hover:bg-emerald-700"
            >
              {" "}
              Login{" "}
            </Link>
            <Link
              to="/register"
              className="px-3 py-1.5 text-sm font-semibold bg-white text-emerald-800 rounded-md shadow-sm hover:bg-emerald-50"
            >
              {" "}
              Signup{" "}
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
