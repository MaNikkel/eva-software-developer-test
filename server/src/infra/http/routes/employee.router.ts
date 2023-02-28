import { Router } from 'express';
import { EmployeeController } from '../controllers/employee.controller';
import { validate } from '../middleware/validation.middleware';
import { employeeJourneySchema } from '../validation/link-employee-journey.schema';

const router = Router();

const controller = new EmployeeController();

router.get('/', (req, res) => controller.getAllEmployees(req, res));

router.post(
  '/:employeeId/journeys/:journeySlug',
  (req, res, next) =>
    validate(employeeJourneySchema, {
      employeeId: req.params.employeeId,
      journeySlug: req.params.journeySlug,
      startDate: req.body.startDate,
    })(res, next),
  (req, res) => {
    controller.linkJourney(req, res);
  },
);

export default router;
