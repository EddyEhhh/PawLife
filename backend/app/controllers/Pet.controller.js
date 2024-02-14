import express from 'express';
import {Vet} from "../models/Vet.model.js";
import {User} from "../models/User.model.js";
import {addPetToUser} from "../helpers/Pet.helper.js";

export async function getPets(req, res){
    try {

        const userId = req.body.userId || "5e234f234f234f234f234a01";

        const pets = await User
            .find({_id: userId})
            .populate('pets')
            .then(user => {
                return res.status(200).json({
                    pets: user[0].pets
                });
            }).catch(err => {
                console.error("Error while populating user's pets: " + err);
            });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error_message: "Unable to get User"})
    }
}


export async function postPets(req, res){
    try {

        const userId = req.body.userId || "5e234f234f234f234f234a01";
        const petData = req.body.pet;

        const pet = await addPetToUser(userId, petData).then(pet => {
            return res.status(200).json({
                pets: petData
            });
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error_message: "Unable to add pet"})
    }
}