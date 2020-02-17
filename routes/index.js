const router = require('express').Router();
const peopleRouter = require('./people');

router.use('/', peopleRouter);

module.exports = router;