import { createBrowserRouter } from "react-router-dom";
import RootRoute from "@/pages/RootRoute";
import HomePage from "@/pages/HomePage/HomePage";
import Login from "@/pages/Login&Register/Login";
import Register from "@/pages/Login&Register/Register";
import TestConnection from "@/test/TestConnection";
import Post from "@/pages/Posts/Post";
import PostDetail from "@/pages/Posts/PostDetail";
import PopularSide from "@/component/layout/ftp/PAside";
import ForgotPassword from "@/pages/Login&Register/ForgotPassword";
import VerifyOTP from "@/pages/Login&Register/VerifyOTP";
import MainPosts from "@/component/layout/pl/MainPosts";
import Dashboard from "@/pages/Admin/Dashboard";
import PostList from "@/component/layout/pl/PostList";
import CommentSection from "@/component/layout/cmt/Comment";
import ReactMarkdown from 'react-markdown';
import CreatePost from "@/pages/Admin/CreatePost";
import PostManagement from "@/pages/Admin/postmanagement";
import UserManagement from "@/pages/Admin/usermanagement";

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
        path: "/verify-otp",
        element: <VerifyOTP />,
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
        path: "/post",
        element: (
          <>
            <PostDetail markdownUrl="https://raw.githubusercontent.com/Gawasna/Multimedia-archive/refs/heads/main/dablog/mdcontent/laykeynodemailer.md"/>
            <CommentSection/>
            <PostList />
          </>
        )
      },
      {
        path: "/post/:postId",
        element: (
          <>
            <PostDetail />
            <CommentSection/>
            <PostList />
          </>
        )
      },
      {
        path: "/test-connection",
        element: <TestConnection />,
      },
      {
        path: "admin/dashboard",
        element: <Dashboard/>,
      },
      {
        path: "admin/create-post",
        element: <CreatePost/>
      },
      {
        path: "admin/post-management",
        element: <PostManagement/>
      },
      {
        path: "admin/user-management",
        element: <UserManagement/>
      }
    ],
  },
]);

export { router };