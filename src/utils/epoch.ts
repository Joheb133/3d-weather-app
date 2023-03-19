//convert epoch to 24 hour

export function epochTo24Hour(epoch: number) {
    const date = new Date(epoch * 1000); // multiply by 1000 to convert to milliseconds
    const hours = date.getHours().toString().padStart(2, '0'); // get hours in 24-hour format
    const minutes = date.getMinutes().toString().padStart(2, '0'); // get minutes
    return `${hours}:${minutes}`;
}