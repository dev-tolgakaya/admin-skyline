import * as Yup from "yup";

export default {
  form: {
    email: Yup.string().required("Please Enter Your email"),
    password: Yup.string().required("Please Enter Your Password"),
  },
};
