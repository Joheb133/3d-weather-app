//weather api fetch requst
async function getWeather(location: string) {
    const res = await fetch(`http://127.0.0.1:5000/weather?q=${location}`)
    const data = await res.json();
    return data
}

export default getWeather