import { Router } from 'express';
import { journeys } from '../../instances/journeys.instance';
import { Employee } from '../../../domain/entities/employee.entity';

const router = Router();

router.post('/:employeeId/journeys/:journeySlug', (req, res) => {
  console.log(req.params.employeeId);
  console.log(req.params.journeySlug);

  const employee = new Employee({
    name: 'test',
    registrationNumber: 'test',
    id: req.params.employeeId,
  });

  const journey = journeys.createJourney('admission-journey', employee);

  journey.start();

  return res.json().status(200);
});

export default router;
