const ErrorResponse = require("../utils/errorResponse.util");

const errorHandler = (err, req, res, next) => {

    let error = { ...err };

    error.message = err.message
    // console.log(err);
    
    if(err.name === "Unauthorized"){
        const message = 'Unauthorizied to this route$';
        error = new ErrorResponse(message,401);
    }

    //Mongoose bad Object ID
    if(err.name === "CastError"){
        const message = `Resources not found with ID of ${err.value}`;
        error = new ErrorResponse(message,404);
    }

    if(err.name === 'MongoError' && err.code === 11000){
        const message = `Duplicate value entered`
        error = new ErrorResponse(message,400);
    }

    // Mongoose validation error
    if(err.name === 'ValidationError'){
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message,400);
    }

    res.status(error.statusCode || 500).json({
        success:false,
        error: error.message || 'Server Error'
    });
}

module.exports = errorHandler;