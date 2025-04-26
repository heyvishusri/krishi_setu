import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

// Ensure this points to your running backend server
const BACKEND_URL = "http://localhost:5000";

function Signup() {
  const navigate = useNavigate(); // Hook for navigation
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    location: "",
    businessType: [],
    password: "",
    confirmPassword: "",
    profilePicture: null,
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const businessOptions = ["Farmer", "Driver", "Buyer", "Seller"];

  // --- Input Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      businessType: checked
        ? [...prev.businessType, value] // Add to array if checked
        : prev.businessType.filter((type) => type !== value), // Remove if unchecked
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Client-side validation (optional but recommended)
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file (jpg, png, gif).");
        e.target.value = null; // Reset file input
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit (matches backend)
        toast.error("File is too large. Maximum size is 5MB.");
        e.target.value = null; // Reset file input
        return;
      }
      // Update state and preview
      setFormData((prev) => ({ ...prev, profilePicture: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      // Clear if no file is selected
      setFormData((prev) => ({ ...prev, profilePicture: null }));
      setPreview(null);
    }
  };

  // --- Geolocation Handler ---
  const getLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported by browser.");
      return;
    }
    toast.loading("Fetching your location...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        toast.dismiss(); // Remove loading toast
        const { latitude, longitude } = position.coords;
        const lat = latitude.toFixed(6); // Keep reasonable precision
        const lon = longitude.toFixed(6);
        setFormData((prev) => ({
          ...prev,
          location: `${lat},${lon}`,
        }));
        toast.success("Location fetched!");
      },
      (error) => {
        toast.dismiss(); // Remove loading toast
        console.error("Geolocation Error:", error);
        toast.error("Failed to fetch location. Please enter manually.");
      }
    );
  };

  // --- Form Submission Handler ---
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Indicate loading state

    // --- Client-side Validations ---
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      setLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }
    if (formData.businessType.length === 0) {
      toast.error("Select at least one business type.");
      setLoading(false);
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      // Basic email format check
      toast.error("Please enter a valid email address.");
      setLoading(false);
      return;
    }
    if (!/^\+?[0-9\s-()]{7,15}$/.test(formData.mobile)) {
      // Basic mobile format check
      toast.error("Please enter a valid mobile number.");
      setLoading(false);
      return;
    }
    // Check other required fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.mobile ||
      !formData.location
    ) {
      toast.error(
        "Please fill all required fields (Name, Email, Mobile, Location, Business Type)."
      );
      setLoading(false);
      return;
    }
    // --- End Validations ---

    // --- Prepare FormData for submission (including file if present) ---
    const data = new FormData();
    data.append("name", formData.name.trim());
    data.append("email", formData.email.trim());
    data.append("mobile", formData.mobile.trim());
    data.append("location", formData.location.trim());
    // Send businessType array as a JSON string
    data.append("businessType", JSON.stringify(formData.businessType));
    data.append("password", formData.password); // Password doesn't usually need trimming
    // Only append the file if it's actually a File object
    if (formData.profilePicture instanceof File) {
      data.append("profilePicture", formData.profilePicture);
    }
    // --- End Prepare FormData ---

    // --- Log FormData Before Sending (for debugging) ---
    console.log("Signup FormData entries being sent:");
    for (let pair of data.entries()) {
      console.log(pair[0] + ": " + pair[1]); // Log key-value pairs
    }
    // --- End Log Data ---

    // --- Send Request to Backend ---
    try {
      // Make the POST request to the registration endpoint
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/register`,
        data,
        {
          headers: {
            // Axios usually sets this automatically for FormData, but explicit is fine
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Signup Success Response:", response.data); // Log backend response

      // *** MODIFICATION APPLIED HERE ***
      // Navigate to the Login page on successful registration
      // Pass the success message via location state object
      navigate("/login", {
        replace: true, // Replace the current entry in history stack
        state: { message: "Registration Successful! Please Login." }, // Pass the message
      });
      // *** END OF MODIFICATION ***
      // Note: The success toast is REMOVED from here. It will be shown on the Login page.
    } catch (error) {
      // --- Handle Errors ---
      console.error("Signup Error:", error); // Log the full error
      let errorMsg = "Signup failed. Please try again."; // Default error message

      // Check for specific error types
      if (error.response) {
        // The request was made and the server responded with a status code outside 2xx
        console.error("Error Response Data:", error.response.data);
        console.error("Error Response Status:", error.response.status);
        // Use the message from the backend response if available
        errorMsg =
          error.response.data?.message ||
          `Server Error: ${error.response.status}`;
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error Request:", error.request);
        errorMsg =
          "Network Error: Could not connect to the server. Is it running?";
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Setup Error Message:", error.message);
        errorMsg = `An error occurred: ${error.message}`;
      }
      toast.error(errorMsg); // Display the error message to the user
    } finally {
      // This block always executes, whether try succeeded or catch was triggered
      setLoading(false); // Reset loading state
    }
  };

  // --- Return JSX ---
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        {/* Logo and Title */}
        <div className="text-center">
          <img
            src="/images/logo.jpeg" // Ensure this path is correct relative to your public folder
            alt="Krishisetu Logo"
            className="mx-auto mb-4 rounded-full"
            width={60}
            height={60}
          />
          <h1 className="text-2xl font-bold text-green-700">KRISHISETU</h1>
        </div>

        <h2 className="text-xl font-semibold text-center text-green-600">
          Create Your Account 👇
        </h2>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Enter your full name"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>
          {/* Mobile Field */}
          <div>
            <label
              htmlFor="mobile"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Mobile <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              required
              placeholder="Enter mobile number"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>
          {/* Location Field */}
          <div>
            <label
              htmlFor="location"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Location <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                placeholder="Latitude,Longitude or use button"
                className="flex-1 px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={getLocation}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                aria-label="Get current location"
              >
                {" "}
                Get Location{" "}
              </button>
            </div>
          </div>
          {/* Business Type Checkboxes */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Business Type <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {businessOptions.map((option) => (
                <label
                  key={option}
                  className="flex items-center text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={option}
                    checked={formData.businessType.includes(option)}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 mr-2 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />{" "}
                  {option}{" "}
                </label>
              ))}
            </div>
          </div>
          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              minLength={6}
              placeholder="Minimum 6 characters"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              aria-describedby="password-help"
            />
            <p id="password-help" className="mt-1 text-xs text-gray-500">
              Must be at least 6 characters long.
            </p>
          </div>
          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              minLength={6}
              placeholder="Confirm your password"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>
          {/* Profile Picture Input */}
          <div>
            <label
              htmlFor="profilePicture"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              {" "}
              Profile Picture (Optional){" "}
            </label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              accept="image/png, image/jpeg, image/gif"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              aria-describedby="profile-picture-help"
            />
            <p id="profile-picture-help" className="mt-1 text-xs text-gray-500">
              PNG, JPG, GIF up to 5MB.
            </p>
            {/* Image Preview */}
            {preview && (
              <img
                src={preview}
                alt="Profile preview"
                className="object-cover w-24 h-24 mt-3 rounded-full ring-2 ring-offset-2 ring-green-400"
              />
            )}
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 mt-4 text-white rounded-lg font-semibold bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out ${
              loading ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {/* Show spinner or text based on loading state */}
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="w-5 h-5 mr-2 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing Up...
              </span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Link to Login Page */}
        <p className="mt-6 text-sm text-center text-gray-600">
          {" "}
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-green-600 hover:text-green-500 hover:underline"
          >
            {" "}
            Login here{" "}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
