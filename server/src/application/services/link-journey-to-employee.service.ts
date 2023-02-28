import { JourneysFactory } from '../../domain/factories/journeys/journeys.factory';
import { EmployeeRepository } from '../../domain/repository/employee.repository';
import { LinkJourneyToEmployeeDto } from '../dto/link-journey-to-employee.dto';
import { EmployeeNotFoundError } from '../errors/employee-not-found.error';

export class LinkJourneyToEmployeeService {
  constructor(
    private employeeRepository: EmployeeRepository,
    private journeysFactory: JourneysFactory,
  ) {}

  async execute({
    employeeId,
    journeySlug,
    startDate,
  }: LinkJourneyToEmployeeDto) {
    const employee = await this.employeeRepository.getById(employeeId);

    if (!employee) {
      throw new EmployeeNotFoundError('Employee not found', employee);
    }

    const journey = this.journeysFactory.createJourney(journeySlug, {
      name: employee.name,
      registrationNumber: employee.registrationNumber,
      id: employee.id,
    });

    employee.defineStartDate(startDate);

    employee.linkJourney(journey);

    await this.employeeRepository.setStartDate(employee.id, startDate);
    await this.employeeRepository.linkJourney(employee.id, journey);

    employee.journey?.start();
  }
}
