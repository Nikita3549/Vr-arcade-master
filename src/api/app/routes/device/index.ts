import { Router} from "express";
import {DeviceController} from "../../controllers/device/deviceController.class";

const router = Router()
const deviceController = new DeviceController()

router.post('/create', deviceController.createDevice)
router.get('/:serialNumber', deviceController.getDeviceData)
router.get('/', deviceController.getAllDevices)
export default router