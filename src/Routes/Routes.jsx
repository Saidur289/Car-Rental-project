import { createBrowserRouter } from "react-router-dom";
import Layout from "../MainLayOut/Layout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AddCarPage from "../Pages/AddCarPage";
import PrivateRoute from "./PrivateRoute";
import MyCarsPage from "../Pages/MyCarsPage";
import Modal from "../components/Modal";
import AvailableCar from "../Pages/AvailableCar";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/add-car",
        element: (
          <PrivateRoute>
            <AddCarPage></AddCarPage>
          </PrivateRoute>
        ),
      },
      {
        path: '/my-cars',
        element: <PrivateRoute><MyCarsPage></MyCarsPage></PrivateRoute>
      },
      {
        path: '/available',
        element:<AvailableCar></AvailableCar>
      }
    
    ],
  },
]);
export default router;
