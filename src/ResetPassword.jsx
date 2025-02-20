import { Link } from "react-router-dom";

Link

const KrishisetuResetPassword = () => {
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
            <label className="block text-gray-700">Email</label>
            <input type="email" placeholder="xxxxx@xxx.xx" className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div className="mb-4">
            <Link to='/OTPVerification'><button type="submit" className="w-full bg-green-600 text-white px-4 py-2 rounded-md">
              Reset Password
            </button></Link>
          </div>
            <div className="text-center">
                <Link to="/">
                    Remembered your password? <span className="text-green-400 hover:underline"> Sign In</span>
                </Link>
            </div>
        </form>
      </div>
    </div>
  );
};

export default KrishisetuResetPassword;
