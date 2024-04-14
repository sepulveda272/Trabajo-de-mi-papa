import {Router} from "express";
import { addData,delData,getData,updData} from "../controllers/pacientes.controllers.js";

const router = Router();

router.get('/get',getData);
router.post('/add',addData);
router.put('/upd/:id',updData);
router.delete('/del/:id',delData);


export default router;