import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, Link } from "react-router-dom";
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
  const [dropdown, setDropdown] = useState(null);
  const navigate = useNavigate();

  const toggleDropdown = (section) => {
    setDropdown(dropdown === section ? null : section);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 p-4 bg-green-100 shadow-lg">
        <div className="flex items-center mb-6">
          <img
            src="/images/logo.jpeg"
            alt="Logo with a green leaf icon"
            className="mr-3 rounded-full"
            width={30}
            height={30}
          />
          <span className="text-2xl font-bold text-green-800">KRISHISETU</span>
        </div>
        <nav className="space-y-2">
          <Link to="/dashboard">
            {" "}
            <button
              onClick={() => toggleDropdown("krishiBazar")}
              className="flex items-center w-full p-3 text-black rounded-lg hover:bg-green-300"
            >
              <FontAwesomeIcon icon={faStore} className="mr-3" size="lg" />{" "}
              Krishi Bazar
            </button>
          </Link>
          {dropdown === "krishiBazar" && (
            <div className="pl-6 space-y-2">
              <button
                onClick={() => handleNavigation("/dashboard/Farmer")}
                className="flex items-center w-full p-3 text-black rounded-lg hover:bg-green-400"
              >
                <FontAwesomeIcon icon={faTractor} className="mr-3" size="lg" />{" "}
                Farmer
              </button>
              <button
                onClick={() => handleNavigation("/dashboard/driver")}
                className="flex items-center w-full p-3 text-black rounded-lg hover:bg-green-400"
              >
                <FontAwesomeIcon icon={faTruck} className="mr-3" size="lg" />{" "}
                Driver
              </button>
              <button
                onClick={() => handleNavigation("/dashboard/seller")}
                className="flex items-center w-full p-3 text-black rounded-lg hover:bg-green-400"
              >
                <FontAwesomeIcon icon={faUserTie} className="mr-3" size="lg" />{" "}
                Seller
              </button>
              <button
                onClick={() => handleNavigation("/dashboard/buyer")}
                className="flex items-center w-full p-3 text-black rounded-lg hover:bg-green-400"
              >
                <FontAwesomeIcon icon={faUser} className="mr-3" size="lg" />{" "}
                Buyer
              </button>
            </div>
          )}
          <Link to="/dashboard">
            <button
              onClick={() => toggleDropdown("krishiPosts")}
              className="flex items-center w-full p-3 text-black rounded-lg hover:bg-green-300"
            >
              <FontAwesomeIcon icon={faNewspaper} className="mr-3" size="lg" />{" "}
              Krishi Posts
            </button>
          </Link>
          {dropdown === "krishiPosts" && (
            <div className="pl-6 space-y-2">
              <button
                onClick={() => handleNavigation("/dashboard/farmer-post")}
                className="flex items-center w-full p-3 text-black rounded-lg hover:bg-green-400"
              >
                <FontAwesomeIcon
                  icon={faClipboardList}
                  className="mr-3"
                  size="lg"
                />{" "}
                Farmer Post
              </button>
              <button
                onClick={() => handleNavigation("/dashboard/driver-post")}
                className="flex items-center w-full p-3 text-black rounded-lg hover:bg-green-400"
              >
                <FontAwesomeIcon icon={faTruck} className="mr-3" size="lg" />{" "}
                Driver Post
              </button>
              <button
                onClick={() => handleNavigation("/dashboard/seller-post")}
                className="flex items-center w-full p-3 text-black rounded-lg hover:bg-green-400"
              >
                <FontAwesomeIcon icon={faStore} className="mr-3" size="lg" />{" "}
                Seller Post
              </button>
              <button
                onClick={() => handleNavigation("/dashboard/buyer-post")}
                className="flex items-center w-full p-3 text-black rounded-lg hover:bg-green-400"
              >
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="mr-3"
                  size="lg"
                />{" "}
                Buyer Post
              </button>
            </div>
          )}

          <button
            onClick={() => handleNavigation("/dashboard/weather")}
            className="flex items-center w-full p-3 text-black rounded-lg hover:bg-green-300"
          >
            <FontAwesomeIcon icon={faCloudSunRain} className="mr-3" size="lg" />{" "}
            Weather
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
