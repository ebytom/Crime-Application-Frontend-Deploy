/* eslint-disable prettier/prettier */
import React from "react";
import MDInput from "components/MDInput";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import { Card, Grid } from "@mui/material";
import MDTypography from "components/MDTypography";

function AddCrime() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={10}>
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
                  Add New Crime
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <Card>
                  <MDInput label="ID" size="large" style={{ width: '600px', height: '50px' , justifyContent:'center',alignSelf:'center' }}/>
                  <br/>
                  <MDInput label="Incident Details" style={{ width: '600px', justifyContent:'center',alignSelf:'center' }} multiline rows={5} />
                  <br/>
                  <MDInput type="date" size="large" style={{ width: '600px', height: '50px' , justifyContent:'center',alignSelf:'center' }}/>
                  <br/>
                  <MDInput size="large" type="time" style={{ width: '600px', height: '50px' , justifyContent:'center',alignSelf:'center' }}/>
                  <br/>
                  <MDInput label="Crime Type" size="large" style={{ width: '600px', height: '50px' , justifyContent:'center',alignSelf:'center' }}/>
                  <br/>
                  <MDInput label="Status" style={{ width: '600px', height: '50px' , justifyContent:'center',alignSelf:'center' }}/>
                  <br/>
                </Card>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default AddCrime;
