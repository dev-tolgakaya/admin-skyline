import React, { useState, useMemo, useEffect } from "react";
import {
  Button, Card, CardBody, CardTitle, Col, Container, Form, FormGroup, Label, NavItem, NavLink, Row, TabContent, TabPane, Nav
} from "reactstrap";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import withRouter from "../../../Components/Common/withRouter";

import { Pdate, Type, Value, ValueinUSD, Status, Coin } from "./CryptoCol";

import TableContainer from "../../../Components/Common/TableContainer";

//Date Picker
import Flatpickr from "react-flatpickr";
import "react-datepicker/dist/react-datepicker.css";
import "assets/scss/datatables.scss";
//Import Breadcrumb
import Breadcrumbs from "../../../Components/Common/Breadcrumb";
import { getCryptoOrderList as onGetCryptoOrderList } from "slices/thunk";
import { createSelector } from 'reselect';
import Spinners from "Components/Common/Spinner";

const CryptoOrders = () => {

  //meta title
  document.title = "Orders | Skote - React Admin & Dashboard Template";

  const [activeTab, setActiveTab] = useState<any>("1");
  const dispatch = useDispatch<any>();

  const selectProperties = createSelector(
    (state: any) => state.crypto,
    (crypto) => ({
      cryptoOrder: crypto.cryptoOrders,
      loading: crypto.loading
    })
  );

  const { cryptoOrder, loading } = useSelector(selectProperties);
  const [isLoading, setLoading] = useState<boolean>(loading)

  const [order, setOrder] = useState<any>();

  //coin search
  const handleSelect = (ele: any) => {
    let data = ele.target.value;
    setOrder((cryptoOrder || [])?.filter((item: any) => item.coin === data || data === 'all'))
  };

  //type search
  const handleSelectType = (ele: any) => {
    let data = ele.target.value;
    setOrder((cryptoOrder || [])?.filter((item: any) => item.type === data || data === 'all'))
  }

  //status search
  const handleSelectStatus = (ele: any) => {
    let data = ele.target.value;
    setOrder((cryptoOrder || [])?.filter((item: any) => item.status === data || data === 'all'));
  }

  const toggleTab = (tab: any) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  useEffect(() => {
    dispatch(onGetCryptoOrderList())
  }, [dispatch]);

  useEffect(() => {
    setOrder(cryptoOrder)
  }, [cryptoOrder])

  // Table Data
  const columns: any = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "pdate",
        filterable: true,
        Filter: false,
        isSortable: true,
        Cell: (cellProps: any) => {
          return <Pdate {...cellProps} />;
        },
      },
      {
        Header: "Type",
        accessor: "type",
        filterable: true,
        Filter: false,
        isSortable: true,
        Cell: (cellProps: any) => {
          return <Type {...cellProps} />;
        },
      },
      {
        Header: "Coin",
        accessor: "coin",
        filterable: true,
        Filter: false,
        isSortable: true,
        Cell: (cellProps: any) => {
          return <Coin {...cellProps} />;
        },
      },
      {
        Header: "Value",
        accessor: "value",
        filterable: true,
        Filter: false,
        isSortable: true,
        Cell: (cellProps: any) => {
          return <Value {...cellProps} />;
        },
      },
      {
        Header: "Value in USD",
        accessor: "valueInUsd",
        filterable: true,
        Filter: false,
        isSortable: true,
        Cell: (cellProps: any) => {
          return <ValueinUSD {...cellProps} />;
        },
      },
      {
        Header: "Status",
        accessor: "status",
        Filter: false,
        isSortable: false,
        Cell: (cellProps: any) => {
          return <Status {...cellProps} />;
        },
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Crypto" breadcrumbItem="Orders" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle tag="h4" className="mb-3">Orders</CardTitle>
                  {
                    isLoading ? <Spinners setLoading={setLoading} />
                      :
                      <>
                        <Nav tabs className="nav-tabs-custom" role="tablist">
                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: activeTab === "1",
                              })}
                              onClick={() => {
                                toggleTab("1");
                              }}
                            > All Orders</NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: activeTab === "2",
                              })}
                              onClick={() => {
                                toggleTab("2");
                              }}
                            > Processing</NavLink>
                          </NavItem>
                        </Nav>

                        <TabContent activeTab={activeTab} className="p-3">
                          <TabPane tabId="1" id="all-order">
                            <Form>
                              <Row className="mb-4">
                                <Col sm={6} className="col-xl">
                                  <FormGroup className="mb-3">
                                    <Label>Date :</Label>
                                    <Flatpickr
                                      className="form-control"
                                      id="customerdate"
                                      name="customerdate"
                                      placeholder="Select date"
                                      options={{
                                        mode: "single",
                                        dateFormat: 'd M, Y',
                                      }}
                                    />
                                  </FormGroup>
                                </Col>

                                <Col sm={6} className="col-xl">
                                  <FormGroup className="mb-3">
                                    <Label>Coin</Label>
                                    <select className="form-control select2-search-disable" onChange={(e: any) => handleSelect(e)}>
                                      <option defaultValue="Bitcoin" > Bitcoin </option>
                                      <option value="Ethereum">Ethereum</option>
                                      <option value="Litecoin">litecoin</option>
                                    </select>
                                  </FormGroup>
                                </Col>

                                <Col sm={6} className="col-xl">
                                  <FormGroup className="mb-3">
                                    <Label>Type</Label>
                                    <select className="form-control select2-search-disable" onChange={(e: any) => handleSelectType(e)}>
                                      <option defaultValue="Buy">Buy</option>
                                      <option value="Sell">Sell</option>
                                    </select>
                                  </FormGroup>
                                </Col>

                                <Col sm={6} className="col-xl">
                                  <FormGroup className="mb-3">
                                    <Label>Status</Label>
                                    <select className="form-control select2-search-disable" onChange={(e: any) => handleSelectStatus(e)}>
                                      <option defaultValue="Completed">Completed </option>
                                      <option value="Pending">Pending</option>
                                    </select>
                                  </FormGroup>
                                </Col>

                                <Col sm={6} className="col-xl align-self-end">
                                  <div className="mb-3">
                                    <Button type="button" color="primary" className="w-md" > Filter</Button>
                                  </div>
                                </Col>
                              </Row>
                            </Form>

                            <TableContainer
                              columns={columns}
                              data={order || []}
                              customPageSize={10}
                              isPagination={true}
                              isShowingPageLength={true}
                              paginationDiv="col-sm-12 col-md-7"
                              pagination="pagination justify-content-end pagination-rounded"
                              tableClass="table-hover datatable dt-responsive nowrap dataTable no-footer dtr-inline"
                            />
                          </TabPane>
                          <TabPane tabId="2" id="processing">
                            <div>
                              <TableContainer
                                columns={columns}
                                data={order || []}
                                isGlobalFilter={true}
                                customPageSizeOption={true}
                                customPageSize={10}
                                isPagination={true}
                                isShowingPageLength={true}
                                paginationDiv="col-sm-12 col-md-7"
                                pagination="pagination justify-content-end pagination-rounded"
                                tableClass="table-hover datatable dt-responsive nowrap dataTable no-footer dtr-inline"
                              />
                            </div>
                          </TabPane>
                        </TabContent>
                      </>
                  }
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};


export default (withRouter(CryptoOrders));
