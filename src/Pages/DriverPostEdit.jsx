import { useState } from "react";
import PropTypes from "prop-types";

const DriverPostEdit = ({ post, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: post?.title || "",
    serviceArea: post?.serviceArea || "",
    rate: post?.rate || "",
    availability: post?.availability || "",
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
        Edit Driver Post
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
          placeholder="e.g., Experienced Driver Available"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Service Area
        </label>
        <input
          type="text"
          name="serviceArea"
          value={formData.serviceArea}
          onChange={handleInputChange}
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg"
          placeholder="e.g., Downtown, North Side, 50km Radius"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Rate
        </label>
        <input
          type="text"
          name="rate"
          value={formData.rate}
          onChange={handleInputChange}
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg"
          placeholder="e.g., $20/hour, $50/trip, Negotiable"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Availability / Schedule
        </label>
        <input
          type="text"
          name="availability"
          value={formData.availability}
          onChange={handleInputChange}
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg"
          placeholder="e.g., Mon-Fri 9am-5pm, Weekends only, Flexible"
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
          placeholder="Provide details about the job or service offered..."
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Upload Image (Optional)
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
DriverPostEdit.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    serviceArea: PropTypes.string,
    rate: PropTypes.string,
    availability: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default DriverPostEdit;
