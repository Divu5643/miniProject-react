import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useNavigate } from "react-router-dom";

export const SideBar = ({ navItemList,ChildComponent=()=>{return <></>}  }: { navItemList: any[],ChildComponent:React.FC }) => {
  const [open, setOpen] = React.useState(true);
  return (
    <>
      <div className="sidebar" style={{ width: open ? "250px" : "80px", transition:"1s"}}>
        <div className="sidebar-header">
          <h4 style={{ display: open ? "inline" : "none" }}>Welcome</h4>
          <button
            className="sidebar-header-btn"
            onClick={() => {
              setOpen(!open);
            }}
          >
            {open ? <MenuIcon />:<MenuOpenIcon />}
            
          </button>
        </div>
        <div className="sidebar-nav">
          {navItemList.map((listItem, index) => (
            <ListItem key={index} listItem={listItem} isopen={open} />
          ))}
        </div>
      </div>
      <div style={{marginLeft: open ? "250px" : "80px", transition:"1s"}} >
          <ChildComponent />
      </div>
    </>
  );
};

const ListItem = ({ listItem, isopen }: { listItem: any; isopen: boolean }) => {
  const navigate = useNavigate();
  return (
    <div
      className="sidebar-item"
      onClick={() => {
        navigate(listItem.navLink);
      }}
      style={{ justifyContent: isopen ? "start" : "center" }}
    >
      <div className="sidebar-item-icon">{listItem.navIcon}</div>
      {isopen && <div className="sidebar-item-name">{listItem.navName}</div>}
    </div>
  );
};

export default SideBar;
