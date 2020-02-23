const router = require('express').Router()
const { create, findAll, update, destroy} = require('../../controllers/product')
const authentication = require('../../middlewares/authentication')
const { admin } = require('../../middlewares/authorized')


router.use(authentication)
router.use(admin)

router.get('/', findAll)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', destroy)

module.exports = router