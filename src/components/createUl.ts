import getWeather from "../api/weather";

import { City } from "../ts/types";


const searchContainer = document.querySelector(".location-wrap") as HTMLDivElement;

export function createUl(city: City, countryParam?: string): Promise<any> {
    return new Promise((resolve, reject) => {
        //capatalise country name
        city.name = titleCase(city.name)

        //select cities by requested country
        if(countryParam != "") {
            const list: City['data']|any = [];
            city.data.forEach(element =>{
                if(element.country.toLowerCase() == countryParam) {
                    list.push(element)
                }
            })
            if(list.length > 0) {
                city.data = list
            }
        }

        //li limit
        let limit
        if (city.data.length > 5) {
            limit = 5;
        } else {
            limit = city.data.length
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
            newLi.innerText = `${city.name}, ${city.data[i].country}`

            const lat = city.data[i].coord.lat as number;
            const lon = city.data[i].coord.lon as number;

            //add event listener
            newLi.addEventListener('click', async () => {
                const ul = document.querySelector('.response-wrap') as HTMLUListElement
                ul.remove();
 
                const res = await getWeather(lat, lon);
                res.name = city.name
                
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

function titleCase(str: string) {
    var words = str.split(' ');
    for (var i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(' ');
  }