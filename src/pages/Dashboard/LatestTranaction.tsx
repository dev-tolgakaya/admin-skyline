import React, { useState, useMemo, useCallback, useEffect } from "react";
import withRouter from "../../Components/Common/withRouter";

import { Button, Card, CardBody, CardTitle, } from "reactstrap";

import {
  OrderId,
  BillingName,
  Date,
  Total,
  PaymentStatus,
  PaymentMethod,
} from "./LatestTranactionCol";

import TableContainer from "../../Components/Common/TableContainer";
import { getTranscation as onGetTranscation } from "slices/thunk";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from 'reselect';

const LatestTranaction = () => {

  const dispatch = useDispatch<any>();

  const selectProperties = createSelector(
    (state: any) => state.dashboard,
    (dashboard) => ({
      letesttrangection: dashboard.dashboardTranscation
    })
  );

  const { letesttrangection } = useSelector(selectProperties);

  const [modal1, setModal1] = useState<boolean>(false);
  const [editDetails, setEditDetails] = useState<any>('');
  const toggleViewModal = useCallback((value: any) => { setModal1(!modal1); setEditDetails(value) }, [modal1]);

  const columns = useMemo(
    () => [
      {
        Header: "#",
        filterable: false,
        disableFilters: true,
        Filter: false,
        Cell: (cellProps: any) => {
          return <input type="checkbox" className="form-check-input" />;
        },
      },
      {
        Header: "Order ID",
        accessor: "orderId",
        filterable: false,
        Filter: false,
        disableFilters: true,
        Cell: (cellProps: any) => {
          return <OrderId {...cellProps} />;
        },
      },
      {
        Header: "Billing Name",
        accessor: "billingName",
        disableFilters: true,
        Filter: false,
        filterable: false,
        Cell: (cellProps: any) => {
          return <BillingName {...cellProps} />;
        },
      },
      {
        Header: "Date",
        accessor: "orderdate",
        disableFilters: true,
        Filter: false,
        filterable: false,
        Cell: (cellProps: any) => {
          return <Date {...cellProps} />;
        },
      },
      {
        Header: "Total",
        accessor: "total",
        disableFilters: true,
        Filter: false,
        filterable: false,
        Cell: (cellProps: any) => {
          return <Total {...cellProps} />;
        },
      },
      {
        Header: "Payment Status",
        accessor: "paymentStatus",
        disableFilters: true,
        Filter: false,
        filterable: false,
        Cell: (cellProps: any) => {
          return <PaymentStatus {...cellProps} />;
        },
      },
      {
        Header: "Payment Method",
        accessor: "paymentMethod",
        disableFilters: true,
        Filter: false,
        Cell: (cellProps: any) => {
          return <PaymentMethod {...cellProps} />;
        },
      },
      {
        Header: "View Details",
        disableFilters: true,
        accessor: "view",
        Filter: false,
        Cell: (cellProps: any) => {
          return (
            <Button type="button" color="primary" className="btn-sm btn-rounded" onClick={() => toggleViewModal(cellProps.cell.row.original)}  > View Details </Button>
          );
        },
      },
    ],
    [toggleViewModal]
  );

  useEffect(() => {
    dispatch(onGetTranscation())
  }, [dispatch])


  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle tag="h4" className="mb-4">Latest Transaction</CardTitle>
          <TableContainer
            columns={columns}
            data={letesttrangection}
            isGlobalFilter={false}
            isAddOptions={false}
            customPageSize={6}
            tableClass="align-middle table-nowrap mb-0"
            theadClass="table-light"
          />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};


export default withRouter(LatestTranaction);
