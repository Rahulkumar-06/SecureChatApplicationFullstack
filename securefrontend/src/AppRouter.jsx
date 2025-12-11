import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Weapon from "./components/Public/Weapon";
import AdminWeaponManager from "./components/Admin/AdminWeaponManager"
import AdminDashboard from "./components/Admin/AdminDashboard";
import ChatPage from "./components/Soldier/ChatPage";
import SoldiersList from "./components/Soldier/SoldiersList";
export default function AppRouter(){
const router = createBrowserRouter([
    {   
    path:'/',
    element:<Weapon/> 
    },
    { 
    path: "/login",
    element: <Login/>
    },
    {
    path: "/admindashboard",
    element: <AdminDashboard/>
    },
    {
    path: "/weaponmanager", 
    element: <AdminWeaponManager/>
    },
    {
        path:"/chat/:receiver",
        element:<ChatPage/>
    },
    {
        path:"/soldierslist",
        element:<SoldiersList/>
    }
]);
return <RouterProvider router={router} />;
}