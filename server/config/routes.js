const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const hpp = require('hpp')
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
  app.use(helmet())
  app.use(cors())
  app.use(hpp())
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
