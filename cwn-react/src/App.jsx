import Navbar from "./components/navbar/Navbar";
import { Route, Routes, Navigate } from "react-router-dom";
import {
  Home,
  About,
  Services,
  Solutions,
  Courses,
  Projects,
  Portfolio,
  Company,
  Blogs,
  BlogPost,
  BlogAdmin,
  PrivacyPolicy,
} from "@pages";
import Seo from "@components/seo/Seo";

export default function App() {
  return (
    <>
      <Seo
        title="Code With Naqvi - Learn Web Development"
        description="Code With Naqvi offers React, Rails, and web dev tutorials."
        keywords="React, Rails, Web Development, Code With Naqvi"
        image="/cover-image.jpg"
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/admin" element={<BlogAdmin />} />
        <Route path="/blogs/:slug" element={<BlogPost />} />
        <Route path="/company" element={<Company />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<Navigate to={"./"} replace />} />
      </Routes>
    </>
  );
}
