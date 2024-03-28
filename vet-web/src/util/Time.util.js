export function getEpochInSecondsNow() {
    return Math.floor(new Date().getTime() / 1000 )
}

export function getEpochInSeconds(year, month, day, hour, minute) {
    const date = new Date(year, month, day, hour, minute);
    // console.log("DATE: ", date);

    return Math.floor(date.getTime() / 1000 )
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

export function convertEpochToReadable(epochTimeInSeconds) {
    const unixMilliSeconds = epochTimeInSeconds * 1000;
    const myDate = new Date(unixMilliSeconds);
    const options = {weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit'};


    return myDate.toLocaleString([], options);
}

export function epochToDate(epochTimeInSeconds) {
    let date = new Date(0); // The 0 there is the key, which sets the date to the epoch
    date.setUTCSeconds(epochTimeInSeconds);

    return date;
}