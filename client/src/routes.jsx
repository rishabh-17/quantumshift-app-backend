import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Sections from "./pages/Sections";
import Blog from "./pages/Blog";
import Blogs from "./pages/Blogs";
import Users from "./pages/Users";
import Navbar from "./components/Navbar";
export default function routes() {
  const [adminAuth, setAdminAuth] = useState(localStorage.getItem("adminAuth"));
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <div className="bg-gray-100 min-h-screen">
        {adminAuth ? (
          <Router>
            <Navbar setAdminAuth={setAdminAuth} />
            <Routes>
              <Route path="/sections" element={<Sections />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/" element={<Users />} />
            </Routes>
          </Router>
        ) : (
          <Router>
            <Routes>
              <Route path="/" element={<Login setAdminAuth={setAdminAuth} />} />
            </Routes>
          </Router>
        )}
      </div>
    </React.Suspense>
  );
}
