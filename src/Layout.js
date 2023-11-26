import React from "react";
import Sidebar from "./components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkUserLogin } from "./store/userSlice";

export const Layout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isAuth} = useSelector((state) => state.user)
    // useEffect(() => {
    // dispatch(checkUserLogin()) 
    //     if (!isAuth) {
    //       navigate('/login');
    //     }
    // }, [isAuth])
    return(
        <div className="flex flex-row h-screen w-screen">
            <Sidebar />
            <div className="flex flex-col w-full">
                <Outlet/>
            </div>
        </div>
    )
}