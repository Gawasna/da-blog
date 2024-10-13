import { createBrowserRouter } from "react-router-dom";
import RootRoute from "../pages/RootRoute";
import HomePage from "../pages/HomePage/HomePage";
import LoginForm from "../pages/Login&Register/Login.jsx";
import RegisterForm from "../pages/Login&Register/Register.jsx";

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
          element: <LoginForm></LoginForm>,
        },
        {
          path: "/signup",
          element: <RegisterForm></RegisterForm>
        }
      ],
    }
  ]);
  
  export { router };