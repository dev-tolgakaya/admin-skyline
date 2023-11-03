import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Card, CardBody, Col, Container, Row, Modal, ModalHeader, ModalBody, Label, FormFeedback, UncontrolledTooltip, Input, Form, Button
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
//redux
import { useSelector, useDispatch } from "react-redux";

import TableContainer from "../../../Components/Common/TableContainer";
import { Email, Tags, Projects } from "./contactlistCol";
import withRouter from "../../../Components/Common/withRouter";

//Import Breadcrumb
import Breadcrumbs from "../../../Components/Common/Breadcrumb";
import DeleteModal from "../../../Components/Common/DeleteModal";

import {
  getUsers as onGetUsers,
  deleteUsers as onDeleteUsers,
  addNewUser as onAddNewUser,
  updateUser as onUpdateUser
}
  from "../../../slices/contacts/thunk"
import { createSelector } from 'reselect';
import Spinners from "Components/Common/Spinner";
import { ToastContainer } from "react-toastify";

const ContactsList = () => {

  //meta title
  document.title = "User List | Skote - React Admin & Dashboard Template";

  const selectProperties = createSelector(
    (state: any) => state.contacts,
    (users) => users,
    loading => loading
  );

  const { users, loading }: any = useSelector(selectProperties);
  const [isLoading, setLoading] = useState<boolean>(loading);

  const dispatch = useDispatch<any>();
  const [contact, setContact] = useState<any>();

  const [modal, setModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const toggle = useCallback(() => {
    setModal(!modal);
  }, [modal]);

  // validation
  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: (contact && contact.name) || "",
      designation: (contact && contact.designation) || "",
      tags: (contact && contact.tags) || "",
      email: (contact && contact.email) || "",
      projects: (contact && contact.projects) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      designation: Yup.string().required("Please Enter Your Designation"),
      tags: Yup.array().required("Please Enter Tag"),
      email: Yup.string().email().required("Please Enter Your Email"),
      projects: Yup.number().required("Please Enter Your Project"),
    }),
    onSubmit: (values: any) => {
      if (isEdit) {
        const updateUser = {
          id: contact.id,
          name: values.name,
          designation: values.designation,
          tags: values.tags,
          email: values.email,
          projects: values.projects,
        };
        // update user
        dispatch(onUpdateUser(updateUser));
        validation.resetForm();
        setIsEdit(false);
      } else {
        const newUser = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          name: values["name"],
          designation: values["designation"],
          email: values["email"],
          tags: values["tags"],
          projects: values["projects"],
        };
        // save new user
        dispatch(onAddNewUser(newUser));
        validation.resetForm();
      }
      toggle();
    },
  });

  const handleUserClick = useCallback((arg: any) => {
    const user = arg;

    setContact({
      id: user.id,
      name: user.name,
      designation: user.designation,
      email: user.email,
      tags: user.tags,
      projects: user.projects,
    });
    setIsEdit(true);

    toggle();
  }, [toggle]);

  const columns = useMemo(
    () => [
      {
        Header: "#",
        disableFilters: true,
        filterable: true,
        Filter: false,
        accessor: (cellProps: any) => (
          <>
            {!cellProps.img ? (
              <div className="avatar-xs">
                <span className="avatar-title rounded-circle">{cellProps.name.charAt(0)} </span>
              </div>
            ) : (
              <div>
                <img className="rounded-circle avatar-xs" src={cellProps.img} alt="" />
              </div>
            )}
          </>
        ),
      },
      {
        Header: "Name",
        filterable: true,
        Filter: false,
        accessor: (cellProps: any) => {
          return (
            <>
              <h5 className='font-size-14 mb-1'>
                <Link to='#' className='text-dark'>{cellProps.name}</Link>
              </h5>
              <p className="text-muted mb-0">{cellProps.designation}</p>
            </>
          );
        },
      },
      {
        Header: "Email",
        accessor: "email",
        filterable: true,
        Filter: false,
        Cell: (cellProps: any) => {
          return <Email {...cellProps} />;
        },
      },
      {
        Header: "Tags",
        accessor: "tags",
        filterable: true,
        Filter: false,
        Cell: (cellProps: any) => {
          return <Tags {...cellProps} />;
        },
      },
      {
        Header: "Projects",
        accessor: "projects",
        filterable: true,
        Filter: false,
        Cell: (cellProps: any) => {
          return (
            <>
              {" "}
              <Projects {...cellProps} />{" "}
            </>
          );
        },
      },
      {
        Header: "Action",
        Filter: false,
        Cell: (cellProps: any) => {
          return (
            <div className="d-flex gap-3">
              <Link to="#" className="text-success"
                onClick={() => {
                  const userData = cellProps.row.original;
                  handleUserClick(userData);
                }} >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip"> Edit </UncontrolledTooltip>
              </Link>
              <Link to="#" className="text-danger"
                onClick={() => {
                  const userData = cellProps.row.original;
                  onClickDelete(userData.id);
                }}  >
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                <UncontrolledTooltip placement="top" target="deletetooltip"> Delete </UncontrolledTooltip>
              </Link>
            </div>
          );
        },
      },
    ],
    [handleUserClick]
  );

  useEffect(() => {
    if (users && !users.length) {
      dispatch(onGetUsers());
      setIsEdit(false);
    }
  }, [dispatch, users]);

  useEffect(() => {
    setContact(users);
    setIsEdit(false);
  }, [users]);

  var node: any = useRef();
  const onPaginationPageChange = (page: any) => {
    if (
      node &&
      node.current &&
      node.current.props &&
      node.current.props.pagination &&
      node.current.props.pagination.options
    ) {
      node.current.props.pagination.options.onPageChange(page);
    }
  };

  //delete customer
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const onClickDelete = (users: any) => {
    setContact(users);
    setDeleteModal(true);
  };

  const handleDeleteUser = () => {
    dispatch(onDeleteUsers(contact));
    onPaginationPageChange(1);
    setDeleteModal(false);
  };

  const handleUserClicks = () => {
    setIsEdit(false);
    setContact("")
    toggle();
  };

  // const keyField = "id";

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteUser}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Contacts" breadcrumbItem="User List" />
          <Row>
            <Col lg="12">
              {
                isLoading ? <Spinners setLoading={setLoading} />
                  :
                  <Card>
                    <CardBody>
                      <TableContainer
                        columns={columns}
                        data={users}
                        customPageSizeOption={true}
                        isGlobalFilter={true}
                        isAddUserList={true}
                        isPagination={true}
                        isShowingPageLength={true}
                        customPageSize={10}
                        handleUserClick={handleUserClicks}
                        tableClass="table align-middle table-nowrap table-hover"
                        theadClass="table-light"
                        paginationDiv="col-sm-12 col-md-7"
                        pagination="pagination pagination-rounded justify-content-end mt-4"
                      />
                    </CardBody>
                  </Card>
              }
              <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle} tag="h4"> {!!isEdit ? "Edit User" : "Add User"}</ModalHeader>
                <ModalBody>
                  <Form
                    onSubmit={e => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}
                  >
                    <Row>
                      <Col xs={12}>
                        <div className="mb-3">
                          <Label>Name</Label>
                          <Input
                            name="name"
                            type="text"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.name || ""}
                            invalid={
                              validation.touched.name && validation.errors.name ? true : false}
                          />
                          {validation.touched.name &&
                            validation.errors.name ? (
                            <FormFeedback type="invalid">
                              {validation.errors.name}
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div className="mb-3">
                          <Label>Email</Label>
                          <Input
                            name="email"
                            label="Email"
                            type="email"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ""}
                            invalid={
                              validation.touched.email && validation.errors.email ? true : false}
                          />
                          {validation.touched.email && validation.errors.email ?
                            (
                              <FormFeedback type="invalid">   {validation.errors.email} </FormFeedback>
                            ) : null}
                        </div>
                        <div className="mb-3">
                          <Label>Option</Label>
                          <Input
                            type="select"
                            name="tags"
                            className="form-select"
                            multiple={true}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.tags || []}
                            invalid={
                              validation.touched.tags && validation.errors.tags ? true : false}
                          >
                            <option>Photoshop</option>
                            <option>illustrator</option>
                            <option>Html</option>
                            <option>Php</option>
                            <option>Java</option>
                            <option>Python</option>
                            <option>UI/UX Designer</option>
                            <option>Ruby</option>
                            <option>Css</option>
                          </Input>
                          {validation.touched.tags && validation.errors.tags ?
                            (
                              <FormFeedback type="invalid">  {validation.errors.tags} </FormFeedback>
                            ) : null}
                        </div>
                        <div className="mb-3">
                          <Label>Projects</Label>
                          <Input
                            name="projects"
                            label="Projects"
                            type="text"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.projects || ""}
                            invalid={
                              validation.touched.projects && validation.errors.projects ? true : false}
                          />
                          {validation.touched.projects && validation.errors.projects ?
                            (
                              <FormFeedback type="invalid"> {validation.errors.projects}  </FormFeedback>
                            ) : null}
                        </div>
                        <div className="mb-3">
                          <Label>Designation</Label>
                          <Input
                            type="select"
                            name="designation"
                            className="form-select"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.designation || ''}
                            invalid={
                              validation.touched.designation && validation.errors.designation ? true : false}
                          >
                            <option>Frontend Developer</option>
                            <option>UI/UX Designer</option>
                            <option>Backend Developer</option>
                            <option>Full Stack Developer</option>
                          </Input>
                          {validation.touched.designation && validation.errors.designation ?
                            (
                              <FormFeedback type="invalid">  {validation.errors.designation} </FormFeedback>
                            ) : null}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="text-end">
                          <Button type="submit" color="success" className="save-user"> {!!isEdit ? "Update" : "Add"}  </Button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </ModalBody>
              </Modal>
            </Col>
          </Row>
        </Container>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default withRouter(ContactsList);
