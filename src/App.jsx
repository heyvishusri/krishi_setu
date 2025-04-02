import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import KrishisetuRegister from "./Pages/Singup";
import KrishisetuLogin from "./Pages/Login"; // Create a Login component
import KrishisetuResetPassword from "./Pages/ResetPassword"; // Create a ResetPassword component
import KrishisetuOTPVerification from "./Pages/OTPVerification ";
import KrishisetNewResetPassword from "./Pages/setuResetPassword";
// Create a SetuResetPassword component
import Farmer from "./Pages/Farmer"; // Create a FarmerPage component
import Driver from "./Pages/Driver"; // Create a DriversPage component
import Seller from "./Pages/Seller"; // Create a SellerPage component
import Buyer from "./Pages/Buyer"; // Create a BuyerPage component
import Dashboard from "./Pages/Navbar"; // Correct the import path for Dashboard
import Weather from "./Pages/Weather"; // Import Weather component

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
          {/* Add Dashboard route */}
        </Routes>
      </Router>
    </div>
  );
}

const DashboardLayout = () => (
  <div className="flex min-h-screen bg-gray-100">
    <Dashboard />
    <div className="flex-grow p-4">
      <Routes>
        <Route path="Farmer" element={<Farmer />} />
        <Route path="Driver" element={<Driver />} />
        <Route path="Seller" element={<Seller />} /> {/* Add Seller route */}
        <Route path="Buyer" element={<Buyer />} /> {/* Add Buyer route */}
        <Route path="weather" element={<Weather />} /> {/* Add Weather route */}
      </Routes>
    </div>
  </div>
);

export default App;
