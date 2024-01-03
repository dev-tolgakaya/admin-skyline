import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

function withRouter(Component: any) {
  function ComponentWithRouterProp(props: any) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    let translation = useTranslation();
    return (
      <Component
        {...props}
        router={{ location, navigate, params, translation }}
      />
    );
  }
  return ComponentWithRouterProp;
}

export default withRouter;
