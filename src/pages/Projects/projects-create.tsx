import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Button, Card, CardBody, CardTitle, Col, Container, Form, FormGroup, Input, Label, Row, FormFeedback } from "reactstrap";
//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import * as Yup from "yup";
import { useFormik } from "formik";

//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";
import moment from "moment";

const ProjectsCreate = () => {

  //meta title
  document.title = "Create New Project | Skote - React Admin & Dashboard Template";
  const [selectedFiles, setselectedFiles] = useState<any>([]);

  const handleAcceptedFiles = (files: any) => {
    const newImages = files?.map((file: any) => {
      return Object.assign(file, {
        priview: URL.createObjectURL(file),
      })
    })
    setselectedFiles([...selectedFiles, ...newImages]);
  };
  // validation
  const validation: any = useFormik({
    initialValues: {
      projectname: '',
      projectdesc: '',
      projectbudget: '',
      img: '',
      startdate: '',
      enddate: ''
    },
    validationSchema: Yup.object({
      projectname: Yup.string().required("Please Enter Your Project Name"),
      projectdesc: Yup.string().required("Please Enter Your Project Desc"),
      projectbudget: Yup.string().required("Please Enter Your Project Budget"),
      startdate: Yup.string().required("Please Enter Your Start Date"),
      enddate: Yup.string().required("Please Enter Your End Date"),
    }),
    onSubmit: (values: any) => {
      // console.log(values);

    }
  });



  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Projects" breadcrumbItem="Create New" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Create New Project</CardTitle>
                  <Form onSubmit={validation.handleSubmit} autoComplete="off">
                    <FormGroup className="mb-4" row>
                      <Label
                        htmlFor="projectname"
                        className="col-form-label col-lg-2"
                      >
                        Project Name
                      </Label>
                      <Col lg={10}>
                        <Input
                          id="projectname"
                          name="projectname"
                          type="text"
                          placeholder="Enter Project Name..."
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.projectname || ""}
                          invalid={
                            validation.touched.projectname && validation.errors.projectname ? true : false
                          }
                        />
                        {validation.touched.projectname && validation.errors.projectname ? (
                          <FormFeedback type="invalid">{validation.errors.projectname}</FormFeedback>
                        ) : null}
                      </Col>
                    </FormGroup>
                    <FormGroup className="mb-4" row>
                      <Label
                        htmlFor="projectdesc"
                        className="col-form-label col-lg-2"
                      >
                        Project Description
                      </Label>
                      <Col lg={10}>
                        <Input tag="textarea"
                          id="projectdesc"
                          rows={3}
                          name="projectdesc"
                          placeholder="Enter Project Description..."
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.projectdesc || ""}
                          invalid={
                            validation.touched.projectdesc && validation.errors.projectdesc ? true : false
                          }
                        />
                        {validation.touched.projectdesc && validation.errors.projectdesc ? (
                          <FormFeedback type="invalid">{validation.errors.projectdesc}</FormFeedback>
                        ) : null}
                      </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                      <Label className="col-form-label col-lg-2">
                        Project Date
                      </Label>
                      <Col lg={10}>
                        <Row>
                          <Col md={6} className="pr-0">
                            <Flatpickr
                              className="form-control d-block"
                              id="orderdate"
                              name="startdate"
                              placeholder="Select date"
                              options={{
                                mode: "single",
                                dateFormat: 'd M, Y',
                              }}
                              onChange={(customerdate: any) => validation.setFieldValue("startdate", moment(customerdate[0]).format("DD MMMM ,YYYY"))}
                              value={validation.values.startdate || ''}
                            />
                            {validation.errors.startdate && validation.touched.startdate ? (
                              <FormFeedback type="invalid">{validation.errors.startdate}</FormFeedback>
                            ) : null}
                          </Col>
                          <Col md={6} className="pl-0">
                            <Flatpickr
                              className="form-control d-block"
                              id="orderdate"
                              name="enddate"
                              placeholder="Select date"
                              options={{
                                mode: "single",
                                dateFormat: 'd M, Y',
                              }}
                              onChange={(customerdate: any) => validation.setFieldValue("enddate", moment(customerdate[0]).format("DD MMMM ,YYYY"))}
                              value={validation.values.enddate || ''}
                            />
                            {validation.errors.enddate && validation.touched.enddate ? (
                              <FormFeedback type="invalid">{validation.errors.enddate}</FormFeedback>
                            ) : null}
                          </Col>
                        </Row>
                      </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                      <label
                        htmlFor="projectbudget"
                        className="col-form-label col-lg-2"
                      >
                        Budget
                      </label>
                      <Col lg={10}>
                        <Input
                          id="projectbudget"
                          name="projectbudget"
                          type="text"
                          placeholder="Enter Project Budget..."
                          className="form-control"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.projectbudget || ""}
                          invalid={
                            validation.touched.projectbudget && validation.errors.projectbudget ? true : false
                          }
                        />
                        {validation.touched.projectbudget && validation.errors.projectbudget ? (
                          <FormFeedback type="invalid">{validation.errors.projectbudget}</FormFeedback>
                        ) : null}
                      </Col>
                    </FormGroup>
                  </Form>
                  <Row className="mb-4">
                    <Label className="col-form-label col-lg-2">
                      Attached Files
                    </Label>
                    <Col lg="10">
                      <Form>
                        <Dropzone
                          onDrop={(acceptedFiles: any) => {
                            handleAcceptedFiles(acceptedFiles);
                            validation.setFieldValue("img", acceptedFiles[0])
                          }}
                          name="img"
                          value={validation.values.img || ''}
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          isInvalid={!!validation.errors.img}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <div className="dropzone">
                              <div
                                className="dz-message needsclick"
                                {...getRootProps()}
                              >
                                <input {...getInputProps()} />
                                <div className="dz-message needsclick">
                                  <div className="mb-3">
                                    <i className="display-4 text-muted bx bxs-cloud-upload" />
                                  </div>
                                  <h4>Drop files here or click to upload.</h4>
                                </div>
                              </div>
                            </div>
                          )}
                        </Dropzone>
                        {validation.errors.img && validation.touched.img ? (
                          <FormFeedback type="invalid">{validation.errors.img}</FormFeedback>
                        ) : null}
                        <div
                          className="dropzone-previews mt-3"
                          id="file-previews"
                        >
                          {selectedFiles.map((file: any, index: any) => {
                            return (
                              <div className="border rounded">
                                <div className="d-flex flex-wrap gap-2 p-2">
                                  <div className="flex-shrink-0 me-3">
                                    <div className="avatar-sm bg-light rounded p-2">
                                      <img data-dz-thumbnail="" className="img-fluid rounded d-block" src={file.priview} alt={file.name} />
                                    </div>
                                  </div>
                                  <div className="flex-grow-1">
                                    <div className="pt-1">
                                      <h5 className="fs-md mb-1" data-dz-name>{file.path}</h5>
                                      <strong className="error text-danger" data-dz-errormessage></strong>
                                    </div>
                                  </div>
                                  <div className="flex-shrink-0 ms-3">
                                    <Button variant="danger" size="sm" onClick={() => {
                                      const newImages = [...selectedFiles];
                                      newImages.splice(index, 1);
                                      setselectedFiles(newImages);
                                    }}>Delete</Button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </Form>
                    </Col>
                  </Row>
                  <Row className="justify-content-end">
                    <Col lg={10}>
                      <Button type="submit" color="primary">
                        Create Project
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ProjectsCreate;
