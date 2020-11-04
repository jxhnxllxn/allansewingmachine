const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cloudinary = require('cloudinary');

const connectDB = require('./config/db');

const app = express();
require('./config/config')
require('./config/routes')(app)
connectDB();

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