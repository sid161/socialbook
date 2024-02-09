import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import ProtectedRoutes from "./Services/ProtectedRoute";
import SocialBookHeader from "./Components/SocialBookHeader";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <SocialBookHeader />
        <Routes>
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
