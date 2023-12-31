import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'reactstrap';

const CheckBox = (cell:any) => {
    return cell.value ? cell.value : '';
};

const OrderId = (cell:any) => {
    return (
        <Link to="#" className="text-body fw-bold">{cell.value ? cell.value : ''}</Link>
    );
};

const BillingName = (cell:any) => {
    return cell.value ? cell.value : '';
};

const Date = (cell:any) => {
    return cell.value ? cell.value : '';
};

const Total = (cell:any) => {
    return cell.value ? cell.value : '';
};

const PaymentStatus = (cell:any) => {
    return (
        <Badge
          className={"font-size-11 badge-soft-" + 
          (cell.value === "Paid" ? "success" : "danger" && cell.value === "Refund" ? "warning" : "danger")}          
        >
          {cell.value}
        </Badge>
    )
};
const PaymentMethod = (cell:any) => {
    return (
        <span>
        <i
        className={
          (cell.value === "Paypal" ? "fab fa-cc-paypal me-1" : "" || 
          cell.value === "COD" ? "fab fas fa-money-bill-alt me-1" : "" ||
          cell.value === "Mastercard" ? "fab fa-cc-mastercard me-1" : "" ||
          cell.value === "Visa" ? "fab fa-cc-visa me-1" : ""
          )}
          />
            {cell.value}
        </span>
    )
};
export {
    CheckBox,
    OrderId,
    BillingName,
    Date,
    Total,
    PaymentStatus,
    PaymentMethod
};