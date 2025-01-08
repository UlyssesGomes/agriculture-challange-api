import { Router } from 'express';
import { AgricultureController } from '../controllers/agriculture.controller';

const router = Router();
const controller = new AgricultureController();

router.get('/', controller.getExample.bind(controller));

export default router;