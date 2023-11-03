import React from 'react'
import { Col, Container, Row } from 'reactstrap';

//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb"
import CardUser from './card-user';
import CardWelcome from './card-welcome';
import ChatBox from './chatbox';
import MiniWidget from './mini-widgets';
import SalesAnalytics from './sales-analytics';
import Tasks from './tasks';
import Earning from "./earning";
import TotalSellingProduct from "./total-selling-product"


const DashboardSaas = () => {

const reports = [
    {
        icon: "bx bx-copy-alt",
        title: "Orders",
        value: "1,452 ",
        badgeValue: "+ 0.2%",
        color: "success",
        desc: "From previous period",
    },
    {
        icon: "bx bx-archive-in",
        title: "Revenue",
        value: "$ 28,452 ",
        badgeValue: "+ 0.2%",
        color: "success",
        desc: "From previous period",
    },
    {
        icon: "bx bx-purchase-tag-alt",
        title: "Average Price",
        value: "$ 16.2 ",
        badgeValue: "0%",
        color: "warning",
        desc: "From previous period",
    },
    ] 

  //Meta Title  
  document.title = "Saas Dashboard | Skote - React Admin & Dashboard Template"


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
        <Breadcrumbs title="Dashboards" breadcrumbItem="Saas" />
        {/* Card User */}
        <CardUser />

        <Row>
            {/* welcome card */}
            <CardWelcome />

            <Col xl={8}>
              <Row>
                {/*mimi widgets */}
                <MiniWidget reports={reports} />    
              </Row>
            </Col>
        </Row>
        <Row>
            {/* earning */}
            <Earning dataColors='["--bs-primary"]' />

            {/* sales anytics */}
            <SalesAnalytics dataColors='["--bs-primary", "--bs-success", "--bs-danger"]' />
        </Row>

        <Row>
            {/* total selling product */}
            <TotalSellingProduct /> 

            {/* tasks */}
            <Tasks />

            {/* chat box */}
            <ChatBox />
          </Row>

        </Container>
        </div>
    </React.Fragment>
  )
}

export default DashboardSaas;
