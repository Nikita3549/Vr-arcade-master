import { Router} from "express";
import {SessionController} from "../../controllers/sessions/sessionController.class";

const router = Router()
const sessionController = new SessionController()

router.post('/create', sessionController.createSession)
router.get('/:date', sessionController.getSessionsByDate)
router.post('/change/add-game', sessionController.addGame)
router.post('/change/add-device', sessionController.addDevice)
router.delete('/:id', sessionController.deleteSession)

export default router