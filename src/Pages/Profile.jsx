// Profile.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";

// Assuming backend URL is correct
const BACKEND_URL = "http://localhost:5000";

const Profile = () => {
  console.log("!!! Profile Component Rendered !!!"); // Changed log slightly for clarity

  const navigate = useNavigate();
  // Initialize userData state with default structure
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
    location: "",
    businessType: [],
    profilePicture: "",
  });
  const [password, setPassword] = useState(""); // New password input
  const [profilePictureFile, setProfilePictureFile] = useState(null); // New file object
  const [profilePicturePreview, setProfilePicturePreview] = useState(null); // URL for image display
  const [loading, setLoading] = useState(true); // Fetch loading state
  const [saving, setSaving] = useState(false); // Saving state for update button
  const [showPassword, setShowPassword] = useState(false);

  const businessOptions = ["Farmer", "Driver", "Buyer", "Seller"];

  // --- Fetch profile on mount ---
  useEffect(() => {
    let isMounted = true;
    console.log("Profile: useEffect running to fetch data.");

    const fetchProfile = async () => {
      console.log("Profile: Starting fetchProfile async function...");
      if (!isMounted) return; // Prevent fetch if already unmounted
      setLoading(true); // Ensure loading is true at the start

      try {
        const userInfoString = localStorage.getItem("userInfo");
        if (!userInfoString)
          throw new Error("No user info found in localStorage");
        const userInfo = JSON.parse(userInfoString);
        if (!userInfo?.token) throw new Error("No token found in user info");

        console.log("Profile: Token found. Making GET request to /api/auth/me");
        const response = await axios.get(`${BACKEND_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });

        if (!isMounted) return; // Check again after await
        console.log("Profile: Data fetched successfully", response.data);
        const data = response.data;

        // Set component state with fetched data
        setUserData({
          name: data.name || "",
          email: data.email || "",
          mobile: data.mobile || "",
          location: data.location || "",
          businessType: Array.isArray(data.businessType)
            ? data.businessType
            : [],
          profilePicture: data.profilePicture || "", // Store the path from DB
        });
        // Set the initial image preview URL
        setProfilePicturePreview(
          data.profilePicture
            ? `${BACKEND_URL}${data.profilePicture}`
            : "/images/dp.jpeg" // Local default image path
        );
        console.log("Profile: User data and preview state updated from fetch.");
      } catch (error) {
        console.error("Profile: Error fetching profile:", error);
        if (!isMounted) return; // Don't process error if unmounted

        let message = "Session possibly expired. Please login again.";
        if (error.response) {
          console.error("Profile Error - Status:", error.response.status);
          console.error("Profile Error - Data:", error.response.data);
          message =
            error.response.data?.message ||
            `Error (${error.response.status}). Please login.`;
          // Specifically handle 401 Unauthorized
          if (error.response.status === 401) {
            message = "Authentication failed. Please login again.";
          }
        } else if (error.request) {
          console.error("Profile Error - No response:", error.request);
          message = "Network Error. Could not reach server.";
        } else if (error.message.includes("JSON.parse")) {
          console.error("Profile Error - Corrupted localStorage data.");
          message = "Session data corrupted. Please login again.";
        } else {
          console.error("Profile Error - Other:", error.message);
          message = error.message || "An unexpected error occurred.";
        }

        toast.error(message);
        localStorage.removeItem("userInfo"); // Clear invalid session data
        navigate("/login"); // Redirect to login
      } finally {
        // Ensure loading is set to false ONLY if component is still mounted
        if (isMounted) {
          console.log("Profile: Fetch finished, setting loading false.");
          setLoading(false);
        } else {
          console.log(
            "Profile: Fetch finished, but component unmounted. Did not set loading state."
          );
        }
      }
    };

    fetchProfile(); // Call the fetch function

    // Cleanup function
    return () => {
      console.log("Profile: Cleanup running (component unmounting).");
      isMounted = false; // Set flag on unmount
    };
  }, [navigate]); // Dependency array

  // --- Input Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setUserData((prev) => {
      const currentTypes = Array.isArray(prev.businessType)
        ? prev.businessType
        : [];
      return {
        ...prev,
        businessType: checked
          ? [...currentTypes, value]
          : currentTypes.filter((type) => type !== value),
      };
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validation
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file.");
        e.target.value = null;
        return;
      }
      const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSizeInBytes) {
        toast.error("File is too large (Max 5MB).");
        e.target.value = null;
        return;
      }
      // Store file & update preview
      setProfilePictureFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setProfilePicturePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      // Clear file state & revert preview if selection cancelled
      setProfilePictureFile(null);
      setProfilePicturePreview(
        userData?.profilePicture
          ? `${BACKEND_URL}${userData.profilePicture}`
          : "/images/dp.jpeg"
      );
    }
  };

  // --- Save Handler ---
  const handleSave = async () => {
    console.log("Profile: Save changes initiated.");
    // Validation
    if (!userData?.name || !userData?.mobile) {
      toast.error("Name and Mobile cannot be empty.");
      return;
    }
    if (!userData?.businessType || userData.businessType.length === 0) {
      toast.error("Please select at least one business type.");
      return;
    }
    if (password && password.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }

    setSaving(true); // Start saving indicator
    try {
      const userInfoString = localStorage.getItem("userInfo");
      const userInfo = JSON.parse(userInfoString || "{}");
      if (!userInfo?.token) throw new Error("Authentication token missing.");

      // Create FormData
      const updateData = new FormData();
      updateData.append("name", userData.name.trim());
      updateData.append("mobile", userData.mobile.trim());
      updateData.append(
        "location",
        userData.location ? userData.location.trim() : ""
      );
      updateData.append("businessType", JSON.stringify(userData.businessType));
      if (password) updateData.append("password", password);
      if (profilePictureFile instanceof File)
        updateData.append("profilePicture", profilePictureFile);

      console.log("Profile: Sending PUT request to /api/auth/profile");
      // Make PUT request
      const response = await axios.put(
        `${BACKEND_URL}/api/auth/profile`, // Ensure endpoint is correct
        updateData,
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );

      const updatedDataFromServer = response.data;
      console.log("Profile updated successfully:", updatedDataFromServer);
      toast.success("Profile updated successfully!"); // Show success message

      // Update component state with response data
      setUserData({
        ...userData, // Keep email
        name: updatedDataFromServer.name,
        mobile: updatedDataFromServer.mobile,
        location: updatedDataFromServer.location,
        businessType: updatedDataFromServer.businessType,
        profilePicture: updatedDataFromServer.profilePicture, // Use new path from server
      });
      // Update preview with new path from server
      setProfilePicturePreview(
        updatedDataFromServer.profilePicture
          ? `${BACKEND_URL}${updatedDataFromServer.profilePicture}`
          : "/images/dp.jpeg"
      );
      // Clear temporary states
      setProfilePictureFile(null);
      setPassword("");

      // Update localStorage
      const updatedLocalStorageUserInfo = {
        ...userInfo,
        name: updatedDataFromServer.name,
        profilePicture: updatedDataFromServer.profilePicture,
      };
      localStorage.setItem(
        "userInfo",
        JSON.stringify(updatedLocalStorageUserInfo)
      );
      // Notify Header/other components
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      console.error("Error updating profile:", error.response || error);
      toast.error(error.response?.data?.message || "Failed to update profile.");
      if (error.response?.status === 401) {
        localStorage.removeItem("userInfo");
        navigate("/login");
      }
    } finally {
      setSaving(false); // Stop saving indicator
    }
  };

  // --- Cancel Handler ---
  const handleCancel = () => {
    console.log("Profile: Cancel button clicked.");
    // Maybe navigate back or to dashboard
    navigate("/dashboard/farmer"); // Adjust as needed
  };

  // --- Render Logic ---

  // 1. Loading state
  if (loading) {
    return <div className="p-10 text-center">Loading profile...</div>;
  }

  // 2. Error state (if fetch failed but didn't redirect - should be rare)
  // Check a required field like email to ensure data is loaded
  if (!userData?.email) {
    return (
      <div className="p-10 text-center text-red-500">
        Failed to load profile data. You may need to log in again.
      </div>
    );
  }

  // 3. Main form render
  return (
    // Using your provided JSX structure and classes
    <div className="max-w-4xl p-6 mx-auto mt-5 mb-5 bg-white border border-gray-300 rounded-lg shadow-md">
      <h1 className="mb-6 text-2xl font-bold text-center text-gray-700">
        Update Your Profile
      </h1>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center mb-6">
          <label
            htmlFor="profilePictureFile"
            className="block mb-2 font-medium text-gray-700"
          >
            Profile Picture
          </label>
          {profilePicturePreview ? (
            <img
              src={profilePicturePreview}
              alt="Profile Preview"
              className="object-cover w-32 h-32 mb-3 rounded-full ring-2 ring-offset-2 ring-green-400"
              // Add error handler for the preview image itself
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/dp.jpeg";
              }}
            />
          ) : (
            <div className="flex items-center justify-center w-32 h-32 mb-3 bg-gray-200 rounded-full">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
          <input
            type="file"
            id="profilePictureFile"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full max-w-xs text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          />
          <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 5MB.</p>
        </div>

        {/* Grid for text fields */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block font-medium">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>
          {/* Mobile */}
          <div>
            <label htmlFor="mobile" className="block font-medium">
              Mobile <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={userData.mobile}
              onChange={handleInputChange}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              disabled
              readOnly
              className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-lg cursor-not-allowed"
            />
          </div>
          {/* Location */}
          <div>
            <label htmlFor="location" className="block font-medium">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={userData.location}
              onChange={handleInputChange}
              placeholder="e.g., City, State or Lat,Lon"
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Business Type */}
        <div className="pt-2">
          <label className="block font-medium">
            {" "}
            Business Type <span className="text-red-500">*</span>{" "}
          </label>
          <div className="grid grid-cols-2 gap-2 mt-2 md:grid-cols-4">
            {businessOptions.map((option) => (
              <label key={option} className="inline-flex items-center">
                {" "}
                {/* Use inline-flex for better alignment */}
                <input
                  type="checkbox"
                  id={`business-${option}`} // Unique ID
                  value={option}
                  checked={userData.businessType.includes(option)}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 mr-2 text-green-600 border-gray-300 rounded focus:ring-green-500" // Adjusted checkbox size/style slightly
                />
                <span className="ml-2 text-sm text-gray-700">{option}</span>{" "}
                {/* Adjusted label style */}
              </label>
            ))}
          </div>
        </div>

        {/* Password */}
        <div className="pt-2">
          {" "}
          {/* Using pt-2 like Business Type */}
          <label htmlFor="password" className="block font-medium">
            New Password (optional)
          </label>{" "}
          {/* Adjusted label text */}
          <div className="relative flex items-center mt-1">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave blank to keep current password" // Changed placeholder
              className="w-full p-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" // Added pr-10 for icon space
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700" // Adjusted styling
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Enter only if you want to change your password (min 6 chars).
          </p>{" "}
          {/* Help text */}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end pt-4 space-x-4">
          {" "}
          {/* Adjusted padding */}
          <button
            type="button"
            onClick={handleCancel}
            disabled={saving} // Disable if saving
            className="px-6 py-2 font-semibold text-gray-700 transition duration-150 ease-in-out bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 disabled:opacity-50" // Adjusted styles
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || loading} // Disable if saving OR initially loading
            className="px-6 py-2 font-semibold text-white transition duration-150 ease-in-out bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed" // Adjusted styles
          >
            {saving ? "Saving..." : "Save Changes"}{" "}
            {/* Show saving state text */}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
