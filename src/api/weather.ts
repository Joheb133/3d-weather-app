//weather api fetch requst
async function getWeather(lat: number, lon: number) {
    try {
        const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}&units=kelvin`)
        const data = await res.json();
        return data
    } catch (error) {
        return {serverError: 'server error'}
    }
}

export default getWeather