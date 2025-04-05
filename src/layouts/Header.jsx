import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom"; // Import useLocation for tracking current page
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // State for logout confirmation modal
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const handleLogout = () => {
    setShowLogoutConfirm(true); // Show confirmation modal
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(false); // Close modal
    navigate("/"); // Redirect to login page
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false); // Close modal
    navigate(location.pathname); // Redirect back to the current page
  };

  return (
    <div className="sticky top-0 z-40 w-full bg-white shadow-sm">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Centered Header Title */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-green-800">
            Profile Information
          </span>
        </div>

        {/* Profile Dropdown */}
        <div className="relative ml-auto">
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center p-1 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            aria-label="User menu"
            aria-haspopup="true"
          >
            <img
              src="/images/dp.jpeg"
              alt="Profile"
              className="object-cover w-10 h-10 rounded-full"
            />
          </button>
          {showProfileDropdown && (
            <div
              className="absolute right-0 z-50 w-48 py-1 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
              role="menu"
              aria-labelledby="user-menu"
            >
              <Link
                to="/dashboard/profile" // Navigate to the Profile page
                onClick={() => setShowProfileDropdown(false)} // Close dropdown on click
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                <FontAwesomeIcon icon={faUserCircle} className="w-4 h-4 mr-2" />
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                role="menuitem"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-bold text-gray-800">Confirm Logout</h2>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-end mt-4 space-x-4">
              <button
                onClick={confirmLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
              >
                Confirm
              </button>
              <button
                onClick={cancelLogout}
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
