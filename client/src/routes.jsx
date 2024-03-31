import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Sections from "./pages/Sections";
import Blog from "./pages/Blog";
import Blogs from "./pages/Blogs";
import Users from "./pages/Users";
export default function routes() {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sections" element={<Sections />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/" element={<Users />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
}
