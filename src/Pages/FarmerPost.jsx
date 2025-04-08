import { useState } from "react";

const FarmerPostsTable = () => {
  const [formData, setFormData] = useState({
    title: "",
    area: "",
    price: "",
    workTime: "",
    description: "",
    image: null,
    imagePreview: null,
  });



  const handleAddPost = () => {
    console.log("New Farmer Post Data:", formData);
    setFormData({
      title: "",
      area: "",
      price: "",
      workTime: "",
      description: "",
      image: null,
      imagePreview: null,
    });
  };

  const handleEditPost = (postId) => {
    console.log(`Edit clicked for Post ID: ${postId}`);
  };

  const handleDeletePost = (postId) => {
    console.log(`Delete clicked for Post ID: ${postId}`);
  };

  const handleSearchChange = (e) => {
    console.log(`Search input: ${e.target.value}`);
  };

  const [tableData] = useState(
    [...Array(5)].map((_, index) => ({
      id: index + 1,
      title: `Harvest Job ${index + 1}`,
      area: `${10 + index} Acres`,
      price: `₹${5000 + index * 200}`,
      workTime: `6AM - 3PM`,
      status: "ACTIVE",
      description: `Harvesting crops and plowing field ${index + 1}`,
      image: `https://via.placeholder.com/100?text=Farm+${index + 1}`,
    }))
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Farmer Posts</h2>
        <button
          onClick={handleAddPost}
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          + Add Farmer Post
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search Farmer Posts..."
          onChange={handleSearchChange}
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Image Upload */}
      

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
                AREA
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 border border-gray-300">
                PRICE
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 border border-gray-300">
                WORK TIME
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 border border-gray-300">
                STATUS
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 border border-gray-300">
                DESCRIPTION
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 border border-gray-300">
                IMAGE
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
                  {post.area}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 border border-gray-300">
                  {post.price}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 border border-gray-300">
                  {post.workTime}
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
                <td className="px-4 py-2 text-sm text-gray-700 border border-gray-300">
                  {post.description}
                </td>
                <td className="px-4 py-2 text-sm border border-gray-300">
                  <img
                    src={post.image}
                    alt={`Farm ${post.id}`}
                    className="object-cover w-16 h-16 rounded"
                  />
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

export default FarmerPostsTable;
