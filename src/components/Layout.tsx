import React from "react";
import { Outlet } from "react-router-dom";

export const Layout: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
    <Outlet />
  </div>
);
