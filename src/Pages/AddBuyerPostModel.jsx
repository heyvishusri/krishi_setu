// src/Pages/AddBuyerPostModal.jsx
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Ensure this is defined or imported if used for image previews from existing posts
const BACKEND_URL = "http://localhost:5000";

const AddBuyerPostModel = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting,
}) => {
  // Initial state for the form fields matching the BuyerPost model
  const [formData, setFormData] = useState({
    itemNeeded: "", // Corresponds to name="itemNeeded"
    itemCategory: "", // Corresponds to name="itemCategory"
    quantity: "", // Corresponds to name="quantity"
    specifications: "", // Corresponds to name="specifications"
    location: "", // Corresponds to name="location"
    budget: "", // Corresponds to name="budget"
    status: "Open", // Corresponds to name="status"
    image: null, // For storing the File object
    imagePreview: null, // For displaying the preview URL
  });

  // Effect to populate form when editing
  useEffect(() => {
    if (initialData && isOpen) {
      // Check isOpen to only run when modal becomes visible with data
      setFormData({
        itemNeeded: initialData.itemNeeded || "",
        itemCategory: initialData.itemCategory || "",
        quantity: initialData.quantity || "",
        specifications: initialData.specifications || "",
        location: initialData.location || "",
        budget: initialData.budget || "",
        status: initialData.status || "Open",
        image: null, // Reset image file selection on edit open
        imagePreview: initialData.imageUrl
          ? `${BACKEND_URL}${initialData.imageUrl}`
          : null,
      });
    } else if (!initialData && isOpen) {
      // Reset form when opening for "Add"
      setFormData({
        itemNeeded: "",
        itemCategory: "",
        quantity: "",
        specifications: "",
        location: "",
        budget: "",
        status: "Open",
        image: null,
        imagePreview: null,
      });
    }
    // If !isOpen, the state doesn't need changing here, it resets when reopened if !initialData
  }, [initialData, isOpen]); // Dependencies: Run when these change

  // Handles changes for text inputs, textarea, select
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // Use the 'name' attribute to update the correct state field
    }));
  };

  // Handles image file selection
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

      // Store the File object in state
      setFormData((prev) => ({ ...prev, image: file }));

      // Create and store the preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imagePreview: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      // If user cancels file selection, clear the file object
      // Keep existing preview if editing, otherwise clear it
      setFormData((prev) => ({
        ...prev,
        image: null,
        imagePreview: initialData?.imageUrl
          ? `${BACKEND_URL}${initialData.imageUrl}`
          : null, // Revert to initial or null
      }));
    }
  };

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default browser form submission
    // Prepare data: only include 'image' if it's a new File
    const dataToSend = {
      ...formData,
      image: formData.image instanceof File ? formData.image : undefined,
    };
    delete dataToSend.imagePreview; // Don't send preview URL to backend
    onSubmit(dataToSend); // Pass the prepared data to the parent component's handler
  };

  // Don't render anything if the modal is not open
  if (!isOpen) return null;

  const isEditing = !!initialData; // Determine if editing based on initialData presence

  return (
    // Modal Overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out bg-black bg-opacity-50">
      {/* Modal Container */}
      <div className="relative w-11/12 max-w-lg bg-white rounded-lg shadow-lg transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-fade-in-scale max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between flex-shrink-0 p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {isEditing ? "Edit Buyer Requirement" : "Add Buyer Requirement"}
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

        {/* Modal Body (Scrollable) */}
        <div className="flex-grow p-4 overflow-y-auto">
          {/* Form Element */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            id="buyer-modal-form"
          >
            {" "}
            {/* Added ID for footer button */}
            {/* Item Needed Input */}
            <div>
              <label
                htmlFor="itemNeeded"
                className="block text-sm font-medium text-gray-700"
              >
                Item Needed <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="itemNeeded"
                name="itemNeeded" // Correct name
                value={formData.itemNeeded} // Correct value binding
                onChange={handleChange} // Correct handler
                placeholder="e.g., Wheat Seeds, Tractor Rental, Land Lease"
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />
            </div>
            {/* Item Category Input */}
            <div>
              <label
                htmlFor="itemCategory"
                className="block text-sm font-medium text-gray-700"
              >
                Category <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="itemCategory"
                name="itemCategory" // Correct name
                value={formData.itemCategory} // Correct value binding
                onChange={handleChange} // Correct handler
                placeholder="e.g., Seeds, Equipment, Land, Labour"
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />
            </div>
            {/* Quantity Input */}
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700"
              >
                Quantity
              </label>
              <input
                type="text"
                id="quantity"
                name="quantity" // Correct name
                value={formData.quantity} // Correct value binding
                onChange={handleChange} // Correct handler
                placeholder="e.g., 50 kg, 1 Unit, 10 Acres"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />
            </div>
            {/* Specifications Textarea */}
            <div>
              <label
                htmlFor="specifications"
                className="block text-sm font-medium text-gray-700"
              >
                Specifications / Details
              </label>
              <textarea
                id="specifications"
                name="specifications" // Correct name
                value={formData.specifications} // Correct value binding
                onChange={handleChange} // Correct handler
                placeholder="e.g., Organic Certified, Minimum 30 HP, Specific dates"
                rows="3"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              ></textarea>
            </div>
            {/* Location Input */}
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Required Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="location"
                name="location" // Correct name
                value={formData.location} // Correct value binding
                onChange={handleChange} // Correct handler
                placeholder="e.g., Village Name, District"
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />
            </div>
            {/* Budget Input */}
            <div>
              <label
                htmlFor="budget"
                className="block text-sm font-medium text-gray-700"
              >
                Budget (Optional)
              </label>
              <input
                type="text"
                id="budget"
                name="budget" // Correct name
                value={formData.budget} // Correct value binding
                onChange={handleChange} // Correct handler
                placeholder="e.g., Approx ₹5000, Market Rate"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />
            </div>
            {/* Status Select */}
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                id="status"
                name="status" // Correct name
                value={formData.status} // Correct value binding
                onChange={handleChange} // Correct handler
                className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              >
                <option value="Open">Open</option>
                <option value="Fulfilled">Fulfilled</option>
                <option value="Closed">Closed</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            {/* Image Upload & Preview */}
            <div>
              <label
                htmlFor="image-upload"
                className="block text-sm font-medium text-gray-700"
              >
                Upload Example Image (Optional)
              </label>
              {/* Image Preview */}
              {formData.imagePreview && (
                <img
                  src={formData.imagePreview}
                  alt="Preview"
                  className="object-cover w-24 h-24 mt-2 mb-2 border rounded-md"
                />
              )}
              {/* File Input */}
              <input
                type="file"
                id="image-upload"
                name="image" // Name attribute is important for FormData, though not directly used by handleChange for file type
                accept="image/png, image/jpeg, image/gif"
                onChange={handleImageChange} // Use specific handler for files
                className="block w-full mt-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
              />
            </div>
            {/* Submit button moved to footer, form attribute links them */}
          </form>
        </div>

        {/* Modal Footer */}
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
          {/* Submit button triggers the form's onSubmit */}
          <button
            type="submit"
            form="buyer-modal-form" // Links this button to the form with id="buyer-modal-form"
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? "Saving..."
              : isEditing
              ? "Update Requirement"
              : "Post Requirement"}
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

// PropTypes
AddBuyerPostModel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.object,
  isSubmitting: PropTypes.bool,
};

export default AddBuyerPostModel;
//
