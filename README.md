# 3d-weather-app
[Live demo](https://3d-weather-app.vercel.app)

This repo contains the code for my 3d weather website. I used [Threejs](https://threejs.org/) to create the 3d enviroment and [openweather](https://openweathermap.org/) for weather data.

![](https://raw.githubusercontent.com/Joheb133/3d-weather-app/main/public/weather-3d.gif)

## Backend info
GET requests are handled using vercel's serverless infastructure. To run the project locally, you'll need to install [vercel CLI](https://vercel.com/docs/cli). You'll also need to get an API key from [openweather](https://openweathermap.org/price "Openweather's API's"), make sure to scroll down to "Professional collections" and select any tier. Here are the [API docs](https://openweathermap.org/current), make sure you get the key for openweathers weather 2.5 API not their new 3.0 API.

#### Weather API
Used as a proxy to hide enviroment variables from client. Vercel cache control caches response for 10 minutes, this prevents unnecessary request to weather API.

#### Search API
As part of openweathers API, you can search for city's, this uses up API request limit so I've coded my own way of searching. A file storing city data, which I got from openweather, is stored in the data folder. The data folder contains the original.json, the minified version that uses hash tables to make for quick searches. The .gz file is a compressed file that halfs GET request time. 

The data from the file is cached for 1 day, which is longer than the serverless functions lifespan. Feel free to find a better hosting method for the hash_cty.json. For reliability it's best you host the file yourself incase this repo is ever deleted or restructured. 

## Intructions
Make sure vercel CLI is installed globally
```
npm install
vercel env add API_KEY_VALUE yourApiKey
vercel env add API_KEY_NAME appid
npm start or vercel dev
```
