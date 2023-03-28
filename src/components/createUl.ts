import getWeather from "../api/weather";

import { City } from "../ts/types";


const searchContainer = document.querySelector(".location-wrap") as HTMLDivElement;

export function createUl(city: Array<City>, countryParam?: string): Promise<any> {
    return new Promise((resolve, reject) => {
        //check for country param
        if(countryParam != "") {
            const list: Array<City> = [];
            city.forEach(element =>{
                if(element.country.toLowerCase() == countryParam) {
                    list.push(element)
                }
            })
            if(list.length > 0) {
                city = list
            }
        }

        //li limit
        let limit
        if (city.length > 5) {
            limit = 5;
        } else {
            limit = city.length
        }

        //create location buttons
        let ulWrap = document.createElement("div");
        ulWrap.className = 'response-wrap'
        let newUl = document.createElement("ul");
        newUl.className = 'response'
        ulWrap.appendChild(newUl)

        for (let i = 0; i < limit; i++) {
            //create li
            let newLi = document.createElement("li")
            newLi.innerText = `${city[i].name}, ${city[i].country}`

            const lat = city[i].coord.lat as number;
            const lon = city[i].coord.lon as number;

            const selectedCity = city[i]

            //add event listener
            newLi.addEventListener('click', async () => {
                const ul = document.querySelector('.response-wrap') as HTMLUListElement
                ul.remove();
 
                const res = await getWeather(lat, lon);
                res.name = selectedCity.name
                
                //weather api error handler
                if (res.cod != 200 || res.serverError) {
                    reject(res)
                } else {
                    resolve(res)
                }

            })

            //add li to ul
            newUl.appendChild(newLi)
        }

        //add locations buttons to DOM
        searchContainer.appendChild(ulWrap)
    });
}