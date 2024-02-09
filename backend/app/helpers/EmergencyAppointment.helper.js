import express from 'express';
import {Vet} from "../models/Vet.model.js";
import {Appointment} from "../models/Appointment.model.js";
import {convertTimetoEpochSecond, getEpochInSeconds, getEpochInSecondsNow} from "../utils/Time.util.js";
import res from "express/lib/response.js";
import {getTravelInfo} from "../utils/GoogleMap.utils.js";
import mongoose from "mongoose";

export async function getEmergencyAppointment(gps){

    try {

         await Vet.find({})
            .then(vets => {
                vets.map((vet) => {
                    findNextAvailableAppointment(vet._id, getEpochInSecondsNow()).then(result => {
                        console.log(vet.name, vet._id);
                        console.log(result)
                    })
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

async function findNextAvailableAppointment(vetId, timeInEpochSeconds) {
    try {
        // Validate `vetId` and `timeInEpochSeconds`
        if (!mongoose.Types.ObjectId.isValid(vetId)) {
            throw new Error('Invalid vet ID');
        }
        if (!Number.isInteger(timeInEpochSeconds)) {
            throw new Error('Invalid time');
        }

        const vet = await Vet.findById(vetId, { opening_hours: 1 }).lean(); // Use lean for efficiency
        if (!vet) {
            throw new Error('Vet not found');
        }

        // Extract relevant day information from `timeInEpochSeconds`
        const date = new Date(timeInEpochSeconds * 1000); // Convert back to milliseconds
        const dayOfWeek = date.getDay(); // 0 (Sunday) to 6 (Saturday)

        // Check if vet is closed on this day
        console.log("TEST: ", vet)
        const DAY = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        console.log(vet.opening_hours.get(DAY[dayOfWeek]))
        if (!vet.opening_hours.get(DAY[dayOfWeek])) {
            console.error(
                'Error: Inconsistent data detected. Vet cannot be closed all week with working days specified.'
            );
            return null; // Indicate error due to data inconsistency
        }

        // Check if `timeInEpochSeconds` is already during open hours
        const currentOpeningHours = vet.opening_hours[dayOfWeek];
        if (timeInEpochSeconds >= convertOpeningHoursToEpochSeconds(currentOpeningHours)) {
            // Find the next available slot starting from `timeInEpochSeconds`
            const filteredAppointments = await Appointment.find({
                vet_id: vetId,
                start_at: { $gt: timeInEpochSeconds },
                end_at: { $lt: getNextClosingTime(currentOpeningHours, timeInEpochSeconds) },
            }).lean(); // Use lean for efficiency

            if (filteredAppointments.length === 0) {
                return timeInEpochSeconds; // Time is available
            }

            // Handle cases where the given time coincides with an existing appointment:
            if (filteredAppointments.some(appointment => {
                return timeInEpochSeconds >= appointment.start_at && timeInEpochSeconds < appointment.end_at;
            })) {
                // Time falls within an existing appointment, so skip to the next open segment
                console.log('Given time coincides with an existing appointment, skipping to next open segment.');
            }
        } else {
            // `timeInEpochSeconds` is before opening hours, so set start time to opening
            timeInEpochSeconds = convertOpeningHoursToEpochSeconds(currentOpeningHours);
        }

        // Find the next available slot by iterating through opening hours segments
        let nextAvailableSlot = null;
        for (const segment of currentOpeningHours) {
            const [startHour, startMinute] = segment[0].split(':');
            const [endHour, endMinute] = segment[1].split(':');

            const startTimeEpochSeconds = convertTimeStringToEpochSeconds(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                startHour,
                startMinute
            );
            const endTimeEpochSeconds = convertTimeStringToEpochSeconds(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                endHour,
                endMinute
            );

            // Check if there's any clash with existing appointments within this segment
            const hasClash = await Appointment.exists({
                vet_id: vetId,
                $or: [
                    { start_at: { $gt: startTimeEpochSeconds, $lt: endTimeEpochSeconds } },
                    { end_at: { $gt: startTimeEpochSeconds, $lt: endTimeEpochSeconds } },
                ],
            });

            if (!hasClash && endTimeEpochSeconds >= timeInEpochSeconds) {
                nextAvailableSlot = startTimeEpochSeconds;
                break; // Stop iterating if available slot found
            }
        }

        return nextAvailableSlot;
    } catch (err) {
        console.error('Error finding next available appointment:', err);
        return null; // Indicate error
    }
}

// Helper functions for time conversions
function convertOpeningHoursToEpochSeconds(openingHours) {
    const [startHour, startMinute] = openingHours[0][0].split(':');
    const date = new Date(Date.now()); // Use current date if exact date not provided

    // Assuming opening hours are on the same day as the provided time
    const startTime = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        startHour,
        startMinute,
        0, // Set seconds to 0
        0 // Set milliseconds to 0
    );

    return Math.floor(startTime.getTime() / 1000); // Convert to epoch seconds
}

// async function getEarliestAppointment(vet){
//
//     // const duration = getTravelInfo(origin, destination).distance.value + 10 * 60;
//     // Time of possible appointment
//     let arrival_time = getEpochInSecondsNow() + 30 * 60 + 10 * 60;
//
//     await Appointment.find({vet_id: vet._id, end_at: {$gt: arrival_time}})
//         .then(appointments => {
//             console.log("===", vet.name, vet._id)
//             let appointmentIndex = 0;
//             let is_found = false;
//             // find earliest appointment
//             while(!is_found) {
//                 // console.log("A")
//                 appointments = appointments.filter(appointment => {
//                     return appointment.end_at > arrival_time;
//                 });
//                 while (appointmentIndex <= appointments.length
//                 && isTimeWithin(appointments[appointmentIndex].start_at,
//                     appointments[appointmentIndex].end_at,
//                     arrival_time)) {
//
//                     // Change possible appointment to end of ongoing appointment
//                     arrival_time = appointments[appointmentIndex].end_at
//                     appointmentIndex++;
//                 }
//                 // console.log("B")
//
//                 // console.log(arrival_time, vetNextOpen(vet, arrival_time))
//                 let nextOpen = vetNextOpen(vet, arrival_time)
//                 console.log(arrival_time, nextOpen)
//                 if(arrival_time == nextOpen){
//                     is_found = true;
//                 }
//                 arrival_time = nextOpen
//                 // console.log("C")
//
//
//             }
//             // console.log("D")
//             return arrival_time;
//         }
//         )
//
// }
//
//
//
// function vetNextOpen(vet, epoch_time){ //Given vet and epoch_time, get the next timing the vet is opens.
//
//     const DAY = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
//     let date = new Date(0);
//     date.setUTCSeconds(epoch_time)
//
//     //if vet 24 hours -> means open during epoch_time
//     if(vet.opening_hours.get('is_24_7')){
//         console.log("VetNextOpen: A")
//
//         return epoch_time;
//     }
//
//     // Obtain next opening day
//     let day = date.getDay();
//     let vetOpenHoursToday = vet.opening_hours.get(DAY[day])
//     while(vetOpenHoursToday == undefined){
//         day = (day+1) % 7
//         vetOpenHoursToday = vet.opening_hours.get(DAY[day])
//     }
//
//     // iterate through the opened timing in the day
//     let openIndex = 0;
//     while(openIndex < vetOpenHoursToday.open.length) {
//
//         // if epoch_time is within opened time
//         if(isTimeWithin(vetOpenHoursToday.open[openIndex][0], vetOpenHoursToday.open[openIndex][1], epoch_time)){
//             console.log("VetNextOpen: B")
//             return epoch_time;
//         }
//
//         openIndex++;
//     }
//
//     // if vet is open later in the day
//     if(openIndex < vetOpenHoursToday.open.length){
//         console.log("VetNextOpen: C")
//         return getEpochInSeconds(date.getFullYear(), date.getMonth(), day, +(vetOpenHoursToday.open[openIndex][0].substring(0,2)),+(vetOpenHoursToday.open[openIndex][0].substring(2)))
//     }
//
//     // Check next opened day
//     day += 1
//     date.setDate(date.getDate() + 1);
//     vetOpenHoursToday = vet.opening_hours.get(DAY[day])
//     while(vetOpenHoursToday == undefined){
//         day = (day+1) % 7
//         date.setDate(date.getDate() + 1);
//         console.log("Next: ", date)
//         vetOpenHoursToday = vet.opening_hours.get(DAY[day])
//     }
//     console.log("VetNextOpen: D")
//     return getEpochInSeconds(date.getFullYear(), date.getMonth(), day, +(vetOpenHoursToday.open[0][0].substring(0,2)),+(vetOpenHoursToday.open[0][0].substring(3)))
// }
//
// function isTimeWithin(start, end, target){
//     return (target >= start && target < end)
// }