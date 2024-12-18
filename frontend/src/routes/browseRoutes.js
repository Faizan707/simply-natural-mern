import { createBrowserRouter } from "react-router-dom";
import { Routes } from "./route";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import Login from "../pages/Login";
import AdminDashboard from "../pages/AdminDashboard";
import ProtectedRoute from "../components/ProtectedRoute";
const router = createBrowserRouter([
    {
    path:Routes.Home,
    element:<Home/>
    },
    {
        path:Routes.SignUp,
        element:<SignUp/>
    },
    {
        path:Routes.Login,
        element:<Login/>
    },
    {
        path:Routes.Dashboard,
        element:<ProtectedRoute element={<AdminDashboard/>}/>
    }


])

export default router