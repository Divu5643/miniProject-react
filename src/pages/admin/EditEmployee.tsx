import { Button, MenuItem, Snackbar, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import employeeSchema from "../../validation/AddEmployeeValidation";
import Axios from "../../axios/config";
import CircularProgress from "@mui/joy/CircularProgress";
import { ValidationError } from "yup";
import { Iuser } from "../../utils/Interfaces/Iuser";
import { IDepartment, IDesignation } from "../../utils/Interfaces/IDepartment";
const EditEmployee: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userUpdated, setUserUpdated] = React.useState(false);
  const [isRequestLoading, setIsRequestLoading] =
    React.useState<Boolean>(false);
  const data = location.state;
  console.log("data:", data);
  const [departmentList, setDepartmentList] = React.useState<IDepartment[]>([]);
  const [designationList, setDesignationList] = React.useState<IDesignation[]>(
    []
  );
  const [formData, setFormData] = React.useState<Iuser>(data);
  const [error, setError] = React.useState({
    name: "",
    email: "",
    role: "",
    deptId: "",
    designationId: "",
  });

  useEffect(() => {
    Axios.get("department/getAllDepartments").then((response) => {
      console.log("departmentList:", response.data);
      setDepartmentList(response.data);
    });
    Axios.get("designation/getAllDesignation").then((response) => {
      console.log("designationList:", response.data);
      setDesignationList(response.data);
    });
  }, []);

  const FormSubmit = async () => {
    setIsRequestLoading(true);
    await employeeSchema
      .validate(formData, { abortEarly: false })
      .then((response) => {
        setError({
          name: "",
          email: "",
          // password: "",
          role: "",
          deptId: "",
          designationId: "",
        });
        console.log("formData : ",formData)
        Axios.post("/user/updateUser", {
          userid:formData.userid,
    name:formData.name,
    email:formData.email,
    password:formData.password,
    roleId:formData.roleId,
    deptId:formData.deptId,
    designationId :formData.designationId,
    isDeleted:formData.isDeleted
        })
          .then((response) => {
            setUserUpdated(true);
            setIsRequestLoading(false);
            setTimeout(() => navigate("/admin/employees"), 1000);
          })
          .catch((error) => setIsRequestLoading(false));
      })
      .catch((err: ValidationError) => {
        console.log(err);
        let errArr = err?.inner || [];
        let errorObj: any = {
          name: "",
          email: "",
          // password: "",
          role: "",
          department: "",
        };
        errArr.map((err) => {
          console.log(typeof err);
          errorObj[err?.path as string] = err?.message;
          setIsRequestLoading(false);
          setError(errorObj);
        });
      });
  };

  return (
    <>
      {/* <div className="page-header">
        <h4 className="page-title">Edit Employee</h4>
      </div> */}
      <div className="page-content" style={{ padding: "2rem" }}>
        <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 8 }}>
          <Grid size={{ xs: 10, sm: 8, md: 5 }}>
            <TextField
              fullWidth={true}
              size="medium"
              variant="outlined"
              label="Name"
              required={true}
              error={error.name == "" ? false : true}
              value={formData.name}
              helperText={error.name}
              onChange={(event) => {
                setFormData({
                  ...formData,
                  name: event.target.value.toLowerCase(),
                });
              }}
            />
          </Grid>
          <Grid size={{ xs: 10, sm: 8, md: 5 }}>
            <TextField
              fullWidth={true}
              size="medium"
              variant="outlined"
              label="Email"
              required={true}
              error={error.email == "" ? false : true}
              helperText={error.email}
              value={formData.email}
              onChange={(event) => {
                setFormData({
                  ...formData,
                  email: event.target.value.toLowerCase(),
                });
              }}
            />
          </Grid>

          <Grid size={{ xs: 10, sm: 8, md: 5 }}>
            <TextField
              fullWidth={true}
              select
              size="medium"
              variant="outlined"
              label="Department"
              required={true}
              error={error.deptId == "" ? false : true}
              helperText={error.deptId}
              value={formData.deptId}
              onChange={(event) => {
                setFormData({
                  ...formData,
                  deptId: Number(event.target.value),
                });
              }}
            >
              {departmentList.map((item) => {
                return (
                  <MenuItem value={item.deptId}>{item.department}</MenuItem>
                );
              })}
            </TextField>
          </Grid>
          <Grid size={{ xs: 10, sm: 8, md: 5 }}>
            <TextField
              fullWidth={true}
              size="medium"
              variant="outlined"
              label="Role"
              select={true}
              required={true}
              error={error.role == "" ? false : true}
              helperText={error.role}
              value={formData.roleId}
              onChange={(event) => {
                setFormData({
                  ...formData,
                  roleId: Number(event.target.value),
                });
              }}
            >
              <MenuItem value={1}>Admin</MenuItem>
              <MenuItem value={2}>Manager</MenuItem>
              <MenuItem value={3}>Employee</MenuItem>
            </TextField>
          </Grid>
          <Grid size={{ xs: 10, sm: 8, md: 5 }}>
            <TextField
              fullWidth={true}
              select
              size="medium"
              variant="outlined"
              label="Designation"
              required={true}
              error={error.designationId == "" ? false : true}
              helperText={error.designationId}
              value={formData.designationId}
              onChange={(event) => {
                setFormData({
                  ...formData,
                  designationId: Number(event.target.value),
                });
              }}
            >
              {designationList.map((item) => {
                return (
                  <MenuItem value={item.designationId}>
                    {item.designation}
                  </MenuItem>
                );
              })}
            </TextField>
          </Grid>
          <Grid
            size={{ xs: 10, sm: 8, md: 5 }}
            spacing={6}
            sx={{ display: "flex", alignItems: "center", gap: "20px" }}
          >
            {isRequestLoading ? (
              <CircularProgress variant="soft" />
            ) : (
              <Button
                onClick={FormSubmit}
                sx={{ margin: "1rem" }}
                variant="contained"
              >
                {" "}
                Save
              </Button>
            )}
            <Button
              variant="contained"
              onClick={() => navigate("/admin/employees")}
              color="error"
            >
              {" "}
              Cancel
            </Button>
          </Grid>
        </Grid>
      </div>
      <Snackbar
        open={userUpdated}
        autoHideDuration={6000}
        onClose={() => {
          setUserUpdated(false);
        }}
        message="Employee Updated"
      />
    </>
  );
};

export default EditEmployee;
