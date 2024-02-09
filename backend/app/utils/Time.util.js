export function getEpochInSecondsNow() {
    return Math.floor(new Date().getTime() / 1000 )
}

export function convertTimetoEpochSecond(timeStr) {
    // Check if time string is in valid format (HH:MM)
    const timeRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
    if (!timeRegex.test(timeStr)) {
        console.error("Invalid time format:", timeStr);
        return null;
    }

    // Extract hours and minutes from the string
    const [hours, minutes] = timeStr.split(':').map(Number);

    // Create a Date object for today at the specified time
    const today = new Date();
    today.setHours(hours, minutes, 0, 0); // Set hours, minutes, and reset seconds and milliseconds

    // Convert the Date object to epoch time (milliseconds since Jan 1, 1970)
    return today.getTime()/1000;
}