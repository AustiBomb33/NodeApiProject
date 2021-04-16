require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

//set up bodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

//set up mongoose
const mongoose = require('mongoose');
mongoose.connect(
    process.env.DB_URI,
    {
        auth: {
            user: process.env.DB_USER,
            password: process.env.DB_PASS
        },
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true,
        useFindAndModify:false
    }
)
.catch(error => console.error(error));

//set up router
const routes = require('./routes');
const router = routes(express.Router());
app.use(router);

//error handling must be last middleware
const { handle404s, errorHandler } = require('./errorHandling');
app.use(handle404s);
app.use(errorHandler);

app.listen(process.env.PORT, () => { console.log(`listening on port ${process.env.PORT}`) });