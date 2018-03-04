const
  express = require('express'),
  { PORT } = require('./browser-env'),
  favicon = require('serve-favicon'),
  { join } = require('path'),
  hbs = require('express-handlebars'),
  app = express()

// VIEW ENGINE
app.engine('hbs', hbs({
  extname: 'hbs'
}))
app.set('view engine', 'hbs')

// MIDDLEWARES
app.use(favicon(
  join(__dirname, '/public/images/favicon.png')
))
app.use(express.static(
  join(__dirname, '/public/')
))

// ROUTES
app.get('/', (req, res) => {
  res.render('main')
})

app.listen(PORT, () => console.log('App running..') )
