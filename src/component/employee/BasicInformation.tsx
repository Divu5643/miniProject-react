import { Avatar, Box, Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { printDate, ToTitleCase } from "../../utils/StringFunction";
import IProfile from "../../utils/Interfaces/IProfile";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";


const BasicInformation = ({ profileInfo }: { profileInfo: IProfile }) => {
  const color = useSelector((state:RootState)=>state.AvatarColor);
  return (
    <Box sx={{ padding: 2 }}>
      <Grid2
        container
        spacing={4}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Grid2
          size={{ xs: 10, md: 3 }}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box sx={{ border: "1px solid #ccc", padding: 2, height: "155px" }}>
            <Avatar
              sx={{
                bgcolor: color,
                width: "150px",
                height: "150px",
                fontSize: "5rem",
                textAlign: "center",
              }}
            >
              
              {profileInfo.name?.charAt(0).toUpperCase()}
            </Avatar>
          </Box>
        </Grid2>
        <Grid2 container size={{ xs: 10, sm: 8, md: 8 }} spacing={2}>
          <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
            <Box sx={{ padding: 2 }}>
              <Typography variant="h6">Name</Typography>
              <Typography variant="body1">
                {ToTitleCase(profileInfo.name)}
              </Typography>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
            <Box sx={{ padding: 2 }}>
              <Typography variant="h6">Designation</Typography>
              <Typography variant="body1">
                {ToTitleCase(profileInfo.designation)}
              </Typography>
            </Box>
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
            <Box sx={{ padding: 2 }}>
              <Typography variant="h6">Department</Typography>
              <Typography variant="body1">
                {ToTitleCase(profileInfo.department)}
              </Typography>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
            <Box sx={{ padding: 2 }}>
              <Typography variant="h6">Reporting Manager</Typography>
              <Typography variant="body1">
                {profileInfo.reportingManager == ""
                  ? "Not Assigned Yet"
                  : ToTitleCase(profileInfo.reportingManager)}
              </Typography>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
            <Box sx={{ padding: 2 }}>
              <Typography variant="h6">Date of Birth</Typography>
              <Typography variant="body1">
                {printDate(profileInfo.dateOfBirth?.format("DD-MM-YYYY"))}
                {/* {profileInfo.dateOfBirth?.format("DD/MM/YYYY")} */}
              </Typography>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
            <Box sx={{ padding: 2 }}>
              <Typography variant="h6">Gender</Typography>
              <Typography variant="body1">
                {ToTitleCase(profileInfo.gender)}
              </Typography>
            </Box>
          </Grid2>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default BasicInformation;
