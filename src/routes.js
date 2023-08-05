import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import CriminalsTable from "layouts/CriminalTable/criminalsTable";
import AddCrime from "layouts/AddCrimeForm/addCrime";
import CrimeTable from "layouts/CrimeTable/CrimeTable";
import Signin from "layouts/SignIn/signin";

// @mui icons
//TO GET ICONS FROM MATERIALICONS
import Icon from "@mui/material/Icon";

// import  from '@mui/icons-material/ClearAllOutlined';

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Crimes",
    key: "crimes",
    icon: <Icon fontSize="medium">insert_chart</Icon>,
    route: "/crimes",
    component: <CrimeTable />,
  },

  // {
  //   type: "collapse",
  //   name: "Crimes",
  //   key: "profile",
  //   icon: <Icon fontSize="small">insert_chart</Icon>,
  //   route: "/crime-list",
  //   component: <CrimeTable />,
  // },

  // {
  //   type: "collapse",
  //   name: "Criminals",
  //   key: "criminals",
  //   icon: <Icon fontSize="medium">clear_all</Icon>,
  //   route: "/criminal-list",
  //   component: <CriminalsTable />,
  // },
  // {
  //   type: "collapse",
  //   name: "Add New Crime",
  //   key: "tables",
  //   icon: <Icon fontSize="medium">add</Icon>,
  //   route: "/add-crime",
  //   component: <AddCrime />,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  {
    type: "collapse",
    name: "Criminals",
    key: "criminals",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/criminals",
    component: <CriminalsTable />,
  },
  {
    type: "",
    key: "signin",
    route: "/signin",
    component: <Signin />,
  },
  // {
  //   type: "collapse",
  //   name: "Sign In",
  //   key: "sign-in",
  //   icon: <Icon fontSize="small">login</Icon>,
  //   route: "/authentication/sign-in",
  //   component: <SignIn />,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/authentication/sign-up",
  //   component: <SignUp />,
  // },
];

export default routes;
