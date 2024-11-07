import {
  Button,
  deprecatedPropType,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import Axios from "../../axios/config";
import { IDepartment } from "../../utils/Interfaces/IDepartment";
import { ToTitleCase } from "../../utils/StringFunction";
import DeleteModal from "../../component/common/DeleteModal";

const DepartmentPage = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [deleteModalOpen, setDeleteModalOpen] = React.useState({
    open: false,
    userId: 0,
  });
  const handleDeleleteModalOpen = (deptId: number) => {
    setDeleteModalOpen({ open: true, userId: deptId });
  };
  const handleDeleleteModalClose = () => {
    setDeleteModalOpen({ open: false, userId: 0 });
  };

  const [department, setDepartment] = React.useState("");

  const [departmentList, setDepartmentList] = React.useState<IDepartment[]>([]);
  useEffect(() => {
    Axios.get("/department/getAllDepartments").then((response) => {
      setDepartmentList(response.data);
    });
  }, []);

  const AddDepartment = () => {
    Axios.put("/department/AddDepartment", { designation: department })
      .then((response) => {
        let count = departmentList[departmentList.length - 1].deptId;
        let newList: IDepartment[] = [
          ...departmentList,
          { department, deptId: count + 1 },
        ];
        setDepartmentList(newList);
        setDepartment("");
        handleClose();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleDeleteDepartment = (deptId: number) => {
    Axios.put("department/DeleteDepartment", { userID: deptId }).then(
      (response) => {
        handleDeleleteModalClose();
        let newList = departmentList.filter((desg) => {
          return desg.deptId !== deptId;
        });

        setDepartmentList(newList);
      }
    );
    console.log("deleteDesignation");
  };

  return (
    <>
      <div className="page-content">
        <div className="add-Button" style={{ padding: "1rem", float: "right" }}>
          <Button variant="outlined" onClick={handleOpen}>
            Add Department
          </Button>
        </div>
        <div className="department-table">
          <TableContainer>
            <Table sx={{ minWidth: 200 }} aria-label="simple table">
              <TableHead>
                <TableRow className="table-header">
                  <TableCell className="table-header-data">
                    Department ID{" "}
                  </TableCell>
                  <TableCell className="table-header-data">
                    Department
                  </TableCell>
                  <TableCell className="table-header-data">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {departmentList.map((dept: IDepartment) => {
                  return (
                    <TableRow key={dept.deptId}>
                      <TableCell className="table-data">
                        {dept.deptId}
                      </TableCell>
                      <TableCell className="table-data">
                        {ToTitleCase(dept.department)}
                      </TableCell>
                      <TableCell className="table-data">
                        <Button
                          color="error"
                          onClick={() => {
                            handleDeleleteModalOpen(dept.deptId);
                          }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <div className="addModal" > */}
        <Paper elevation={6} className="addModal">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Designation
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Department"
              value={department}
              onChange={(event) => {
                setDepartment(event.target.value);
              }}
            />
          </Typography>
          <div
            style={{
              display: "flex",
              marginTop: "1rem",
              justifyContent: "flex-end",
              gap: "20px",
            }}
          >
            <Button variant="contained" onClick={AddDepartment}>
              Save
            </Button>
            <Button variant="contained" color="error" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </Paper>
        {/* </div> */}
      </Modal>
      <DeleteModal
        open={deleteModalOpen}
        handleClose={handleDeleleteModalClose}
        handleDelete={handleDeleteDepartment}
      />
    </>
  );
};

export default DepartmentPage;
