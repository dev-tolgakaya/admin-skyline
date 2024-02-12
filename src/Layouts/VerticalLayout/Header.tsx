import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { changeLayoutMode } from "slices/layouts/thunk";
import { createSelector } from "reselect";
import { LAYOUT_MODE_TYPES } from "../../Components/constants/layout";

import ProfileMenu from "../../Components/CommonForBoth/TopBarDropDown/ProfileMenu";
import useWindowSize from "helpers/hooks/useWindowSize";
import { withTranslation } from "react-i18next";

const Header = (props: any) => {
  const dispatch = useDispatch<any>();
  const [search, setsearch] = useState(false);
  const { windowSize } = useWindowSize();

  const isMobile = windowSize?.width <= 998;

  const selectLayoutState = (state: any) => state.Layout;

  const selectProperties = createSelector(
    selectLayoutState,
    (layout) => ({
      layoutType: layout.layoutTypes,
      layoutModeType: layout.layoutModeTypes,
      layoutWidthType: layout.layoutWidthTypes,
      topbarThemeType: layout.topbarThemeTypes,
      leftSidebarThemeType: layout.leftSideBarThemeTypes,
      leftSidebarImageType: layout.leftSidebarImageTypes,
      leftSidebarTypes: layout.leftSidebarTypes
    })
  );
  const {
    layoutType, layoutModeType, layoutWidthType, topbarThemeType, leftSidebarThemeType, leftSidebarImageType, leftSidebarTypes
  } = useSelector(selectProperties);
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
          <input type="checkbox"
                  id="radioDark"
                  name="radioDark"
                  value={LAYOUT_MODE_TYPES.DARK}
                  checked={layoutModeType === LAYOUT_MODE_TYPES.DARK}
                  onChange={(e: any) => {
                    if (e.target.checked) {
                      dispatch(changeLayoutMode(LAYOUT_MODE_TYPES.DARK));
                    }
                    else{
                      dispatch(changeLayoutMode(LAYOUT_MODE_TYPES.LIGHT));
                    }
                  }}
                />
          </div>
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
