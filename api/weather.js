//serverless API proxy for weather API

import needle from 'needle';
import url from 'url';

export default async function weather(req, res) {
    try {
        const params = new URLSearchParams({
            [process.env.API_KEY_NAME]: process.env.API_KEY_VALUE,
            ...url.parse(req.url, true).query,
        })
        const apiRes = await needle('get', `https://api.openweathermap.org/data/2.5/weather?${params}`)
        const data = apiRes.body

        res.setHeader('Cache-Control', 's-maxage=300')
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error })
    }
}