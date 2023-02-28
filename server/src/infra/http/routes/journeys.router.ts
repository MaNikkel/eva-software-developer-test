import { Router } from 'express';
import { JourneyController } from '../controllers/journey.controller';

const router = Router();

const controller = new JourneyController();

router.get('/', (req, res) => controller.getAllJourneys(req, res));
export default router;
