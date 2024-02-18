import express from 'express';
import {Vet} from "../models/Vet.model.js";
import {Appointment} from "../models/Appointment.model.js";
import {createEmergencyAppointment, getEmergencyAppointment} from "../helpers/EmergencyAppointment.helper.js";

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
        const { pet_id, vet_id } = req.query;
        const { appointment_time, appointment_duration } = req.body
        const result = await createEmergencyAppointment(pet_id, vet_id, appointment_time, appointment_duration);
        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }


}