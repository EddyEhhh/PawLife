import logo from './logo.svg';
import './App.css';
import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from "@fullcalendar/react";
import {useEffect, useState} from "react";
import axiosInstance from "./util/axiosInstance";
import {epochToDate} from "./util/Time.util";
import timeGridPlugin from '@fullcalendar/timegrid'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead, TableRow
} from "@mui/material";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function App() {

    const DAY_MAP = {
        monday: 1,
        tuesday: 2,
        wednesday: 3,
        thursday: 4,
        friday: 5,
        saturday: 6,
        sunday: 0
    }

    const FRAMEWORK_COLOR = {
        green: {define: "Advance Booking", color_code: "#a3d6a6", accent_color_code: "#6bd672"},
        yellow: {define: "Sick patients", color_code: "#d3d6a3", accent_color_code: "#cfd66b"},
        purple: {define: "New clients", color_code: "#bba3d6", accent_color_code: "#9d6bd6"},
        pink: {define: "Euthanasia", color_code: "#d6a3cf", accent_color_code: "#d66bc8"},
        red: {define: "Urgent care", color_code: "#d6a3a3", accent_color_code: "#d66b6b"},
        blue: {define: "Medical progress exams and diagnostics", color_code: "#A3C7D6", accent_color_code: "#6bb6d6"},
        orange: {define: "Pre-appointed preventive care exams", color_code: "#d6bba3", accent_color_code: "#d69d6b"},
    }


    const [vetList, setVetList] = useState([]);
    const [events, setEvents] = useState([])
    const [vetId, setVetId] = useState({});
    const [vet, setVet] = useState({});
    const [businessHours, setBusinessHours] = useState([]);

    const [appointmentDetail, setAppointmentDetail] = useState({});
    const [petDetail, setPetDetail] = useState({});

    const [advanceBookingDetail, setAdvanceBookingDetail] = useState({});

    const [isAppointmentDetailOpen, setAppointmentDetailOpen] = useState(false);



    const fetchVets = async () => {
        await axiosInstance
            .get("/api/v1/vets")
            .then((response) => {
                setVetList([])
                response.data.vets.map(vet => {
                    setVetList(prevState => (
                        [...prevState,
                            {
                                label: vet.name,
                                value: vet._id
                            }
                        ])
                    );
                    console.log("Done:"  + vetList.toString())
                })
                setVetId(vetList[0])
            })

    };

    // const selectVet = async (selected) => {
    //     console.log("SElect:", selected)
    //     // setVetId()
    // }
    const handleChange = (event: SelectChangeEvent) => {
        console.log("SELECT:", event.target.value)
        setVetId(event.target.value);
        if(event.target.value === ""){
            setEvents([])
            return
        }
        fetchVet(event.target.value);
        fetchAppointment(event.target.value)
    };

    const fetchVet = async (vetId) => {
        await axiosInstance
            .get("/api/v1/vets/vet?_id="+vetId)
            .then((response) => {
                setVet(response.data.vet[0]);
                convertOpeningHours(response.data.vet[0].opening_hours)
                })
    }

    const getFrameworkColor = (appointment) => {
        if(appointment.is_emergency){
            return FRAMEWORK_COLOR.red
        }
        return FRAMEWORK_COLOR.blue
    }

    const getTitle = (appointment) => {
        let message = appointment.pet_id.owner.username + "'s " + appointment.pet_id.species
            + "(" + appointment.pet_id.breed + ")" + ". Coming for " + appointment.description
        return message;
    }

    const fetchAdvanceBooking= async (vetId) => {

        await axiosInstance
            .get("/api/v1/appointments/booking/vet?vet_id="+vetId)
            .then((response) => {
                response.data.bookings.reverse().map((booking) => {

                    // console.log("TEST:"+booking.pet_id.name)
                    // console.log(booking.preferred_booking)
                    booking.preferred_booking.map((eachPreferBooking, index) => {
                        // console.log("START:" + epochToDate(appointment.start_at).toISOString())
                        // let event =
                        // let getColor = getFrameworkColor(appointment);

                        setEvents(prevState => (
                            [...prevState,
                                {
                                    id: booking._id + "" + index,
                                    title: booking.user_id.username + "'s Appointment request (" + index + ")",
                                    start: epochToDate(eachPreferBooking.start).toISOString().substring(0, 19) + "+08:00",
                                    end: epochToDate(eachPreferBooking.end).toISOString().substring(0, 19) + "+08:00",
                                    backgroundColor: FRAMEWORK_COLOR.green.color_code,
                                    borderColor: FRAMEWORK_COLOR.green.accent_color_code,
                                    textColor: "black",
                                    extendedProps: [booking, eachPreferBooking],
                                    display: "background",
                                    overlap: true

                                }
                            ])
                        );
                    });
                    console.log(events)

                })
            })
    }

    const fetchAppointment = async (vetId) => {

        await axiosInstance
            .get("/api/v1/appointments/"+vetId)
            .then((response) => {
                setEvents([])
                response.data.appointments.map((appointment) => {
                    console.log("START:" + epochToDate(appointment.start_at).toISOString())
                    // let event =
                    let getColor = getFrameworkColor(appointment);

                    setEvents(prevState => (
                        [...prevState,
                            {
                                id: appointment._id,
                                title: getTitle(appointment),
                                start: epochToDate(appointment.start_at).toISOString().substring(0,19)+"+00:00",
                                end: epochToDate(appointment.end_at).toISOString().substring(0,19)+"+00:00",
                                backgroundColor: getColor.color_code,
                                borderColor: getColor.accent_color_code,
                                textColor: "#000000",
                                extendedProps: appointment
                            }
                        ])
                    );
                    console.log(events)

                })

            })
        await fetchAdvanceBooking(vetId);
    }


    const convertOpeningHours = async (openingHours) => {
        // console.log("OPENING: ", vet.name)
        setBusinessHours([])
        try{
            let openingHoursEntries = Object.entries(openingHours)
            openingHoursEntries.map(([key, val]) => {
                let businessHour = {
                    daysOfWeek: [DAY_MAP[key]],
                    startTime: val.open[0][0],
                    endTime: val.open[val.open.length - 1][1]
                }
                console.log("TIME:"+key+val.open[0][0]+ val.open[val.open.length - 1][1])

                setBusinessHours(prevState =>
                    [...prevState, businessHour]
                )
                // businessHours.businessHours.push(businessHour)
                // console.log(key+ "["+ dayMap[key] +"]"+ ":" + val.open[0][0] + "-" + val.open[val.open.length-1][1])
            })
            return businessHours
        } catch (err) {
            return []
        }

    }

    useEffect(() => {
        console.log("EFFECT")
        fetchVets()
        // vetList.map(vet => {console.log("T: "+vet.label)
        // })
        // fetchAppointment()

        // setEvents(prevState => (
        //     [...prevState,
        //         {
        //             id: 0,
        //             title: "Background",
        //             start: "2024-03-30T08:00:00.000Z",
        //             end: "2024-03-30T010:00:00.000Z",
        //             backgroundColor: FRAMEWORK_COLOR.green.color_code,
        //             borderColor: FRAMEWORK_COLOR.green.accent_color_code,
        //             textColor: "#000000",
        //             display: "background"
        //         }
        //     ]))
        // setEvents(prevState => (
        //     [...prevState,
        //         {
        //             id: 1,
        //             title: "Background 2",
        //             start: "2024-03-30T08:00:00.000Z",
        //             end: "2024-03-30T010:00:00.000Z",
        //             backgroundColor: FRAMEWORK_COLOR.green.color_code,
        //             borderColor: FRAMEWORK_COLOR.green.accent_color_code,
        //             textColor: "#000000",
        //             display: "background"
        //         }
        //     ]))

    }, []);

    const onClick = async (info) => {
        // console.log(info.event.extendedProps)
        if(info.event.display === "background") {
            setAppointmentDetail({})
            setAdvanceBookingDetail(info.event.extendedProps)
            setPetDetail(info.event.extendedProps[0].pet_id);
            console.log(info.event.extendedProps[0].pet_id.name)
            handleOpen()
            // return;
        }else{
            setAppointmentDetail(info.event.extendedProps);
            setAdvanceBookingDetail({})
            await axiosInstance
                .get("/api/v1/pets/pet?_id="+info.event.extendedProps.pet_id._id)
                .then((result) => {
                    setPetDetail(result.data.pet[0]);
                })
            handleOpen()
        }

        // console.log("H" +appointmentDetail.pet_id.owner.username);
    };

    const handleClose = () => {
        setAppointmentDetailOpen(false);
    }

    const handleOpen = () => {
        setAppointmentDetailOpen(true);
    }




  return (
    <div className="App">
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Vet</InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={vetId}
                label="Vet"
                onChange={handleChange}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {vetList.map(eachVet => (<MenuItem value={eachVet.value}>{eachVet.label}</MenuItem>))}
            </Select>
        </FormControl>
        <div>
        <FullCalendar
            nowIndicator={true}
          schedulerLicenseKey='CC-Attribution-NonCommercial-NoDerivatives'
          plugins={[ timeGridPlugin ]}
          initialView="timeGridWeek"
            businessHours={businessHours}
            // vet ?
            eventShortHeight={100}
            event
          events={events}
            eventClick={onClick}

      />

        </div>
        {petDetail.health && <Dialog
            open={isAppointmentDetailOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            {appointmentDetail.duration && <DialogTitle id="alert-dialog-title">
                {petDetail.owner.username} - {petDetail.name}'s Pet Details
            </DialogTitle>}
            {!appointmentDetail.duration && <DialogTitle id="alert-dialog-title" style={{color: "red"}}>
                {advanceBookingDetail[0].user_id.username}'s Booking Request for {petDetail.name}
            </DialogTitle>}
            <DialogContent style={{minWidth: 500}}>
                <DialogContentText  id="alert-dialog-description">
                    {appointmentDetail.duration && epochToDate(appointmentDetail.start_at).toString().substring(0, 21)} {appointmentDetail.duration && "to"} {appointmentDetail.duration && epochToDate(appointmentDetail.end_at).toString().substring(0, 21)}
                </DialogContentText>
                <DialogContentText  id="alert-dialog-description">
                    {!appointmentDetail.duration && epochToDate(advanceBookingDetail[1].start-28800).toString().substring(0, 21)} {!appointmentDetail.duration && "to"} {!appointmentDetail.duration && epochToDate(advanceBookingDetail[1].end-28800).toString().substring(0, 21)}
                </DialogContentText>

                {!advanceBookingDetail[1] && <DialogContentText style={{marginBottom: 20}} id="alert-dialog-description">
                    Contact: {petDetail.owner.email} | {petDetail.owner.mobile}
                </DialogContentText>}

                {advanceBookingDetail[1] &&  <DialogContentText style={{marginBottom: 20}} id="alert-dialog-description">
                    Contact: {advanceBookingDetail[0].user_id.email} | {advanceBookingDetail[0].user_id.mobile}
                </DialogContentText>
            }
                <Divider/>
                <DialogContentText style={{marginTop: 20, color: "#000000", fontSize:20}} id="alert-dialog-description">
                    <b>Pet details</b>
                </DialogContentText>
                <DialogContentText style={{  color: "#000000"}} id="alert-dialog-description">
                    Name: {petDetail.name}
                </DialogContentText>
                <DialogContentText style={{color: "#000000"}} id="alert-dialog-description">
                    Age: {petDetail.age}
                </DialogContentText>
                <DialogContentText style={{color: "#000000"}} id="alert-dialog-description">
                    Species: {petDetail.species}
                </DialogContentText>
                <DialogContentText style={{color: "#000000"}} id="alert-dialog-description">
                    Breed: {petDetail.breed}
                </DialogContentText>
                <DialogContentText style={{marginBottom: 20, color: "#000000"}} id="alert-dialog-description">
                    Microchip: {petDetail.microchip_number}
                </DialogContentText>
                <Divider/>
                <DialogContentText style={{marginTop: 20, color: "#000000", fontSize:20}} id="alert-dialog-description">
                    <b>Health details</b>
                </DialogContentText>
                <TableContainer style={{marginTop: 15}}>
                    <Table sx={{  }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{fontSize: 17}}>Allergies</TableCell>
                                {/*<TableCell align="left">Calories</TableCell>*/}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!petDetail.health.medical_history.allergies[0] && <TableRow>
                                <TableCell align="left">
                                    <DialogContentText style={{color: "#000000"}}>
                                        <b>No allergies recorded</b>
                                    </DialogContentText>
                                </TableCell>
                            </TableRow>}
                            {petDetail.health.medical_history.allergies.map((allergy) => (
                                <TableRow
                                    // key={}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {/*<TableCell component="th" scope="row">*/}
                                    {/*    0*/}
                                    {/*</TableCell>*/}
                                    <TableCell align="left"><DialogContentText style={{color: "#000000"}}>
                                    </DialogContentText>
                                        <DialogContentText style={{color: "#000000"}}>
                                            <b>Type</b>: {allergy.type}
                                        </DialogContentText>
                                        <DialogContentText style={{color: "#000000"}}>
                                            <b>Detail</b>: {allergy.description}
                                        </DialogContentText>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TableContainer style={{marginTop: 25}}>
                    <Table sx={{  }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{fontSize: 17}}>Previous Conditions</TableCell>
                                {/*<TableCell align="left">Calories</TableCell>*/}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!petDetail.health.medical_history.previous_conditions[0]  && <TableRow>
                                <TableCell align="left">
                                    <DialogContentText style={{color: "#000000"}}>
                                        <b>No prior conditions recorded</b>
                                    </DialogContentText>
                                </TableCell>
                            </TableRow>}
                            {petDetail.health.medical_history.previous_conditions.map((prevCondition) => (
                                <TableRow
                                    // key={}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {/*<TableCell component="th" scope="row">*/}
                                    {/*    0*/}
                                    {/*</TableCell>*/}
                                    <TableCell align="left"><DialogContentText style={{color: "#000000"}}>
                                    </DialogContentText>
                                        <DialogContentText style={{color: "#000000"}}>
                                            <b>Condition</b>: {prevCondition.condition}
                                        </DialogContentText>
                                        <DialogContentText style={{color: "#000000"}}>
                                            <b>Notes</b>: {prevCondition.notes}
                                        </DialogContentText>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TableContainer style={{marginTop: 25}}>
                    <Table sx={{  }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{fontSize: 17}}>Previous Surgeries</TableCell>
                                {/*<TableCell align="left">Calories</TableCell>*/}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!petDetail.health.medical_history.previous_surgeries[0]  && <TableRow>
                                <TableCell align="left">
                                    <DialogContentText style={{color: "#000000"}}>
                                    <b>No prior surgeries recorded</b>
                                    </DialogContentText>
                                </TableCell>
                            </TableRow>}
                            {petDetail.health.medical_history.previous_surgeries.map((prevSurgery) => (
                                <TableRow
                                    // key={}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {/*<TableCell component="th" scope="row">*/}
                                    {/*    0*/}
                                    {/*</TableCell>*/}
                                    <TableCell align="left"><DialogContentText style={{color: "#000000"}}>
                                    </DialogContentText>
                                        <DialogContentText style={{color: "#000000"}}>
                                            <b>Name</b>: {prevSurgery.surgery_name}
                                        </DialogContentText>
                                        <DialogContentText style={{color: "#000000"}}>
                                            <b>Date of Surgery</b>: {prevSurgery.surgery_date}
                                        </DialogContentText>
                                        <DialogContentText style={{color: "#000000"}}>
                                            <b>Notes</b>: {prevSurgery.notes}
                                        </DialogContentText>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TableContainer style={{marginTop: 25}}>
                    <Table sx={{  }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{fontSize: 17}}>Existing Conditions</TableCell>
                                {/*<TableCell align="left">Calories</TableCell>*/}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!petDetail.health.existing_conditions[0]  && <TableRow>
                                <TableCell align="left">
                                    <DialogContentText style={{color: "#000000"}}>
                                        <b>No existing conditions recorded</b>
                                    </DialogContentText>
                                </TableCell>
                            </TableRow>}
                            {petDetail.health.existing_conditions.map((existingCondition) => (
                                <TableRow
                                    // key={}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {/*<TableCell component="th" scope="row">*/}
                                    {/*    0*/}
                                    {/*</TableCell>*/}
                                    <TableCell align="left"><DialogContentText style={{color: "#000000"}}>
                                    </DialogContentText>
                                        <DialogContentText style={{color: "#000000"}}>
                                            <b>Condition</b>: {existingCondition.condition}
                                        </DialogContentText>
                                        <DialogContentText style={{color: "#000000"}}>
                                            <b>Notes</b>: {existingCondition.notes}
                                        </DialogContentText>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TableContainer style={{marginTop: 25}}>
                    <Table sx={{  }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{fontSize: 17}}>Medications</TableCell>
                                {/*<TableCell align="left">Calories</TableCell>*/}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!petDetail.health.medications[0]  && <TableRow>
                                <TableCell align="left">
                                    <DialogContentText style={{color: "#000000"}}>
                                        <b>No existing medications recorded</b>
                                    </DialogContentText>
                                </TableCell>
                            </TableRow>}
                            {petDetail.health.medications.map((medication) => (
                                <TableRow
                                    // key={}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {/*<TableCell component="th" scope="row">*/}
                                    {/*    0*/}
                                    {/*</TableCell>*/}
                                    <TableCell align="left"><DialogContentText style={{color: "#000000"}}>
                                    </DialogContentText>
                                        <DialogContentText style={{color: "#000000"}}>
                                            <b>Medication</b>: {medication.medication_name}
                                        </DialogContentText>
                                        <DialogContentText style={{color: "#000000"}}>
                                            <b>Dosage</b>: {medication.dosage}
                                        </DialogContentText>
                                        <DialogContentText style={{color: "#000000"}}>
                                            <b>Frequency</b>: {medication.frequency}
                                        </DialogContentText>
                                        <DialogContentText style={{color: "#000000"}}>
                                            <b>Notes</b>: {medication.notes}
                                        </DialogContentText>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TableContainer style={{marginTop: 25}}>
                    <Table sx={{  }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{fontSize: 17}}>Vaccinations</TableCell>
                                {/*<TableCell align="left">Calories</TableCell>*/}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!petDetail.health.vaccinations[0]  && <TableRow>
                                <TableCell align="left">
                        <DialogContentText style={{color: "#000000"}}>
                                    <b>No recorded history of vaccinations</b>
                                </DialogContentText>
                            </TableCell>
                        </TableRow>}
                            {petDetail.health.vaccinations.map((vaccination) => (
                                <TableRow
                                    // key={}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {/*<TableCell component="th" scope="row">*/}
                                    {/*    0*/}
                                    {/*</TableCell>*/}
                                    <TableCell align="left"><DialogContentText style={{color: "#000000"}}>
                                    </DialogContentText>
                                        <DialogContentText style={{color: "#000000"}}>
                                            <b>Vaccine</b>: {vaccination.vaccine_name}
                                        </DialogContentText>
                                        <DialogContentText style={{color: "#000000"}}>
                                            <b>Date Administered</b>: {vaccination.date_administered}
                                        </DialogContentText>
                                        <DialogContentText style={{color: "#000000"}}>
                                            <b>Notes</b>: {vaccination.notes}
                                        </DialogContentText>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>}
    </div>
  );
}

export default App;
