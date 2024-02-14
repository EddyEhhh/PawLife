import express from 'express';
import {Vet} from "../models/Vet.model.js";
import {User} from "../models/User.model.js";

export async function getProfile(req, res){
    try {

        const userId = req.body.username || "5e234f234f234f234f234a01";

        const user = await User
            .find({_id: userId})
            .populate('pets')
            .then(user => {
                return res.status(200).json({
                    user
                });
            }).catch(err => {
                console.error("Error while populating user's pets: " + err);
            });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error_message: "Unable to get User"})
    }
}