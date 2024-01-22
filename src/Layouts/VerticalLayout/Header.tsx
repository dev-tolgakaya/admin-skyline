import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsCollapsed } from "slices/general/reducer";
import {
  Search,
  NotificationsActiveOutlined,
  HelpOutlineOutlined,
} from "@mui/icons-material";

// Reactstrap
import { Row, Col, Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";

// Import menuDropdown
import LanguageDropdown from "../../Components/Common/LanguageDropdown";
import NotificationDropDown from "../../Components/CommonForBoth/NotificationDropDown";
import ProfileMenu from "../../Components/CommonForBoth/TopBarDropDown/ProfileMenu";
import useWindowSize from "helpers/hooks/useWindowSize";
import { withTranslation } from "react-i18next";

const Header = (props: any) => {
  const dispatch = useDispatch();
  const [search, setsearch] = useState(false);
  const { windowSize } = useWindowSize();

  const isMobile = windowSize?.width <= 998;

  useEffect(() => {
    if (isMobile) {
      document.body.classList.add("vertical-collpsed");
      dispatch(setIsCollapsed(true));
    }
  }, [windowSize?.width]);

  return (
    <header id="page-topbar">
      <div className="navbar-header">
        <div className="d-flex nav-l-side gap-4">
          <div className="mainTabContainer gap-1 active">
            <p className="mainTab">Merchant transactions</p>
          </div>
          <div className="mainTabContainer gap-1">
            <p className="mainTab">Customer transactions</p>
          </div>
        </div>

        <div className="d-flex nav-r-side justify-content-center align-items-center gap-4">
          <div className="d-inline-block">
            <Search />
          </div>
          <div className="d-inline-block">
            <NotificationsActiveOutlined />
          </div>
          <div className="d-inline-block">
            <HelpOutlineOutlined />
          </div>
          {/* <LanguageDropdown />

          <NotificationDropDown /> */}

          <ProfileMenu />
        </div>
      </div>
    </header>
  );
};

export default withTranslation()(Header);
