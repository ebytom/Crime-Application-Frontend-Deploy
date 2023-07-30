/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import MDInput from "components/MDInput";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import { Card, Grid } from "@mui/material";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import DoneIcon from '@mui/icons-material/Done';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import LoopIcon from '@mui/icons-material/Loop';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Axios } from "Config/Axios/Axios";
import './selectpopup.css';
import $ from 'jquery';
import DataTable from "examples/Tables/DataTable";
import CircularProgress from "@mui/material/CircularProgress";
import AddCriminal from "layouts/AddCriminalForm/addCriminal";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AddCrime() {


  //✅ SELECT CRIMINAL POPUP CONTENT
  const [loading, setLoading] = useState(false);
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


  const rows = crimes.map((crime) => ({
    id: crime.caseId,
    type: crime.incidentDetails,
    status: crime.status,
    age: crime.victim.age,
    date: crime.date.split("T")[0],
    option: (
      <Button className="viewmore"
        onClick={() => handleShowDetails(crime)}
        style={{ backgroundColor: '#4CAF50', color: 'white', height: '10px', width: '80px', borderRadius: '20px' }}
      >
        Select
      </Button>
    ),
  }));

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //✅ BACKEND
  const [crimeData, setCrimeData] = useState({
    caseId: "",
    incidentDetails: "",
    date: "",
    location: "",
    type: "",
    status: "",
    victim: {
      name: "",
      age: "",
      gender: "",
      address: ""
    },
    suspect: "",
    witness: {
      name: "",
      contact: "",
      statement: "",
    },
    policeReport: {
      details: "",
      filename: ""
    },
    mediaReport: {
      details: "",
      filename: ""
    }
  })

  const [loader, setLoader] = useState(false)

  const [policeReportFile, setPoliceReportFile] = useState(null)
  const [mediaReportFile, setMediaReportFile] = useState(null)

  const submitFunction = async () => {
    setLoader(true)
    var filename = ""
    var data = crimeData

    data = {
      ...data,
      stringDate: crimeData.date?.split("T")[0].split("-").reverse().join("-")
    }

    if (policeReportFile != null) {
      filename = await uploadFile(policeReportFile, "policeReport")
      data = {
        ...data,
        policeReport: {
          details: crimeData.policeReport.details,
          filename: filename
        }
      }
    }

    if (mediaReportFile != null) {
      filename = await uploadFile(mediaReportFile, "mediaReport")
      data = {
        ...data,
        mediaReport: {
          details: crimeData.mediaReport.details,
          filename: filename
        }
      }
    }



    Axios.post('/api/v1/app/crime/add', data)
      .then((res) => {
        console.log(res);
        setLoader(false)
        window.location.reload();

      })
      .catch(err => {
        console.log(err);
        setLoader(false)
      })
  }


  const uploadFile = async (fileData, folder) => {
    // e.preventDefault();

    const formData = new FormData();
    formData.append('file', fileData);

    const file = await Axios.post(`/api/v1/app/file/add?location=${folder}`, formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log("filename : ", response.data);
        return response.data
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      })
    return file
  }

  //SELECT CRIMINAL FILE
  $("#selectcriminal").on('click', function () {
    $(".custom-model-main").addClass('model-open');
  });
  $(".close-btn, .bg-overlay").click(function () {
    $(".custom-model-main").removeClass('model-open');
  });




  return (
    // <DashboardLayout>
    //   <DashboardNavbar />
    //   <MDBox pt={6} pb={3}>
    //     <Grid container spacing={10}>
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
            <br />
            {/* ✅ CASE DETAILS */}
            <label id="labmain" style={{ color: 'black', textAlign: 'center', fontSize: '18px' }}>Case Details :</label>

            <MDInput label="ID" size="large" style={{ width: '600px', height: '50px', justifyContent: 'center', alignSelf: 'center' }}
              onChange={e => setCrimeData(pre => ({
                ...pre,
                caseId: e.target.value,
              }))}
            />
            <br />
            <MDInput label="Incident Details" style={{ width: '600px', justifyContent: 'center', alignSelf: 'center' }} multiline rows={5}
              onChange={e => setCrimeData(pre => ({
                ...pre,
                incidentDetails: e.target.value,
              }))}
            />
            <br />
            <MDInput type="date" size="large" style={{ width: '600px', height: '50px', justifyContent: 'center', alignSelf: 'center' }}
              onChange={e => setCrimeData(pre => ({
                ...pre,
                date: e.target.value,
              }))}
            />
            <br />
            <MDInput size="large" type="time" style={{ width: '600px', height: '50px', justifyContent: 'center', alignSelf: 'center' }}
              onChange={e => setCrimeData(pre => ({
                ...pre,
                time: e.target.value,
              }))} />
            <br />
            <MDInput label="Crime Type" size="large" style={{ width: '600px', height: '50px', justifyContent: 'center', alignSelf: 'center' }}
              onChange={e => setCrimeData(pre => ({
                ...pre,
                type: e.target.value,
              }))} />
            <br />
            <MDInput label="Location" style={{ width: '600px', height: '50px', justifyContent: 'center', alignSelf: 'center' }}
              onChange={e => setCrimeData(pre => ({
                ...pre,
                location: e.target.value,
              }))} />
            <br />
            {/* <MDInput label="Status" style={{ width: '600px', height: '50px', justifyContent: 'center', alignSelf: 'center' }} />
                  <br /> */}

            {/* <div style={{justifyContent:'center', display: 'inline-flex',selfAlign:'center'}}>
                    <MDButton  variant="outlined" color="error"><Icon><PriorityHighIcon/></Icon>&nbsp;OPEN</MDButton> &nbsp;
                    <MDButton  variant="outlined" color="warning"><Icon><LoopIcon/></Icon>&nbsp;INPROGRESS</MDButton>&nbsp;
                    <MDButton  variant="outlined" color="success"><DoneIcon/><Icon></Icon>&nbsp;CLOSED</MDButton>&nbsp;
                  </div> */}
            {/* ✅ STATUS */}
            <InputLabel style={{ width: '600px', height: '20px', justifyContent: 'center', alignSelf: 'center' }}>Case Status</InputLabel>
            <Select placeholder="Select current status" style={{ width: '600px', height: '50px', justifyContent: 'center', alignSelf: 'center' }}
              onChange={e => setCrimeData(pre => ({
                ...pre,
                status: e.target.value,
              }))}>
              <MenuItem style={{ background: 'red', color: 'white' }} value="Open">Open</MenuItem>
              <hr style={{ height: '10px', color: 'transparent', border: 'none', outline: 'none' }} />
              <MenuItem style={{ background: 'orange', color: 'white' }} value="Inprogress">Inprogress</MenuItem>
              <hr style={{ height: '10px', color: 'transparent', border: 'none', outline: 'none' }} />
              <MenuItem style={{ background: 'green', color: 'white' }} value="Closed">Closed</MenuItem>
            </Select>

            <br />
            <Divider />
            {/* ✅ VICTIMS DETAILS */}
            <label id="labmain" style={{ color: 'black', textAlign: 'center', fontSize: '18px' }}>Victims Information : </label>
            <MDInput label="Name" size="large" style={{ width: '600px', height: '50px', justifyContent: 'center', alignSelf: 'center' }}
              onChange={e => setCrimeData(pre => ({
                ...pre,
                victim: {
                  name: e.target.value,
                  age: crimeData.victim.age,
                  address: crimeData.victim.address,
                }
              }))}
            />
            <br />
            <MDInput label="Address" style={{ width: '600px', justifyContent: 'center', alignSelf: 'center' }} multiline rows={5} onChange={e => setCrimeData(pre => ({
              ...pre,
              victim: {
                name: e.target.value,
                age: crimeData.victim.age,
                address: crimeData.victim.address,
              }
            }))} />
            <br />
            <MDInput label="Age" size="large" style={{ width: '600px', height: '50px', justifyContent: 'center', alignSelf: 'center' }}
              onChange={e => setCrimeData(pre => ({
                ...pre,
                victim: {
                  name: e.target.value,
                  age: crimeData.victim.age,
                  address: crimeData.victim.address,
                }
              }))}
            />
            <br />
            <Divider />
            {/* ✅ SUSPECT DETAILS */}
            <label id="labmain" style={{ color: 'black', textAlign: 'center', fontSize: '18px' }}>Suspect Information : </label>
            <hr style={{ height: '10px', color: 'transparent', border: 'none', outline: 'none' }} />
            <div style={{ display: 'inline-flex', justifyContent: 'center' }}>
              <Button id="selectcriminal" variant="contained" size="medium" style={{ color: 'white', width: '200px', height: '50px', fontSize: '16px', justifyContent: 'center', alignSelf: 'center' }} >Select</Button>&nbsp;&nbsp;
              <Button onClick={handleClickOpen} variant="outlined" color="success" size="medium" style={{ backgroundColor: '#4CAF50', color: 'white', width: '200px', height: '50px', fontSize: '16px', justifyContent: 'center', alignSelf: 'center' }}>Add New</Button>
            </div>
            <br />
            <Divider />
            {/* ✅ WITHNESS DETAILS */}
            <label id="labmain" style={{ color: 'black', textAlign: 'center', fontSize: '18px' }}> Witness Details : </label>
            <hr style={{ height: '10px', color: 'transparent', border: 'none', outline: 'none' }} />

            <MDInput label="Name" size="large" style={{ width: '600px', height: '50px', justifyContent: 'center', alignSelf: 'center' }}
              onChange={e => setCrimeData(pre => ({
                ...pre,
                witness: {
                  name: e.target.value,
                  contact: crimeData.witness.contact,
                  statement: crimeData.witness.statement,
                }
              }))} />
            <br />
            <MDInput label="Statement" style={{ width: '600px', justifyContent: 'center', alignSelf: 'center' }} multiline rows={5} onChange={e => setCrimeData(pre => ({
              ...pre,
              witness: {
                name: e.target.value,
                contact: crimeData.witness.contact,
                statement: crimeData.witness.statement,
              }
            }))} />
            <br />
            <MDInput label="Mobile NUmber" size="large" style={{ width: '600px', height: '50px', justifyContent: 'center', alignSelf: 'center' }}
              onChange={e => setCrimeData(pre => ({
                ...pre,
                witness: {
                  name: e.target.value,
                  contact: crimeData.witness.contact,
                  statement: crimeData.witness.statement,
                }
              }))} />
            <br />
            <Divider />
            {/* ✅ POLICE REPORT */}
            <label id="labmain" style={{ color: 'black', textAlign: 'center', fontSize: '18px' }}> Police Report : </label>
            <hr style={{ height: '10px', color: 'transparent', border: 'none', outline: 'none' }} />

            <MDInput label="Report" style={{ width: '600px', justifyContent: 'center', alignSelf: 'center' }} multiline rows={5}
              onChange={e => setCrimeData(pre => ({
                ...pre,
                policeReport: {
                  details: e.target.value,
                  filename: crimeData.policeReport.filename
                }
              }))} />
            <br />

            {/* ✅ MEDIA REPORT */}
            <label id="labmain" style={{ color: 'black', textAlign: 'center', fontSize: '18px' }}> Media Reports : </label>
            <hr style={{ height: '10px', color: 'transparent', border: 'none', outline: 'none' }} />

            <MDInput label="Report" style={{ width: '600px', justifyContent: 'center', alignSelf: 'center' }} multiline rows={5}
              onChange={e => setCrimeData(pre => ({
                ...pre,
                mediaReport: {
                  details: e.target.value,
                  filename: crimeData.mediaReport.filename
                }
              }))} />
            <br />
            {/* ✅ SUBMIT BUTTON - END */}
            <Button onClick={submitFunction} variant="contained" size="medium" style={{ color: 'white', width: '600px', height: '50px', fontSize: '16px', justifyContent: 'center', alignSelf: 'center' }} >Sumbit</Button>
            <br />
          </Card>
        </MDBox>
      </Card>
      <div className="custom-model-main">
        <div className="custom-model-inner">
          <div className="close-btn">×</div>
          <div className="custom-model-wrap">
            <div className="pop-up-content-wrap">
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
            </div>
          </div>
        </div>
        <div className="bg-overlay"></div>
      </div>
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
    </Grid>
    //     </Grid>
    //   </MDBox>
    // </DashboardLayout>
  );
}

export default AddCrime;
