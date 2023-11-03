import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../../Components/Common/withRouter";
import TableContainer from "../../../Components/Common/TableContainer";
import {
    Card,
    CardBody,
    Col,
    Container,
    Row,
    UncontrolledTooltip,
} from "reactstrap";

import { JobTitle, CompanyName, Type, ApplyDate, Status } from "./ApplyJobsCol";

//Import Breadcrumb
import Breadcrumbs from "../../../Components/Common/Breadcrumb";
import DeleteModal from "../../../Components/Common/DeleteModal";

import {
    getApplyJob as onGetApplyJob,
    deleteApplyJob as ondeleteApplyJob
} from "../../../slices/jobs/thunk"

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from 'reselect';
import Spinners from "Components/Common/Spinner";
import { ToastContainer } from "react-toastify";

const ApplyJobs = () => {

    //meta title
    document.title = "Job Apply | Skote - React Admin & Dashboard Template";

    const dispatch = useDispatch<any>();

    const selectProperties = createSelector(
        (state: any) => state.jobs,
        (jobs) => ({
            jobApply: jobs.applyJobs,
            loading: jobs.loading
        })
    );

    const { jobApply, loading } = useSelector(selectProperties);
    const [apply, setApply] = useState<any>(null);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(loading);

    useEffect(() => {
        dispatch(onGetApplyJob());
    }, [dispatch]);

    useEffect(() => {
        setApply(jobApply);
    }, [jobApply]);

    // delete
    const onClickData = (apply: any) => {
        setApply(apply);
        setDeleteModal(true);
    };

    const handleDeleteApplyJob = () => {
        if (apply) {
            dispatch(ondeleteApplyJob(apply.id));
            setDeleteModal(false);
        }
    };

    const columns = useMemo(
        () => [
            {
                Header: "No",
                accessor: "no",
                filterable: true,
                Filter: false,
                disableSortBy: true,
            },
            {
                Header: "Job Title",
                accessor: "jobTitle",
                Filter: false,
                filterable: true,
                Cell: (cellProps: any) => {
                    return <JobTitle {...cellProps} />;
                },
            },
            {
                Header: "Company Name",
                accessor: "companyName",
                Filter: false,
                filterable: true,
                Cell: (cellProps: any) => {
                    return <CompanyName {...cellProps} />;
                },
            },
            {
                Header: "Type",
                accessor: "type",
                Filter: false,
                filterable: true,
                Cell: (cellProps: any) => {
                    return <Type {...cellProps} />
                },
            },
            {
                Header: "Apply Date",
                accessor: "applyDate",
                Filter: false,
                filterable: true,
                Cell: (cellProps: any) => {
                    return <ApplyDate {...cellProps} />;
                },
            },
            {
                Header: "Status",
                accessor: "status",
                Filter: false,
                disableFilters: true,
                Cell: (cellProps: any) => {
                    return <Status {...cellProps} />;
                },
            },
            {
                Header: "Action",
                Filter: false,
                Cell: (cellProps: any) => {
                    return (
                        <div className="list-unstyled hstack gap-1 mb-0">
                            <li>
                                <Link
                                    to="/job-details"
                                    className="btn btn-sm btn-soft-primary"
                                >
                                    <i className="mdi mdi-eye-outline" id="viewtooltip" />
                                    <UncontrolledTooltip placement="top" target="viewtooltip">
                                        View
                                    </UncontrolledTooltip>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#"
                                    className="btn btn-sm btn-soft-danger"
                                    onClick={() => {
                                        const userData = cellProps.row.original;
                                        onClickData(userData);
                                    }}
                                >
                                    <i className="mdi mdi-delete-outline" id="deletetooltip" />
                                    <UncontrolledTooltip placement="top" target="deletetooltip">
                                        Delete
                                    </UncontrolledTooltip>
                                </Link>
                            </li>
                        </div>
                    );
                },
            },
        ],
        []
    );


    return (
        <React.Fragment>
            <DeleteModal
                show={deleteModal}
                onDeleteClick={() => handleDeleteApplyJob()}
                onCloseClick={() => setDeleteModal(false)}
            />
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Jobs" breadcrumbItem="Job Apply" />
                    <Row>
                        <Col lg={12}>
                            {
                                isLoading ? <Spinners setLoading={setLoading} />
                                    :
                                    <Card>
                                        <CardBody className="border-bottom">
                                            <div className="d-flex align-items-center">
                                                <h5 className="mb-0 card-title flex-grow-1">Applied Jobs</h5>
                                                <div className="flex-shrink-0">
                                                    <select className="form-select">
                                                        <option value="Today">Today</option>
                                                        <option value="1 Monthly">1 Month</option>
                                                        <option value="6 Month">6 Month</option>
                                                        <option value="1 Years">1 Year</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </CardBody>
                                        <CardBody>
                                            <TableContainer
                                                columns={columns}
                                                data={jobApply || []}
                                                isGlobalFilter={false}
                                                isAddUserList={false}
                                                customPageSize={10}
                                                isShowingPageLength={true}
                                                isPagination={true}
                                                tableClass="table-bordered align-middle nowrap"
                                                paginationDiv="col-auto"
                                                pagination="pagination justify-content-end pagination-rounded"
                                            />
                                        </CardBody>
                                    </Card>
                            }
                        </Col>
                    </Row>
                </Container>
            </div>
            <ToastContainer />
        </React.Fragment>
    );
};

export default withRouter(ApplyJobs);
