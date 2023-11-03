import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Label,
  Input,
  Button,
  Container,
  FormFeedback
} from "reactstrap";

import { useFormik } from "formik";
import * as Yup from 'yup';
import Breadcrumbs from "../../Components/Common/Breadcrumb";

const FormRepeater = () => {

  //meta title
  document.title = "Form Repeater | Skote - React Admin & Dashboard Template";

  const [rows1, setrows1] = useState([{ id: 1 }]);

  function handleAddRowNested() {
    const modifiedRows = [...rows1];
    modifiedRows.push({ id: modifiedRows.length + 1 });
    setrows1(modifiedRows);
  }

  function handleRemoveRow(id: any) {
    if (id !== 1) {
      var modifiedRows = [...rows1];
      modifiedRows = modifiedRows.filter(x => x["id"] !== id);
      setrows1(modifiedRows);
    }
  }

  const [formRows, setFormRows] = useState([{ id: 1 }]);

  const onAddFormRow = () => {
    const modifiedRows = [...formRows];
    modifiedRows.push({ id: modifiedRows.length + 1 });
    setFormRows(modifiedRows);
  };

  const onDeleteFormRow = (id: any) => {
    if (id !== 1) {
      var modifiedRows = [...formRows];
      modifiedRows = modifiedRows.filter(x => x["id"] !== id);
      setFormRows(modifiedRows);
    }
  };

  //Nested form
  const nestedformik: any = useFormik({
    initialValues: {
      name: "",
      email: "",
      gender: "",
      msg: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("This field is required"),
      email: Yup.string().email().matches(/^(?!.*@[^,]*,)/).required("Please Enter Your Email"),
      gender: Yup.string().required("This field is required"),
      msg: Yup.string().required("This field is required")
    }),

    onSubmit: (value :any) => {
      // console.log("value", values.password);
    },
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Form Repeater" />

          <Row>
            <Col xs={12}>
              <Card>
                <CardBody>
                  <h6 className="mb-4 card-title">Example</h6>
                  <Form className="repeater" encType="multipart/form-data" >
                    <div>
                      {(formRows || []).map((formRow, key) => (
                        <Row key={key}>
                          <Col lg={2} className="mb-3">
                            <label htmlFor="name">Name</label>
                            <input
                              type="text"
                              id="name"
                              name="untyped-input name"
                              className="form-control"
                              placeholder="Enter Your Name"
                            />
                          </Col>

                          <Col lg={2} className="mb-3">
                            <label htmlFor="email">Email</label>
                            <input
                              type="email"
                              id="email"
                              className="form-control"
                              placeholder="Enter Your Email ID"
                            />
                          </Col>

                          <Col lg={2} className="mb-3">
                            <label htmlFor="subject">Subject</label>
                            <input
                              type="text"
                              id="subject"
                              className="form-control"
                              placeholder="Enter Your Subject"
                            />
                          </Col>

                          <Col lg={2} className="mb-3">
                            <label htmlFor="resume">Resume</label>
                            <input
                              type="file"
                              className="form-control"
                              id="resume"
                            />
                          </Col>

                          <Col lg={2} className="mb-3">
                            <label htmlFor="message">Message</label>
                            <textarea
                              id="message"
                              className="form-control"
                              placeholder="Enter Your Message"
                            ></textarea>
                          </Col>

                          <Col lg={2} className="align-self-center">
                            <div className="d-grid">
                              <input
                                type="button"
                                className="btn btn-primary"
                                value="Delete"
                                onClick={() => onDeleteFormRow(formRow.id)}
                              />
                            </div>
                          </Col>
                        </Row>
                      ))}
                    </div>
                    <input
                      type="button"
                      className="btn btn-success mt-3 mt-lg-0"
                      value="Add"
                      onClick={() => onAddFormRow()}
                    />
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <h6 className="mb-4 card-title">Nested</h6>
                  <Form className="outer-repeater" onSubmit={nestedformik.handleSubmit}>
                    <div data-repeater-list="outer-group" className="outer">
                      <div data-repeater-item className="outer">
                        <div className="mb-3">
                          <Label htmlFor="formname">Name : </Label>
                          <Input
                            type="text"
                            name="name"
                            id="formname"
                            placeholder="Enter your Name..."
                            className="form-control"
                            value={nestedformik.values.name}
                            onChange={nestedformik.handleChange}
                            onBlur={nestedformik.handleBlur}
                            invalid={
                              nestedformik.touched.name && nestedformik.errors.name ? true : false
                            }
                          />
                          {
                            nestedformik.errors.name && nestedformik.touched.name ? (
                              <FormFeedback type="invalid">{nestedformik.errors.name}</FormFeedback>
                            ) : null
                          }
                        </div>

                        <div className="mb-3">
                          <Label htmlFor="formemail">Email :</Label>
                          <Input
                            type="email"
                            id="formemail"
                            name="email"
                            placeholder="Enter your Email..."
                            className="form-control"
                            value={nestedformik.values.email}
                            onChange={nestedformik.handleChange}
                            onBlur={nestedformik.handleBlur}
                            invalid={
                              nestedformik.touched.email && nestedformik.errors.email ? true : false
                            }
                          />
                          {
                            nestedformik.errors.email && nestedformik.touched.email ? (
                              <FormFeedback type="invalid">{nestedformik.errors.email}</FormFeedback>
                            ) : null
                          }
                        </div>

                        <div className="inner-repeater mb-4">
                          <Label>Phone no :</Label>
                          <table style={{ width: "100%" }}>
                            <tbody>
                              {(rows1 || []).map((formRow, key) => (
                                <tr key={key}>
                                  <td>
                                    <Row className="mb-2">
                                      <Col md="10">
                                        <Input
                                          type="text"
                                          name="phone"
                                          className="inner form-control"
                                          placeholder="Enter your phone no..."
                                        />
                                      </Col>
                                      <Col md="2">
                                        <Button
                                          color="primary"
                                          className="btn-block inner"
                                          id="unknown-btn"
                                          style={{ width: "100%" }}
                                          onClick={e => {
                                            handleRemoveRow(formRow.id);
                                          }}
                                        >
                                          {" "}
                                          Delete{" "}
                                        </Button>
                                      </Col>
                                    </Row>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <Button
                            onClick={() => {
                              handleAddRowNested();
                            }}
                            color="success"
                            className="mt-1"
                          >
                            Add Number
                          </Button>
                        </div>

                        <div className="mb-3">
                          <Label className="d-block mb-3">Gender :</Label>
                          <div className="form-check form-check-inline">
                            <Input
                              type="radio"
                              id="customRadioInline1"
                              name="customRadioInline1 gender"
                              className="form-check-input "
                              value={nestedformik.values.gender}
                              onChange={nestedformik.handleChange}
                              onBlur={nestedformik.handleBlur}
                              invalid={
                                nestedformik.touched.gender && nestedformik.errors.gender ? true : false
                              }
                            />
                            <Label
                              className="form-check-label"
                              htmlFor="customRadioInline1"
                            >
                              Male
                            </Label>
                          </div>
                          &nbsp;
                          <div className="form-check form-check-inline">
                            <Input
                              type="radio"
                              id="customRadioInline2"
                              name="customRadioInline1"
                              className="form-check-input"
                            />
                            <Label
                              className="form-check-label"
                              htmlFor="customRadioInline2"
                            >
                              Female
                            </Label>
                          </div>
                          <div>
                            {
                              nestedformik.errors.gender && nestedformik.touched.gender ? (
                                <FormFeedback type="invalid">{nestedformik.errors.gender}</FormFeedback>
                              ) : null
                            }
                          </div>
                        </div>

                        <div className="mb-3">
                          <Label htmlFor="formmessage">Message :</Label>
                          <Input
                            type="textarea"
                            id="formmessage"
                            name="msg"
                            className="form-control"
                            rows="3"
                            placeholder="Enter your Message"
                            value={nestedformik.values.msg}
                            onChange={nestedformik.handleChange}
                            onBlur={nestedformik.handleBlur}
                            invalid={
                              nestedformik.touched.msg && nestedformik.errors.msg ? true : false
                            }
                          />
                          {
                            nestedformik.errors.msg && nestedformik.touched.msg ? (
                              <FormFeedback type="invalid">{nestedformik.errors.msg}</FormFeedback>
                            ) : null
                          }
                        </div>
                        <Button type="submit" color="primary">
                          Submit
                        </Button>
                      </div>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default FormRepeater;
