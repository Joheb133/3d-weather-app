import express from 'express';
import rateLimit from 'express-rate-limit'
import cors from 'cors';
import weatherRouter from './routes/weather.js'
import searchRouter from './routes/search.js'

const PORT = 5000;

const app = express();

//frontend folder (static folder)
//app.use(express.static('dist'))

// enable cors
const corsOptions = {
    origin: "*",
}
app.use(cors(corsOptions));

//rate limit
const weatherLimit = rateLimit({
    windowMs: 60 * 1000, //60s
    max: 20
});

const searchLimit = rateLimit({
    windowMs: 60 * 1000, //60s
    max: 30
})
app.set('trust proxy', 1);
//routes
app.use('/weather', weatherLimit, weatherRouter)
app.use('/search', searchLimit, searchRouter)

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))