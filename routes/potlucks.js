import { Router } from 'express'
import * as potlucksCtrl from '../controllers/potlucks.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)

router.get('/', checkAuth, potlucksCtrl.index)
// router.get('/id/rsvps', checkAuth, potlucksCtrl.rsvpIndex)
router.get('/:id', checkAuth, potlucksCtrl.show)

router.post('/', checkAuth, potlucksCtrl.create)
router.post('/:id/rsvps', checkAuth, potlucksCtrl.createRsvp)

router.put('/:id', checkAuth, potlucksCtrl.update)

router.delete('/:id', checkAuth, potlucksCtrl.delete)

export { router }