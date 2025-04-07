import { useState } from "react";
import PropTypes from "prop-types";

// Mock SellerPostEdit component
const SellerPostEdit = ({ post, onSave, onCancel }) => {
  const [editedPost, setEditedPost] = useState(post);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditedPost((prev) => ({
        ...prev,
        imageUrl,
        imageFile: file, // Save if you want to upload to server later
      }));
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-xl font-bold">Edit Seller Post</h2>

      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Title</label>
          <input
            name="title"
            value={editedPost.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">
            Price Per Unit
          </label>
          <input
            name="pricePerUnit"
            value={editedPost.pricePerUnit}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Location</label>
          <input
            name="location"
            value={editedPost.location}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          {editedPost.imageUrl && (
            <img
              src={editedPost.imageUrl}
              alt="Preview"
              className="object-cover w-32 h-32 mt-2 border rounded"
            />
          )}
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => onSave(editedPost)}
            className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 text-white bg-gray-400 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
const SellerPostsTable = () => {
  const [isEditMode, setEditMode] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [tableData, setTableData] = useState(
    [...Array(10)].map((_, index) => ({
      id: index + 1,
      title: `Grade A Wheat Batch #${index + 1}`,
      produceType:
        index % 3 === 0 ? "Wheat" : index % 3 === 1 ? "Rice" : "Vegetables",
      pricePerUnit: `₹${2000 + index * 50} / Quintal`,
      location: `Village ${String.fromCharCode(65 + index)}, District X`,
      postedOn: `2024-05-${10 + index} 09:15:${30 + index}`,
      status: index % 4 === 0 ? "SOLD OUT" : "AVAILABLE",
      description: `Freshly harvested ${
        index % 3 === 0 ? "wheat" : index % 3 === 1 ? "rice" : "vegetables"
      }. Quantity: ${10 + index} Quintals. Call for details.`,
      imageUrl: null,
    }))
  );

  const handleEditPost = (postId) => {
    const postToEdit = tableData.find((post) => post.id === postId);
    if (postToEdit) {
      setSelectedPost(postToEdit);
      setEditMode(true);
    }
  };

  const handleSaveEdit = (updatedPost) => {
    const updatedData = tableData.map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    );
    setTableData(updatedData);
    setEditMode(false);
    setSelectedPost(null);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setSelectedPost(null);
  };

  if (isEditMode) {
    return (
      <SellerPostEdit
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
        <h2 className="text-2xl font-bold text-gray-800">Seller Posts</h2>
        <button
          onClick={() => console.log("Add Post Modal Opened")}
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
        >
          + Add Seller Posts
        </button>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full border border-collapse border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {[
                "#",
                "IMAGE",
                "PRODUCE/TITLE",
                "PRODUCE TYPE",
                "PRICE PER UNIT",
                "LOCATION",
                "POSTED ON",
                "STATUS",
                "DESCRIPTION",
                "ACTION",
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-4 py-3 text-sm font-medium text-left text-gray-700 border border-gray-300"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((post, index) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 border border-gray-300">
                  {index + 1}
                </td>
                <td className="px-4 py-3 border border-gray-300">
                  {post.imageUrl ? (
                    <img
                      src={post.imageUrl}
                      alt="Post"
                      className="object-cover w-16 h-16 rounded"
                    />
                  ) : (
                    <span className="text-xs text-gray-400">No image</span>
                  )}
                </td>
                <td className="px-4 py-3 border border-gray-300">
                  {post.title}
                </td>
                <td className="px-4 py-3 border border-gray-300">
                  {post.produceType}
                </td>
                <td className="px-4 py-3 border border-gray-300">
                  {post.pricePerUnit}
                </td>
                <td className="px-4 py-3 border border-gray-300">
                  {post.location}
                </td>
                <td className="px-4 py-3 border border-gray-300">
                  {post.postedOn}
                </td>
                <td className="px-4 py-3 border border-gray-300">
                  <span
                    className={`px-2 py-1 text-xs font-medium text-white rounded ${
                      post.status === "AVAILABLE"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    {post.status}
                  </span>
                </td>
                <td className="px-4 py-3 border border-gray-300">
                  {post.description}
                </td>
                <td className="px-4 py-3 border border-gray-300">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditPost(post.id)}
                      className="px-3 py-1 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => console.log(`Delete Post ID: ${post.id}`)}
                      className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

SellerPostEdit.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    pricePerUnit: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default SellerPostsTable;
