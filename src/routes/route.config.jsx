import { createBrowserRouter } from "react-router-dom";
import RootRoute from "../pages/RootRoute";
import HomePage from "../pages/HomePage/HomePage";

const router = createBrowserRouter([
    {
      path: "/",
      element: <RootRoute />,
      children: [
        {
          path: "",
          element: <HomePage></HomePage>,
        }
      ],
    },
  ]);
  
  export { router };