import { Request, Response } from 'express';
import { employeeRepository } from '../../instances/employee-repository.instance';
import { journeys } from '../../instances/journeys.instance';
import { LinkJourneyToEmployeeService } from '../../../application/services/link-journey-to-employee.service';
import { AvailableJourneys } from '../../../domain/types/available-journeys-slugs';
import { EmployeeNotFoundError } from '../../../application/errors/employee-not-found.error';
import { ListAllEmployeesService } from '../../../application/services/list-all-employees.service';

export class EmployeeController {
  private _linkJourneyToEmployeeService: LinkJourneyToEmployeeService;
  private _listAllEmployeesService: ListAllEmployeesService;

  constructor() {
    this._linkJourneyToEmployeeService = new LinkJourneyToEmployeeService(
      employeeRepository,
      journeys,
    );

    this._listAllEmployeesService = new ListAllEmployeesService(
      employeeRepository,
    );
  }

  async linkJourney(req: Request, res: Response) {
    try {
      await this._linkJourneyToEmployeeService.execute({
        employeeId: req.params.employeeId,
        journeySlug: <AvailableJourneys>req.params.journeySlug,
        startDate: new Date(req.body.startDate),
      });

      return res.status(200).json({ ok: true });
    } catch (err) {
      console.error(err);
      if (err instanceof EmployeeNotFoundError) {
        return res.status(404).json(err);
      }
    }
  }

  async getAllEmployees(req: Request, res: Response) {
    const employees = await this._listAllEmployeesService.execute();

    return res.status(200).json(employees);
  }
}
