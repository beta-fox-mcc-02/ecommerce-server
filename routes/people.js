const router = require('express').Router();
const PeopleController = require('../controllers/people')

router.post('/register', PeopleController.register);
router.post('/login', PeopleController.login);

module.exports = router;