//create hash table for city JSON using node
//Use city name as key

import { readFile, writeFile } from "fs/promises";
import readLine from "readline";

//create terminal input
const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('enter JSON file path: ', async (path) => {
    const data = await readJSONFile(path)
    const map = JSON.stringify(await createMap(data))
    rl.question('file path: ', (path) => {
        rl.question('file name: ', (name) => {
            writeFile(`${path}/${name}`, map, "utf-8")
                .then(() => { console.log('success: data written') })
                .catch((err) => { console.log(err) })
            rl.close();
        })
    })
})

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
        const keyLower = element.name.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
        if (obj.hasOwnProperty(keyLower)) {
            obj[keyLower].push({country: element.country, coord: element.coord})
        } else {
            obj[keyLower] = [{country: element.country, coord: element.coord}];
        }
    })
    return obj
}