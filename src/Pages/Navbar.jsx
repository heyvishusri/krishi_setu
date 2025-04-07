import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStore,
  faTractor,
  faTruck,
  faUserTie,
  faUser,
  faNewspaper,
  faCloudSunRain,
  faClipboardList,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  // State for Sidebar sections
  const [expandedSection, setExpandedSection] = useState(null);

  // --- Sidebar Logic ---
  const toggleSection = (section) => {
    setExpandedSection((prevSection) =>
      prevSection === section ? null : section
    );
  };

  const fetchFarmers = async () => {
    const response = await fetch("http://localhost:5000/farmers");
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    fetchFarmers();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1">
        {/* ==================== Sidebar ==================== */}
        <div className="flex flex-col flex-shrink-0 w-64 p-4 bg-green-100 shadow-lg">
          {/* Logo Section */}
          <div className="flex items-center mb-6">
            <img
              src="/images/logo.jpeg"
              alt="KrishiSetu Logo"
              className="mr-3 rounded-full"
              width={30}
              height={30}
            />
            <span className="text-2xl font-bold text-green-800">
              KRISHISETU
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-grow space-y-2">
            {/* --- Krishi Bazar Section --- */}
            <div>
              <button
                onClick={() => toggleSection("krishiBazar")}
                className={`flex items-center w-full p-3 text-black rounded-lg hover:bg-green-300 ${
                  expandedSection === "krishiBazar" ? "bg-green-200" : ""
                }`}
              >
                <FontAwesomeIcon icon={faStore} className="mr-3" size="lg" />
                Krishi Bazar
              </button>
              {expandedSection === "krishiBazar" && (
                <div className="pl-6 mt-1 space-y-1">
                  <Link
                    to="/dashboard/Farmer"
                    className="block w-full p-2 text-sm text-black rounded-lg hover:bg-green-400"
                  >
                    <FontAwesomeIcon icon={faTractor} className="mr-3" /> Farmer
                  </Link>
                  <Link
                    to="/dashboard/driver"
                    className="block w-full p-2 text-sm text-black rounded-lg hover:bg-green-400"
                  >
                    <FontAwesomeIcon icon={faTruck} className="mr-3" /> Driver
                  </Link>
                  <Link
                    to="/dashboard/seller"
                    className="block w-full p-2 text-sm text-black rounded-lg hover:bg-green-400"
                  >
                    <FontAwesomeIcon icon={faUserTie} className="mr-3" /> Seller
                  </Link>
                  <Link
                    to="/dashboard/buyer"
                    className="block w-full p-2 text-sm text-black rounded-lg hover:bg-green-400"
                  >
                    <FontAwesomeIcon icon={faUser} className="mr-3" /> Buyer
                  </Link>
                </div>
              )}
            </div>

            {/* --- Krishi Posts Section --- */}
            <div>
              <button
                onClick={() => toggleSection("krishiPosts")}
                className={`flex items-center w-full p-3 text-black rounded-lg hover:bg-green-300 ${
                  expandedSection === "krishiPosts" ? "bg-green-200" : ""
                }`}
              >
                <FontAwesomeIcon
                  icon={faNewspaper}
                  className="mr-3"
                  size="lg"
                />
                Krishi Posts
              </button>
              {expandedSection === "krishiPosts" && (
                <div className="pl-6 mt-1 space-y-1">
                  <Link
                    to="/dashboard/FarmerPost"
                    className="block w-full p-2 text-sm text-black rounded-lg hover:bg-green-400"
                  >
                    <FontAwesomeIcon icon={faClipboardList} className="mr-3" />{" "}
                    Farmer Post
                  </Link>
                  <Link
                    to="/dashboard/DriverPost"
                    className="block w-full p-2 text-sm text-black rounded-lg hover:bg-green-400"
                  >
                    <FontAwesomeIcon icon={faTruck} className="mr-3" /> Driver
                    Post
                  </Link>
                  <Link
                    to="/dashboard/SellerPost"
                    className="block w-full p-2 text-sm text-black rounded-lg hover:bg-green-400"
                  >
                    <FontAwesomeIcon icon={faStore} className="mr-3" /> Seller
                    Post
                  </Link>
                  <Link
                    to="/dashboard/BuyerPost"
                    className="block w-full p-2 text-sm text-black rounded-lg hover:bg-green-400"
                  >
                    <FontAwesomeIcon icon={faShoppingCart} className="mr-3" />{" "}
                    Buyer Post
                  </Link>
                </div>
              )}
            </div>

            {/* --- Weather Section --- */}
            <Link
              to="/dashboard/weather"
              className="block w-full p-3 text-black rounded-lg hover:bg-green-300"
            >
              <FontAwesomeIcon
                icon={faCloudSunRain}
                className="mr-3"
                size="lg"
              />
              Weather
            </Link>
          </nav>
        </div>
        {/* ================= End Sidebar ==================== */}

        {/* ==================== Main Content Area ==================== */}
        <main className="flex-1 p-4 overflow-y-auto bg-gray-100 md:p-6 lg:p-8">
          <Outlet />
        </main>
        {/* ================= End Main Content Area ==================== */}
      </div>
    </div>
  );
};

export default Navbar;
