import dotenv from 'dotenv';
dotenv.config({path:'server/.env'});
import express from 'express';
import needle from 'needle';
import url from 'url';
import apicache from 'apicache';

//init cache
let cache = apicache.middleware


const weatherRouter = express.Router();

//Env vars
const API_KEY_VALUE = process.env.API_KEY_VALUE;
const API_KEY_NAME = process.env.API_KEY_NAME;

//express route
weatherRouter.get('/', cache('5 minutes'), async (req, res) => {
    try {
        const params = new URLSearchParams({
            [API_KEY_NAME]: API_KEY_VALUE,
            ...url.parse(req.url, true).query,
        })

        const apiRes = await needle('get', `https://api.openweathermap.org/data/2.5/weather?${params}`);
        const data = apiRes.body
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error });
    }
})

export default weatherRouter