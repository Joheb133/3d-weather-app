import express from "express";
import { readFile } from "fs/promises";
import apicache from 'apicache'

let cache = apicache.middleware

const searchRouter = express.Router()

//code to load json files
async function readJSONFile(filepath) {
    try {
        const fileData = await readFile(filepath, "utf8");
        return JSON.parse(fileData);
    } catch (error) {
        console.error(`Error reading JSON file: ${error.message}`);
        return null;
    }
}

const data = await readJSONFile("server/data/city_hash-table.json")

searchRouter.get('/', cache('10 minutes'), async (req, res) => {
    try {
        if (!data) {
            res.status(500).json('Failed to load JSON file')
        } else {
            let searchList = []

            //return value in lowercase nondiacritic (no laten symbols like fada)
            const search = req.query.name.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "") 

            function constant(search) {
                searchList = data[search]
                if (searchList === undefined) {
                    searchList = { error: 'city not found' }
                }
            }

            constant(search)

            res.status(200).json(searchList)
        }

    } catch (error) {
        res.status(500).json({ error })
    }
})

export default searchRouter