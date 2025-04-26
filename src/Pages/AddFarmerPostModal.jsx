import { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Define BACKEND_URL here if not already globally available or passed as prop
const BACKEND_URL = "http://localhost:5000";

const AddFarmerPostModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    area: "",
    price: "",
    workTime: "",
    description: "",
    status: "Active",
    image: null,
    imagePreview: null,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        area: initialData.area || "",
        price: initialData.price || "",
        workTime: initialData.workTime || "",
        description: initialData.description || "",
        status: initialData.status || "Active",
        image: null,
        imagePreview: initialData.imageUrl
          ? `${BACKEND_URL}${initialData.imageUrl}`
          : null,
      });
    } else {
      setFormData({
        title: "",
        area: "",
        price: "",
        workTime: "",
        description: "",
        status: "Active",
        image: null,
        imagePreview: null,
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Basic validation
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

      setFormData((prev) => ({ ...prev, image: file })); // Store file object
      const reader = new FileReader();
      reader.onloadend = () =>
        setFormData((prev) => ({ ...prev, imagePreview: reader.result })); // Update preview
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, image: null })); // Clear file if selection cancelled
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      image: formData.image instanceof File ? formData.image : undefined,
    };
    delete dataToSend.imagePreview; // Don't send preview URL
    onSubmit(dataToSend);
  };

  if (!isOpen) return null;

  const isEditing = !!initialData;

  return (
    // Outer overlay - Added padding p-4 for better spacing on small screens
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out bg-black bg-opacity-50">
      {/* Modal Container - Added max-height, flex, flex-col */}
      <div className="relative w-11/12 max-w-lg bg-white rounded-lg shadow-lg transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-fade-in-scale max-h-[90vh] flex flex-col">
        {/* Modal Header - Stays Fixed. Adjusted padding, added flex-shrink-0 */}
        <div className="flex items-center justify-between flex-shrink-0 p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {isEditing ? "Edit Farmer Post" : "Add Farmer Post"}
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

        {/* Modal Body (Scrollable Area) - Added overflow-y-auto, padding, flex-grow */}
        <div className="flex-grow p-4 overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* All form fields go here... */}
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
                placeholder="e.g., Urgent Rice Harvesting Needed"
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />{" "}
            </div>
            {/* Area */}
            <div>
              {" "}
              <label
                htmlFor="area"
                className="block text-sm font-medium text-gray-700"
              >
                Area <span className="text-red-500">*</span>
              </label>{" "}
              <input
                type="text"
                id="area"
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="e.g., 10 Acres, 5 Hectares"
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />{" "}
            </div>
            {/* Price */}
            <div>
              {" "}
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price (₹) <span className="text-red-500">*</span>
              </label>{" "}
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g., 5000"
                required
                min="0"
                step="any"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />{" "}
            </div>
            {/* Work Time */}
            <div>
              {" "}
              <label
                htmlFor="workTime"
                className="block text-sm font-medium text-gray-700"
              >
                Work Time <span className="text-red-500">*</span>
              </label>{" "}
              <input
                type="text"
                id="workTime"
                name="workTime"
                value={formData.workTime}
                onChange={handleChange}
                placeholder="e.g., 8 AM - 5 PM, Flexible"
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
                placeholder="Detailed description of the work involved"
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
              </select>{" "}
            </div>
            {/* Image Upload & Preview */}
            <div>
              <label
                htmlFor="image-upload"
                className="block text-sm font-medium text-gray-700"
              >
                Upload New Image (Optional)
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
            {/* Submit button moved to footer */}
          </form>
        </div>

        {/* Modal Footer - Stays Fixed. Adjusted padding, added flex-shrink-0 */}
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
          {/* The actual submit button for the form */}
          <button
            type="submit"
            form="modal-form"
            disabled={
              isSubmitting
            } /* Use form="modal-form" if submit handler is on <form> */
            onClick={handleSubmit} /* Or trigger submit manually if preferred */
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
AddFarmerPostModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.object,
  isSubmitting: PropTypes.bool,
};

export default AddFarmerPostModal;
