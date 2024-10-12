import { Suspense, useEffect, useState } from "react";
import Header from "../component/layout/header/Header";
import Footer from "../component/layout/footer/Footer";
import { Outlet, useLocation } from "react-router";
//scroll top
import "./root.css";

function RootRoute() {

  return (
    <div className="main_wrapper">
      <Header></Header>
      <div className="mainL">
      <div className="bannerL">

      </div>
      <div className="featuredL">

      </div>
      <div className="navmL">

      </div>
      <div className="postsL">

      </div>
    </div>
      
      <Footer></Footer>
    </div>
  );
}

export default RootRoute;