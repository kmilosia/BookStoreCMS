import React from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
    return(
        <div className="flex flex-row h-screen w-screen">
            <Sidebar />
            <div className="flex flex-col w-full">
                {/* <Navbar/> */}
                <Outlet/>
            </div>
        </div>
    )
}