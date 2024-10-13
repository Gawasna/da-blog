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
      <Suspense>
        <Outlet/>
      </Suspense>
      <Footer></Footer>
    </div>
  );
}

export default RootRoute;