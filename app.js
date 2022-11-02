/**  Need to require Express */
const express = require('express');

/**  Need to require HBS */
const hbs = require('hbs');

const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const { getEnabledCategories } = require('trace_events');
/**  Create the app Object */
const app = express();
const punkAPI = new PunkAPIWrapper();

/**  App configuration  */

/**  Set the templating engine  */
app.set('view engine', 'hbs');
// app.set('views', path.join(__dirname, 'views'));

/**  Specify the path of the stactic files */
/** In this line we add path.join */
app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + '/views/partials');
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index', { style: ['main.css'] });
});

app.get('/beers', async (req, res) => {
  const allBeer = await punkAPI.getBeers();

  res.render('beers', { allBeer: allBeer, style: ['main.css'] });
});

app.get('/random-beers', async (req, res) => {
  const randomBeer = await punkAPI.getRandom();

  res.render('randomBeers', { randomBeer: randomBeer, style: ['main.css'] });
});
// app.get('/random-beers:id', (req.params.id, res) => {
//   res.params.id.render('randomBeers', { randomBeer: randomBeer });
// });
/** app.get('/characters', async (req, res) => {
 * const rawResponse = await fetch('https......')
 * const data = await rawrESPONSE.JSON()
 *
 * const characters = data.results
 *
 * console.log(data)
 * res.render('characters',{characters: characters})
 * }) */
/**  The server need to listen to some port */

hbs.registerPartials(path.join(__dirname, 'views/partials'));
app.listen(3000, () => console.log('🏃‍ on port 3000'));

// const click = document.querySelector('.info');
// click.addEventListener('click', () => {
//   console.log('hello');
// });
