import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsCollapsed } from "slices/general/reducer";
import {
  Search,
  NotificationsActiveOutlined,
  HelpOutlineOutlined,
  CloseOutlined,
} from "@mui/icons-material";
import classnames from "classnames";
import MainTabs from "Components/Common/MainTabs";
import { Input } from "reactstrap";

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

  const toggleSearchBar = () => {
    document
      .getElementsByClassName("navbar-header")[0]
      .classList.toggle("searchBar");
  };

  return (
    <header id="page-topbar">
      <div className="navbar-header" id="navbar-header">
        <div className="searchBarContainer d-none gap-2">
          <Search role="button" />
          <Input
            className="searchBarInput"
            placeholder="Start typing to search names, IDs, and more..."
          />
          <CloseOutlined onClick={toggleSearchBar} role="button" />
        </div>
        <div className="d-flex nav-l-side gap-4">
          <MainTabs />
        </div>
        <div className="d-flex nav-r-side justify-content-center align-items-center gap-4">
          <div className="d-inline-block">
            <Search onClick={toggleSearchBar} role="button" />
          </div>
          <div className="d-inline-block">
            <NotificationsActiveOutlined role="button" />
          </div>
          <div className="d-inline-block">
            <HelpOutlineOutlined role="button" />
          </div>
          {/* <LanguageDropdown /> */}
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
};

export default withTranslation()(Header);
