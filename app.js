/* dependencies & app setup */
const pizza = require('./pizza.js');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const app = express();

/* set the view engine */
app.set('views', './views');
app.set('view engine', 'ejs');

/* error logger, static routes */
app.use(express.static('public'));
app.use(logger('dev'));
app.use('/static', express.static(path.join(__dirname, 'public')));

//Goes to homepage- static html file
app.get('/', (request, response) => {
    response.sendFile('index.html', {root: 'public'});
});

//Menu Page with all of the pizzas - index.ejs
app.get("/pizza", function(request, response) {
	response.render( 'index', {pizza: pizza} )
});

//Individual pages with specific pizzas in different pages by id - pizza-single.ejs
app.get("/pizza/:id", function(request, response) {
	let id = request.params.id;
	response.render( 'single/pizza-single', pizza[id-1])
})

/* error handler */
app.get('*', function(request, response) {
  res.status(404).send({message: 'Oops! Not found.'});
});

/* setting up port & listen */
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});