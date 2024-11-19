import { createBrowserRouter } from "react-router-dom";
import RootRoute from "@/pages/RootRoute";
import HomePage from "@/pages/HomePage/HomePage";
import Login from "@/pages/Login&Register/Login";
import Register from "@/pages/Login&Register/Register";
import TestConnection from "@/test/TestConnection";
import Congrat from "@/pages/Login&Register/Congrat";
import Post from "@/pages/Posts/Post";
import PostDetail from "@/pages/Posts/PostDetail";
import Comment from "@/component/layout/cmt/Comment";
import PopularSide from "@/component/layout/ftp/PAside";
import ForgotPassword from "@/pages/Login&Register/ForgotPassword";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/forgotpassword",
        element: <ForgotPassword />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Register />,
      },
      {
        path: "/congrat",
        element: <Congrat />,
      },
      {
        path: "/post",
        element: 
          <PostDetail markdownUrl="https://raw.githubusercontent.com/Gawasna/be-dablog/master/README.md" />
      },
      {
        path: "/test-connection",
        element: <TestConnection />,
      },
    ],
  },
]);

export { router };