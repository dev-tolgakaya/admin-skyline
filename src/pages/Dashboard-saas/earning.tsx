import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardBody, InputGroup, InputGroupText, CardTitle, Badge } from "reactstrap";
import { Link } from "react-router-dom";
import ReactApexChart from "react-apexcharts";

//actions
import { getEarningChartsData } from "../../slices/dashboards/thunk";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from 'reselect';

import getChartColorsArray from "../../Components/Common/ChartDynamicColor";

const Earning = ({ dataColors }: any) => {
  const apexearningChartColors = getChartColorsArray(dataColors);
  const dispatch = useDispatch<any>();


 const selectProperties = createSelector(
    (state: any) => state.dashboard,
    (dashboard) => ({
      earningChartData: dashboard.dashboard,
    })
  );

  const { earningChartData } = useSelector(selectProperties);
  
  const options: any = {
    chart: {
      toolbar: "false",
      dropShadow: {
        enabled: !0,
        color: "#000",
        top: 18,
        left: 7,
        blur: 8,
        opacity: 0.2,
      },
    },
    dataLabels: {
      enabled: !1,
    },
    colors: apexearningChartColors,
    stroke: {
      curve: "smooth",
      width: 3,
    },
  };

  const series = [
    {
      name: "Series 1",
      data: [...earningChartData],
    },
  ];

  /*
  call api action to receive data
  */
  useEffect(() => {
    dispatch(getEarningChartsData("jan"));
  }, [dispatch]);

  const [seletedMonth, setSeletedMonth] = useState<any>("jan");
  const onChangeMonth = (value: any) => {
    setSeletedMonth(value);
    dispatch(getEarningChartsData(value));
  };

  return (
    <React.Fragment>
      <Col xl={8}>
        <Card>
          <CardBody>
            <div className="clearfix">
              <div className="float-end">
                <InputGroup className="input-group-sm">
                  <select
                    className="form-select form-select-sm"
                    value={seletedMonth}
                    onChange={(e: any) => {
                      onChangeMonth(e.target.value);
                    }}
                  >
                    <option value="jan">Jan</option>
                    <option value="dec">Dec</option>
                    <option value="nov">Nov</option>
                    <option value="oct">Oct</option>
                  </select>
                  {/* <div className="input-group-append"> */}
                  <InputGroupText>Month</InputGroupText>
                  {/* </div> */}
                </InputGroup>
              </div>
              <CardTitle tag="h4" className="mb-4">Earning</CardTitle>
            </div>

            <Row>
              <Col lg={4}>
                <div className="text-muted">
                  <div className="mb-4">
                    <p>This month</p>
                    <h4>$2453.35</h4>
                    <div>
                      <Badge className="badge-soft-success font-size-12 me-1">
                        + 0.2%
                      </Badge>
                      From previous period
                    </div>
                  </div>

                  <div>
                    <Link to="#" className="btn btn-primary  btn-sm">
                      View Details
                      <i className="mdi mdi-chevron-right ms-1"></i>
                    </Link>
                  </div>

                  <div className="mt-4">
                    <p className="mb-2">Last month</p>
                    <h5>$2281.04</h5>
                  </div>
                </div>
              </Col>

              <Col lg={8}>
                <div id="line-chart" dir="ltr">
                  <ReactApexChart
                    series={series}
                    options={options}
                    type="line"
                    height={320}
                    className="apex-charts"
                  />
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment >
  );
}

export default Earning;
