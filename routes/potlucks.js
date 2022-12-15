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
router.get('/:id/drinks', checkAuth, potlucksCtrl.drinkIndex)
router.get('/:id/items', checkAuth, potlucksCtrl.itemIndex)

router.post('/', checkAuth, potlucksCtrl.create)
router.post('/:id/rsvps', checkAuth, potlucksCtrl.createRsvp)
router.post('/:id/foods', checkAuth, potlucksCtrl.createFood)
router.post('/:id/drinks', checkAuth, potlucksCtrl.createDrink)
router.post('/:id/items', checkAuth, potlucksCtrl.createItem)

router.put('/:id', checkAuth, potlucksCtrl.update)
router.put('/:potluckId/rsvps/:rsvpId', checkAuth, potlucksCtrl.updateRsvp)
router.put('/:potluckId/foods/:foodId', checkAuth, potlucksCtrl.updateFood)
router.put('/:potluckId/drinks/:drinkId', checkAuth, potlucksCtrl.updateDrink)
router.put('/:potluckId/items/:itemId', checkAuth, potlucksCtrl.updateItem)

router.delete('/:id', checkAuth, potlucksCtrl.delete)
router.delete('/:potluckId/rsvps/:rsvpId', checkAuth, potlucksCtrl.deleteRsvp)
router.delete('/:potluckId/foods/:foodId', checkAuth, potlucksCtrl.deleteFood)
router.delete('/:potluckId/drinks/:drinkId', checkAuth, potlucksCtrl.deleteDrink)
router.delete('/:potluckId/items/:itemId', checkAuth, potlucksCtrl.deleteItem)

export { router }