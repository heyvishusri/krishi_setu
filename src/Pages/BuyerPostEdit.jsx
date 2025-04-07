import { useState } from "react";
import PropTypes from "prop-types";

const BuyerPostEdit = ({ post, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    itemNeeded: post?.itemNeeded || "",
    category: post?.category || "",
    quantity: post?.quantity || "",
    specifications: post?.specifications || "",
    location: post?.location || "",
    budget: post?.budget || "",
    image: null,
    imagePreview: post?.image || null,
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

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        Edit Your Requirement
      </h2>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Item Needed
        </label>
        <input
          type="text"
          name="itemNeeded"
          value={formData.itemNeeded}
          onChange={handleInputChange}
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg"
          placeholder="e.g., Tractor, Seeds"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Category
        </label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg"
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
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg"
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
          rows={4}
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg"
          placeholder="e.g., >30 HP, Certified, Irrigated"
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
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg"
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
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg"
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
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg"
        />
        {formData.imagePreview && (
          <div className="mt-4">
            <p className="mb-1 text-sm font-medium text-gray-700">Preview:</p>
            <img
              src={formData.imagePreview}
              alt="Preview"
              className="object-cover w-auto h-32 border border-gray-200 rounded"
            />
          </div>
        )}
      </div>
      <div className="flex justify-end mt-6">
        <button
          onClick={onCancel}
          className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
        >
          Save
        </button>
      </div>
    </div>
  );
};
BuyerPostEdit.propTypes = {
  post: PropTypes.shape({
    itemNeeded: PropTypes.string,
    category: PropTypes.string,
    quantity: PropTypes.string,
    specifications: PropTypes.string,
    location: PropTypes.string,
    budget: PropTypes.string,
    image: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default BuyerPostEdit;
