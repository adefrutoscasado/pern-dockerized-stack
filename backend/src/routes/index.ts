import { Router } from 'express'
import heartbeat from './heartbeat'
import uploads from './uploads'

const router = Router({ mergeParams: true })

router.use(heartbeat)
router.use(uploads)

export default router