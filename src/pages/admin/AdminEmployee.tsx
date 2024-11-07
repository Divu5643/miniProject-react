import { Button, Tab, Tabs, TextField } from "@mui/material";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import { RootState } from "../../redux/store/store";
import React, { useEffect } from "react";
import Axios from "../../axios/config";
import "../../assets/css/AdminEmployee.css";
import { useDispatch, useSelector } from "react-redux";
import { setTitle } from "../../redux/slice/userSlice";
import { Iuser } from "../../utils/Interfaces/Iuser";
import { useNavigate } from "react-router-dom";
import TableSkeletonLoading from "../../component/common/TableSkeletonLoading";
import NoData from "../../component/common/NoData";
import EmployeeTable from "../../component/admin/EmployeeTable";

const AdminEmployee :React.FC= () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUserList = useSelector((state: RootState) => state.userList);


  const [filterList, setFilterList] = React.useState<Iuser[]>([]);
  const [isLoading, setIsLoading] = React.useState<Boolean>(true);
  const [totalCount, setTotalCount] = React.useState(0);

  const [filterAndSearch, setFilterAndSearch] = React.useState({
    RowCount: 5,
    PageNumber: 0,
    RoleId: 1,
    Search: "",
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setFilterAndSearch({ ...filterAndSearch, RoleId: newValue,PageNumber:0 });
  };
  useEffect(() => {
    dispatch(setTitle("Employees"));
    loadData();
    setIsLoading(false);
  }, []);

  const loadData = () => {
    Axios.post("/user/getRowsForSearchAndPagination", filterAndSearch)
      .then((response) => {
        setFilterList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    Axios.post(`/user/getTotalCount`,filterAndSearch)
      .then((response) => {
        setTotalCount(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // for loading changing data
  useEffect(() => {
    const logData = setTimeout(() => {
      loadData();
    }, 400);
    return () => clearTimeout(logData);
  }, [filterAndSearch]);

  return (
    <>
      <div className="page-content">
        <div className="tabs">
          <Tabs
            value={filterAndSearch.RoleId}
            onChange={handleTabChange}
            aria-label="basic tabs example"
          >
            <Tab value={1} label="All Users" />
            <Tab value={2} label="Managers" />
            <Tab value={3} label="Employees" />
          </Tabs>
          <div className="search-container">
            <TextField
              label="Search"
              variant="standard"
              fullWidth={true}
              value={filterAndSearch.Search}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFilterAndSearch({
                  ...filterAndSearch,
                  Search: event.target.value,
                  PageNumber:0
                });
              }}
            />
          </div>

          <Button
            variant="outlined"
            startIcon={<PersonAddAltRoundedIcon />}
            size="small"
            onClick={() => {
              navigate("/admin/addEmployee");
            }}
          >
            Add Employee
          </Button>
        </div>

        <div className="table-container">
          {isLoading ? (
            <TableSkeletonLoading column={4} />
          ) : filterList.length == 0 ? (
            <NoData />
          ) : (
            <EmployeeTable
              userList={filterList}
              changeUserList={setFilterList}
              totalCount={totalCount}
              
              filterAndSearch={filterAndSearch}
              setFilterAndSearch={setFilterAndSearch}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AdminEmployee;
