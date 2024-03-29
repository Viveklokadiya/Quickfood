import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/menuPage/Menu";
import Signup from "../components/Signup";
import Order from "../pages/dashboard/Order";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import UserProfile from "../pages/dashboard/UserProfile";
import CartPage from "../pages/menuPage/CartPage";
import Login from "../components/Login";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import Users from "../pages/dashboard/admin/Users";
import AddMenu from "../pages/dashboard/admin/AddMenu";
import ManageItems from "../pages/dashboard/admin/ManageItems";
import UpdateMenu from "../pages/dashboard/admin/UpdateMenu";
import CheckOutSucess from "../components/CheckOutSucess"
import ManageOrder from "../pages/dashboard/admin/ManageOrders";
import Vieworder from "../pages/dashboard/admin/Vieworder";
import Orderview from "../pages/dashboard/Orderview";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        {
            path: "/",
            element: <Home/>
        },
        {
          path: "/menu",
          element: <Menu/>
        },
        {
          path: "/order",
          element:<PrivateRoute><Order/></PrivateRoute>
        },
        {
          path: "/update-profile",
          element: <UserProfile/>
        },
        {
          path: "/cart-page",
          element: <CartPage/>
        },
        {
          path:"/checkout-success",
          element: <CheckOutSucess/>
        },
        {
          path: "/orders/",
          element: <Orderview/>,
          loader: ({params}) => fetch(`http://localhost:6001/orders/?orderId=${params.id}`)
        }, 
        
      ]
    },
    {
      path: "/signup",
      element: <Signup/>
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><DashboardLayout/></PrivateRoute>,
      children: [
        {
          path: '',
          element: <Dashboard/>
        },
        {
          path: 'users', 
          element: <Users/>
        },
        {
          path: 'add-menu',
          element: <AddMenu/>
        },
        {
          path: "manage-items",
          element: <ManageItems/>
        },
        {
          path: "manage-order",
          element: <ManageOrder/>
        }, 
        {
          path: "orders/",
          element: <Vieworder/>,
          loader: ({params}) => fetch(`http://localhost:6001/orders/?orderId=${params.id}`)
        }, 
        {
         
          path: "update-menu/:id",
          element: <UpdateMenu/>,
          loader: ({params}) => fetch(`http://localhost:6001/menu/${params.id}`)
        }
      ]
    }
  ]);

  export default router;