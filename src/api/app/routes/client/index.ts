import { Router, Request, Response, NextFunction} from "express";
import {ClientController} from "../../controllers/client/clientController.class";

const router = Router()
const clientController = new ClientController()

router.post('/create', clientController.createClient)
router.post('/sessions/', clientController.getClientSessions)
export default router