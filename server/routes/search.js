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

searchRouter.get('/', async (req, res)=>{
    try {
        if(!data) {
            res.status(500).json('Failed to load JSON file')
        } else {
            const searchList = []

            const userSearch = req.query.name //return value for key called name in URL
            userSearch.toLowerCase()

            //each element in JSON file
            data.forEach(element => {
                //city = user req
                if(element.name.toLowerCase() === userSearch) {
                    searchList.push(element)
                }
            });
            res.status(200).json(searchList)
        }

    } catch (error) {
        res.status(500).json({error})
    }
})

export default searchRouter