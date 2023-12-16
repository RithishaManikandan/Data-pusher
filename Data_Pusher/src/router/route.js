const express =require('express')
const accountController = require('../Controller/accountcontroller')
const destintioncontroller = require('../Controller/destinationcontroller')


const router = express.Router()

router.post('/createAccount', accountController.createaccount)
router.get('/getAccount', accountController.getfilteraccount)
router.put('/updateAccount', accountController.updateaccount)
router.put('/DeleteAccount', accountController.DeleteAccount) //Instead of deleting marking as Isdeleted.


router.post('/createDestination', destintioncontroller.createdestination)
router.get('/getDestination', destintioncontroller.getfilterdestination)
router.put('/updateDestination',destintioncontroller.updatedestination )
router.put('/DeleteDestination', destintioncontroller.DeleteDestination) //Instead of deleting marking as Isdeleted.

module.exports = router