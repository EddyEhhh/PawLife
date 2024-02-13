import express from 'express';
import {Vet} from "../models/Vet.model.js";
import {Appointment} from "../models/Appointment.model.js";
import {getEmergencyAppointment} from "../helpers/EmergencyAppointment.helper.js";

export async function getAppointmentsByVet(req, res){
    try {
        const { vet_id , is_emergency, } = req.params;
        return getEmergencyAppointment("temp");

    } catch (err) {
        console.log(err);
        res.status(500).json({ error_message: "Unable to get vets"})
    }
}