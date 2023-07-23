const express = require('express')

const router = express.Router()

const roasterController = require('../controllers/roasters')
const isLoggedIn = require('../lib/isLoggedIn')

// router.get('/roaster/add', isLoggedIn, roasterController.roaster_create_get)
router.get('/roaster/add', roasterController.roaster_create_get)
router.post('/roaster/add', roasterController.roaster_create_post)
router.get('/roaster/index', roasterController.roaster_index_get)

module.exports = router
