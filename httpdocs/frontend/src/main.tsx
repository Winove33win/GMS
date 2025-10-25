import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Mentores from "@/pages/Mentores";
import "@/index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/mentores" element={<Mentores />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
