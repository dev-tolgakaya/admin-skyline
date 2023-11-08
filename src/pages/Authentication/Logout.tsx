import React, { useEffect } from "react";
import withRouter from "Components/Common/withRouter";
import { Navigate } from "react-router-dom";

import { logoutUser } from "../../slices/thunk";
import { useNavigate } from "react-router-dom";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const selectProperties = createSelector(
    (state: any) => state.Login,
    (isUserLogout) => isUserLogout
  );

  const { isUserLogout } = useSelector(selectProperties);

  useEffect(() => {
    dispatch(logoutUser(navigate));
  }, [dispatch]);

  if (isUserLogout) {
    return <Navigate to="/login" />;
  }

  return <></>;
};

export default withRouter(Logout);
