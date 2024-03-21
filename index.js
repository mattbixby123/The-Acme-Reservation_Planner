// root index.js file 

// require('dotenv').config(); // use once integrating dotenv at end
const express = require('express'); // line 1 or 2 for express
const app = express(); // line 2/2 for express
const { 
  client,
  createTables,
  createReservation,
  seed,
  fetchCustomers,
  fetchRestaurants,
  fetchReservations,
  destroyReservation 
} = require('./server'); //imports of modularized f(n)s from server/index.js 
const port = process.env.PORT || 3000; // port call for express server funcitonality
app.listen(port, ()=> {
    console.log(`listening on port ${port}`);
    console.log('some curl commands to test');
    console.log(`curl localhost:${port}/api/customers`);
    console.log(`curl localhost:${port}/api/restaurants`);
    console.log(`curl localhost:${port}/api/reservations`);
 });

// middleware - needed when integrating express for listening
app.use(express.json());
app.use(require('morgan')('dev')); //Log the requests as they come in with morgan
app.use('/api', require('./routes')); //call needed to link the express routes

// Route for error handling which returns an object with an error property
app.use((err, req, res, next)=> {
  res.status(err.status || 500).send({ error: err.message || err});
});

// init function
const init = async () => {
  console.log('connecting to db');
  await client.connect();
  console.log('connected to db');
  await createTables();
  console.log('create tables');
  await seed();
  console.log('database seeded')
  console.log(await fetchCustomers());
  console.log(await fetchRestaurants());

  const customers = await fetchCustomers();
  const restaurants = await fetchRestaurants();
  const [reservation, reservation2] = await Promise.all([
    createReservation({
      customer_id: customers[0].id,
      reservation_date: '02/14/2024',
      restaurant_id: restaurants[0].id,
      party_count: 4
    }),
    createReservation({
      customer_id: customers[1].id,
      reservation_date: '02/28/2024',
      restaurant_id: restaurants[1].id,
      party_count: 3
    }),
  ]);
  console.log(await fetchReservations());
  // await destroyReservation({ id: reservation.id, customer_id: reservation.customer_id});
  // console.log(await fetchReservations());
  
};

init();