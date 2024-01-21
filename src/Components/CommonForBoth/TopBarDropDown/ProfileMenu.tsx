import React, { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

//i18n
import { withTranslation } from "react-i18next";
// Redux
import { Link } from "react-router-dom";
import withRouter from "../../Common/withRouter";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../slices/thunk";
import { useNavigate } from "react-router-dom";

// users
import user1 from "../../../assets/images/users/avatar-1.jpg";

const ProfileMenu = (props: any) => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const [username, setusername] = useState("Admin");

  const profile = (state: any) => state.Profile;
  const selectProfileProperties = createSelector(profile, (success) => success);

  const { success } = useSelector(selectProfileProperties);

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        const obj = JSON.parse(localStorage.getItem("authUser") || "");
        setusername(obj.displayName);
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        const obj = JSON.parse(localStorage.getItem("authUser") || "");
        setusername(obj.username);
      }
    }
  }, [success]);

  return (
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={user1}
            alt="Header Avatar"
          />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag="a" href={process.env.PUBLIC_URL + "/profile"}>
            {" "}
            <i className="bx bx-user font-size-16 align-middle me-1" />
            {props.t("Header.Profile.Profile")}{" "}
          </DropdownItem>
          <DropdownItem
            tag="a"
            href={process.env.PUBLIC_URL + "/crypto-wallet"}
          >
            <i className="bx bx-wallet font-size-16 align-middle me-1" />
            {props.t("Header.Profile.MyWallet")}
          </DropdownItem>
          <DropdownItem tag="a" href="#">
            <span className="badge bg-success float-end">11</span>
            <i className="bx bx-wrench font-size-16 align-middle me-1" />
            {props.t("Header.Profile.Settings")}
          </DropdownItem>
          <DropdownItem
            tag="a"
            href={process.env.PUBLIC_URL + "/auth-lock-screen"}
          >
            <i className="bx bx-lock-open font-size-16 align-middle me-1" />
            {props.t("Header.Profile.LockScreen")}
          </DropdownItem>
          <div className="dropdown-divider" />
          <DropdownItem
            className="dropdown-item"
            onClick={() => dispatch(logoutUser(navigate))}
          >
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>{props.t("Header.Profile.Logout")}</span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
  );
};

export default withRouter(withTranslation()(ProfileMenu));
