import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { IuserByManager } from "../../utils/Interfaces/IReviewer";
import { Link, useNavigate } from "react-router-dom";
import { ToTitleCase } from "../../utils/StringFunction";

const ReviewerEmployeeTable = ({
  employeeList,
  formType,
  assesment,
}: {
  formType:"profile"|"review";
  employeeList: IuserByManager[];
  assesment: Boolean;
}) => {
  const navigate = useNavigate();
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="table-header">
            <TableRow>
              <TableCell className="table-header-data">Employee Name</TableCell>
              <TableCell className="table-header-data">Email</TableCell>
              <TableCell className="table-header-data">Department</TableCell>
              <TableCell className="table-header-data">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeList.map((employee, index) => {
              return (
                <TableRow key={index}>
                  <TableCell  >
                    <Link className="profile-Link" to={`/manager/${formType}/${employee.employeeId}`}>
                      {ToTitleCase(employee.employeeName)}{" "}
                    </Link>
                  </TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{ToTitleCase(employee.department)}</TableCell>
                  <TableCell>
                    {assesment ? (
                      <Button
                        onClick={() => {
                          navigate(
                            `/manager/employeeAssesment/${employee.employeeId}`
                          );
                        }}
                      >
                        Review
                      </Button>
                    ) : (
                      "Action"
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ReviewerEmployeeTable;
