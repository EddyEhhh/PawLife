import express from 'express';
import {Vet} from "../models/Vet.model.js";
import {EmergencyAppointment} from "../models/EmergencyAppointment.model.js";

export async function getAppointmentsByVet(req, res){
    try {
        const { vet_id , is_emergency, } = req.params;
        return EmergencyAppointment.find(
            {
                vet_id: vet_id,
                end_at: {$gt: Math.floor(new Date().getTime() / 1000)}
            })
            .sort({start_at: 1})
            .limit(50);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error_message: "Unable to get vets"})
    }
}