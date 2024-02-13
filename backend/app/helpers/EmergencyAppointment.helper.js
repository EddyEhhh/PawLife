import express from 'express';
import {Vet} from "../models/Vet.model.js";
import {Appointment} from "../models/Appointment.model.js";
import {
    convertEpochToReadable,
    convertTimetoEpochSecond, epochToDate,
    getEpochInSeconds,
    getEpochInSecondsNow
} from "../utils/Time.util.js";
import res from "express/lib/response.js";
import {getTravelInfo} from "../utils/GoogleMap.utils.js";
import mongoose from "mongoose";
import convert from "lodash/fp/convert.js";

const DAY = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * 60;
const SECONDS_IN_DAY = SECONDS_IN_HOUR * 24;

export async function getEmergencyAppointment(gps, petId){

    try {
        let allAppointments = [];
        console.log("===Emergency Appointment===")
        const forceTime = getEpochInSecondsNow();
        console.log("Current set time:", convertEpochToReadable(forceTime))
        const vets = await Vet.find({});


        // Wait for all appointments to be found and push them to allAppointments
        const appointmentsPromises = vets.map(async (vet) => {
            const nextAvailable = await getNextAvailableAppointmentByVet(vet, forceTime);
            return { vet, next_available: nextAvailable, travel_time_in_min: 20, travel_distance_in_m: 2000};
        });

        const appointments = await Promise.all(appointmentsPromises);

        appointments.forEach((appointment) => {
            allAppointments.push(appointment);
            console.log(`Go at: ${convertEpochToReadable(appointment.next_available)}`);
            console.log(`=====${appointment.vet.name}, ${appointment.vet._id}`);
        });

        console.log("=====", allAppointments);
        return allAppointments;
    } catch (err) {
        console.error(err);
        // res.status(500).json({ error_message: "Unable to get vets"})
    }
}

async function getNextAvailableAppointmentByVet(vet, minTimeInEpochSecond){

    try{

        const vetId = vet._id;

        if (!mongoose.Types.ObjectId.isValid(vetId)) {
            throw new Error('Invalid vet ID');
        }
        if (!Number.isInteger(minTimeInEpochSecond)) {
            throw new Error('Invalid time');
        }

        let appointments = await Appointment.find({vet_id: vetId, end_at: {$gt: minTimeInEpochSecond}}).limit(5);

        displayAppointment(appointments);

        let is_found = false;

        let appointmentTime = minTimeInEpochSecond;

        while(!is_found) {
            for(let i = 0 ; i < appointments.length ; i++){
                appointmentTime = appointmentTime-appointmentTime%100
                // console.log(appointments[0])
                // if no ongoing appointment during appointmentTime
                if(!await isTimeWithin(appointments[i].start_at, appointments[i].end_at, appointmentTime)){
                    // console.log("C Out")
                    // isVetOpen(vet, appointmentTime);
                    // return appointmentTime;
                    break; // found possible appointment Time
                }

                // else update appointmentTime to end of above appointment
                appointmentTime = appointments[i].end_at/100*100;
                // console.log("B: ", appointmentTime)

            }
            // console.log("Check if vet is open at:", (appointmentTime), ":", convertEpochToReadable(appointmentTime))

            // return appointmentTime;
            if(isVetOpen(vet, appointmentTime)){
                return appointmentTime;
            }

            appointmentTime = nextVetOpen(vet, appointmentTime);
            appointments = await Appointment.find({vet_id: vetId, end_at: {$gt: appointmentTime}}).limit(5);
            displayAppointment(appointments);
        }

    } catch (err) {
        console.error("Error while finding next available appointment: " + err);
    }

}

function isVetOpen(vet, timeInEpochSecond){

    if(vet.opening_hours.get('is_24_7')){
        return true;
    }

    const date = epochToDate(timeInEpochSecond);
    const currentTimeInMinutes = date.getHours()*60 + date.getMinutes();

    const timing = vet.opening_hours.get(DAY[epochToDate(timeInEpochSecond).getDay()]);
    if(timing){
        for(let i = 0 ; i < timing.open.length ; i++){
            let openTimeInMinutes = ((+timing.open[i][0].substring(0,2))*60)+(+timing.open[i][0].substring(3));
            let endTimeInMinutes = ((+timing.open[i][1].substring(0,2))*60)+(+timing.open[i][1].substring(3));
            // console.log("isTimeWithin:",openTimeInMinutes, endTimeInMinutes, currentTimeInMinutes)
            if(isTimeWithin(openTimeInMinutes, endTimeInMinutes, currentTimeInMinutes)){
                // console.log("Open")
                return true;
            }
        }
    }
    // console.log("Closed")
    return false;
}

// Given time find the time find the next time where the vet is open
function nextVetOpen(vet, timeInEpochSecond){

    if(vet.opening_hours.get('is_24_7')){
        // console.log("A Closed, next open:", convertEpochToReadable(timeInEpochSecond))
        return timeInEpochSecond;
    }

    const date = epochToDate(timeInEpochSecond);
    const currentTimeInMinutes = timeInEpochSecond;

    let currentDay = epochToDate(timeInEpochSecond).getDay()-1;

    let timing = vet.opening_hours.get(DAY[currentDay]);

    if (timing) {
        for (let i = 0; i < timing.open.length; i++) {
            let openTimeInMinutes = convertTimetoEpochSecond(timing.open[i][0]);
            if (openTimeInMinutes > currentTimeInMinutes) {
                // console.log("B Closed, next open:", convertEpochToReadable(convertTimetoEpochSecond(timing.open[i][0])))
                return convertTimetoEpochSecond(timing.open[i][0]);
            }
        }
    }


    timing = vet.opening_hours.get(DAY[(++currentDay)%7]);
    timeInEpochSecond += SECONDS_IN_DAY;
    while(timing === undefined) {
        // console.log("Closed tomorrow");
        timing = vet.opening_hours.get(DAY[(++currentDay)%7]);
    }
    // console.log("Current Day", currentDay);

    // console.log("C Closed, next open:", convertEpochToReadable(convertTimetoEpochSecond(timing.open[0][0])))
    const currentTime = epochToDate(timeInEpochSecond);
    // console.log("Time:",convertEpochToReadable(getEpochInSeconds(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate()
    //     , +timing.open[0][0].substring(0,2), +timing.open[0][0].substring(3))));

    return getEpochInSeconds(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), +timing.open[0][0].substring(0,2), +timing.open[0][0].substring(3));
}


//
function displayAppointment(appointments){
    appointments.forEach(appointment => {
        console.log(convertEpochToReadable(appointment.start_at), '-', convertEpochToReadable(appointment.end_at));
    });

}
function isTimeWithin(start, end, target){
    return (target >= start && target < end)
}