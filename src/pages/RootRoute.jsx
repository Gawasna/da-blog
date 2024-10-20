import { Suspense, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import "./root.css";
import Loading from "@/component/common/loading";
import Header from "@/component/layout/header/Header";
import Footer from "@/component/layout/footer/Footer";

function RootRoute() {

  return (
    <div className="main_wrapper">
      <Header></Header>
      <Suspense  fallback={<Loading/>}>
        <Outlet/>
      </Suspense>
      <Footer></Footer>
    </div>
  );
}

export default RootRoute;