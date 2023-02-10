import express from 'express';
import rateLimit from 'express-rate-limit'
import cors from 'cors';
import router from './routes/weather.js'

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
const limiter = rateLimit({
    window: 60 * 1000,
    max: 10
});
app.use(limiter);
app.set('trust proxy', 1);
//routes
app.use('/api', router)

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))