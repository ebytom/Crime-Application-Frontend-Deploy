/* eslint-disable prettier/prettier */
// @mui material components
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import CrimeData from "./data";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CrimeForm from "../AddCrimeForm/addCrime";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
// Material Dashboard 2 React Examples
import DataTable from "examples/Tables/DataTable";
import { Axios } from "Config/Axios/Axios";
import CircularProgress from "@mui/material/CircularProgress";
import './crimetable.css'
import "../CriminalTable/criminaltablesidebar.css"
import SearchBar from '@mkyy/mui-search-bar';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CrimeTable() {
  // const { columns, rows } = CrimeData();
  const [loading, setLoading] = useState(false);

  //SEARCH BAR STATES
  const [textFieldValue, setTextFieldValue] = useState("");


  //SIDEBAR FUNCTIONS
  const [selectKey, setSelectedKey] = useState(null);

  console.log(selectKey)

  const handleShowDetails = (key) => {
    document.getElementById("mySidenav").style.width = "400px";
    setSelectedKey(key);
  };

  function openNav() {
    document.getElementById("mySidenav").style.width = "400px";
  }
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [crimes, setCrimes] = useState([]);

  useEffect(() => {
    setLoading(true); // Start loading
    Axios.get("/api/v1/app/crime/getAll")
      .then((res) => {
        setCrimes(res.data.crimes);
        console.log(res);
        setLoading(false); // Data loaded, set loading to false

      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Data loaded, set loading to false

      });
  }, []);


  const handleSearch = labelOptionValue => {
    //...
    console.log(labelOptionValue);
  };



  // const rows = crimes.reverse().map((crime) => ({
  //   id: crime.caseId,
  //   type: crime.incidentDetails,
  //   status: crime.status,
  //   age: crime.victim.age,
  //   date: crime.date.split("T")[0],
  //   option: (
  //     <Button className="viewmore" 
  //     onClick={() => handleShowDetails(crime)}
  //     style={{backgroundColor:'#4CAF50',color:'white',height:'10px',width:'80px',borderRadius:'20px'}}
  //     >
  //       View
  //     </Button>
  //   ),
  // }));

  const rows = crimes.reverse().filter((crime) => {
    const crimeIdAsString = crime?.caseId?.toString(); // Convert crimeId to a string
    return crimeIdAsString.includes(textFieldValue);
  }).map((crime) => ({
    id: crime.caseId,
    type: crime.incidentDetails,
    status: crime.status,
    age: crime.victim.age,
    date: crime?.date?.split("T")[0],
    option: (
      <Button className="viewmore"
        onClick={() => handleShowDetails(crime)}
        style={{ backgroundColor: '#4CAF50', color: 'white', height: '10px', width: '80px', borderRadius: '20px' }}
      >
        View
      </Button>
    ),
  }));

  //SEARCH BAR FUNCTION





  return (
    <DashboardLayout>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Crime List
                  {/* ✅ SEARCH BAR */}
                </MDTypography>

                <div style={{ float: "right", marginTop: "-30px" }}>
                  <Button
                    onClick={handleClickOpen}
                    style={{ color: "black", backgroundColor: "white" }}
                  >
                    Add New Crime
                    {/* {popupshow && <CrimeDilog/>} */}
                  </Button>
                </div>
                &nbsp; &nbsp; &nbsp;
                <div style={{ paddingLeft: '300px', float: "right", marginTop: "-30px" }}>
                  <SearchBar
                    value={textFieldValue}
                    onChange={newValue => setTextFieldValue(newValue)}
                    onSearch={handleSearch}
                    className="searchbar"
                  />
                </div>
              </MDBox>
              <MDBox pt={3}>
                {loading ? (
                  <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
                    <CircularProgress color="secondary" />
                  </div>
                ) : (
                  <DataTable
                    table={{
                      columns: [
                        { Header: "Case ID", accessor: "id", width: "15%" },
                        { Header: "Type", accessor: "type", width: "15%" },
                        { Header: "Status", accessor: "status", width: "15%" },
                        { Header: "Date", accessor: "date", width: "15%" },
                        // { Header: "Viewmore", accessor: "EDIT", width: "12%" },
                        { Header: "Option", accessor: "option", width: "15%" },
                      ],
                      rows: rows,
                    }}
                  />
                )}
                {/* <CollapsibleTable/> */}
                {/* <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                /> */}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      <div>
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              {/* <Button autoFocus color="inherit" onClick={handleClose}>
              
            </Button> */}
            </Toolbar>
          </AppBar>
          <br />
          <CrimeForm />
        </Dialog>

      </div>
      {/* SIDEBAR */}
      <div
        id="mySidenav"
        className="sidenav"
      >

        <a className="closebtn" onClick={closeNav}>
          &times;
        </a>
        <h3 id="fulld">{selectKey?.caseId} | {selectKey?.incidentDetails}</h3>
        <Divider />
        <div className="detailsz">
          <p id="labz">Crime Details</p>
          <hr style={{ height: '8px', color: "transparent", backgroundColor: "transparent", border: "none" }} />
          <p id="info">Arrested On : {selectKey?.date.split("T")[0]}</p>
          <hr style={{ height: '8px', color: "transparent", backgroundColor: "transparent", border: "none" }} />
          <p id="info">Location : {selectKey?.location}</p>
          <hr style={{ height: '8px', color: "transparent", backgroundColor: "transparent", border: "none" }} />
          <p id="info">Status : {selectKey?.status}</p>
          <hr style={{ height: '8px', color: "transparent", backgroundColor: "transparent", border: "none" }} />
          <p id="info">Incident Details : {selectKey?.incidentDetails}</p>
          <hr style={{ height: '8px', color: "transparent", backgroundColor: "transparent", border: "none" }} />
          <p id="info">Gender : {selectKey?.gender}</p>
          <hr style={{ height: '8px', color: "transparent", backgroundColor: "transparent", border: "none" }} />
          <p id="info">Suspect : {selectKey?.suspect}</p>
          <hr style={{ height: '8px', color: "transparent", backgroundColor: "transparent", border: "none" }} />
          <p id="info">Type : {selectKey?.type}</p>
          <hr style={{ height: '8px', color: "transparent", backgroundColor: "transparent", border: "none" }} />
          <Divider />
          <p id="labz">Victim Details</p>
          <p id="info">Name : {selectKey?.victim.name}</p>
          <hr style={{ height: '8px', color: "transparent", backgroundColor: "transparent", border: "none" }} />
          <p id="info">Age : {selectKey?.victim.age}</p>
          <hr style={{ height: '8px', color: "transparent", backgroundColor: "transparent", border: "none" }} />
          <p id="info">Address : {selectKey?.victim.address}</p>
          <hr style={{ height: '8px', color: "transparent", backgroundColor: "transparent", border: "none" }} />
          <Divider />
          <p id="labz">Witness Details</p>
          <p id="info">Name : {selectKey?.witness.name}</p>
          <hr style={{ height: '8px', color: "transparent", backgroundColor: "transparent", border: "none" }} />
          <p id="info">Contact : {selectKey?.witness.contact}</p>
          <hr style={{ height: '8px', color: "transparent", backgroundColor: "transparent", border: "none" }} />
          <p id="info">Statement : {selectKey?.witness.statement}</p>
          <Divider />
          <p id="labz">Police Report</p>
          <p id="info">Report : {selectKey?.policeReport.details}</p>
          <Divider />

          <p id="labz">Media Report</p>
          <p id="info">Report : {selectKey?.mediaReport.details}</p>
          <br />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CrimeTable;
