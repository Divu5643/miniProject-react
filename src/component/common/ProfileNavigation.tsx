import { Avatar, Popover } from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import React from "react";
import { ToTitleCase } from "../../utils/StringFunction";
import Divider from "@mui/material/Divider";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/slice/userSlice";
import toggleDarkMode from "../../utils/darkmodefunction";
const ProfileNavigation = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const username = useSelector((state: RootState) => state.loginData.username);
  const color = useSelector((state: RootState) => state.AvatarColor);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <div
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          handleClick(event );
        }}
        className="ProfileBtn"
      >
        <Avatar aria-describedby={id} sx={{ bgcolor: color }}>
          {username.charAt(0).toUpperCase()}
        </Avatar>
        <ExpandMoreRoundedIcon />
      </div>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <ProfilePopoverContent color={color} />
      </Popover>
    </>
  );
};

const ProfilePopoverContent = ({ color }: { color: string }) => {
  const loginData = useSelector((state: RootState) => state.loginData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <div className="popover-content">
        <div
          onClick={() => {
            navigate(`/${loginData.role}/selfProfile`);
          }}
          className="popover-Profile-info-container profile-info-item-container"
        >
          <Avatar sx={{ bgcolor: color }}>
            {loginData.username.charAt(0).toUpperCase()}
          </Avatar>
          <div className="Profile-Info">
            <span style={{ display: "block", margin: "5px  0" }}>
              {ToTitleCase(loginData.username)}
            </span>
            <span style={{ display: "block" }}>
              {ToTitleCase(loginData.email)}
            </span>
          </div>
        </div>
        <Divider />
        <div
          onClick={() => {
            navigate(`/${loginData.role}/profileSettings`);
          }}
          className="profile-setting-container profile-info-item-container"
        >
          <span className="profile-info-item">
            {" "}
            <ManageAccountsRoundedIcon /> Profile Setting
          </span>
        </div>
        <Divider />
        <div
          onClick={() => {
            console.log("loggedout");
            dispatch(logoutUser());
            navigate("/");
          }}
          className="profile-logout-container profile-info-item-container"
        >
          <span className="profile-info-item">
            {" "}
            <LogoutRoundedIcon /> Logout
          </span>
        </div>
        <Divider />
        <div onClick={()=>{toggleDarkMode()}} className="dark-mode-container profile-info-item-container">
          <span className="profile-info-item"> DarkMode</span>{" "}
        </div>
      </div>
    </>
  );
};

export default ProfileNavigation;
