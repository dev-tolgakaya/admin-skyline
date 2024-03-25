import { Spinner } from "reactstrap";
import React from "react";
import styles from "./index.module.scss";

interface Props {
  spinnerText?: string;
}

const PageLoading: React.FC<Props> = ({ spinnerText }) => {
  return (
    <div className={styles.spinner}>
      <Spinner animation="border" />
    </div>
  );
};

export default PageLoading;
