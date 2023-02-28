import { Router } from 'express';
import { journeys } from '../../instances/journeys.instance';
import { Employee } from '../../../domain/entities/employee.entity';
import { AvailableJourneys } from '../../../domain/types/available-journeys-slugs';
import { validate } from '../middleware/validation.middleware';
import { employeeJourneySchema } from '../validation/link-employee-journey.schema';
import { EmployeeController } from '../controllers/employee.controller';

const router = Router();

const controller = new EmployeeController();

router.post(
  '/:employeeId/journeys/:journeySlug',
  (req, res, next) =>
    validate(employeeJourneySchema, {
      employeeId: req.params.employeeId,
      journeySlug: req.params.journeySlug,
    })(res, next),
  (req, res) => {
    controller.linkJourney(req, res);
  },
);

export default router;
