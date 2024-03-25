import React from "react";
import SidebarContent from "./SidebarContent";
import {
  Camera,
  UnfoldMoreRounded,
  KeyboardTab,
  KeyboardBackspace,
} from "@mui/icons-material";
import Icon from "Components/atoms/Icon";
import withRouter from "../../Components/Common/withRouter";
import bottomLogo from "../../assets/images/softrobotics-bottom-logo.png";
import { useSelector, useDispatch } from "react-redux";
import { setIsCollapsed } from "slices/general/reducer";
const Sidebar = (props: any) => {
  const { isCollpsed } = useSelector((state: any) => state.General);
  const dispatch = useDispatch();

  function tToggle() {
    var body = document.body;
    if (window.screen.width <= 998) {
      body.classList.toggle("sidebar-enable");
    } else {
      body.classList.toggle("vertical-collpsed");
      body.classList.toggle("sidebar-enable");
    }
    dispatch(
      setIsCollapsed(document.body.classList.contains("vertical-collpsed"))
    );
  }
  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="navbar-brand-box">
          <div className="d-flex gap-2 text-start">
            <Icon
              onClick={() => props.router.navigate("/dashboard")}
              className="logoIconFirst"
              name="Graphy"
              constantIcon
              size={32}
            />
            <span onClick={() => props.router.navigate("/dashboard")}>
              <p className="logotext">FastPay</p>
            </span>
            <UnfoldMoreRounded className="logoIconSecond" />
          </div>
        </div>
        <div className="h-100">
          <SidebarContent />
        </div>
        <div className="navbar-brand-box-bottom">
          <div className="d-flex text-start">
            <div className="bottom-logo-container">
              <img src={bottomLogo} />
            </div>
            <div>
              {isCollpsed ? (
                <KeyboardTab
                  className="bottomLogo"
                  role="button"
                  onClick={() => tToggle()}
                />
              ) : (
                <Icon
                  name="HorizontalAlignLeft"
                  role="button"
                  constantIcon
                  onClick={() => tToggle()}
                />
              )}
            </div>
          </div>
        </div>
        <div className="sidebar-background"></div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Sidebar);
