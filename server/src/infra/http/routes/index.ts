import { Router } from 'express';
import employeeRouter from './employee.router';

const router: Router = Router();

router.use('/employee', employeeRouter);

export default router;
