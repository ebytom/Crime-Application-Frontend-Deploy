/* eslint-disable prettier/prettier */
import React, { useState } from "react";
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

function AddCriminal() {

    //✅ BACKEND
    const [criminalData, setCriminalData] = useState({
        name: "",
        dob: null,
        address: "",
        physicalCharacteristics: {
            height: "",
            weight: "",
        },
        crimeDetails: "",
        arrestedOn: null,
        courtInformation: "",
        probationStatus: "",
        criminalPhotoFileName: ""
    })

    const [criminalPhoto, setCriminalPhoto] = useState("")
    const [fileErr, setFileErr] = useState("")
    const [loader, setLoader] = useState(false)

    const Success = () => toast.success('Successfully Posted');

    const submitFunction = async () => {
        setLoader(true)
        var filename = ""
        var data = criminalData
        if (criminalPhoto != null) {
            // filename = await convertImg()
            data = {
                ...data,
                criminalPhotoFileName: criminalPhoto
            }
            console.log(data);
        }

        Axios.post('/api/v1/app/criminal/add', data)
            .then((res) => {
                console.log(res);
                setLoader(false)
                Success()
            })
            .catch(err => {
                console.log(err);
                setLoader(false)
            })
    }

    const uploadPhoto = async () => {
        // e.preventDefault();

        const formData = new FormData();
        formData.append('file', criminalPhoto);

        const file = await Axios.post('/api/v1/app/file/add?location=criminalPhoto', formData, {
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

    const convertToBase64 = (file) => {
        const maxSize = 50 * 1024;

        return new Promise((resolve, reject) => {
            if (file.size > maxSize) {
                setFileErr("File size should be less than 50KB")
                return;
            }

            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
                console.log(error)
            };
        });
    };


    const handleFileUpload = async (e) => {
        setFileErr("")
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setCriminalPhoto(base64);
    };


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
                        Add New Criminal
                    </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                    <Card>
                        <br />
                        {/* ✅ CASE DETAILS */}
                        <label id="labmain" style={{ color: 'black', textAlign: 'center', fontSize: '18px' }}>Criminal Details :</label>

                        <MDInput label="Name" size="large" style={{ width: '600px', height: '50px', justifyContent: 'center', alignSelf: 'center' }}
                            onChange={e => setCrimeData(pre => ({
                                ...pre,
                                name: e.target.value,
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
                            <MenuItem style={{ background: 'red', color: 'white' }} value={1}>Open</MenuItem>
                            <hr style={{ height: '10px', color: 'transparent', border: 'none', outline: 'none' }} />
                            <MenuItem style={{ background: 'orange', color: 'white' }} value={2}>Inprogress</MenuItem>
                            <hr style={{ height: '10px', color: 'transparent', border: 'none', outline: 'none' }} />
                            <MenuItem style={{ background: 'green', color: 'white' }} value={3}>Closed</MenuItem>
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
                            <Button variant="contained" size="medium" style={{ color: 'white', width: '200px', height: '50px', fontSize: '16px', justifyContent: 'center', alignSelf: 'center' }} >Select</Button>&nbsp;&nbsp;
                            <Button variant="outlined" color="success" size="medium" style={{ backgroundColor: '#4CAF50', color: 'white', width: '200px', height: '50px', fontSize: '16px', justifyContent: 'center', alignSelf: 'center' }}>Add New</Button>
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
        </Grid>
        //     </Grid>
        //   </MDBox>
        // </DashboardLayout>
    );
}

export default AddCriminal;
