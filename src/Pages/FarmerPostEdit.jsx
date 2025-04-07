import { useState } from "react";
import PropTypes from "prop-types";

const FarmerPostEdit = ({ post, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: post?.title || "",
    area: post?.area || "",
    price: post?.price || "",
    workTime: post?.workTime || "",
    description: post?.description || "",
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
        Edit Farmer Post
      </h2>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Area of Work
        </label>
        <input
          type="text"
          name="area"
          value={formData.area}
          onChange={handleInputChange}
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Price by Bigha
        </label>
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Work Time
        </label>
        <input
          type="text"
          name="workTime"
          value={formData.workTime}
          onChange={handleInputChange}
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Upload Image
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
FarmerPostEdit.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    area: PropTypes.string,
    price: PropTypes.string,
    workTime: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default FarmerPostEdit;
