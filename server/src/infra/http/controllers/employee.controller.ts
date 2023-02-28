import { Request, Response } from 'express';
import { employeeRepository } from '../../instances/employee-repository.instance';
import { journeys } from '../../instances/journeys.instance';
import { LinkJourneyToEmployeeService } from '../../../application/services/link-journey-to-employee.service';
import { AvailableJourneys } from '../../../domain/types/available-journeys-slugs';
import { EmployeeNotFoundError } from '../../../application/errors/employee-not-found.error';

export class EmployeeController {
  private _linkJourneyToEmployeeService: LinkJourneyToEmployeeService;

  constructor() {
    this._linkJourneyToEmployeeService = new LinkJourneyToEmployeeService(
      employeeRepository,
      journeys,
    );
  }

  async linkJourney(req: Request, res: Response) {
    try {
      await this._linkJourneyToEmployeeService.execute({
        employeeId: req.params.employeeId,
        journeySlug: <AvailableJourneys>req.params.journeySlug,
      });

      return res.status(200).json({ ok: true });
    } catch (err) {
      if (err instanceof EmployeeNotFoundError) {
        return res.status(404).json(err);
      }
    }
  }
}
