import express from 'express';
import {Vet} from "../models/Vet.model.js";
import {Pet} from "../models/Pet.model.js";

export async function getVets(req, res){
    try {
        // const { is_open, is_emergency, gps } = req.params;
        // if(req.params.is_emergency){
        //     console.log("EMERGENCY")
        // }
        let { pet_id } = req.query;
        // console.log("PET" + pet_id)
        if(pet_id !== undefined){
            const pet = await Pet.find({_id: pet_id}).then(async pet => {
                // console.log("PET:"+pet[0].name)
                await Vet
                    .find({specialties: { "$in" : [pet[0].species]}})
                    .populate('location')
                    .then(vets => {
                        return res.status(200).json({
                            vets: vets
                        });
                    }).catch(err => {
                        console.error("Error while populating location: " + err);
                    });

            });

        }

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

export async function getVetsById(req, res){
    try {

        const {_id} = req.query
        // console.log(pet_id)
        const vet = await Vet
            .find({_id: _id})
            .populate('location')
            .then(vet => {
                return res.status(200).json({
                    vet: vet
                });
            }).catch(err => {
                console.error("Vet not found " + err);
            });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error_message: "Unable to get Vet"})
    }
}