import { createBrowserRouter } from "react-router";
import Register from "../Authintication/Register";
import Login from "../Authintication/Login";
import AddCategory from "../Pages/Admin/AddCategory";
import AddTransaction from "../Pages/Users/AddTransaction";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import UserHome from "../Pages/Users/userHome";
import TransactionHistory from "../Pages/Users/TransactionHistory";
import SavingsGoal from "../Pages/Users/SavingsGoal";
import AddTip from "../Pages/Admin/AddTip";
import AdminUsers from "../Pages/Admin/AdminUsers";
import AdminHome from "../Pages/Admin/AdminHome";
import ManageTransactions from "../Pages/Admin/ManageTransactions";
import Home from "../Pages/Home/Home";
import RootLayOut from "../RootLayOut/RootLayOut";
import ServicePage from "../Pages/Home/ServicePage";
import AboutPage from "../Pages/Home/AboutPage";
import Contact from "../Pages/Home/Contact";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayOut,
    children: [
      {
        index: true,
        Component: Home,
        loader: () =>
          fetch("https://bill-management-server-indol.vercel.app/Recent").then(
            (res) => res.json(),
          ),
      },
      {
        path: "/registition",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },

        {
          path: "/about",
          Component: AboutPage,
        },
        {
          path: "/contact",
          Component: Contact,
        },
        {
          path: "/services",
          Component: ServicePage,
        },

      //   {
      //     path: "/profile",
      //     Component: ProfileAvatar,
      //   },

      //   {
      //     path: "*",
      //     Component: ErrorPage,
      //   },
    ],
  },

  {
    path: "dashboard",
    element:<PrivateRoute><DashboardLayout /></PrivateRoute> , // মেইন লেআউট
    children: [
      // ইউজার রাউটস
      { path: "userHome", element: <UserHome /> },
      { path: "addTransaction", element: <AddTransaction /> },
      { path: "history", element: <TransactionHistory /> },
      { path: "savingsGoal", element: <SavingsGoal /> },
      { path: "adminUsers", element: <AdminUsers /> },
      { path: "adminHome", element: <AdminHome /> },
      { path: "manageTransactions", element: <ManageTransactions /> },

      // অ্যাডমিন রাউটস
      //   { path: "adminHome", element: <AdminHome /> },
      { path: "addCategory", element: <AddCategory /> },
      { path: "addTip", element: <AddTip /> },
    ],
  },
]);
