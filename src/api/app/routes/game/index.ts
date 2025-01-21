import {Express, Request, Router} from "express";
import {GameController} from "../../controllers/game/gameController.class";
import {upload} from "./multer";


const gameController = new GameController()
const  router = Router()

router.get('/', gameController.getAllGames)
router.post('/create', upload.single('image'), gameController.createGame)
router.get('/getImage/:pathToImage', gameController.getImage)
router.get('/:name', gameController.getGameInfo)


export default router