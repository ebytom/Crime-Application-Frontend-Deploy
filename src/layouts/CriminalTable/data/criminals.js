/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components
import React, { useState, useEffect } from "react";
import { ReactDOM } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { Axios } from "Config/Axios/Axios";
// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import "../criminaltablesidebar.css";
import $ from 'jquery'

export default function CriminalData() {
  const [criminals, setCriminals] = useState([]);
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
  // SIDE NAV

  {
    /* <!-- Use any element to open the sidenav --> */
  }
  // <span onClick={openNav} >SIDENAV.</span>
  {
    /* <!-- Add all page content inside this div if you want the side nav to push page content to the right (not used if you only want the sidenav to sit on top of the page --> */
  }
  // <div id="main">

  // </div>

  const Name = ({ image, name, id }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{id}</MDTypography>
      </MDBox>

      {/* SIDEBAR */}
      <div
        id="mySidenav"
        className="sidenav"
      >
        <a className="closebtn" onClick={closeNav}>
          &times;
        </a>
        <h3>Full Details</h3>
        <p>Name: {selectKey?.name}</p>
        <p>Gender: {selectKey?.gender}</p>
        {/* <p>Age: {new Date().getFullYear() - new Date(setCriminals?.dob)?.getFullYear()}</p>
      <p>Status: {setCriminals.probationStatus}</p> */}
        {/* Add other properties as needed */}
      </div>;

    </MDBox>
  );

  const Crime = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      {/* <MDTypography variant="caption">{description}</MDTypography> */}
    </MDBox>
  );

  useEffect(() => {
    Axios.get("/api/v1/app/criminal/getAll")
      .then((res) => {
        setCriminals(res.data.criminals);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const rows = criminals.map((criminal) => {
    return {
      name: (
        <Name
          image={
            criminal?.criminalPhotoFileName
              ? criminal.criminalPhotoFileName
              : "https://www.svgrepo.com/download/295402/user-profile.svg"
          }
          name={criminal.name}
          id={criminal.criminalId}
        />
      ),
      gender: <Crime title="male" />,
      age: (
        <Crime title={new Date().getFullYear() - new Date(criminal?.dob)?.getFullYear()} />
        // <MDBox ml={-1}>
        //   <Name badgeContent={new Date().getFullYear()- new Date(criminal?.dob)?.getFullYear()}  />
        //   {/* <MDBadge title="hello" badgeContent={new Date().getFullYear()- new Date(criminal?.dob)?.getFullYear()} color="error" variant="gradient" size="sm" /> */}
        // </MDBox>
      ),
      status: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {criminal.probationStatus}
        </MDTypography>
      ),
      action: (
        <MDTypography
          onClick={() => handleShowDetails(criminal)}
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          View
        </MDTypography>
      ),
    };
  });

  return {
    columns: [
      { Header: "Name", accessor: "name", width: "20%", align: "left" },
      { Header: " Gender", accessor: "gender", align: "left" },
      { Header: "Age", accessor: "age", align: "left" },
      { Header: "Status", accessor: "status", align: "left" },
      { Header: "Action", accessor: "action", align: "left" },
    ],
    rows: rows,
  };
}
