import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Header from "../layouts/Header"; // Adjusted to go one level up
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
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection((prevSection) =>
      prevSection === section ? null : section
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* ==================== Sidebar ==================== */}
      <aside className="flex flex-col flex-shrink-0 w-64 p-4 bg-green-200 shadow-lg">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <img
            src="/images/logo.jpeg"
            alt="KrishiSetu Logo"
            className="border-2 border-green-700 rounded-full"
            width={35}
            height={35}
          />
          <span className="text-2xl font-extrabold tracking-wide text-emerald-800">
            KRISHISETU
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-grow space-y-2 overflow-y-auto">
          {/* --- Krishi Bazar Section --- */}
          <div className="mt-9">
            <button
              onClick={() => toggleSection("krishiBazar")}
              className={`flex items-center w-full p-3 text-left text-black rounded-lg hover:bg-green-300 ${
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
                  className="flex items-center w-full p-2 text-sm text-black rounded-lg hover:bg-green-400"
                >
                  <FontAwesomeIcon icon={faTractor} className="mr-3" />
                  Farmer
                </Link>
                <Link
                  to="/dashboard/driver"
                  className="flex items-center w-full p-2 text-sm text-black rounded-lg hover:bg-green-400"
                >
                  <FontAwesomeIcon icon={faTruck} className="mr-3" />
                  Driver
                </Link>
                <Link
                  to="/dashboard/seller"
                  className="flex items-center w-full p-2 text-sm text-black rounded-lg hover:bg-green-400"
                >
                  <FontAwesomeIcon icon={faUserTie} className="mr-3" />
                  Seller
                </Link>
                <Link
                  to="/dashboard/buyer"
                  className="flex items-center w-full p-2 text-sm text-black rounded-lg hover:bg-green-400"
                >
                  <FontAwesomeIcon icon={faUser} className="mr-3" />
                  Buyer
                </Link>
              </div>
            )}
          </div>

          {/* --- Krishi Posts Section --- */}
          <div>
            <button
              onClick={() => toggleSection("krishiPosts")}
              className={`flex items-center w-full p-3 text-left text-black rounded-lg hover:bg-green-300 ${
                expandedSection === "krishiPosts" ? "bg-green-200" : ""
              }`}
            >
              <FontAwesomeIcon icon={faNewspaper} className="mr-3" size="lg" />
              Krishi Posts
            </button>
            {expandedSection === "krishiPosts" && (
              <div className="pl-6 mt-1 space-y-1">
                <Link
                  to="/dashboard/FarmerPost"
                  className="flex items-center w-full p-2 text-sm text-black rounded-lg hover:bg-green-400"
                >
                  <FontAwesomeIcon icon={faClipboardList} className="mr-3" />
                  Farmer Post
                </Link>
                <Link
                  to="/dashboard/DriverPost"
                  className="flex items-center w-full p-2 text-sm text-black rounded-lg hover:bg-green-400"
                >
                  <FontAwesomeIcon icon={faTruck} className="mr-3" />
                  Driver Post
                </Link>
                <Link
                  to="/dashboard/SellerPost"
                  className="flex items-center w-full p-2 text-sm text-black rounded-lg hover:bg-green-400"
                >
                  <FontAwesomeIcon icon={faStore} className="mr-3" />
                  Seller Post
                </Link>
                <Link
                  to="/dashboard/BuyerPost"
                  className="flex items-center w-full p-2 text-sm text-black rounded-lg hover:bg-green-400"
                >
                  <FontAwesomeIcon icon={faShoppingCart} className="mr-3" />
                  Buyer Post
                </Link>
              </div>
            )}
          </div>

          {/* --- Weather Section --- */}
          <Link
            to="/dashboard/weather"
            className="flex items-center w-full p-3 text-black rounded-lg hover:bg-green-300"
          >
            <FontAwesomeIcon icon={faCloudSunRain} className="mr-3" size="lg" />
            Weather
          </Link>
        </nav>
      </aside>
      {/* ================= End Sidebar ==================== */}

      {/* ==================== Main Content Area ==================== */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 p-4 overflow-y-auto bg-gray-100 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Navbar;
