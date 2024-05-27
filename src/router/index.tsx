import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import Layout from  "@widgets/Layout";
import { childRoute } from "./ChildRoute";

const route: RouteObject[] = [
    {
        path: "/",
        element: <Layout />,
        children: childRoute
    },{
        path: "*",
        element: <Navigate to="/dashboard" />
    }
]

export const router = createBrowserRouter(route)