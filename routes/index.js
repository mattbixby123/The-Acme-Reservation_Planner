const router = require('express').Router();

router.use('/restaurants', require('./restaurants')) // GET route for restaurants
router.use('/reservations', require('./reservations')); // GET route for reservations
router.use('/customers', require('./customers')); // GET Route for cusomters
router.use('/customers/:id/reservations', require('./customers')); // POST reservation route
router.use('/customers/:customer_id/reservations/:id', require('./customers')); //Delete route for reservations


module.exports = router;