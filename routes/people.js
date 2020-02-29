const router = require('express').Router();
const PeopleController = require('../controllers/people');
const authentication = require('../middlewares/authentication');
const { authorizationMaster } = require('../middlewares/authorization')

router.get('/findUser/:id', PeopleController.findPersonById);
router.get('/findUser', PeopleController.findAllPerson);
router.delete('/findUser/:id', authentication, authorizationMaster,PeopleController.deletePerson);
router.post('/register', PeopleController.register);
router.post('/login', PeopleController.login);

module.exports = router;
