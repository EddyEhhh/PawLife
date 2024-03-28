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
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";


function App() {

    const DAY_MAP = {
        monday: 1,
        tuesday: 2,
        wedesday: 3,
        thursday: 4,
        friday: 5,
        saturday: 6,
        sunday: 0
    }

    const FRAMEWORK_COLOR = {
        green: {define: "Preventive care exams", color_code: "#a3d6a6", accent_color_code: "#6bd672"},
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
                            }
                        ])
                    );
                    console.log(events)

                })
            })
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

    }, []);

    const onClick = () => {
        console.log("CLICK")
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
          events={events}
            eventClick={onClick}

      />
        </div>
    </div>
  );
}

export default App;
