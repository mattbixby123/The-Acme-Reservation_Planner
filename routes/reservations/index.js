const router = require('express').Router();

const { fetchReservations } = require('../../server');


// GET route for reservations
router.get('/', async (req, res, next) => {
 try {
  const reservations = await fetchReservations();
  res.status(200).send(reservations);
 } catch (ex) {
  next(ex)
 }
});


module.exports = router;