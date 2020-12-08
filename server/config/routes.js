const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const cookieParser = require('cookie-parser')
const compression = require('compression')

const fileUpload = require('express-fileupload')

// custom middleware
const errorHandler = require('../middlewares/error.middleware')

// Routes
const user = require('../routes/user.route')
const collection = require('../routes/collection.route')
const category = require('../routes/category.route')
const product = require('../routes/product.route')
const order = require('../routes/order.route')

module.exports = (app) => {
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

  app.use('/api/user', user)
  app.use('/api/collection', collection)
  app.use('/api/category', category)
  app.use('/api/product', product)
  app.use('/api/order', order)

  app.get('/api/config/paypal', (req, res) =>
    res.send({
      clientId:
        process.env.NODE_ENV === 'production'
          ? process.env.PAYPAL_PRODUCTION
          : process.env.PAYPAL_SANDBOX,
      currency: process.env.PAYPAL_CURRENCY,
    })
  )

  app.use(
    fileUpload({
      useTempFiles: true,
    })
  )

  app.use(cookieParser())
  app.use(errorHandler)
  app.use(compression())
}
