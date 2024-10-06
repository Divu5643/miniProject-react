import { Dashboard } from "@mui/icons-material";
import BadgeIcon from '@mui/icons-material/Badge';
import FlagIcon from '@mui/icons-material/Flag';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const AdminList = [
  {
    navName: "Dashboard",
    navIcon: <Dashboard />,
    navLink: "/admin",
  },
  {
    navName: "Employees",
    navIcon: <BadgeIcon />,
    navLink: "/admin/employees",
  },
  {
    navName: "Goals",
    navIcon: <FlagIcon />,
    navLink: "/admin/goal",
  },
  {
    navName: "Performance",
    navIcon: <ThumbUpIcon />,
    navLink: "/admin/performance",
  },
];
const EmployeeList = [
  {
    navName: "Dashboard",
    navIcon: <Dashboard />,
    navLink: "/employee",
  },
  {
    navName: "Self Assesment",
    navIcon: <BadgeIcon />,
    navLink: "/employee/selfAssesment",
  },
  {
    navName: "Goals",
    navIcon: <FlagIcon />,
    navLink: "/employee/goal",
  },
  {
    navName: "Profile",
    navIcon: <AccountCircleIcon />,
    navLink: "/employee/profile",
  },
];
export { AdminList,EmployeeList };
