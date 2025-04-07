import { useState, useEffect } from "react";
import BuyerPostEdit from "./BuyerPostEdit"; // Import the edit component

const BuyerPostsTable = () => {
  const [isEditMode, setEditMode] = useState(false); // State to toggle edit mode
  const [selectedPost, setSelectedPost] = useState(null); // State to store the selected post
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    itemNeeded: "",
    itemCategory: "",
    quantity: "",
    specifications: "",
    location: "",
    budget: "",
    image: null,
    imagePreview: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (formData.imagePreview) {
      URL.revokeObjectURL(formData.imagePreview);
    }
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    } else {
      setFormData((prev) => ({ ...prev, image: null, imagePreview: null }));
    }
  };

  useEffect(() => {
    return () => {
      if (formData.imagePreview) {
        URL.revokeObjectURL(formData.imagePreview);
      }
    };
  }, [formData.imagePreview]);

  const closeModalAndCleanup = () => {
    if (formData.imagePreview) {
      URL.revokeObjectURL(formData.imagePreview);
    }
    setModalOpen(false);
    setFormData({
      itemNeeded: "",
      itemCategory: "",
      quantity: "",
      specifications: "",
      location: "",
      budget: "",
      image: null,
      imagePreview: null,
    });
  };

  const handleAddPost = () => {
    console.log("New Requirement/Buyer Post Data:", formData);
    closeModalAndCleanup();
  };

  const handleEditPost = (postId) => {
    console.log(`Edit button clicked for Requirement ID: ${postId}`);
    const postToEdit = tableData.find((post) => post.id === postId);
    if (postToEdit) {
      setSelectedPost(postToEdit);
      setEditMode(true); // Enable edit mode
    }
  };

  const handleSaveEdit = (updatedPost) => {
    console.log("Updated Post Data:", updatedPost);
    setEditMode(false); // Exit edit mode
    setSelectedPost(null); // Clear selected post
  };

  const handleCancelEdit = () => {
    setEditMode(false); // Exit edit mode
    setSelectedPost(null); // Clear selected post
  };

  const handleDeletePost = (postId) => {
    console.log(`Delete button clicked for Requirement ID: ${postId}`);
  };

  const handleSearchChange = (event) => {
    console.log(`Search requirement input changed: ${event.target.value}`);
  };

  const generateSampleData = () => {
    return [...Array(10)].map((_, index) => ({
      id: index + 1,
      itemNeeded:
        index % 3 === 0
          ? "Used Tractor"
          : index % 3 === 1
          ? "Wheat Seeds (Certified)"
          : "Land Lease",
      itemCategory:
        index % 3 === 0 ? "Equipment" : index % 3 === 1 ? "Seeds" : "Land",
      quantity:
        index % 3 === 0
          ? "1 Unit"
          : index % 3 === 1
          ? `${5 + index} Quintals`
          : "10 Acres",
      specifications:
        index % 3 === 0
          ? ">30 HP, Good Condition"
          : index % 3 === 1
          ? `Variety XYZ-${index}`
          : "Irrigated, 3-year lease",
      postedOn: `2024-07-${10 + index} 10:00:00`,
      status: index % 2 === 0 ? "OPEN" : "FULFILLED",
      location: `Near Village ${String.fromCharCode(65 + index)}`,
      budget:
        index % 3 === 0
          ? "Negotiable"
          : index % 3 === 1
          ? `Approx ₹${3000 + index * 100}/Q`
          : "Market Rate",
    }));
  };

  const [tableData] = useState(generateSampleData());

  if (isEditMode) {
    return (
      <BuyerPostEdit
        post={selectedPost}
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
      />
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Buyer Posts</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          + Add Buyer Posts
        </button>
      </div>

      {/* Search Bar Section */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search Requirements (e.g., Tractor, Seeds...)"
          onChange={handleSearchChange}
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Table Section */}
      <div className="w-full">
        <table className="w-full border border-collapse border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 border border-gray-300">
                #
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 border border-gray-300">
                ITEM NEEDED
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 border border-gray-300">
                CATEGORY
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 border border-gray-300">
                QUANTITY
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 border border-gray-300">
                LOCATION
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 border border-gray-300">
                POSTED ON
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 border border-gray-300">
                STATUS
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 border border-gray-300">
                SPECIFICATIONS
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 border border-gray-300">
                BUDGET
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 border border-gray-300">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((req, index) => (
              <tr key={req.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-700 border border-gray-300">
                  {index + 1}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 border border-gray-300">
                  {req.itemNeeded}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 border border-gray-300">
                  {req.itemCategory}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 border border-gray-300">
                  {req.quantity}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 border border-gray-300">
                  {req.location}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 border border-gray-300">
                  {req.postedOn}
                </td>
                <td className="px-4 py-3 text-sm border border-gray-300">
                  <span
                    className={`px-2 py-1 text-xs font-medium text-white rounded ${
                      req.status === "OPEN"
                        ? "bg-blue-600"
                        : req.status === "FULFILLED"
                        ? "bg-green-600"
                        : "bg-gray-500"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 border border-gray-300">
                  {req.specifications}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 border border-gray-300">
                  {req.budget || "-"}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 border border-gray-300">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditPost(req.id)}
                      className="px-3 py-1 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePost(req.id)}
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

      {/* Add Requirement Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          {/* Modal content div - REMOVED max-h-[90vh] and overflow-y-auto */}
          <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
            <h3 className="mb-4 text-xl font-bold text-gray-800">
              Post Your Requirement
            </h3>
            {/* Form Fields */}
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Item Needed
              </label>
              <input
                type="text"
                name="itemNeeded"
                value={formData.itemNeeded}
                onChange={handleInputChange}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., Tractor, Seeds"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                type="text"
                name="itemCategory"
                value={formData.itemCategory}
                onChange={handleInputChange}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., Equipment, Seeds, Land"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., 1 Unit, 50 Kg, 10 Acres"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Specifications / Details
              </label>
              <textarea
                name="specifications"
                value={formData.specifications}
                onChange={handleInputChange}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., >30 HP, Certified, Irrigated"
                rows="3"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., Near Village X, District Y"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Budget (Optional)
              </label>
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., Approx ₹50,000, Market Rate"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Upload Example Image (Optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              />
              {formData.imagePreview && (
                <div className="mt-4">
                  <p className="mb-1 text-sm font-medium text-gray-700">
                    Preview:
                  </p>
                  <img
                    src={formData.imagePreview}
                    alt="Preview"
                    className="object-contain w-auto h-32 border border-gray-200 rounded"
                  />
                </div>
              )}
            </div>
            {/* Modal Actions */}
            <div className="flex justify-end mt-6">
              <button
                onClick={closeModalAndCleanup}
                className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPost}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerPostsTable;
