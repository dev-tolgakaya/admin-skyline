import React from 'react';
import { Badge } from 'reactstrap';

const JobTitle = (cell:any) => {
    return cell.value ? cell.value : "";
};

const CompanyName = (cell:any) => {
    return cell.value ? cell.value : "";
};

const Type:any = (cell:any) => {
   switch(cell.value) {
        case "Full Time":
            return <Badge className="badge-soft-success">Full Time</Badge>
        case "Part Time":
        return <Badge className="badge-soft-danger">Part Time</Badge>
        case "Freelance":
            return <Badge className="badge-soft-info">Freelance</Badge>
        case "Internship":
            return <Badge className="badge-soft-warning">Internship</Badge>
   }
};

const ApplyDate = (cell:any) => {
    return cell.value ? cell.value : "";
};

const Status:any = (cell:any) => {
   switch(cell.value) {
        case "Active":
            return <Badge className="bg-success">Active</Badge>
        case "New":
           return <Badge className="bg-info">New</Badge>
        case "Close":
            return <Badge className="bg-danger">Close</Badge>
   }
};

export { JobTitle, CompanyName, Type, ApplyDate, Status }
