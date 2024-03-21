const router = require('express').Router();

const { fetchCustomers, createReservation, destroyReservation } = require('../../server');

//GET route to fetch all customers
router.get('/', async (req, res, next) => {
  try {
    const customers = await fetchCustomers();
    res.status(200).send(customers);
  } catch (ex) {
    next(ex)
  }
})

//POST route for creating a reservation for the user
router.post('/',  async(req, res, next)=> {
  try {
    const customerId = req.params.customer_id;
    console.log('Customer ID:', customerId);
    res.status(201).send(await createReservation({ 
        customer_id: req.params.customer_id, 
        restaurant_id: req.body.restaurant_id, 
        reservation_date: req.body.reservation_date, 
        party_count: req.body.party_count
      })); 
  }
  catch(ex){
      next(ex);
  }
});

// DELETE route to destroy a Reservation for a user
router.delete('/', async (req, res, next) => {
  try {
      await destroyReservation({ customer_id: req.params.customer_id, id: req.params.id });
      res.sendStatus(204); // Send a 204 No Content response upon successful deletion
  } catch (ex) {
      next(ex);
  }
});


module.exports = router;