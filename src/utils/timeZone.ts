export function returnTimeZone(seconds: number){
    //input must be time in seconds
    
    const minutes = seconds/60
    
    const timeMins = minutes % 60
    const timeHours = (minutes - timeMins) / 60

    //convert to time format
    let clockMins = timeMins.toString().padStart(2, '0')
    let clockHours;
    if(timeHours / Math.abs(timeHours) == 1) {
        clockHours = `+${timeHours}`
    } else if(timeHours / Math.abs(timeHours) == -1){
        clockHours = `-${Math.abs(timeHours)}`
    } else {
        clockHours = `+${Math.abs(timeHours)}`
    }

    return `UTC${clockHours}:${clockMins.toString().padStart(2, '0')}`
}