import express from 'express';
import {Vet} from "../models/Vet.model.js";
import {User} from "../models/User.model.js";
import {Pet} from "../models/Pet.model.js";
import {addPetToUser, updatePetDetail} from "../helpers/Pet.helper.js";

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

export async function getPetsById(req, res){
    try {

        const {_id} = req.query
        // console.log(pet_id)
        const pet = await Pet
            .find({_id: _id})
            .then(pet => {
                return res.status(200).json({
                    pet: pet
                });
            }).catch(err => {
                console.error("Pet not found " + err);
            });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error_message: "Unable to get Pet"})
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

export async function patchPetDetail(req, res){
    try {

        const userId = req.body.userId || "5e234f234f234f234f234a01";
        const petId = req.params.pet_id;
        const petData = req.body;

        const pet = await updatePetDetail(userId, petId, petData).then(pet => {
            return res.status(200).json({
                pets: petData
            });
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error_message: "Unable to add pet"})
    }
}

export async function deletePet(req, res){
    try {
        const userId = req.body.userId || "5e234f234f234f234f234a01";
        const petId = req.body.pet_id;

        await Pet.findByIdAndDelete(petId).then(pet => {
            return res.status(200).json({
                deleted_pet: pet
            })
        });
        // console.log(`Pet with ID ${petId} deleted successfully`);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error_message: "Unable to add pet"})
    }
}