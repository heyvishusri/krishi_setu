// src/Pages/Buyer.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const BACKEND_URL = "http://localhost:5000";

const Buyer = () => {
  const [postsData, setPostsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch ALL buyer posts (requirements)
        const response = await axios.get(`${BACKEND_URL}/api/buyer-posts`);
        setPostsData(response.data);
      } catch (err) {
        console.error("Error fetching all buyer posts:", err);
        setError(
          err.response?.data?.message || err.message || "Failed to load posts"
        );
        toast.error("Could not load buyer requirements.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllPosts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
        Buyer Requirements
      </h1>{" "}
      {/* Update Title */}
      {/* Loading and Error States */}
      {loading && (
        <div className="text-center text-gray-600">Loading requirements...</div>
      )}{" "}
      {/* Update Text */}
      {error && (
        <div className="text-center text-red-600">
          Error loading requirements: {error}
        </div>
      )}
      {/* Grid for Posts */}
      {!loading &&
        !error &&
        (postsData.length === 0 ? (
          <div className="text-center text-gray-500">
            No buyer requirements currently posted.
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
                    alt={post.user?.name || "Buyer"}
                    className="object-cover w-10 h-10 mr-3 bg-gray-200 rounded-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/dp.jpeg";
                    }}
                  />
                  <div>
                    <h2 className="text-base font-semibold text-gray-900">
                      {post.user?.name || "Unknown Buyer"}
                    </h2>
                    <p className="text-xs text-gray-500">
                      Posted On {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Post Image (Optional Example) */}
                {post.imageUrl ? (
                  <img
                    src={`${BACKEND_URL}${post.imageUrl}`}
                    alt={`Example for ${post.itemNeeded}`}
                    className="object-contain w-full mb-4 bg-gray-100 border rounded-lg h-44"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = "none";
                    }}
                  />
                ) : null}

                {/* Post Details */}
                <h3 className="mb-1 text-lg font-bold text-gray-800">
                  Need: {post.itemNeeded}
                </h3>
                <p className="mb-1 text-sm font-medium text-indigo-600">
                  Category: {post.itemCategory}
                </p>
                {post.specifications && (
                  <p className="flex-grow mt-1 mb-3 text-sm text-gray-600">
                    Details: {post.specifications}
                  </p>
                )}

                {/* Key Info */}
                <div className="pt-3 mt-auto space-y-1 text-sm text-gray-700 border-t">
                  {/* Update Fields */}
                  {post.quantity && (
                    <p>
                      <strong>Quantity:</strong> {post.quantity}
                    </p>
                  )}
                  <p>
                    <strong>Location:</strong> {post.location}
                  </p>
                  {post.budget && (
                    <p>
                      <strong>Budget:</strong> {post.budget}
                    </p>
                  )}
                  <p>
                    <strong>Status:</strong>
                    <span
                      className={`ml-2 px-2 py-0.5 text-xs font-semibold rounded-full ${
                        post.status === "Open"
                          ? "bg-blue-100 text-blue-800"
                          : post.status === "Fulfilled"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {post.status}
                    </span>
                  </p>
                </div>

                {/* Contact Info */}
                {post.user?.mobile && (
                  <div className="flex items-center justify-center pt-3 mt-4 border-t">
                    <a
                      href={`tel:${post.user.mobile}`}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                      {" "}
                      {/* Changed color */}
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                      </svg>
                      Contact Buyer ({post.user.mobile})
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default Buyer;
