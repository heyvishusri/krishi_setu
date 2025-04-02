import { useState } from 'react';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    profession: '',
    password: '',
    picture: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your save logic here
  };

  const handleCancel = () => {
    // Add navigation back or reset form
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-4 mb-6">
          <img
            src="/images/dp.jpeg"
            alt="Profile"
            className="w-24 h-24 rounded-full"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFormData({...formData, picture: e.target.files[0]})}
          />
        </div>

        <div className="space-y-4">
          {[
            { label: 'Name', name: 'name', type: 'text' },
            { label: 'Email', name: 'email', type: 'email' },
            { label: 'Mobile', name: 'mobile', type: 'tel' },
            { label: 'Address', name: 'address', type: 'text' },
            { label: 'Profession', name: 'profession', type: 'text' },
            { label: 'Password', name: 'password', type: 'password' },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        <div className="flex space-x-4 mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;