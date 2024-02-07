import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { setMainTabArray } from "slices/general/reducer";
import { dashboardMainTabs } from "common/constants/mainTabs";

const Dashboard = () => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(setMainTabArray(dashboardMainTabs));
    return () => dispatch(setMainTabArray(null));
  }, []);

  return <></>;
};

export default Dashboard;
