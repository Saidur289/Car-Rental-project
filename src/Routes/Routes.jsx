import { createBrowserRouter } from "react-router-dom";
import Layout from "../MainLayOut/Layout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AddCarPage from "../Pages/AddCarPage";
import PrivateRoute from "./PrivateRoute";
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
    ],
  },
]);
export default router;
