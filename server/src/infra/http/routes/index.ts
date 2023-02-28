import { Router } from 'express';
import employeeRouter from './employee.router';
import journeysRouter from './journeys.router';

const router: Router = Router();

router.use('/employees', employeeRouter);
router.use('/journeys', journeysRouter);

export default router;
