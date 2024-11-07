import { Button, Paper } from "@mui/material";
import React, { useEffect } from "react";
import BasicInformation from "../../component/employee/BasicInformation";
import ContactInformation from "../../component/employee/ContactInformation";
import { useNavigate } from "react-router-dom";
import Axios from "../../axios/config";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import IProfile from "../../utils/Interfaces/IProfile";
import dayjs from "dayjs";
import { setTitle } from "../../redux/slice/userSlice";
import { IReviewShow } from "../../utils/Interfaces/IReviewer";
import ManagerHistory from "../../component/employee/ManagerHistory";

const EmployeeProfile: React.FC = () => {
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.loginData.userId);
  const [userData, setUserData] = React.useState<IProfile>({});
  const [managerList,setManagerList] = React.useState<IReviewShow[]>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTitle("Profile"));

    Axios.post("/profile/getEmployeeDetails", { userID: userId })
      .then((response) => {
        setUserData({
          ...response.data,
          dateOfBirth:
            response.data.dateOfBirth == null
              ? null
              : dayjs(response.data.dateOfBirth),
        });
      })
      .catch((error) => {
        setUserData({
          userId: userId,
          name: "NA",
          designation: "",
          department: "",
          reportingManager: "",
          dateOfBirth: null,
          gender: "",
          email: "",
          phone: "",
          personalEmail: "",
        });
      });

      Axios.get(`/reviewer/getReviewHistory?userId=${userId}`)
        .then((response)=>{
          console.log("manager History",response.data);
          setManagerList(response.data);
        
        })

  }, []);

  return (
    <>
      {/* <ContentHeader title="Profile" /> */}
      <div className="page-content">
        <Paper elevation={5} style={{ width: "100%" }}>
          <Paper>
            <Paper
              variant="outlined"
              style={{
                padding: "1rem",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <h3 className="profile-subtitle">Basic Information</h3>
              <Button
                onClick={() => {
                  navigate("/employee/profileSettings", {
                    state: { profileInfo: userData },
                  });
                }}
              >
                Edit Profile
              </Button>
            </Paper>
            <Paper
              style={{
                display: "flex",
                gap: "75px",
                alignItems: "center",
                padding: "1rem",
              }}
            >
              <BasicInformation profileInfo={userData} />
            </Paper>
          </Paper>
        </Paper>
        <Paper elevation={5}>
          <Paper
            variant="outlined"
            style={{ padding: "1rem", marginTop: "1rem" }}
          >
            <h3 className="profile-subtitle">Contact Information</h3>
          </Paper>
          <Paper
            style={{
              display: "flex",
              gap: "75px",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
            }}
          >
            <ContactInformation profileInfo={userData} />
          </Paper>
        </Paper>
        <Paper elevation={5}>
        <Paper variant='outlined' style={{padding:"1rem",marginTop:"1rem"}}>
        <h3 className='profile-subtitle'>Previous Managers</h3>
        </Paper>
        <Paper style={{display:"flex",gap:"75px",alignItems:"center",justifyContent:"center",padding:"1rem"}}>
          <ManagerHistory managerList={managerList} />
        </Paper>
        </Paper>
      </div>
    </>
  );
};

export default EmployeeProfile;
