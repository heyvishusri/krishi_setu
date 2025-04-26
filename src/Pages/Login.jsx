// krishi_setu/src/Pages/Login.jsx

import { useState, useEffect } from "react"; // Ensure useEffect is imported
import { Link, useNavigate, useLocation } from "react-router-dom"; // Ensure useLocation is imported
import axios from "axios";
import { toast } from "react-hot-toast"; // Ensure toast is imported

const BACKEND_URL = "http://localhost:5000";

function Login() {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get location object

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // *** This useEffect handles showing the success message ***
  useEffect(() => {
    // Check if location.state exists and has a 'message' property
    if (location.state?.message) {
      console.log(
        "Login page received message via state:",
        location.state.message
      ); // Log for debugging

      // *** Trigger the toast popup here ***
      toast.success(location.state.message);

      // **Important:** Clear the state from history after showing the message
      // This prevents the toast from re-appearing if the user navigates back/forth
      // or potentially on refresh depending on router setup.
      navigate(location.pathname, { replace: true, state: {} });
    }
    // Dependencies: Run when the component mounts or if these specific values change.
    // location.pathname and navigate are generally stable but good practice to include.
  }, [location.state, location.pathname, navigate]);
  // *** End of useEffect for message handling ***

  const handleLogin = async (e) => {
    // ... rest of the handleLogin function remains the same ...
    // (includes setLoading, API call, localStorage, navigation on successful login, error handling)
    e.preventDefault();
    setLoading(true);
    console.log("Login initiated...");

    if (!identifier || !password) {
      toast.error("Please enter both identifier (email/mobile) and password.");
      setLoading(false);
      console.log("Login stopped: Missing credentials.");
      return;
    }

    try {
      console.log(`Attempting login request to: ${BACKEND_URL}/api/auth/login`);
      console.log(`Sending identifier: ${identifier}`);

      const response = await axios.post(`${BACKEND_URL}/api/auth/login`, {
        identifier,
        password,
      });

      console.log(
        "Login API call successful. Response status:",
        response.status
      );
      console.log("Login successful data:", response.data);

      if (!response.data || !response.data.token || !response.data._id) {
        console.error(
          "Login Error: Invalid response data received from server",
          response.data
        );
        toast.error("Login failed: Received incomplete data from server.");
        setLoading(false);
        return;
      }

      console.log("Setting 'userInfo' in localStorage...");
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      console.log("'userInfo' set successfully in localStorage.");

      console.log("Showing login success toast..."); // Different toast for actual login success
      toast.success("Login Successful!"); // This is for LOGIN success, not registration
      console.log("Login success toast shown.");

      console.log("Navigating to /dashboard/Farmer...");
      navigate("/dashboard/Farmer", { replace: true });
      console.log("Navigation call supposedly complete.");
    } catch (err) {
      console.error("LOGIN CATCH BLOCK ERROR:", err);
      let message = "Login failed. Please check credentials or server status.";
      if (err.response) {
        console.error("Login failed - Response Data:", err.response.data);
        console.error("Login failed - Response Status:", err.response.status);
        message =
          err.response.data?.message || `Login failed (${err.response.status})`;
      } else if (err.request) {
        console.error("Login failed - No response received:", err.request);
        message = "Network error: Could not reach the server.";
      } else {
        console.error("Login failed - Error setting up request:", err.message);
        message = `An error occurred: ${err.message}`;
      }
      toast.error(message); // Show login error toast
      console.log("Error toast shown:", message);
    } finally {
      console.log("Executing login finally block...");
      setLoading(false);
      console.log("Login loading state set to false.");
    }
  };

  // --- Return JSX (No changes needed in the JSX structure) ---
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* ... rest of the JSX ... */}
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <img
            src="/images/logo.jpeg"
            alt="Logo with a green leaf icon"
            className="mx-auto mb-2 rounded-full"
            width={50}
            height={50}
          />
          <h1 className="text-2xl font-bold text-green-700">KRISHISETU</h1>
        </div>
        <h2 className="text-xl text-center text-green-600">
          {" "}
          Welcome back to Krishisetu🌾{" "}
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              className="block mb-1 text-sm font-medium text-gray-700"
              htmlFor="identifier"
            >
              {" "}
              Mobile Number or Email{" "}
            </label>
            <input
              type="text"
              id="identifier"
              placeholder="Enter your Mobile Number or Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              className="block mb-1 text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              {" "}
              Password{" "}
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2.5 px-4 text-sm font-medium text-white bg-green-600 rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
              loading ? "opacity-75 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {" "}
            {loading ? "Logging In..." : "Login"}{" "}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {" "}
            Are you New?{" "}
            <Link
              to="/register"
              className="font-medium text-green-600 hover:text-green-500 hover:underline"
            >
              {" "}
              Create an account{" "}
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
