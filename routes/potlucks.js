import { Router } from 'express'
import * as potlucksCtrl from '../controllers/potlucks.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)

router.get('/', checkAuth, potlucksCtrl.index)
router.get('/:id', checkAuth, potlucksCtrl.show)
router.get('/:id/foods', checkAuth, potlucksCtrl.foodIndex)

router.post('/', checkAuth, potlucksCtrl.create)
router.post('/:id/rsvps', checkAuth, potlucksCtrl.createRsvp)
router.post('/:id/foods', checkAuth, potlucksCtrl.createFood)

router.put('/:id', checkAuth, potlucksCtrl.update)
router.put('/:potluckId/rsvps/:rsvpId', checkAuth, potlucksCtrl.updateRsvp)
router.put('/:potluckId/foods/:foodId', checkAuth, potlucksCtrl.updateFood)

router.delete('/:id', checkAuth, potlucksCtrl.delete)
router.delete('/:potluckId/rsvps/:rsvpId', checkAuth, potlucksCtrl.deleteRsvp)

export { router }