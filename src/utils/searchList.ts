import getWeather from "../api/weather";

const searchContainer = document.querySelector(".input") as HTMLDivElement;

export function createUl(city: Array<{ [key: string]: any }>): Promise<any> {
    return new Promise((resolve, reject) => {

        //li limit
        let limit
        if (city.length > 5) {
            limit = 5;
        } else {
            limit = city.length
        }

        //create location buttons
        let newUl = document.createElement("ul");
        newUl.className = 'response'

        for (let i = 0; i < limit; i++) {
            //create li
            let newLi = document.createElement("li")
            newLi.innerText = `${city[i].name}, ${city[i].country}`

            const lat = city[i].coord.lat as number;
            const lon = city[i].coord.lon as number;

            //add event listener
            newLi.addEventListener('click', async () => {
                const ul = document.querySelector('.response') as HTMLUListElement
                ul.remove();
 
                const res = await getWeather(lat, lon);
                
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
        searchContainer.appendChild(newUl)
    });
}