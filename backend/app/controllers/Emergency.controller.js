import express from 'express';
import {Vet} from "../models/Vet.model.js";
import {EmergencyAppointment} from "../models/EmergencyAppointment.model.js";
import {createEmergencyAppointment, getEmergencyAppointment} from "../helpers/EmergencyAppointment.helper.js";

export async function getEmergency(req, res){
    try {
        // const { longitude, latitude, petId } = req.params
        
        // axios cannot use body as input
        await getEmergencyAppointment(req.query, "placeholderPet").then(vets => {
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
        console.log("T:", req.body.params)
        const { pet_id, vet_id, appointment_time, appointment_duration } = req.body.params;
        // const { appointment_time, appointment_duration } = req.body
        const result = await createEmergencyAppointment(pet_id, vet_id, appointment_time, appointment_duration);
        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }

}

export async function deleteEmergency(req, res){

    try {
        const { emergency_id } = req.params;
        // const { appointment_time, appointment_duration } = req.body
        const result = await EmergencyAppointment.findByIdAndDelete(emergency_id)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => res.status(500).json({message: err}))
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }

}