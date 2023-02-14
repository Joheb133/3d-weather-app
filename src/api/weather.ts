//weather api fetch requst
async function getWeather(lat: number, lon: number) {
    const res = await fetch(`http://127.0.0.1:5000/weather?lat=${lat}&lon=${lon}`)
    const data = await res.json();
    return data
}

export default getWeather