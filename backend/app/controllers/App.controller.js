import express from 'express';

export async function getDemo(req, res){
    try {
        console.log(req);
        return res.status(200).send("PawLife!");
    } catch (err) {
        console.log(err);
        res.status(500).json({ error_message: "Unable to get demo"})
    }
}