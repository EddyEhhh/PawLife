import express from 'express';
import {Vet} from "../models/Vet.model.js";
import {Appointment} from "../models/Appointment.model.js";
import {getEmergencyAppointment} from "../helpers/EmergencyAppointment.helper.js";

// export async function getEmergencyAppointmentsByVet(req, res){
//     try {
//         const { vet_id , is_emergency, } = req.params;
//         return getEmergencyAppointment("temp");

//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error_message: "Unable to get vets"})
//     }
// }

export async function getAppointmentsByVet(req, res){
    try {
        const { pet_id , vet_id } = req.body;
        console.log(req.params)
        const appointments = await Appointment
            .find({
                vet_id : vet_id
            })
            .limit(10)
            .then(appointments => {
                console.log(appointments)
                return res.status(200).json({
                    appointments: appointments
                });
            }).catch(err => {
                console.error("Error while populating location: " + err);
            });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error_message: "Unable to get vets"})
    }
}