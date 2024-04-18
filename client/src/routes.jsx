import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Sections from "./pages/Sections";
import Blog from "./pages/Blog";
import Blogs from "./pages/Blogs";
import Users from "./pages/Users";
import Navbar from "./components/Navbar";
export default function routes() {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <div className="bg-gray-100 min-h-screen">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sections" element={<Sections />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Router>
      </div>
    </React.Suspense>
  );
}
