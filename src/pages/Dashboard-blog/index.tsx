import React from 'react'
import { Container, Row } from 'reactstrap';

//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";
import Activity from './Activity';
import CardUser from './CardUser';
import Comments from './Comments';
import PopularPost from './PoplularPost';
import Posts from './Posts';

import Settings from './Settings';
import TopVisitors from './TopVisitors';

const DashboardBlog = () => {
  document.title = "Blog Dashboard | Skote - React Admin & Dashboard Template";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Dashboards" breadcrumbItem="Blog" />

          <Row>
            {/* card user */}
            <CardUser dataColors='["--bs-primary", "--bs-warning"]' />
            <Settings />
          </Row>
          <Row>
            <Posts />
            <Comments />
            <TopVisitors />
          </Row>
          <Row>
            <Activity />
            <PopularPost />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default DashboardBlog;
