import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header.jsx";
import NavPage from "./pages/NavPage.jsx";
import CategoryPage from "./pages/categoryPage.jsx";
import BasketPage from "./pages/BasketPage.jsx";
import ItemPage from "./pages/itemPage.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/navigation" element={<NavPage />} />
      <Route path="/categories/:id" element={<CategoryPage />} />
      <Route path="/basket" element={<BasketPage />} />
      <Route path="/item/:id" element={<ItemPage />} />
    </Routes>
  </BrowserRouter>
);
