import { Button } from "antd";
// import "./backToTop.css";
// import { UpOutlined } from "@ant-design/icons";
import "animate.css";
import { scrollToTp } from "./scrolltop";
function BackToTopBtn({ isDisplay }) {
  return (
    <div className={`${isDisplay ? '':'d-none'} btn_back_to_top wow animate__animated animate__fadeInDown`}>
      <Button className="btn btn-warning" onClick={scrollToTp}>
        <UpOutlined></UpOutlined>
      </Button>
    </div>
  );
}

export default BackToTopBtn;