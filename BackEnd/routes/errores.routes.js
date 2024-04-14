import {Router} from "express";
import { addData,updData} from "../controllers/errores.controller.js";

const router = Router();

router.post('/add',addData);
router.put('/upd/:id',updData);

export default router;