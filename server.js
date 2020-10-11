const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');

const bodyParser = require('body-parser');
const errorHandler = require('./middlewares/error.middleware');
const connectDB = require('./config/db');


// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect Database
connectDB();

// Route files
const auth = require('./routes/auth.route');
const collection = require('./routes/product/collection.route');
const category = require('./routes/product/category.route');
const product = require('./routes/product/product.route');
const order = require('./routes/order.route');
const user = require('./routes/user.route');


const app = express();

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

//Cooki Parser
app.use(cookieParser());

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})


// Dev logging middleware;
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//File uploading
app.use(fileUpload({
    useTempFiles: true
}));

//Mongo Sanitize security
app.use(mongoSanitize());

//Helmet set security hearder
app.use(helmet());

//Prevent XSS attacks
app.use(xss());

//Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,//10 mins
    max: 100
});

app.use(limiter);

//Prevent http params pollution
app.use(hpp());

//set static folder
// app.use(express.static(path.join(__dirname,'public')));
// app.use(express.static('client/build'))


//Mount routers
app.use('/api/auth', auth);
app.use('/api/collection', collection);
app.use('/api/category', category);
app.use('/api/product', product);
app.use('/api/order', order);
app.use('/api/user', user);


// middlewares
app.use(errorHandler);


if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}



const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

//Handle unhandle promise rejection
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // close server exit process
    server.close(() => process.exit(1));
})