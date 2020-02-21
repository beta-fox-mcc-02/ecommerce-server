const router = require('express').Router();
const PeopleController = require('../controllers/people')

router.get('/findUser/:id', PeopleController.findPersonById);
router.get('/findUser', PeopleController.findAllPerson);
router.post('/register', PeopleController.register);
router.post('/login', PeopleController.login);

module.exports = router;
