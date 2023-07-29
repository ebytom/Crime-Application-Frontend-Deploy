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

import Footer from "examples/Footer";

import DataTable from "examples/Tables/DataTable";
import CriminalData from "./data/criminals";
import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import AddCriminal from "layouts/AddCriminalForm/addCriminal";
import Slide from "@mui/material/Slide";
import './criminaltablesidebar.css'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CriminalsTable() {
  const { columns, rows } = CriminalData();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

//SIDENAV FUNCTION
function openNav() {
  document.getElementById("mySidenav").style.width = "400px";
}
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

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
                  Criminals List
                </MDTypography>
                <div style={{ float: "right", marginTop: "-30px" }}>
                  <Button onClick={handleClickOpen}
                    style={{ color: "black", backgroundColor: "white" }}
                  >
                    Add New Criminal
                    {/* {popupshow && <CrimeDilog/>} */}
                  </Button>
                </div>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
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
          <AddCriminal />
        </Dialog>
      </div>

      <div id="mySidenav" className="sidenav">
        <a  className="closebtn" onClick={closeNav}>&times;</a>
        {/* <!-- 		  <a href="#">ITEM 1</a>
		  <a href="#">ITEM 2</a>
		  <a href="#">ITEM 3</a>
		  <a href="#">ITEM 4</a> --> */}
      </div>

      {/* <!-- Use any element to open the sidenav --> */}
      <span onClick={openNav} style={{cursor: 'pointer', background: 'skyblue', color:'white',padding:' 5px'}}>SIDENAV.</span>
      {/* <!-- Add all page content inside this div if you want the side nav to push page content to the right (not used if you only want the sidenav to sit on top of the page --> */}
      <div id="main">
       
      </div>
    </DashboardLayout>
  );
}

export default CriminalsTable;
