import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
export default function routes() {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sections" element={<Sections />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
}
