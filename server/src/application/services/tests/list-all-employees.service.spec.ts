import { MongoClient } from '../../../infra/config/database/mongo-config';
import { MongoEmployeeRepository } from '../../../infra/repositories/mongo/employee.repository';
import { InMemoryEventDispatcher } from '../../../adapters/event/imp/in-memory/in-memory-dispatcher.event';
import { InMemoryEventProcessor } from '../../../adapters/event/imp/in-memory/in-memory-processor.event';
import { JourneysFactory } from '../../../domain/factories/journeys/journeys.factory';
import { EmployeeRepository } from '../../../domain/repository/employee.repository';
import { Employee } from '../../../domain/entities/employee.entity';
import { LinkJourneyToEmployeeService } from '../link-journey-to-employee.service';
import { AvailableJourneys } from '../../../domain/types/available-journeys-slugs';
import { ListAllEmployeesService } from '../list-all-employees.service';

describe('ListAllEmployeesService', () => {
  let employeeRepository: EmployeeRepository;
  let listAllEmployeesService: ListAllEmployeesService;

  const mockEmployee = new Employee({
    name: 'Joe Doe',
    registrationNumber: '123',
  });

  beforeAll(async () => {
    employeeRepository = new MongoEmployeeRepository(MongoClient.getInstance());

    listAllEmployeesService = new ListAllEmployeesService(employeeRepository);

    await employeeRepository.create(mockEmployee);
  });

  it('should list all employees', async () => {
    const employees = await listAllEmployeesService.execute();

    expect(employees[0].id).toContain(mockEmployee.id);
  });
});
