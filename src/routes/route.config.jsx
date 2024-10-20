import { createBrowserRouter } from "react-router-dom";
import RootRoute from "@/pages/RootRoute";
import HomePage from "@/pages/HomePage/HomePage";
import Login from "@/pages/Login&Register/Login";
import Register from "@/pages/Login&Register/Register";

const router = createBrowserRouter([
    {
      path: "/",
      element: <RootRoute />,
      children: [
        {
          path: "",
          element: <HomePage></HomePage>,
        },
        {
          path: "/login",
          element: <Login></Login>,
        },
        {
          path: "/signup",
          element: <Register></Register>
        },
        {
          path:"/post",
          element:<></>,
          children:[
            {
              path: "id",
              element: <></>,
            },
          ],
        }
      ],
    }
  ]);
  
  export { router };