const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// define paths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectory))


app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Vishal Arora'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Vishal Arora'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    helpText: 'you will be getting all the help here',
    name: 'Vishal Arora'
  })
})

app.get('/weather', (req, res) => {
  const address = req.query.address
  if (!address) {
    return res.send({
      error: 'You must provide an address'
    })
  }
  geoCode(address, (error, {longitude, latitude, location} = {}) => {
    if (error) {
      return res.send({
        error
      })
    }
    forecast(longitude, latitude, (error, forecast) => {
      if (error) {
        return res.send({error})
      } else {
        res.send({
          address,
          location,
          forecast
        })
      }
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: '404',
    errorMessage: 'Help article not found',
    name: 'Vishal Arora'
  })
})

app.get('*', (req, res) => {
  res.render('error', {
    title: '404',
    errorMessage: 'Page not found',
    name: 'Vishal Arora'
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})