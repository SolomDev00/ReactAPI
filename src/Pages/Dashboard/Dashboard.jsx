import React from "react";
import "./Dashboard.css";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <TopBar />
      <div className="d-space">
        <SideBar />
        <div style={{ width: "80%" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
