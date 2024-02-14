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