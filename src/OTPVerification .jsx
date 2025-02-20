import React from "react";
import { Link } from "react-router-dom";

Link

const KrishisetuOTPVerification = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <img
            src="https://storage.googleapis.com/a1aa/image/PQfqdD8-_5Cb8Bc1MleO275YGSR23fHhxQBVs9mLW9Y.jpg"
            alt="Logo with a leaf icon"
            className="mx-auto mb-2"
            width={50}
            height={50}
          />
          <h1 className="text-2xl font-bold text-green-600">KRISHISETU</h1>
        </div>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Enter OTP</label>
            <div className="flex justify-between">
              <input type="text" maxLength="1" className="w-1/4 px-3 py-2 border rounded-md text-center" />
              <input type="text" maxLength="1" className="w-1/4 px-3 py-2 border rounded-md text-center" />
              <input type="text" maxLength="1" className="w-1/4 px-3 py-2 border rounded-md text-center" />
              <input type="text" maxLength="1" className="w-1/4 px-3 py-2 border rounded-md text-center" />
            </div>
          </div>
          <div className="mb-4">
            <Link to='/setuResetPassword'><button type="submit" className="w-full bg-green-600 text-white px-4 py-2 rounded-md">
              Verify OTP
            </button></Link>
          </div>
          <div className="text-center">
            <a href="#" className="text-green-600">Resend OTP</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KrishisetuOTPVerification;
