import React from 'react'
import { Link } from 'react-router-dom';
Link


const KrishisetuLogin = () => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="text-center mb-6">
            {/* <img
              src="https://storage.googleapis.com/a1aa/image/dKrp1C98kQvoBHey6zLjJ6BPPb2boA4dNNb8PyhA3Fg.jpg"
              alt="Logo with a green leaf icon"
              className="mx-auto mb-2"
              width={50}
              height={50}
            /> */}
            <h1 className="text-2xl font-bold text-green-700">KRISHISETU</h1>
          </div>
          <h2 className="text-center text-xl text-green-600 mb-4">
            Welcome to Krishisetu!
          </h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="username">
                Your mobile Number or Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter your Mobile Number or Username"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="text-center mb-4">
              {/* <a href="#" className="text-green-600">
                Forgot your password?
              </a> */}
              <Link to='/reset' className="text-green-600 hover:underline">Forgot your password?</Link>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Sign Up
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-gray-700">
              Are you New?{' '}
              {/* <a href="#" className="text-green-600"> */}
                <Link to='/register' className="text-green-600 hover:underline">  Create an account</Link>
              
              {/* </a> */}
            </p>
          </div>
        </div>
      </div>
    );
  };
  
export default KrishisetuLogin
  