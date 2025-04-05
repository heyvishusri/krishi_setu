import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import {
  FaEye,
  FaEyeSlash,
  FaTractor,
  FaTruck,
  FaShoppingCart,
  FaStore,
} from "react-icons/fa";

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false); // State to manage form minimization
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSave = () => {
    setIsMinimized(true); // Minimize the form
  };

  const handleCancel = () => {
    navigate("/dashboard"); // Navigate back to the Dashboard page
  };

  return (
    <div className="max-w-4xl p-6 mx-auto bg-white border border-gray-200 rounded-lg shadow-md">
      {!isMinimized ? (
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Profile Picture Section */}
          <div className="flex items-center pb-6 mb-6 space-x-4 border-b border-gray-200">
            <img
              src="\images\dp.jpeg"
              alt="Profile"
              className="object-cover w-20 h-20 border border-gray-300 rounded-full"
            />
            <div>
              <p className="text-sm text-gray-500">
                Allowed JPG, GIF, PNG, MAX 800K
              </p>
              <div className="flex mt-2 space-x-4">
                {/* Select Profile Pic Button */}
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300"
                >
                  Select Profile Pic
                </button>

                {/* Remove Profile Pic Button */}
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200"
                >
                  Remove Profile Pic
                </button>
              </div>
            </div>
          </div>

          {/* Input Fields Grid */}
          <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                defaultValue="Vishwash Kumar"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                E-mail
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                defaultValue="vkumaro8o@rku.ac.in"
                required
              />
            </div>

            {/* Mobile Field */}
            <div>
              <label
                htmlFor="mobile"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Mobile
              </label>
              <input
                type="tel"
                id="mobile"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                defaultValue="09546741465"
                pattern="[0-9]{10,11}"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10"
                  defaultValue="************"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 cursor-pointer hover:text-gray-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>

          {/* Address Field */}
          <div className="mb-6">
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Address
            </label>
            <textarea
              id="address"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              defaultValue="RK University main campus , Bhavnagar Highway,Tramba, Rajkot Gujarat - 360020"
            ></textarea>
          </div>

          {/* Profession Field */}
          <div className="mb-8">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Profession
            </label>
            <div className="p-4 space-y-2 border border-gray-300 rounded-lg">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                  defaultChecked
                />
                <FaTractor className="text-gray-600" />
                <span className="text-gray-700">Farmer</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                  defaultChecked
                />
                <FaTruck className="text-gray-600" />
                <span className="text-gray-700">Drivers</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                  defaultChecked
                />
                <FaShoppingCart className="text-gray-600" />
                <span className="text-gray-700">Buyer</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                  defaultChecked
                />
                <FaStore className="text-gray-600" />
                <span className="text-gray-700">Seller</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleSave}
              className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700">
            Profile saved successfully!
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
