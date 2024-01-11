import React, { useEffect, useState } from "react";

// Redux
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  CardBody,
  Card,
  Container,
  Form,
  Input,
  Label,
  FormFeedback,
  Alert,
} from "reactstrap";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";

// import images
import profile from "../../assets/images/profile-img.png";
import logo from "../../assets/images/logo.svg";
import lightlogo from "../../assets/images/logo-light.svg";

//import thunk
import { loginUser } from "slices/auth/login/thunk";

import withRouter from "Components/Common/withRouter";
import { createSelector } from "reselect";

import validations from "helpers/validations";

const Login = (props: any) => {
  const [show, setShow] = useState(false);
  const dispatch: any = useDispatch();
  const { navigate, translation } = props.router;

  const selectProperties = createSelector(
    (state: any) => state.Login,
    (error) => error
  );

  const { error } = useSelector(selectProperties);

  // Form validation
  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      userNameOrEmail: "", // "admin@themesbrand.com"
      password: "", //  "123456" ||
      remember: true,
    },
    validationSchema: Yup.object({
      userNameOrEmail: validations.form.email,
      password: validations.form.password,
    }),
    onSubmit: (values: any) => {
      dispatch(loginUser({ data: values, navigate }));
    },
  });

  // const signIn = (type: any) => {
  //   dispatch(socialLogin(type, props.router.navigate));
  // };

  // const socialResponse = (type: any) => {
  //   signIn(type);
  // };

  // useEffect(() => {
  //   if (error) {
  //     setTimeout(() => {
  //       dispatch(resetLoginMsgFlag());
  //     }, 3000);
  //   }
  // }, [dispatch, error]);

  return (
    <div className="account-pages my-5 pt-sm-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <Card className="overflow-hidden">
              <div className="bg-primary bg-soft">
                <Row>
                  <Col className="col-7">
                    <div className="text-primary p-4">
                      <h5 className="text-primary">
                        {translation.t("Login.WelcomeBack")}
                      </h5>
                      <p>{translation.t("Login.SignintocontinuetoSkyLine")}</p>
                    </div>
                  </Col>
                  <Col className="col-5 align-self-end">
                    <img src={profile} alt="" className="img-fluid" />
                  </Col>
                </Row>
              </div>
              <CardBody className="pt-0">
                <div className="auth-logo">
                  <Link to="/" className="auth-logo-light">
                    <div className="avatar-md profile-user-wid mb-4">
                      <span className="avatar-title rounded-circle bg-light">
                        <img
                          src={lightlogo}
                          alt=""
                          className="rounded-circle"
                          height="34"
                        />
                      </span>
                    </div>
                  </Link>
                  <Link to="/" className="auth-logo-dark">
                    <div className="avatar-md profile-user-wid mb-4">
                      <span className="avatar-title rounded-circle bg-light">
                        <img
                          src={logo}
                          alt=""
                          className="rounded-circle"
                          height="34"
                        />
                      </span>
                    </div>
                  </Link>
                </div>
                <div className="p-2">
                  <Form
                    className="form-horizontal"
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}
                  >
                    <div className="mb-3">
                      {error ? <Alert color="danger">{error}</Alert> : null}
                      <Label className="form-label">
                        {translation.t("Login.EmailOrUsername")}
                      </Label>
                      <Input
                        name="userNameOrEmail"
                        className="form-control"
                        placeholder={translation.t("Login.EmailOrUsername")}
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.userNameOrEmail || ""}
                        invalid={
                          validation.touched.userNameOrEmail &&
                          validation.errors.userNameOrEmail
                            ? true
                            : false
                        }
                      />
                      {validation.touched.userNameOrEmail &&
                      validation.errors.userNameOrEmail ? (
                        <FormFeedback type="invalid">
                          {validation.errors.userNameOrEmail}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-3">
                      <Label className="form-label">
                        {" "}
                        {translation.t("Login.Password")}
                      </Label>
                      <div className="input-group auth-pass-inputgroup">
                        <Input
                          name="password"
                          value={validation.values.password || ""}
                          type={show ? "text" : "password"}
                          placeholder={translation.t("Login.Password")}
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.password &&
                            validation.errors.password
                              ? true
                              : false
                          }
                        />
                        <button
                          onClick={() => setShow(!show)}
                          className="btn btn-light "
                          type="button"
                          id="password-addon"
                        >
                          <i className="mdi mdi-eye-outline"></i>
                        </button>
                      </div>
                      {validation.touched.password &&
                      validation.errors.password ? (
                        <FormFeedback type="invalid">
                          {validation.errors.password}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="customControlInline"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="customControlInline"
                      >
                        {translation.t("Login.RememberMe")}
                      </label>
                    </div>

                    <div className="mt-3 d-grid">
                      <button
                        className="btn btn-primary btn-block "
                        type="submit"
                      >
                        {translation.t("Login.LogIn")}
                      </button>
                    </div>

                    <div className="mt-4 text-center">
                      <h5 className="font-size-14 mb-3">
                        {" "}
                        {translation.t("Login.SignInWith")}
                      </h5>

                      <ul className="list-inline">
                        <li className="list-inline-item">
                          <Link
                            to="#"
                            className="social-list-item bg-primary text-white border-primary"
                            // onClick={(e: any) => {
                            //   e.preventDefault();
                            //   socialResponse("facebook");
                            // }}
                          >
                            <i className="mdi mdi-facebook" />
                          </Link>
                        </li>{" "}
                        <li className="list-inline-item">
                          <Link
                            to="#"
                            className="social-list-item bg-info text-white border-info"
                          >
                            <i className="mdi mdi-twitter" />
                          </Link>
                        </li>{" "}
                        <li className="list-inline-item">
                          <Link
                            to="#"
                            className="social-list-item bg-danger text-white border-danger"
                            // onClick={(e: any) => {
                            //   e.preventDefault();
                            //   socialResponse("google");
                            // }}
                          >
                            <i className="mdi mdi-google" />
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div className="mt-4 text-center">
                      <Link to="/forgot-password" className="text-muted">
                        <i className="mdi mdi-lock me-1" />{" "}
                        {translation.t("Login.ForgotPassword")}
                      </Link>
                    </div>
                  </Form>
                </div>
              </CardBody>
            </Card>
            <div className="mt-5 text-center">
              <p>
                {translation.t("Login.DontHaveAnAccount")}{" "}
                <Link to="/register" className="fw-medium text-primary">
                  {" "}
                  {translation.t("Login.SignUp")}{" "}
                </Link>{" "}
              </p>
              <p>
                © {new Date().getFullYear()} SkyLine.{" "}
                <i className="mdi mdi-heart text-danger" /> softrobotics
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default withRouter(Login);
