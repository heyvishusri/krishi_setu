import { useState } from "react";
import AddFarmerPostModal from "../Components/AddFarmerPostModal"; // Adjust the path if needed

const FarmerPostsTable = () => {
  // State to control modal visibility
  const [isModalOpen, setModalOpen] = useState(false);

  // Placeholder functions
  const handleAddPost = (formData) => {
    console.log("New Farmer Post Data:", formData);
    // Add logic to update the table data with the new post
    setModalOpen(false); // Close the modal after submission
  };

  const handleEditPost = (postId) => {
    console.log(`Edit button clicked for Post ID: ${postId}`);
  };

  const handleDeletePost = (postId) => {
    console.log(`Delete button clicked for Post ID: ${postId}`);
  };

  const handleSearchChange = (event) => {
    console.log(`Search input changed: ${event.target.value}`);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800">Farmer Posts</h2>

        {/* Add Farmer Post Button */}
        <button
          onClick={() => setModalOpen(true)} // Open the modal
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          + Add Farmer Post
        </button>
      </div>

      {/* Search Bar Section */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search Farmer Posts..."
          onChange={handleSearchChange}
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-collapse border-gray-200">
          {/* Table Header */}
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 border border-gray-300">
                #
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 border border-gray-300">
                TITLE
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 border border-gray-300">
                AREA OF WORK
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 border border-gray-300">
                PRICE BY BIGHA
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 border border-gray-300">
                WORK TIME
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 border border-gray-300">
                POSTED ON
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 border border-gray-300">
                STATUS
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 border border-gray-300">
                DESCRIPTION
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 border border-gray-300">
                ACTION
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {/* Example Rows */}
            {[...Array(10)].map((_, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-700 border border-gray-300 whitespace-nowrap">
                  {index + 1}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 border border-gray-300 whitespace-nowrap">
                  Wheat Harvest {index + 1}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 border border-gray-300 whitespace-nowrap">
                  {10 + index} Acres
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 border border-gray-300 whitespace-nowrap">
                  ₹{5000 + index * 100}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 border border-gray-300 whitespace-nowrap">
                  11:00 AM to 07:00 PM
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 border border-gray-300 whitespace-nowrap">
                  2024-11-12 12:38:26
                </td>
                <td className="px-4 py-2 text-sm border border-gray-300 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium text-white bg-green-600 rounded">
                    ACTIVE
                  </span>
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 border border-gray-300">
                  Farming work related to wheat cultivation land {index + 1}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 border border-gray-300 whitespace-nowrap">
                  <button
                    onClick={() => handleEditPost(index + 1)}
                    className="px-3 py-1 text-white bg-green-600 rounded hover:bg-green-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePost(index + 1)}
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

      {/* Add Farmer Post Modal */}
      <AddFarmerPostModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddPost}
      />
    </div>
  );
};

export default FarmerPostsTable;
