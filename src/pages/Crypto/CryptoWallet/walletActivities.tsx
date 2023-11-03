import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { Card, CardBody, CardTitle, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";

import TableContainer from "../../../Components/Common/TableContainer";
import { Idno, Pdate, Type, Value, ValueInUsd, Amount } from "./CryptoWalCol";
import { useDispatch, useSelector } from "react-redux";
import { getWalletActivities as onGetWalletActivities } from "slices/thunk";
import { createSelector } from 'reselect';
import Spinners from "Components/Common/Spinner";

const WalletActivities = ({ activeTab, toggleTab }: any) => {
  const dispatch = useDispatch<any>();

  const selectProperties = createSelector(
    (state: any) => state.crypto,
    (crypto) => ({
      WalletActivities: crypto.walletActivities,
      loading: crypto.loading
    })
  );

  const { WalletActivities, loading } = useSelector(selectProperties);
  const [isLoading, setLoading] = useState<boolean>(loading)

  const [currentpages, setCurrentpages] = useState<any>();
  useEffect(() => {
    dispatch(onGetWalletActivities())
  }, [dispatch]);

  useEffect(() => {
    setCurrentpages(WalletActivities)
  }, [WalletActivities])

  const columns = useMemo(
    () => [
      {
        Header: "Id No",
        accessor: "idno",
        filterable: true,
        Filter: false,
        isSortable: true,
        Cell: (cellProps: any) => {
          return <Idno {...cellProps} />;
        },
      },
      {
        Header: "Date",
        accessor: "pdate",
        filterable: true,
        Filter: false,
        isSortable: true,
        Cell: cellProps => {
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
        Header: "Currency",
        accessor: "coin",
        filterable: true,
        Filter: false,
        isSortable: true,
        Cell: (cellProps: any) => {
          return <Value {...cellProps} />;
        },
      },
      {
        Header: "Amount",
        accessor: "amount",
        filterable: true,
        Filter: false,
        isSortable: true,
        Cell: (cellProps: any) => {
          return <Amount {...cellProps} />;
        },
      },
      {
        Header: "Amount in USD",
        accessor: "valueInUsd",
        filterable: true,
        Filter: false,
        isSortable: false,
        Cell: (cellProps: any) => {
          return <ValueInUsd {...cellProps} />;
        },
      },
    ],
    []
  );

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h4" className="mb-4">Activities</CardTitle>
        {
          isLoading ? <Spinners setLoading={setLoading} />
            :
            <>
              <Nav tabs className="nav-tabs-custom">
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTab === "1",
                    })}
                    onClick={() => {
                      toggleTab("1");
                      setCurrentpages(WalletActivities)
                    }}
                  >
                    All
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTab === "2",
                    })}
                    onClick={() => {
                      toggleTab("2");
                      setCurrentpages(WalletActivities?.filter((data: any) => data.type === 'Buy'))
                    }}
                  >
                    Buy
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTab === "3",
                    })}
                    onClick={() => {
                      toggleTab("3");
                      setCurrentpages(WalletActivities?.filter((data: any) => data.type === 'Sell'))
                    }}
                  >
                    Sell
                  </NavLink>
                </NavItem>
              </Nav>

              <div className="mt-4">
                <TableContainer
                  columns={columns}
                  data={currentpages || []}
                  isGlobalFilter={true}
                  customPageSizeOption={true}
                  customPageSize={10}
                  isPagination={true}
                  isShowingPageLength={true}
                  tableClass="table table-hover dt-responsive nowrap dataTable no-footer dtr-inline"
                  paginationDiv="col-sm-12 col-md-7"
                  pagination="pagination justify-content-end pagination-rounded"
                />
              </div>
            </>
        }

      </CardBody >
    </Card >
  );
};

export default WalletActivities;
