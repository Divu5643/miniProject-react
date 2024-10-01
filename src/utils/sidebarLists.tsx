import { Dashboard } from "@mui/icons-material";
import BadgeIcon from '@mui/icons-material/Badge';
import FlagIcon from '@mui/icons-material/Flag';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

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
export { AdminList,EmployeeList };
