// src/Pages/AddDriverPostModal.jsx
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const BACKEND_URL = "http://localhost:5000"; // Ensure consistency

const AddDriverPostModel = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting,
}) => {
  // Adjust initial state fields
  const [formData, setFormData] = useState({
    title: "",
    serviceArea: "", // Changed field
    rate: "", // Changed field
    availability: "", // Changed field
    description: "",
    status: "Active",
    image: null,
    imagePreview: null,
  });

  useEffect(() => {
    if (initialData) {
      // Adjust fields being set
      setFormData({
        title: initialData.title || "",
        serviceArea: initialData.serviceArea || "",
        rate: initialData.rate || "",
        availability: initialData.availability || "",
        description: initialData.description || "",
        status: initialData.status || "Active",
        image: null,
        imagePreview: initialData.imageUrl
          ? `${BACKEND_URL}${initialData.imageUrl}`
          : null,
      });
    } else {
      // Adjust fields being reset
      setFormData({
        title: "",
        serviceArea: "",
        rate: "",
        availability: "",
        description: "",
        status: "Active",
        image: null,
        imagePreview: null,
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    /* No change needed */
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    /* No change needed */
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file.");
        e.target.value = null;
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("File is too large (max 5MB).");
        e.target.value = null;
        return;
      }
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () =>
        setFormData((prev) => ({ ...prev, imagePreview: reader.result }));
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, image: null }));
    }
  };

  const handleSubmit = (e) => {
    /* No change needed */
    e.preventDefault();
    const dataToSend = {
      ...formData,
      image: formData.image instanceof File ? formData.image : undefined,
    };
    delete dataToSend.imagePreview;
    onSubmit(dataToSend);
  };

  if (!isOpen) return null;
  const isEditing = !!initialData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out bg-black bg-opacity-50">
      <div className="relative w-11/12 max-w-lg bg-white rounded-lg shadow-lg transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-fade-in-scale max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between flex-shrink-0 p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {isEditing ? "Edit Driver Post" : "Add Driver Post"}{" "}
            {/* Change Title */}
          </h2>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="text-2xl text-gray-500 hover:text-gray-700 focus:outline-none disabled:opacity-50"
            aria-label="Close"
          >
            {" "}
            ×{" "}
          </button>
        </div>
        {/* Scrollable Body */}
        <div className="flex-grow p-4 overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* --- Update Labels, Names, Placeholders --- */}
            {/* Title */}
            <div>
              {" "}
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title <span className="text-red-500">*</span>
              </label>{" "}
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Local Goods Transport"
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />{" "}
            </div>
            {/* Service Area */}
            <div>
              {" "}
              <label
                htmlFor="serviceArea"
                className="block text-sm font-medium text-gray-700"
              >
                Service Area <span className="text-red-500">*</span>
              </label>{" "}
              <input
                type="text"
                id="serviceArea"
                name="serviceArea"
                value={formData.serviceArea}
                onChange={handleChange}
                placeholder="e.g., City Center, Nearby Towns"
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />{" "}
            </div>
            {/* Rate */}
            <div>
              {" "}
              <label
                htmlFor="rate"
                className="block text-sm font-medium text-gray-700"
              >
                Rate <span className="text-red-500">*</span>
              </label>{" "}
              <input
                type="text"
                id="rate"
                name="rate"
                value={formData.rate}
                onChange={handleChange}
                placeholder="e.g., ₹1500 / Trip, ₹50 / km"
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />{" "}
            </div>
            {/* Availability */}
            <div>
              {" "}
              <label
                htmlFor="availability"
                className="block text-sm font-medium text-gray-700"
              >
                Availability <span className="text-red-500">*</span>
              </label>{" "}
              <input
                type="text"
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                placeholder="e.g., Mon - Fri, 9 AM to 5 PM"
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />{" "}
            </div>
            {/* Description */}
            <div>
              {" "}
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description <span className="text-red-500">*</span>
              </label>{" "}
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Vehicle details, service offered, etc."
                required
                rows="4"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              ></textarea>{" "}
            </div>
            {/* Status */}
            <div>
              {" "}
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>{" "}
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              >
                {" "}
                <option value="Active">Active</option>{" "}
                <option value="Inactive">Inactive</option>{" "}
                <option value="Booked">Booked</option>{" "}
              </select>{" "}
            </div>
            {/* Image Upload & Preview */}
            <div>
              <label
                htmlFor="image-upload"
                className="block text-sm font-medium text-gray-700"
              >
                Upload Image (Optional)
              </label>
              {formData.imagePreview && (
                <img
                  src={formData.imagePreview}
                  alt="Preview"
                  className="object-cover w-24 h-24 mt-2 mb-2 rounded-md"
                />
              )}
              <input
                type="file"
                id="image-upload"
                name="image"
                accept="image/png, image/jpeg, image/gif"
                onChange={handleImageChange}
                className="block w-full mt-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
              />
            </div>
          </form>
        </div>
        {/* Footer */}
        <div className="flex justify-end flex-shrink-0 p-4 space-x-3 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
          >
            {" "}
            Cancel{" "}
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? "Saving..."
              : isEditing
              ? "Update Post"
              : "Save Post"}
          </button>
        </div>
      </div>
      {/* Animation CSS */}
      <style jsx>{`
        @keyframes fade-in-scale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

// PropTypes remain the same
AddDriverPostModel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.object,
  isSubmitting: PropTypes.bool,
};

export default AddDriverPostModel;
