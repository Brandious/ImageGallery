import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Index } from "../pages";
import { LikedImages } from "../pages/LikedImages";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/liked-images" element={<LikedImages />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
