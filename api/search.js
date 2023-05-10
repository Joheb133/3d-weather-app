//serverless city search

import needle from 'needle'
import zlib from 'zlib'
import cache from 'memory-cache'

function constant(data, search) {
    let searchList = data[search]
    if (searchList === undefined) {
        searchList = { error: `city not found` }
    }
    return searchList
}

const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 1 day
const CACHE_KEY = 'city_data';

export default async function search(req, res) {
    try {
        let data = cache.get(CACHE_KEY);

        if (!data) {
            const response = await needle('get', `https://raw.githubusercontent.com/Joheb133/3d-weather-app/main/data/hash_city.json.gz`);
            if (response.statusCode !== 200) {
                res.status(500).json('Failed to load JSON file')
                return;
            } else {
                const decompressed = zlib.gunzipSync(response.body);
                data = JSON.parse(decompressed);
                cache.put(CACHE_KEY, data, CACHE_DURATION_MS);
            }
        }

        //return value in lowercase nondiacritic (no laten symbols like fada)
        const search = req.query.name.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
        res.status(200).json(constant(data, search));
    } catch (error) {
        res.status(500).json(error.message)
    }
}