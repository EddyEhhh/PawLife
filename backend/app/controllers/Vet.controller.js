import express from 'express';
import {Vet} from "../models/Vet.model.js";

export async function getVets(req, res){
    try {
        // const { is_open, is_emergency } = req.params;
        const vets = await Vet
            .find({})
            .populate('location')
            .then(vets => {
                return res.status(200).json({
                    vets: vets
                });
            }).catch(err => {
                console.error("Error while populating location: " + err);
            });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error_message: "Unable to get vets"})
    }
}