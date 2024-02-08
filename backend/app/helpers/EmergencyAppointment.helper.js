import express from 'express';
import {Vet} from "../models/Vet.model.js";
import {Appointment} from "../models/Appointment.model.js";
import {convertTimetoEpochSecond, getEpochInSecondsNow} from "../utils/Time.util.js";
import res from "express/lib/response.js";

export async function getEmergencyAppointment(gps){

    try {

        Vet.find({})
            .then(vets => {
                vets.map((vet) => {
                    getEarlistAppointment(vet);
                })
            })
            .catch(error => {
                console.error("Error fetching vets:", error);
            });
        // const open_vet_id = Vet.find({})
        // return Appointment.find(
        //     {
        //         vet_id: {},
        //         end_at: {$gt: getEpochInSecondsNow()}
        //     })
        //     .sort({start_at: 1})
        //     .limit(50);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error_message: "Unable to get vets"})
    }
}

function getEarlistAppointment(vet){

    // const DAY = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    // var date = new Date(0);
    // date.setUTCSeconds(getEpochInSecondsNow())
    // const day = date.getDay();
    console.log("===",vet.name)
    nextOpenTime(vet)
    // var earliestTime;
    // if(vet.opening_hours.get('is_24_7')){
    //     var earliestTime = getEpochInSecondsNow();
    // }
    // if(vet.opening_hours.get(DAY))

}

function nextOpenTime(vet){

    const DAY = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    var date = new Date(0);
    date.setUTCSeconds(getEpochInSecondsNow())
    const day = date.getDay();

    if(vet.opening_hours.get('is_24_7')){
        return getEpochInSecondsNow();
    }

    const vetOpenHoursToday = vet.opening_hours.get(DAY[day])
    if(vetOpenHoursToday && vetOpenHoursToday.open) {
        console.log(convertTimetoEpochSecond(vetOpenHoursToday.open))
    }
}