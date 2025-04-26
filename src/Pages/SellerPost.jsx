// src/Pages/SellerPost.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import AddSellerPostModel from "./AddSellerPostModel"; // Import the correct modal

const BACKEND_URL = "http://localhost:5000";

const SellerPostsTable = () => {
  // --- States ---
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [postsData, setPostsData] = useState([]);
  const [editingPostData, setEditingPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  // --- Fetch User's Seller Posts ---
  const fetchMyPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo?.token) throw new Error("User not authenticated");
      // Update API endpoint
      const response = await axios.get(`${BACKEND_URL}/api/seller-posts/my`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setPostsData(response.data);
    } catch (err) {
      handleApiError(err, "fetch your seller posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  // --- Generic Error Handler ---
  const handleApiError = (err, action = "perform action") => {
    console.error(`Error ${action}:`, err);
    const message =
      err.response?.data?.message || err.message || `Failed to ${action}.`;
    toast.error(message);
    if (err.response?.status === 401) {
      /* Handle auth error */
    }
  };

  // --- Modal Handling ---
  const handleOpenAddModal = () => setIsAddModalOpen(true);
  const handleCloseAddModal = () => !submitLoading && setIsAddModalOpen(false);
  const handleOpenEditModal = (post) => {
    setEditingPostData(post);
    setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    if (!submitLoading) {
      setIsEditModalOpen(false);
      setEditingPostData(null);
    }
  };

  // --- Submission Handlers ---
  const handleAddSubmit = async (newPostData) => {
    setSubmitLoading(true);
    const formData = new FormData();
    Object.keys(newPostData).forEach((key) => {
      if (newPostData[key] !== undefined && newPostData[key] !== null)
        formData.append(key, newPostData[key]);
    });

    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo?.token) throw new Error("Authentication required.");
      // Update API endpoint
      const response = await axios.post(
        `${BACKEND_URL}/api/seller-posts`,
        formData,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      setPostsData((prev) => [response.data, ...prev]);
      toast.success("Seller post created!"); // Update message
      handleCloseAddModal();
    } catch (err) {
      handleApiError(err, "create seller post"); // Update message
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleEditSubmit = async (updatedPostData) => {
    if (!editingPostData?._id) return;
    setSubmitLoading(true);
    const formData = new FormData();
    Object.keys(updatedPostData).forEach((key) => {
      if (updatedPostData[key] !== undefined && updatedPostData[key] !== null)
        formData.append(key, updatedPostData[key]);
    });

    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo?.token) throw new Error("Authentication required.");
      // Update API endpoint
      const response = await axios.put(
        `${BACKEND_URL}/api/seller-posts/${editingPostData._id}`,
        formData,
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      setPostsData((prev) =>
        prev.map((post) =>
          post._id === editingPostData._id ? response.data : post
        )
      );
      toast.success("Seller post updated!"); // Update message
      handleCloseEditModal();
    } catch (err) {
      handleApiError(err, "update seller post"); // Update message
    } finally {
      setSubmitLoading(false);
    }
  };

  // --- Delete Handler ---
  const handleDeletePost = async (postId, postTitle) => {
    if (
      !window.confirm(
        `Are you sure you want to delete the post "${
          postTitle || "this post"
        }"?`
      )
    )
      return;

    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo?.token) throw new Error("Authentication required.");
      // Update API endpoint
      const response = await axios.delete(
        `${BACKEND_URL}/api/seller-posts/${postId}`,
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      setPostsData((prev) =>
        prev.filter((post) => post._id !== response.data.id)
      );
      toast.success(response.data.message || "Seller post deleted!"); // Update message
    } catch (err) {
      handleApiError(err, "delete seller post"); // Update message
    }
  };

  // --- Search (Placeholder) ---
  const handleSearchChange = (e) => {
    console.log(`Search input: ${e.target.value}`);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Seller Posts</h2>{" "}
        {/* Update Title */}
        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          + Add Seller Post {/* Update Button Text */}
        </button>
      </div>
      {/* Search */}
      <div className="mb-6">
        {" "}
        <input
          type="text"
          placeholder="Search Your Seller Posts..."
          onChange={handleSearchChange}
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />{" "}
      </div>
      {/* Loading and Error States */}
      {loading && (
        <div className="text-center text-gray-600">Loading seller posts...</div>
      )}{" "}
      {/* Update Text */}
      {error && (
        <div className="p-4 my-4 text-red-700 bg-red-100 border border-red-300 rounded-md">
          Error: {error}
        </div>
      )}
      {/* Table */}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-collapse border-gray-200">
            {/* --- Update Table Headers --- */}
            <thead className="bg-gray-100">
              <tr>
                {/* Added Quantity, changed some names */}
                <th className="px-4 py-2 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase border border-gray-300">
                  #
                </th>
                <th className="px-4 py-2 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase border border-gray-300">
                  Image
                </th>
                <th className="px-4 py-2 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase border border-gray-300">
                  Title
                </th>
                <th className="px-4 py-2 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase border border-gray-300">
                  Produce Type
                </th>
                <th className="px-4 py-2 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase border border-gray-300">
                  Quantity
                </th>
                <th className="px-4 py-2 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase border border-gray-300">
                  Price/Unit
                </th>
                <th className="px-4 py-2 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase border border-gray-300">
                  Location
                </th>
                <th className="px-4 py-2 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase border border-gray-300">
                  Status
                </th>
                <th className="px-4 py-2 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase border border-gray-300">
                  Description
                </th>
                <th className="px-4 py-2 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase border border-gray-300">
                  Created At
                </th>
                <th className="px-4 py-2 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase border border-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {postsData.length === 0 && !loading ? (
                <tr>
                  <td
                    colSpan="11"
                    className="px-4 py-4 text-center text-gray-500 border border-gray-300"
                  >
                    No seller posts found. Click '+ Add Seller Post' to create
                    one.
                  </td>
                </tr>
              ) : (
                postsData.map((post, index) => (
                  <tr key={post._id} className="hover:bg-gray-50">
                    {/* --- Update Table Data Cells --- */}
                    <td className="px-4 py-2 text-sm text-gray-700 border border-gray-300">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 text-sm border border-gray-300">
                      {" "}
                      <img
                        src={
                          post.imageUrl
                            ? `${BACKEND_URL}${post.imageUrl}`
                            : "https://via.placeholder.com/80?text=No+Image"
                        }
                        alt={post.title}
                        className="object-cover w-16 h-16 rounded"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://via.placeholder.com/80?text=No+Image";
                        }}
                      />{" "}
                    </td>
                    <td className="px-4 py-2 text-sm font-medium text-gray-900 border border-gray-300">
                      {post.title}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700 border border-gray-300">
                      {post.produceType}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700 border border-gray-300">
                      {post.quantity || "-"}
                    </td>{" "}
                    {/* Show quantity or dash */}
                    <td className="px-4 py-2 text-sm text-gray-700 border border-gray-300">
                      {post.pricePerUnit}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700 border border-gray-300">
                      {post.location}
                    </td>
                    <td className="px-4 py-2 text-sm border border-gray-300">
                      {" "}
                      <span
                        className={`px-2 py-1 text-xs font-semibold leading-tight rounded-full ${
                          post.status === "Available"
                            ? "bg-green-100 text-green-800"
                            : post.status === "Sold Out"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {" "}
                        {post.status}{" "}
                      </span>{" "}
                    </td>
                    <td
                      className="max-w-xs px-4 py-2 text-sm text-gray-700 truncate border border-gray-300"
                      title={post.description}
                    >
                      {post.description}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700 border border-gray-300 whitespace-nowrap">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700 border border-gray-300 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenEditModal(post)}
                        className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        aria-label={`Edit ${post.title}`}
                      >
                        {" "}
                        Edit{" "}
                      </button>
                      <button
                        onClick={() => handleDeletePost(post._id, post.title)}
                        className="px-3 py-1 ml-2 text-xs font-medium text-white bg-red-600 rounded shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        aria-label={`Delete ${post.title}`}
                      >
                        {" "}
                        Delete{" "}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
      {/* Add Modal */}
      <AddSellerPostModel
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onSubmit={handleAddSubmit}
        isSubmitting={submitLoading}
      />
      {/* Edit Modal */}
      <AddSellerPostModel
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSubmit={handleEditSubmit}
        initialData={editingPostData}
        isSubmitting={submitLoading}
      />
    </div>
  );
};

export default SellerPostsTable;
