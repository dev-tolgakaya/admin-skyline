import React from "react";
import { Row } from "reactstrap";
import { Link } from "react-router-dom";
type TablePaginationPropsType = {
  isPagination?: any;
  customPageSizeOption?: any;
  isShowingPageLength?: boolean;
  paginationDiv?: string;
  pagination?: string;
  canPreviousPage?: boolean;
};
const TablePagination = ({
  isShowingPageLength,
  paginationDiv,
  pagination,
  canPreviousPage,
}: TablePaginationPropsType) => {
  const data = [
    { name: "test", age: 20 },
    { name: "test2", age: 30 },
  ];
  const page = 1;
  return (
    // <Row className="justify-content-between align-items-center">
    //   {isShowingPageLength && (
    //     <div className="col-sm">
    //       <div className="text-muted">
    //         Showing <span className="fw-semibold">{page.length}</span> of{" "}
    //         <span className="fw-semibold">{data.length}</span> entries
    //       </div>
    //     </div>
    //   )}
    //   <div className={paginationDiv}>
    //     <ul className={pagination}>
    //       <li className={`page-item ${!canPreviousPage ? "disabled" : ""}`}>
    //         <Link to="#" className="page-link" onClick={previousPage}>
    //           <i className="mdi mdi-chevron-left"></i>
    //         </Link>
    //       </li>
    //       {pageOptions.map((item: any, key: number) => (
    //         <React.Fragment key={key}>
    //           <li
    //             className={
    //               pageIndex === item ? "page-item active" : "page-item"
    //             }
    //           >
    //             <Link
    //               to="#"
    //               className="page-link"
    //               onClick={() => gotoPage(item)}
    //             >
    //               {item + 1}
    //             </Link>
    //           </li>
    //         </React.Fragment>
    //       ))}
    //       <li className={`page-item ${!canNextPage ? "disabled" : ""}`}>
    //         <Link to="#" className="page-link" onClick={nextPage}>
    //           <i className="mdi mdi-chevron-right"></i>
    //         </Link>
    //       </li>
    //     </ul>
    //   </div>
    // </Row>
    <div></div>
  );
};

export default TablePagination;
