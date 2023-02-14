import getWeather from "../api/weather";

const locInput = document.getElementById("location-input") as HTMLInputElement;
const searchContainer = document.querySelector(".input") as HTMLDivElement;

export function removeUl() {
    const ul = document.querySelector('.response') as HTMLUListElement
    ul.remove();

    //remove event listeners
    Array.from(ul.children).forEach(element => {
        element.removeEventListener('click', async ()=>{});
    });
}

export function createUl(city: Array<{ [key: string]: any}>) {
        //li limit
        let limit
        if(city.length > 5) {
            limit = 5;
        } else {
            limit = city.length
        }

        //create location buttons
        let newUl = document.createElement("ul");
        newUl.className = 'response'
        for(let i = 0; i < limit; i++){
            //create li
            let newLi = document.createElement("li")
            newLi.innerText = `${city[i].name}, ${city[i].country}`

            const lat = city[i].coord.lat as number;
            const lon = city[i].coord.lon as number;

            //add event listener
            newLi.addEventListener('click', async ()=>{
                const res = await getWeather(lat, lon); //need to handle weather errors
                console.log(res)
                removeUl();
                locInput.value = '';
            })

            //add li to ul
            newUl.appendChild(newLi)
        }

        //add locations buttons to DOM
        searchContainer.appendChild(newUl)
}