import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { setMainTabArray } from "slices/general/reducer";
import { dashboardMainTabs } from "common/constants/mainTabs";
import Text from "Components/atoms/Text";

const Dashboard = () => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(setMainTabArray(dashboardMainTabs));
    return () => dispatch(setMainTabArray(null));
  }, []);

  return (
    <>
      <Text size="caption-badge">tolga kaya</Text>
    </>
  );
};

export default Dashboard;
