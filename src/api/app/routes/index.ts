import {Router} from "express";
import clientRouter from "./client";
import gameRouter from "./game";
import sessionRouter from "./session";
import deviceRouter from "./device";

const router = Router()

router.use('/client', clientRouter)
router.use('/game', gameRouter)
router.use('/session', sessionRouter)
router.use('/device', deviceRouter)


export default router