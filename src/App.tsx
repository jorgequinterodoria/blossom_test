// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { CharacterDetail } from "./pages/CharacterDetail";
import { Layout } from "./components/Layout";

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="character/:id" element={<CharacterDetail />} />
    </Route>
  </Routes>
);

export default App;
