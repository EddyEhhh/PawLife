import express from 'express';
import {User} from "../models/User.model.js";
import {Pet} from "../models/Pet.model.js";

export async function addPetToUser(userId, petData) {
    try {
        const user = await User.find({_id: userId});

        const pet = new Pet(petData);

        await Pet.insertMany([pet]);

        console.log("Out: ",user[0]);
        user[0].pets.push(pet._id);

        // 5. Save the updated user document
        console.log("User: ", user);
        await User.updateOne({_id: user[0]._id}, user[0]);

        console.log("Pet added successfully!");
    } catch (error) {
        console.error("Error adding pet:", error);
    }
}

export async function updatePetDetail(userId, petId, petData) {
    try {

        return await Pet.findByIdAndUpdate (petId, petData);

        // for (const [key, value] of Object.entries(petData)) {
        //     console.log("test")
        //     pet.set(key, value);
        // }

        console.log("Update Pet Detail: " + pet);

        // return await Pet.updateOne(pet);

    } catch (error) {
        console.error("Error adding pet:", error);
    }

}