import { Dashboard } from "@mui/icons-material";
import BadgeIcon from '@mui/icons-material/Badge';
import FlagIcon from '@mui/icons-material/Flag';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GradingRoundedIcon from '@mui/icons-material/GradingRounded';

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
    navIcon: <GradingRoundedIcon />,
    navLink: "/admin/performance",
  },
  // {
  //   navName: "Profile",
  //   navIcon: <AccountCircleIcon />,
  //   navLink: "/admin/selfProfile",
  // },
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
  // {
  //   navName: "Profile",
  //   navIcon: <AccountCircleIcon />,
  //   navLink: "/employee/selfProfile",
  // },
];
const ReviewerList = [
  {
    navName: "Dashboard",
    navIcon: <Dashboard />,
    navLink: "/manager",
  },
  {
    navName: "Employees",
    navIcon: <BadgeIcon />,
    navLink: "/manager/employees",
  },
  {
    navName: "Goals",
    navIcon: <FlagIcon />,
    navLink: "/manager/goal",
  },
  {
    navName: "Reviews",
    navIcon: <GradingRoundedIcon />,
    navLink: "/manager/performance",
  },
  // {
  //   navName: "Profile",
  //   navIcon: <AccountCircleIcon />,
  //   navLink: "/manager/Selfprofile",
  // },
];
export { AdminList,EmployeeList,ReviewerList };
