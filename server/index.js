// index.js file for the server/db
const uuid = require('uuid');
const pg = require('pg');
const client = new pg.Client(process.env.DB_NAME || 'postgres://localhost/The-Acme-Reservation-Planner'); 


const createTables = async()=> {
  const SQL = /*sql*/
  `
    DROP TABLE IF EXISTS reservations;
    DROP TABLE IF EXISTS customers;
    DROP TABLE IF EXISTS restaurants;
    CREATE TABLE customers(
        id UUID PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE
    );
    CREATE TABLE restaurants(
        id UUID PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE
    );
    CREATE TABLE reservations(
        id UUID PRIMARY KEY,
        reservation_date DATE NOT NULL,
        party_count INTEGER NOT NULL,
        restaurant_id UUID REFERENCES restaurants(id) NOT NULL,
        customer_id UUID REFERENCES customers(id) NOT NULL
    );
  `;
  
  await client.query(SQL);
};

const createCustomer = async (name) => {
  const SQL = /*sql*/
  `
  INSERT INTO customers(id, name)
  VALUES ($1, $2) RETURNING *
  `;
  const response = await client.query(SQL, [uuid.v4(), name]);
  console.log('response-customers', response.rows[0]);
  return response.rows[0];
};

const createRestaurant = async (name) => {
  const SQL = /*sql*/
  `
  INSERT INTO restaurants(id, name)
  VALUES ($1, $2) RETURNING *
  `;
  const response = await client.query(SQL, [uuid.v4(), name]);
  console.log('response-restaurants', response.rows[0]);
  return response.rows[0];
};

const createReservation = async({ restaurant_id, customer_id, reservation_date, party_count }) => {
  const SQL = /*sql*/
  `
  INSERT INTO reservations(id, restaurant_id, customer_id, reservation_date, party_count) 
  VALUES($1, $2, $3, $4, $5) RETURNING *
  `;
  const response = await client.query(SQL, [uuid.v4(), restaurant_id, customer_id, reservation_date, party_count]);
  return response.rows[0];
};

const seed = async () => {
  await Promise.all([
    createCustomer('Matt'),
    createCustomer('Angela'),
    createCustomer('TJ'),
    createRestaurant('Carbone'),
    createRestaurant('Olive Garden'),
    createRestaurant('Mayfield')
  ])
};

const fetchCustomers = async () => {
  const SQL = /*sql*/
  `
  SELECT * from customers;
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchRestaurants = async () => {
  const SQL = /*sql*/
  `
  SELECT * from restaurants;
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchReservations = async()=> {
  const SQL = /*sql*/
  `
  SELECT * FROM reservations
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const destroyReservation = async ({ id, customer_id }) => {
  const SQL = /*sql*/
  `
  DELETE FROM reservations
  WHERE id = $1 AND customer_id = $2
  `;
  await client.query(SQL, [id, customer_id]);
};

module.exports = {
  client,
  createTables,
  createCustomer,
  createRestaurant,
  createReservation,
  seed,
  fetchCustomers,
  fetchRestaurants,
  fetchReservations,
  destroyReservation
};
   