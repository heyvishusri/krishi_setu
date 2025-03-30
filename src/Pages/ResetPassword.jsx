import { Link } from "react-router-dom";

Link;

const KrishisetuResetPassword = () => {
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
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="xxxxx@xxx.xx"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <Link to="/OTPVerification">
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-green-600 rounded-md"
              >
                Reset Password
              </button>
            </Link>
          </div>
          <div className="text-center">
            <Link to="/">
              Remembered your password?{" "}
              <span className="text-green-400 hover:underline"> Sign In</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KrishisetuResetPassword;
