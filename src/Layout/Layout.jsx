import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import './Layout.css';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="app-container">
      {/* Sidebar tetap (fixed), tetap dirender tapi bisa hidden dengan display: none) */}
      <div className="sidebar" style={{ display: isSidebarOpen ? 'block' : 'none' }}>
        <Sidebar />
      </div>

      {/* Main content area */}
      <div
        className="main-content"
        style={{ marginLeft: isSidebarOpen ? '250px' : '0' }} // supaya konten bergeser saat sidebar dibuka/tutup
      >
        <div className="topbar">
          <Topbar toggleSidebar={toggleSidebar} />
        </div>

        <div className="with-fixed-topbar">
          <div className="page-content">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
