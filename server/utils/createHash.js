import { readFile, writeFile } from "fs/promises";
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

const read = await readJSONFile("server/data/min.city.json");

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
async function createMap(data) {
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

const map = JSON.stringify(await createMap(read))

writeFile("server/data/min.city_hash-table.json", map, 'utf-8')
    .then(()=>{console.log('success: data written')})
    .catch((err)=>{console.log(err)})