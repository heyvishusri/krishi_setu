import { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import { toast } from "react-hot-toast"; // For potential error messages

const BACKEND_URL = "http://localhost:5000"; // Your backend URL

const Farmer = () => {
  const [postsData, setPostsData] = useState([]); // Renamed state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch ALL farmer posts
        const response = await axios.get(`${BACKEND_URL}/api/farmer-posts`);
        setPostsData(response.data);
      } catch (err) {
        console.error("Error fetching all farmer posts:", err);
        setError(
          err.response?.data?.message || err.message || "Failed to load posts"
        );
        toast.error("Could not load farmer posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllPosts();
  }, []); // Fetch once on mount

  return (
    <div className="p-4">
      <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
        Available Farmer Posts
      </h1>

      {/* Loading and Error States */}
      {loading && (
        <div className="text-center text-gray-600">
          Loading available posts...
        </div>
      )}
      {error && (
        <div className="text-center text-red-600">
          Error loading posts: {error}
        </div>
      )}

      {/* Grid for Posts - Render only if not loading and no error */}
      {!loading &&
        !error &&
        (postsData.length === 0 ? (
          <div className="text-center text-gray-500">
            No farmer posts currently available.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {postsData.map((post) => (
              <div
                key={post._id}
                className="flex flex-col p-4 transition bg-white rounded-lg shadow-lg hover:shadow-xl"
              >
                {/* User Info */}
                <div className="flex items-center mb-3">
                  <img
                    src={
                      post.user?.profilePicture
                        ? `${BACKEND_URL}${post.user.profilePicture}`
                        : "/images/dp.jpeg"
                    }
                    alt={post.user?.name || "Farmer"}
                    className="object-cover w-10 h-10 mr-3 bg-gray-200 rounded-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/dp.jpeg";
                    }}
                  />
                  <div>
                    <h2 className="text-base font-semibold text-gray-900">
                      {post.user?.name || "Unknown Farmer"}
                    </h2>
                    <p className="text-xs text-gray-500">
                      Posted On {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {/* Post Image */}
                {post.imageUrl ? (
                  <img
                    src={`${BACKEND_URL}${post.imageUrl}`}
                    alt={post.title}
                    className="object-cover w-full mb-4 bg-gray-200 rounded-lg h-44" // Fixed height
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = "none";
                    }} // Hide if image fails
                  />
                ) : (
                  <div className="flex items-center justify-center w-full mb-4 text-gray-400 bg-gray-100 rounded-lg h-44">
                    No Image Provided
                  </div>
                )}
                {/* Post Details */}
                <h3 className="mb-1 text-lg font-bold text-gray-800">
                  {post.title}
                </h3>
                <p className="flex-grow mt-1 mb-3 text-sm text-gray-600">
                  {post.description}
                </p>{" "}
                {/* flex-grow pushes button down */}
                {/* Key Info */}
                <div className="pt-3 mt-auto space-y-1 text-sm text-gray-700 border-t">
                  <p>
                    <strong>Area:</strong> {post.area}
                  </p>
                  {/* Consider adding address if needed */}
                  {/* <p><strong>Work Address:</strong> {post.address || 'Not specified'}</p> */}
                  <p>
                    <strong>Price:</strong> ₹
                    {post.price?.toLocaleString("en-IN") || "N/A"}
                  </p>
                  <p>
                    <strong>Timing:</strong> {post.workTime}
                  </p>
                  {/* Consider adding work date if needed */}
                  {/* <p><strong>Work Date:</strong> {post.workDate ? new Date(post.workDate).toLocaleDateString() : 'Not specified'}</p> */}
                  <p>
                    <strong>Status:</strong>
                    <span
                      className={`ml-2 px-2 py-0.5 text-xs font-semibold rounded-full ${
                        post.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {post.status}
                    </span>
                  </p>
                </div>
                {/* Contact Info - Displaying user's mobile number */}
                {post.user?.mobile && (
                  <div className="flex items-center justify-center pt-3 mt-4 border-t">
                    <a
                      href={`tel:${post.user.mobile}`}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                      </svg>
                      Contact Farmer ({post.user.mobile})
                    </a>
                    {/* Location link might need adjustment based on how location is stored/used */}
                    {/* <a href="/location" className="text-sm text-blue-500 hover:underline">View Location</a> */}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default Farmer;
