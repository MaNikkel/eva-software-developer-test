import { Router } from 'express';
import { journeys } from '../../instances/journeys.instance';
import { Employee } from '../../../domain/entities/employee.entity';
import { AvailableJourneys } from '../../../domain/types/available-journeys-slugs';
import { validate } from '../middleware/validation.middleware';
import { employeeJourneySchema } from '../validation/link-employee-journey.schema';

const router = Router();

router.post(
  '/:employeeId/journeys/:journeySlug',
  (req, res, next) =>
    validate(employeeJourneySchema, {
      employeeId: req.params.employeeId,
      journeySlug: req.params.journeySlug,
    })(res, next),
  (req, res) => {
    const employee = new Employee({
      name: 'test',
      registrationNumber: 'test',
      id: req.params.employeeId,
    });

    const journey = journeys.createJourney(
      AvailableJourneys.ADMISSION,
      employee,
    );

    journey.start();

    return res.status(201).json({ ok: true });
  },
);

export default router;
