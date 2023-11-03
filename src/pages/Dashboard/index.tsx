import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, Col, Container, Input, Modal, ModalHeader, Row, ModalBody, CardTitle, InputGroup, Nav, NavItem, NavLink } from 'reactstrap';
import Activity from './Activity';
import MonthlyEarning from './MonthlyEarning';
import SocialSource from './SocialSource';
import TopCities from './TopCities';
import Welcomeback from './Welcomeback';
import LatestTranaction from "./LatestTranaction";
import classNames from "classnames";

//import Charts
import StackedColumnChart from "./StackedColumnChart";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from 'reselect';

import { getChartData as onGetChartData } from '../../slices/dashboards/thunk';

import Breadcrumb from 'Components/Common/Breadcrumb';

const Dashboard = () => {
  document.title = "Dashboards | Skote - React Admin & Dashboard Template";

  const [subscribemodal, setSubscribemodal] = useState<boolean>(false);

  const reports = [
    { title: "Orders", iconClass: "bx-copy-alt", description: "1,235" },
    { title: "Revenue", iconClass: "bx-archive-in", description: "$35, 723" },
    {
      title: "Average Price",
      iconClass: "bx-purchase-tag-alt",
      description: "$16.2",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setSubscribemodal(true);
    }, 2000);
  }, []);

  const [periodData, setPeriodData] = useState<any>([]);
  const [periodType, setPeriodType] = useState<string>("yearly");

 const selectProperties = createSelector(
    (state: any) => state.dashboard,
    (dashboard) => ({
      chartsData: dashboard.dashboardChartData
    })
  );

  const { chartsData } = useSelector(selectProperties);

  useEffect(() => {
    setPeriodData(chartsData);
  }, [chartsData]);

  const onChangeChartPeriod = (pType: any) => {
    setPeriodType(pType);
    dispatch(onGetChartData(pType));
  };

  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(onGetChartData("yearly"));
  }, [dispatch]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Dashboards" breadcrumbItem="Dashboards" />
          <Row>
            <Col xl={4}>
              <Welcomeback />
              <MonthlyEarning />
            </Col>
            <Col xl={8}>
              <Row>
                {/* Reports Render */}
                {(reports || []).map((report: any, key: number) => (
                  <Col md={4} key={"_col_" + key}>
                    <Card className="mini-stats-wid">
                      <CardBody>
                        <div className="d-flex">
                          <div className="flex-grow-1">
                            <p className="text-muted fw-medium"> {report.title} </p>
                            <h4 className="mb-0">{report.description}</h4>
                          </div>
                          <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                            <span className="avatar-title rounded-circle bg-primary">
                              <i className={"bx " + report.iconClass + " font-size-24"} ></i>
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>

              <Card>
                <CardBody>
                  <div className="d-sm-flex flex-wrap">
                    <CardTitle tag="h4" className="mb-4">Email Sent</CardTitle>
                    <div className="ms-auto">
                      <Nav pills>
                        <NavItem>
                          <NavLink href="#" className={classNames({ active: periodType === "weekly" }, "nav-link")}
                            onClick={() => {
                              onChangeChartPeriod("weekly");
                            }}
                            id="one_month">Week</NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink href="#" className={classNames({ active: periodType === "monthly" }, "nav-link")}
                            onClick={() => {
                              onChangeChartPeriod("monthly");
                            }}
                            id="one_month" > Month </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink href="#" className={classNames({ active: periodType === "yearly" }, "nav-link")}
                            onClick={() => {
                              onChangeChartPeriod("yearly");
                            }}
                            id="one_month" > Year  </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                  </div>
                  {/* <div className="clearfix"></div> */}
                  <StackedColumnChart periodData={periodData} dataColors='["--bs-primary", "--bs-warning", "--bs-success"]' />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xl={4}>
              <SocialSource />
            </Col>
            <Col xl={4}>
              <Activity />
            </Col>

            <Col xl={4}>
              <TopCities />
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <LatestTranaction />
            </Col>
          </Row>
        </Container>
      </div >

      {/* subscribe ModalHeader */}
      <Modal isOpen={subscribemodal} autoFocus={true} centered toggle={() => { setSubscribemodal(!subscribemodal) }}>
        <div>
          <ModalHeader className="border-bottom-0" toggle={() => { setSubscribemodal(!subscribemodal) }} />
        </div>
        <ModalBody>
          <div className="text-center mb-4">
            <div className="avatar-md mx-auto mb-4">
              <div className="avatar-title bg-light  rounded-circle text-primary h1">
                <i className="mdi mdi-email-open"></i>
              </div>
            </div>

            <Row className="justify-content-center">
              <Col xl={10}>
                <h4 className="text-primary">Subscribe !</h4>
                <p className="text-muted font-size-14 mb-4">
                  Subscribe our newletter and get notification to stay update.
                </p>

                <InputGroup className="rounded bg-light">
                  <Input type="email" className="bg-transparent border-0" placeholder="Enter Email address" />
                  <Button color="primary" type="button" id="button-addon2"> <i className="bx bxs-paper-plane"></i> </Button>
                </InputGroup>
              </Col>
            </Row>
          </div>
        </ModalBody>
      </Modal >

    </React.Fragment >
  );
}

export default Dashboard;