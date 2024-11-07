import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo1.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import AppBar from '@mui/material/AppBar';
import { IconButton, Typography } from "@mui/material";
import ProfileNavigation from "./ProfileNavigation";

export const SideBar:React.FC<{
  navItemList: any[];
  ChildComponent: React.FC;
}> = ({
  navItemList,
  ChildComponent = () => {
    return <></>;
  },
} ) => {
  const [open, setOpen] = React.useState(true);

  console.log(location.pathname);
  const userName = useSelector((state: RootState) => state.loginData.username);
  const title = useSelector((state: RootState) => state.title);
  return (
    <>
      <div
        className="sidebar"
        style={{ width: open ? "250px" : "80px", transition: "0.5s" }}
      >
        
        <AppBar id="appbar-top" position="fixed" className={open ? "appbar-open appbar":"appbar-close appbar" } >
          <div className="appBar-container">
                <div className="appBar-item menu-icon-cont">
                  <IconButton  onClick={() => {
              setOpen(!open);
            }} sx={{fontSize:"2rem"}} >
               {open ? <MenuIcon fontSize="large" sx={{color:"white"}} /> : <MenuOpenIcon fontSize="large" sx={{color:"white"}} />}
                  
                  </IconButton>
                </div>
                <div className="appBar-item appBar-header">
                  <Typography variant="h6" >
                  {title}

                  </Typography>
                </div>
                <div className="appBar-item avatar-item">
                  <ProfileNavigation />
                </div>
          </div>
        </AppBar>
        {/* <div className="sidebar-header">
          <h4 style={{ display: open ? "inline" : "none" }}>
            {ToTitleCase(userName)}{" "}
          </h4>
          <button
            className="sidebar-header-btn"
            onClick={() => {
              setOpen(!open);
            }}
          >
            {open ? <MenuIcon /> : <MenuOpenIcon />}
          </button>
        </div> */}
        <div className="logo">
          <img src={logo} alt="Perform"/>
        </div>
        <div className="sidebar-nav">
          {navItemList.map((listItem, index) => (
            <ListItem key={index} listItem={listItem} isopen={open} />
          ))}
        </div>
      </div>

      <div
        style={{
          marginLeft: open ? "250px" : "80px",
          transition: "0.5s",
          padding: "1rem",
        }}
      >
        <ChildComponent />
      </div>
    </>
  );
};

const ListItem = ({ listItem, isopen }: { listItem: any; isopen: boolean }) => {
  let isActivePage = false;
  let location = useLocation();
  if (location.pathname == listItem.navLink) {
    isActivePage = true;
  }
  const navigate = useNavigate();
  return (
    <>
      <div
        className={isActivePage ? "sidebar-item-active" : "sidebar-item"}
        onClick={() => {
          navigate(listItem.navLink);
        }}
        style={{ justifyContent: isopen ? "start" : "center", 
          width: isopen ? "100%" : "80px",
          paddingLeft: isopen ? "10%" : "0px" }}
      >
        <div className="sidebar-item-icon">{listItem.navIcon}</div>
        {isopen && <div className="sidebar-item-name">{listItem.navName}</div>}
      </div>
    </>
  );
};

export default SideBar;
