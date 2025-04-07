import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import KrishisetuRegister from "./Pages/Singup";
import KrishisetuLogin from "./Pages/Login";
import KrishisetuResetPassword from "./Pages/ResetPassword";
import KrishisetuOTPVerification from "./Pages/OtpVerification";
import KrishisetNewResetPassword from "./Pages/setuResetPassword";
import Farmer from "./Pages/Farmer";
import Driver from "./Pages/Driver";
import Seller from "./Pages/Seller";
import Buyer from "./Pages/Buyer";
import Dashboard from "./Pages/Navbar"; // Sidebar/Navbar
import Weather from "./Pages/Weather";
import Header from "./layouts/Header"; // Header
import Profile from "./Pages/Profile";
import FarmerPostsTable from "./Pages/FarmerPost"; // Import FarmerPost component
import DriverPostsTable from "./Pages/DriverPost"; // Import DriverPost component
import SellerPostsTable from "./Pages/SellerPost";
import BuyerPostTable from "./Pages/BuyerPost"; // Import BuyerPost component
import FarmerPostEdit from "./Pages/FarmerPostEdit"; // Import FarmerPostEdit component
import DriverPostEdit from "./Pages/DriverPostEdit"; // Import Weather
import SellerPostEdit from "./Pages/SellerPostEdit"; //
import BuyerPostEdit from "./Pages/BuyerPostEdit"; // Import BuyerPostEdit component
function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<KrishisetuLogin />} /> {/* Default Route */}
          <Route path="/register" element={<KrishisetuRegister />} />
          <Route path="/reset" element={<KrishisetuResetPassword />} />
          <Route
            path="/OTPVerification"
            element={<KrishisetuOTPVerification />}
          />
          <Route
            path="/setuResetPassword"
            element={<KrishisetNewResetPassword />}
          />
          <Route path="/dashboard/*" element={<DashboardLayout />} />{" "}
          {/* Dashboard Route */}
        </Routes>
      </Router>
    </div>
  );
}

const DashboardLayout = () => (
  <div className="flex min-h-screen bg-gray-100">
    {/* Sidebar or Navigation Component */}
    <div className="fixed w-64 h-full bg-white shadow-md">
      <Dashboard />
    </div>

    {/* Main Content Area */}
    <div className="flex flex-col flex-1 ml-64">
      {/* Header */}
      <Header />

      {/* Scrollable Content */}
      <div className="flex-grow h-full p-4 overflow-auto">
        <div className="overflow-hidden p-9">
          <Routes>
            <Route path="Farmer" element={<Farmer />} />
            <Route path="Driver" element={<Driver />} />
            <Route path="Seller" element={<Seller />} />
            <Route path="Buyer" element={<Buyer />} />
            <Route path="weather" element={<Weather />} />
            <Route path="profile" element={<Profile />} />
            <Route path="FarmerPost" element={<FarmerPostsTable />} />{" "}
            {/* Add FarmerPost Route */}
            <Route path="DriverPost" element={<DriverPostsTable />} />{" "}
            <Route path="SellerPost" element={<SellerPostsTable />} />{" "}
            <Route path="BuyerPost" element={<BuyerPostTable />} />{" "}
            {/* Add BuyerPost Route */}
            <Route path="FarmerPostEdit" element={<FarmerPostEdit />} />{" "}
            <Route path="DriverPostEdit" element={<DriverPostEdit />} />{" "}
            <Route path="SellerPostEdit" element={<SellerPostEdit />} />{" "}
            <Route path="BuyerPostEdit" element={<BuyerPostEdit />} />{" "}
          </Routes>
        </div>
      </div>
    </div>
  </div>
);

export default App;
