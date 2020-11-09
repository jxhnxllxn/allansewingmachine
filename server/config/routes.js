const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const cookieParser = require('cookie-parser');
const compression = require('compression')

const fileUpload = require('express-fileupload');

// custom middleware
const errorHandler = require('../middlewares/error.middleware');

// Routes
const auth = require('../routes/auth.route');
const collection = require('../routes/collection.route');
const product = require('../routes/product.route');
const order = require('../routes/order.route');
const user = require('../routes/user.route');

module.exports = app => {
  app.use(mongoSanitize())
  app.use(cors())
  // app.use(
  //   helmet({
  //     contentSecurityPolicy: {
  //       directives: {
  //         defaultSrc: ["'self'"], 
  //         scriptSrc: ["'self'", 'allansewingmachines.herokuapp.com'],
  //         imgSrc: ["'self'", 'https://allansewingmachines.herokuapp.com/images', 'data:'],
  //         connectSrc: ["'self'", 'https://allansewingmachines.herokuapp.com'],
  //         objectSrc: ["'self'"],
  //         mediaSrc: ["'self'"],
  //         frameSrc: ["'self'"]
  //       },
  //     }
  //   })
  // );
  app.use(helmet())
  app.use(xss())
  app.use(express.json({ extended: false }))

  app.use('/api/auth', auth);
  app.use('/api/collection', collection);
  app.use('/api/product', product);
  app.use('/api/order', order);
  app.use('/api/user', user);

  app.use(fileUpload({
    useTempFiles: true
  }));


  app.get('/api/config/paypal',(req,res) => res.send({
      env:process.env.PAYPAL_ENV,
      currency:process.env.PAYPAL_CURRENCY,
      locale:process.env.PAYPAL_LOCALE,
      sandbox:process.env.PAYPAL_SANDBOX,
      production:process.env.PAYPAL_PRODUCTION,

  }));

  app.use(cookieParser());
  app.use(errorHandler);
  app.use(compression());
}
