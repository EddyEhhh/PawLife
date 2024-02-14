import axios from "axios";
import {getEmergencyAppointment} from "../helpers/EmergencyAppointment.helper.js";
import dotenv from "dotenv";


dotenv.config({ path: './config/api.config.env' });
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
export async function getTravelInfo(origin, location){
    try {
        const vetDestinationAddress = `${location.state} ${location.postal_code}, ${location.country}`

        const { latitude, longitude } = origin;
        const data = await axios
            .get(`https://maps.googleapis.com/maps/api/distancematrix/json
?destinations=${vetDestinationAddress}
&origins=${latitude},${longitude}
&key=${GOOGLE_API_KEY}`
            );


        return data;
    } catch (err) {
        console.error("Error while accessing Google Distance Matrix API:", err);
    }

}