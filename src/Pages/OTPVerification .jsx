import "react";
import { Link } from "react-router-dom";

Link;

const OTPVerification = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="mb-6 text-center">
          <img
            src="/images/logo.jpeg"
            alt="Logo with a leaf icon"
            className="mx-auto mb-2 rounded-full"
            width={50}
            height={50}
          />

          <h1 className="text-2xl font-bold text-green-600">KRISHISETU</h1>
        </div>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Enter OTP</label>
            <div className="flex justify-between">
              <input
                type="text"
                maxLength="1"
                className="w-1/4 px-3 py-2 text-center border rounded-md"
              />
              <input
                type="text"
                maxLength="1"
                className="w-1/4 px-3 py-2 text-center border rounded-md"
              />
              <input
                type="text"
                maxLength="1"
                className="w-1/4 px-3 py-2 text-center border rounded-md"
              />
              <input
                type="text"
                maxLength="1"
                className="w-1/4 px-3 py-2 text-center border rounded-md"
              />
            </div>
          </div>
          <div className="mb-4">
            <Link to="/setuResetPassword">
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-green-600 rounded-md"
              >
                Verify OTP
              </button>
            </Link>
          </div>
          <div className="text-center">
            <a href="#" className="text-green-600">
              Resend OTP
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;
