import MockAdapter from "axios-mock-adapter";
import { axiosInstance } from "../../api";

const mock = new MockAdapter(axiosInstance, {
  delayResponse: 2000,
});

export default mock;
