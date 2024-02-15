import express from 'express';
import {Vet} from "../models/Vet.model.js";
import {Appointment} from "../models/Appointment.model.js";
import {getEmergencyAppointment} from "../helpers/EmergencyAppointment.helper.js";

export async function getEmergency(req, res){
    try {
        // const { longitude, latitude, petId } = req.params;
        await getEmergencyAppointment(req.body.coords, "placeholderPet").then(vets => {
            return res.status(200).json({
                vets: vets
            });
        });

    } catch (err) {
        console.log("ERROR:", err);
        res.status(500).json({ error_message: "Unable to get vets"})
    }
}

export async function postEmergency(req, res){
    try {
        const SECONDS_IN_MINUTE = 60;
        req.body.appointment_duration = 30 * SECONDS_IN_MINUTE;
        const { pet_id, vet_id } = req.params;
        const { appointment_time, appointment_duration } = req.body;
        await getEmergencyAppointment(req.body.coords, "placeholderPet").then(vets => {
            return res.status(200).json({
                vets: vets
            });
        });

    } catch (err) {
        console.log("ERROR:", err);
        res.status(500).json({ error_message: "Unable to get vets"})
    }
}