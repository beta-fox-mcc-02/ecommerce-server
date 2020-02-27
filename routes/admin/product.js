const router = require('express').Router()
const { create, update, destroy} = require('../../controllers/product')
const authentication = require('../../middlewares/authentication')
const { admin } = require('../../middlewares/authorized')


router.use(authentication)
router.use(admin)

router.post('/', create)
router.put('/:id', update)
router.delete('/:id', destroy)

module.exports = router