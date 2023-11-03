import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'reactstrap';

const CustId = (cell: any) => {
    return (
        <Link to="#" className="text-body fw-bold">{cell.value ? cell.value : ''}</Link>
    );
};

const UserName = (cell: any) => {
    return cell.value ? cell.value : '';
};
const Address = (cell: any) => {
    return cell.value ? cell.value : '';
};

const Rating = (cell: any) => {
    return (
        <Badge color='success' className="font-size-12"><i className="mdi mdi-star me-1"></i>{cell.value}</Badge>
    )
};

const WalletBalances = (cell: any) => {
    return (
        <>
            {
                cell.value ? <span>$ {cell.value}</span> : ''
            }
        </>
    );
};

const JoiningDate = (cell: any) => {
    return cell.value ? cell.value : '';
};

export {
    CustId,
    UserName,
    Address,
    Rating,
    WalletBalances,
    JoiningDate,
};