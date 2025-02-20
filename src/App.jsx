import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import KrishisetuRegister from "./Singup";
import KrishisetuLogin from "./Login"; // Create a Login component
import KrishisetuResetPassword from "./ResetPassword"; // Create a ResetPassword component
import KrishisetuOTPVerification from "./OTPVerification ";
import KrishisetNewResetPassword from "./setuResetPassword"; // Create a SetuResetPassword component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<KrishisetuLogin />} /> {/* Default Route */}
        <Route path="/register" element={<KrishisetuRegister />} />
        <Route path="/reset" element={<KrishisetuResetPassword/>}></Route>
        <Route path="/OTPVerification" element={<KrishisetuOTPVerification/>}></Route>
        <Route path="/setuResetPassword" element={<KrishisetNewResetPassword/>}></Route>
        

      </Routes>
    </Router>
  );
}

export default App;
