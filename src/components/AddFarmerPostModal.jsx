import { useState } from "react";
import PropTypes from "prop-types";

const AddFarmerPostModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    areaOfWork: "",
    price: "",
    workTiming: "",
    description: "",
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: "",
      areaOfWork: "",
      price: "",
      workTiming: "",
      description: "",
      status: "Active",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-11/12 max-w-md p-6 bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Add Farmer Post</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter post title"
              className="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              required
            />
          </div>

          {/* Area of Work */}
          <div className="mb-4">
            <label
              htmlFor="areaOfWork"
              className="block text-sm font-medium text-gray-700"
            >
              Area of Work
            </label>
            <input
              type="text"
              id="areaOfWork"
              name="areaOfWork"
              value={formData.areaOfWork}
              onChange={handleChange}
              placeholder="e.g., 10 Acres"
              className="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              required
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="$5000"
              className="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              required
            />
          </div>

          {/* Work Timing */}
          <div className="mb-4">
            <label
              htmlFor="workTiming"
              className="block text-sm font-medium text-gray-700"
            >
              Work Timing
            </label>
            <input
              type="text"
              id="workTiming"
              name="workTiming"
              value={formData.workTiming}
              onChange={handleChange}
              placeholder="8 AM - 5 PM"
              className="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Briefly describe the farming work"
              rows="3"
              className="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              required
            ></textarea>
          </div>

          {/* Status */}
          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Footer/Actions */}
          <div className="flex justify-end mt-6 space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              Save Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddFarmerPostModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddFarmerPostModal;
