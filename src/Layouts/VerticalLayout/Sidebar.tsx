import React from "react";
import { Link } from "react-router-dom";

//import components
import SidebarContent from "./SidebarContent";

//import images
import logo from "../../assets/images/logo.svg";
import logoLightPng from "../../assets/images/logo-light.png";
import logoLightSvg from "../../assets/images/logo-light.svg";
import logoDark from "../../assets/images/logo-dark.png";
import { Camera, UnfoldMoreRounded } from "@mui/icons-material";

const Sidebar = (props: any) => {
  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="navbar-brand-box">
          <div className="d-flex gap-2 text-start">
            <Camera className="logoIconFirst" />
            <span>
              <p className="logotext">FastPay</p>
            </span>
            <UnfoldMoreRounded className="logoIconSecond" />
          </div>
          {/* <Link to="/" className="logo logo-light">
            <span className="logo-sm">
              <img src={logoLightSvg} alt="" height="22" />
            </span>
            <span className="logo-lg">
              <img src={logoLightPng} alt="" height="19" />
            </span>
          </Link> */}
        </div>
        <div className="h-100">
          <SidebarContent />
        </div>
        <div className="navbar-brand-box-bottom">tolga</div>
        <div className="sidebar-background"></div>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
