import express from 'express';
import {Vet} from "../models/Vet.model.js";
import {Appointment} from "../models/Appointment.model.js";
import {createEmergencyAppointment, getEmergencyAppointment} from "../helpers/EmergencyAppointment.helper.js";
import {getEpochInSecondsNow} from "../utils/Time.util.js";
import {BookingRange} from "../models/BookingRange.js";
import {Pet} from "../models/Pet.model.js";
import {User} from "../models/User.model.js";
import {bookingRangeValid} from "../helpers/Appointment.helper.js";

// export async function getEmergencyAppointmentsByVet(req, res){
//     try {
//         const { vet_id , is_emergency, } = req.params;
//         return getEmergencyAppointment("temp");

//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error_message: "Unable to get vets"})
//     }
// }

export async function getAppointmentsByVet(req, res){
    try {
        const { vet_id } = req.params;
        // console.log(req.params)
        const appointments = await Appointment
            .find({
                vet_id : vet_id,
            }).populate({path: 'pet_id', select: 'name species breed age', populate: {path: 'owner', select: 'username email mobile'}})
            .then(appointments => {
                console.log(appointments)
                return res.status(200).json({
                    appointments: appointments
                });
            }).catch(err => {
                console.error("Error while populating location: " + err);
            });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error_message: "Unable to get vets"})
    }
}

export async function getEmergencyAppointments(req, res){
    try {
        const { user_id } = '5e234f234f234f234f234a01';
        await Appointment.find(
            {
                user_id: user_id,
                end_at: {$gt: Math.floor(new Date().getTime() / 1000)},
                is_emergency: true
            })
            .sort({start_at: 1})
            .limit()
            .populate("pet_id")
            .populate({
                path: "vet_id",
                populate :{
                    path:"location",
                }
            })
            .then(appointments => {
                console.log(appointments)
                return res.status(200).json({
                    appointments: appointments
                })
            });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error_message: "Unable to get vets"})
    }
}

export async function postAppointmentBookingRequest(req, res){

    try {
        const user_id  = '5e234f234f234f234f234a01';

        console.log("T:", req.body)
        const { vet_id } = req.params;
        const { bookings, pet_id } = req.body;
        console.log(bookings)
        // const { appointment_time, appointment_duration } = req.body
        // const pet = await Pet.find({_id: pet_id});
        // const vet = await Vet.find({_id: vet_id});
        // const user = await User.find({_id: user_id});

        const bookingRange = {
            pet_id: pet_id,
            vet_id: vet_id,
            user_id: user_id,
            preferred_booking: bookings,
        }
        BookingRange.insertMany([bookingRange]).then(result => {
            return res.status(200).json(result);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }

}

export async function getAppointmentBookingRequestByUser(req, res){

    try {
        const user_id  = '5e234f234f234f234f234a01';

        // const { appointment_time, appointment_duration } = req.body
        // const pet = await Pet.find({_id: pet_id});
        // const vet = await Vet.find({_id: vet_id});
        // const user = await User.find({_id: user_id});

        const result = await BookingRange.find({user_id: user_id}).populate("pet_id user_id vet_id")
            .then(bookings =>
        bookings.filter(booking =>  bookingRangeValid(booking)))

        return res.status(200).json({
            bookings: result
        })

    } catch (err) {
            console.error(err);
            res.status(500).json({message: err.message});
        }

}

export async function getAppointmentBookingRequestByVet(req, res){

    try {


        const { vet_id } = req.query

        const result = await BookingRange.find({vet_id: vet_id}).populate("pet_id user_id")
        return res.status(200).json({
            bookings: result
        })

    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }

}

export async function deleteAppointmentBookingRequestByVet(req, res){

    try {


        const { booking_id } = req.params;

        // const result = await BookingRange.find({vet_id: vet_id}).populate("pet_id user_id")

        await BookingRange.findByIdAndDelete(booking_id).then(booking => {
            return res.status(200).json({
                deleted_booking: booking
            })
        });


    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }

}