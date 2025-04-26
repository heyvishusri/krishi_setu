import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AddFarmerPostModal from "./Pages/AddFarmerPostModal";
import AddDriverPostModel from "./Pages/AddDriverPostModel";
import AddSellerPostModel from "./Pages/AddSellerPostModel";
import AddBuyerPostModel from "./Pages/AddBuyerPostModel";
import KrishisetuRegister from "./Pages/Singup";
import KrishisetuLogin from "./Pages/Login";

import Farmer from "./Pages/Farmer";
import Driver from "./Pages/Driver";
import Seller from "./Pages/Seller";
import Buyer from "./Pages/Buyer";
import Dashboard from "./Pages/Navbar";
import Weather from "./Pages/Weather";
import Header from "./layouts/Header";
import Profile from "./Pages/Profile";
import FarmerPostsTable from "./Pages/FarmerPost";
import DriverPostsTable from "./Pages/DriverPost";
import SellerPostsTable from "./Pages/SellerPost";
import BuyerPostTable from "./Pages/BuyerPost";

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          {/* Default open Dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Register and Login */}
          <Route path="/register" element={<KrishisetuRegister />} />
          <Route path="/login" element={<KrishisetuLogin />} />

          {/* Dashboard */}
          <Route path="/dashboard/*" element={<DashboardLayout />} />
        </Routes>
      </Router>
    </div>
  );
}

const DashboardLayout = () => (
  <div className="flex min-h-screen bg-gray-100">
    {/* Sidebar/Navbar */}
    <div className="fixed w-64 h-full bg-white shadow-md">
      <Dashboard />
    </div>

    {/* Main content */}
    <div className="flex flex-col flex-1 ml-64">
      <Header />

      <div className="flex-grow h-full p-4 overflow-auto">
        <div className="overflow-hidden p-9">
          <Routes>
            {/* All protected Routes */}
            <Route
              path="Farmer"
              element={
                <ProtectedRoute>
                  <Farmer />
                </ProtectedRoute>
              }
            />
            <Route
              path="Driver"
              element={
                <ProtectedRoute>
                  <Driver />
                </ProtectedRoute>
              }
            />
            <Route
              path="Seller"
              element={
                <ProtectedRoute>
                  <Seller />
                </ProtectedRoute>
              }
            />
            <Route
              path="Buyer"
              element={
                <ProtectedRoute>
                  <Buyer />
                </ProtectedRoute>
              }
            />
            <Route
              path="weather"
              element={
                <ProtectedRoute>
                  <Weather />
                </ProtectedRoute>
              }
            />
            <Route
              path="Profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="FarmerPost"
              element={
                <ProtectedRoute>
                  <FarmerPostsTable />
                </ProtectedRoute>
              }
            />
            <Route
              path="DriverPost"
              element={
                <ProtectedRoute>
                  <DriverPostsTable />
                </ProtectedRoute>
              }
            />
            <Route
              path="SellerPost"
              element={
                <ProtectedRoute>
                  <SellerPostsTable />
                </ProtectedRoute>
              }
            />
            <Route
              path="BuyerPost"
              element={
                <ProtectedRoute>
                  <BuyerPostTable />
                </ProtectedRoute>
              }
            />
            <Route
              path="FarmerPostsTable"
              element={
                <ProtectedRoute>
                  <FarmerPostsTable />
                </ProtectedRoute>
              }
            />

            <Route
              path="AddFarmerPostModal"
              element={
                <ProtectedRoute>
                  <AddFarmerPostModal />
                </ProtectedRoute>
              }
            />
            <Route
              path="AddDriverPostModel"
              element={
                <ProtectedRoute>
                  <AddDriverPostModel />
                </ProtectedRoute>
              }
            />
            <Route
              path="AddSellerPostModel"
              element={
                <ProtectedRoute>
                  <AddSellerPostModel />
                </ProtectedRoute>
              }
            />
            <Route
              path="AddBuyerPostModel"
              element={
                <ProtectedRoute>
                  <AddBuyerPostModel />
                </ProtectedRoute>
              }
            />
            <Route
              path="Header"
              element={
                <ProtectedRoute>
                  <Header />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  </div>
);

export default App;
