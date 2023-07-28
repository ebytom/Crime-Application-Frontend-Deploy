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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CrimeTable() {
  // const { columns, rows } = CrimeData();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [crimes, setCrimes] = useState([]);

  useEffect(() => {
    Axios.get("/api/v1/app/crime/getAll")
      .then((res) => {
        setCrimes(res.data.crimes);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const rows = crimes.map((crime) => ({
    id: crime.caseId,
    type: crime.incidentDetails,
    status: crime.status,
    age: crime.victim.age,
    date: crime.date,
  }));

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
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{
                    columns: [
                      { Header: "Case ID", accessor: "id", width: "15%" },
                      { Header: "Type", accessor: "type", width: "15%" },
                      { Header: "Status", accessor: "status", width: "15%" },
                      { Header: "Date", accessor: "date", width: "15%" },
                      // { Header: "Viewmore", accessor: "EDIT", width: "12%" },
                      { Header: "Option", accessor: "Edit", width: "15%" },
                    ],
                    rows: rows,
                  }}
                />
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

      {/*✅ ADD CRIME //POPUP */}
      {/* <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           <CrimeForm/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button> */}
      {/* </DialogActions> */}
      {/* </Dialog> */}
    </DashboardLayout>
  );
}

export default CrimeTable;
