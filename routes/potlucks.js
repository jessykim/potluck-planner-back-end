import { Router } from 'express'
import * as potlucksCtrl from '../controllers/potlucks.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, potlucksCtrl.index)
router.get('/:id', checkAuth, potlucksCtrl.show)
router.post('/', checkAuth, potlucksCtrl.create)

export { router }