const router = require('express').Router();

router.use('/restaurants', require('./restaurants')) // GET route for restaurants
router.use('/reservations', require('./reservations')); // GET route for reservations
router.use('/customers', require('./customers')); // GET customers / POST reservation / and DELETE reservation

module.exports = router;