import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import { setMainTabValue } from "slices/general/reducer";

const MainTabs = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(1);
  const { mainTabArray } = useSelector((state: any) => state.General);

  const toggle = (tab: any) => {
    if (activeTab == tab) return;
    setActiveTab(tab);
    dispatch(setMainTabValue(tab));
  };

  return mainTabArray ? (
    <ul className="mainTabContainer gap-4" role="tablist">
      {mainTabArray?.map((item: any, i: number) => (
        <li
          key={i}
          className={classnames({ active: activeTab === item.value })}
        >
          <div>
            <a
              className={classnames({ active: activeTab === item.value })}
              onClick={() => {
                toggle(item.value);
              }}
            >
              {item.fieldName}
            </a>
          </div>
        </li>
      ))}
    </ul>
  ) : null;
};

export default MainTabs;
