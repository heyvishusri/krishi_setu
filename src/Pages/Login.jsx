import { Link } from "react-router-dom";
Link;

function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="mb-6 text-center">
          <img
            src="/images/logo.jpeg"
            alt="Logo with a green leaf icon"
            className="mx-auto mb-2 rounded-full"
            width={50}
            height={50}
          />
          <h1 className="text-2xl font-bold text-green-700">KRISHISETU</h1>
        </div>
        <h2 className="mb-4 text-xl text-center text-green-600">
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
          <Link to={"/dashboard/Farmer"}>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-green-600 rounded-lg"
            >
              Login
            </button>
          </Link>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-700">
            Are you New? {/* <a href="#" className="text-green-600"> */}
            <Link to="/register" className="text-green-600 hover:underline">
              {" "}
              Create an account
            </Link>
            {/* </a> */}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
