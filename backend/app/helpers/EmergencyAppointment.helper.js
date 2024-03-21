import express from 'express';
import {Vet} from "../models/Vet.model.js";
import {EmergencyAppointment} from "../models/EmergencyAppointment.model.js";
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
import {Pet} from "../models/Pet.model.js";

const DAY = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * 60;
const SECONDS_IN_DAY = SECONDS_IN_HOUR * 24;

export async function createEmergencyAppointment(pet_id, vet_id, appointment_time, appointment_duration_minutes){[]

    // console.log("input:",pet_id, vet_id, appointment_time, appointment_duration)
    const pet = (await Pet.find({_id:  pet_id}))[0];
    const vet = (await Vet.find({_id: vet_id}))[0];
    // console.log("PET:", await pet)


    await isAppointmentAvailable(vet, appointment_time).then(is_available => {
        console.log("AVAIL:",is_available)
        if(!is_available){
            throw new Error("error.appointment.unavailable")
        }else{
            const endTime = appointment_time - (-appointment_duration_minutes*SECONDS_IN_MINUTE);

            const appointmentData = {
                start_at: appointment_time,
                duration: appointment_duration_minutes,
                end_at: endTime,
                pet_id: pet_id,
                vet_id: vet_id,
                is_emergency: true,
                description: `Emergency appointment for ${pet.name} (${pet.species} - ${pet.breed})`
            }
            EmergencyAppointment.insertMany([appointmentData]).then(result => {
            }).catch(err => {
                throw new Error("error.appointment.unableToInsert", err.message)
            });
        }
    })

}

export async function getEmergencyAppointment(gps, petId){

    try {
        let allAppointments = [];
        console.log("===Emergency EmergencyAppointment===")
        // const currentTime = getEpochInSecondsNow();
        // console.log("Finding appointment during/after:", convertEpochToReadable(forceTime))

        const vets = await Vet.find({}).populate('location');


        // Wait for all appointments to be found and push them to allAppointments
        const appointmentsPromises = vets.map(async (vet) => {


            // console.log("VET TEST: ", vetDestinationAddress);
            let travelInfo = await getTravelInfo(gps, vet.location)


            let estTimeOfArrival = getEpochInSecondsNow() + (+travelInfo.data.rows[0].elements[0].duration.value) + SECONDS_IN_MINUTE * 10;

            let nextAvailable = await getNextAvailableAppointmentByVet(vet, estTimeOfArrival);


            console.log("Time now:", convertEpochToReadable(getEpochInSecondsNow()))
            console.log("Travel Time:", +travelInfo.data.rows[0].elements[0].duration.value, "seconds")
            console.log("est Time of arrival:", convertEpochToReadable(estTimeOfArrival) + "\n------")
            console.log(`Go at: ${convertEpochToReadable(nextAvailable)}`);
            console.log(`=====${vet.name}, ${vet._id}`);
            return { vet, next_available: nextAvailable, distance_matrix: travelInfo.data};

        });

        const appointments = await Promise.all(appointmentsPromises);

        appointments.forEach((appointment) => {
            allAppointments.push(appointment);
            // console.log(`Go at: ${convertEpochToReadable(appointment.next_available)}`);
            // console.log(`=====${appointment.vet.name}, ${appointment.vet._id}`);
        });

        // Sort the vets by next_available date in ascending order (earlier dates first)
        allAppointments.sort((a, b) => a.next_available - b.next_available);
        
        // console.log("=====", allAppointments);
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

        let appointments = await EmergencyAppointment.find({vet_id: vetId, end_at: {$gt: minTimeInEpochSecond}}).sort({ end_at: 1 });

        displayAppointment(appointments);
        // console.log(`=====${vet.name}, ${vet._id}`);

        let is_found = false;

        let appointmentTime = minTimeInEpochSecond;

        while(!is_found) {
            for(let i = 0 ; i < appointments.length ; i++){
                // appointmentTime = appointmentTime-appointmentTime%60
                // console.log(appointments[0])
                // if no ongoing appointment during appointmentTime
                if(!await isTimeWithin(appointments[i].start_at, appointments[i].end_at, appointmentTime)){
                    // console.log("C Out")
                    // isVetOpen(vet, appointmentTime);
                    // return appointmentTime;
                    break; // found possible appointment Time
                }

                // else update appointmentTime to end of above appointment
                appointmentTime = appointments[i].end_at;
                // console.log("B: ", appointmentTime)

            }
            // console.log("Check if vet is open at:", (appointmentTime), ":", convertEpochToReadable(appointmentTime))

            // return appointmentTime;
            if(isVetOpen(vet, appointmentTime)){
                return appointmentTime;
            }

            appointmentTime = nextVetOpen(vet, appointmentTime);
            appointments = await EmergencyAppointment.find({vet_id: vetId, end_at: {$gt: appointmentTime}}).sort({ end_at: 1 });
            displayAppointment(appointments);
        }

    } catch (err) {
        console.error("Error while finding next available appointment: " + err);
    }

}

async function isAppointmentAvailable(vet, appointmentTime){
    // console.log("VET: ",vet)
    return await EmergencyAppointment.find({vet_id: vet._id, end_at: {$gte: appointmentTime}}).sort({ end_at: 1 }).limit(1).then(appointment => {
        // console.log("INPUT:",appointment[0].start_at, appointment[0].end_at, appointmentTime)
        //     console.log("App:",!isTimeWithin(appointment[0].start_at, appointment[0].end_at, appointmentTime));
        // console.log("App:2",isVetOpen(vet,  appointmentTime));
            return (!appointment[0] || !isTimeWithin(appointment[0].start_at, appointment[0].end_at, appointmentTime)) && isVetOpen(vet,  appointmentTime);
        }
    );

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
async function displayAppointment(appointments){
     appointments.forEach(appointment => {
         // Vet.find({_id: appointment.vet_id}).then((vet) => {
         //     if(isVetOpen(vet[0], appointment.end_at)){
                 console.log(convertEpochToReadable(appointment.start_at), '-', convertEpochToReadable(appointment.end_at));
             // }
        // })

    });

}
function isTimeWithin(start, end, target){
    return (target >= start && target < end)
}