/* eslint-disable prettier/prettier */
// @mui material components
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DataTable from "examples/Tables/DataTable";
import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import AddCriminal from "layouts/AddCriminalForm/addCriminal";
import Slide from "@mui/material/Slide";
import "./criminaltablesidebar.css";
import SearchBar from '@mkyy/mui-search-bar';
import useCriminalData from "./data/criminals"; // Import the custom hook

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CriminalsTable() {
  // State for the criminal data
  const { columns, rows } = useCriminalData();

  const [open, setOpen] = React.useState(false);

  const [textFieldValue, setTextFieldValue] = useState("");


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = () => {
    if (textFieldValue.trim() === "") {
      setFilteredRows(rows);
    } else {
      const filteredData = rows.filter(row => {
        return (
          row.name.props.children?.toLowerCase().includes(textFieldValue.toLowerCase()) ||
          row.criminalId.props.children?.toLowerCase().includes(textFieldValue.toLowerCase())
        );
      });
      setFilteredRows(filteredData);
    }
  };

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

                <div style={{ paddingRight:'20px', float: "right", marginTop: "-30px" }}>
                  <SearchBar 
                    value={textFieldValue}
                    onChange={newValue => setTextFieldValue(newValue)}
                    onSearch={handleSearch}
                    className="searchbar"
                  />
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
            </Toolbar>
          </AppBar>
          <br />
          <AddCriminal />
        </Dialog>
      </div>
    </DashboardLayout>
  );
}

export default CriminalsTable;
