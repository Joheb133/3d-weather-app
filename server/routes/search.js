import express from "express";
import { readFile } from "fs/promises";

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

//cities data
const data = await readJSONFile("server/data/city.json");

//creates hash table
/* example of hash table
    {
        dublin: [
            {city: Dublin, country: 'US'},
            {city: Dublin, country: 'IE'},
            {city: Dublin, country: 'US'}
        ]
    }
    //In my case, the key dublin has multiple elements all with the city name of dublin. If there are
    countries with the same city name they're added to the same bucket. I can then access the bucket by using
    the key
*/
function createMap() {
    const obj = {};
    data.forEach(element => {
        const keyLower = element.name.toLowerCase();
        if (obj.hasOwnProperty(keyLower)) {
            obj[keyLower].push(element)
        } else {
            obj[keyLower] = [element];
        }

    })
    return obj
}

const map = createMap();

searchRouter.get('/', async (req, res) => {
    try {
        if (!data) {
            res.status(500).json('Failed to load JSON file')
        } else {
            let searchList = []

            const userSearch = req.query.name.toLowerCase() //return value for key called name in URL

            function constant(search) {
                searchList = map[search]
                if (searchList === undefined) {
                    searchList = { error: 'city not found' }
                }
            }

            constant(userSearch)

            res.status(200).json(searchList)
        }

    } catch (error) {
        res.status(500).json({ error })
    }
})

export default searchRouter