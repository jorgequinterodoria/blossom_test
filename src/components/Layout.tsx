import React from "react";
import { Outlet } from "react-router-dom";

export const Layout: React.FC = () => (
  <div className="min-h-screen">
    <Outlet />
  </div>
);
