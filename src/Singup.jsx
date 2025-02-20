import React from "react";
import { Link } from "react-router-dom";
Link

const KrishisetuRegister = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-6 ">
          {/* <img
            src="https://storage.googleapis.com/a1aa/image/PQfqdD8-_5Cb8Bc1MleO275YGSR23fHhxQBVs9mLW9Y.jpg"
            alt="Logo with a leaf icon"
            className="mx-auto mb-2"
            width={50}
            height={50}
          /> */}
          <h1 className="text-2xl font-bold text-green-600">KRISHISETU</h1>
        </div>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input type="text" placeholder="Enter your name" className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" placeholder="xxxxx@xxx.xx" className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Mobile Number</label>
            <input type="tel" placeholder="+91 000 000 0000" className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input type="password" placeholder="••••••" className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Location</label>
            <div className="flex">
              <div className="relative flex-grow">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <i className="fas fa-map-marker-alt text-black"></i>
                </span>
                <input type="text" placeholder="Click the button to get location" className="w-full pl-10 pr-3 py-2 border rounded-l-md" />
              </div>
              <button type="button" className="bg-green-600 text-white px-4 py-2 rounded-r-md">
                Get
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Select your business</label>
            <div className="flex flex-col">
              {['Farm', 'Farmer', 'Marketing', 'Bayer'].map((business) => (
                <label key={business} className="inline-flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2">{business}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Profile Picture</label>
            <input type="file" className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div className="mb-4">
            <button type="submit" className="w-full bg-green-600 text-white px-4 py-2 rounded-md">
              Sign Up
            </button>
          </div>
          <div className="text-center">
            <Link to='/' >Already have an account? <span className="text-green-400 hover:underline"> Sign In</span> </Link>
            {/* <a href="#" className="text-green-600">Already have an account? Sign In</a> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default KrishisetuRegister;
