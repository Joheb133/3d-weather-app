//serverless city search

import needle from 'needle';
import zlib from 'zlib'

function constant(data, search) {
    let searchList = data[search]
    if (searchList === undefined) {
        searchList = { error: `city not found` }
    }
    return searchList
}

export default async function search(req, res) {
    try {
        const response = await needle('get', `https://raw.githubusercontent.com/Joheb133/3d-weather-app/main/data/hash_city.json.gz`)

        if (response.statusCode !== 200) {
            res.status(500).json('Failed to load JSON file')
        } else {
            const decompressed = zlib.gunzipSync(response.body)
            const data = JSON.parse(decompressed)
            //return value in lowercase nondiacritic (no laten symbols like fada)
            const search = req.query.name.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")

            res.status(200).json(constant(data, search))
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}