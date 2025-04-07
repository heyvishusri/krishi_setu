import { useState } from "react";
import DriverPostEdit from "./DriverPostEdit"; // Import the edit component

const DriverPostsTable = () => {
  const [isEditMode, setEditMode] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    serviceArea: "",
    rate: "",
    availability: "",
    description: "",
    image: null,
  });

  const handleAddPost = () => {
    console.log("New Driver Post Data:", formData);
    setFormData({
      title: "",
      serviceArea: "",
      rate: "",
      availability: "",
      description: "",
      image: null,
      imagePreview: null,
    });
  };

  const handleEditPost = (postId) => {
    console.log(`Edit button clicked for Post ID: ${postId}`);
    const postToEdit = {
      title: `Delivery Route ${postId}`,
      serviceArea: `City Zone ${String.fromCharCode(65 + postId)}`,
      rate: `₹${1500 + postId * 50} / Trip`,
      availability: `Mon-Fri, 9AM-5PM`,
      description: `Looking for a reliable driver for local deliveries in Zone ${String.fromCharCode(
        65 + postId
      )}.`,
      image: `https://via.placeholder.com/100?text=Driver+${postId}`,
    };
    setSelectedPost(postToEdit);
    setEditMode(true);
  };

  const handleSaveEdit = (updatedPost) => {
    console.log("Updated Post Data:", updatedPost);
    setEditMode(false);
    setSelectedPost(null);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setSelectedPost(null);
  };

  const handleDeletePost = (postId) => {
    console.log(`Delete button clicked for Post ID: ${postId}`);
  };

  const handleSearchChange = (event) => {
    console.log(`Search input changed: ${event.target.value}`);
  };

  const [tableData] = useState(
    [...Array(10)].map((_, index) => ({
      id: index + 1,
      title: `Delivery Route ${index + 1}`,
      serviceArea: `City Zone ${String.fromCharCode(65 + index)}`,
      rate: `₹${1500 + index * 50} / Trip`,
      availability: `Mon-Fri, 9AM-5PM`,
      postedOn: `2024-11-${12 + index} 12:38:26`,
      status: "ACTIVE",
      description: `Looking for a reliable driver for local deliveries in Zone ${String.fromCharCode(
        65 + index
      )}.`,
      image: `https://via.placeholder.com/100?text=Driver+${index + 1}`,
    }))
  );

  if (isEditMode) {
    return (
      <DriverPostEdit
        post={selectedPost}
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
      />
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Driver Posts</h2>
        <button
          onClick={() => {
            handleAddPost();
          }}
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          + Add Driver Post
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search Driver Posts..."
          onChange={handleSearchChange}
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-collapse border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 border border-gray-300">
                #
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 border border-gray-300">
                TITLE
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 border border-gray-300">
                SERVICE AREA
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 border border-gray-300">
                RATE
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 border border-gray-300">
                AVAILABILITY
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 border border-gray-300">
                POSTED ON
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 border border-gray-300">
                STATUS
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 border border-gray-300">
                IMAGE
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 border border-gray-300">
                DESCRIPTION
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 border border-gray-300">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((post, index) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-700 border border-gray-300">
                  {index + 1}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 border border-gray-300">
                  {post.title}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 border border-gray-300">
                  {post.serviceArea}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 border border-gray-300">
                  {post.rate}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 border border-gray-300">
                  {post.availability}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 border border-gray-300">
                  {post.postedOn}
                </td>
                <td className="px-4 py-2 text-sm border border-gray-300">
                  <span
                    className={`px-2 py-1 text-xs font-medium text-white rounded ${
                      post.status === "ACTIVE" ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {post.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm border border-gray-300">
                  <img
                    src={post.image}
                    alt={`Driver ${post.id}`}
                    className="object-cover w-16 h-16 rounded"
                  />
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 border border-gray-300">
                  {post.description}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 border border-gray-300 whitespace-nowrap">
                  <button
                    onClick={() => handleEditPost(post.id)}
                    className="px-3 py-1 text-white bg-green-600 rounded hover:bg-green-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="px-3 py-1 ml-2 text-white bg-red-600 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DriverPostsTable;
