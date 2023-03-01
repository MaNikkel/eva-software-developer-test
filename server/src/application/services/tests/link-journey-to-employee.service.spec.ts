import { MongoClient } from '../../../infra/config/database/mongo-config';
import { MongoEmployeeRepository } from '../../../infra/repositories/mongo/employee.repository';
import { InMemoryEventDispatcher } from '../../../adapters/event/imp/in-memory/in-memory-dispatcher.event';
import { InMemoryEventProcessor } from '../../../adapters/event/imp/in-memory/in-memory-processor.event';
import { JourneysFactory } from '../../../domain/factories/journeys/journeys.factory';
import { EmployeeRepository } from '../../../domain/repository/employee.repository';
import { Employee } from '../../../domain/entities/employee.entity';
import { LinkJourneyToEmployeeService } from '../link-journey-to-employee.service';
import { AvailableJourneys } from '../../../domain/types/available-journeys-slugs';

describe('LinkJourneyToEmployeeService', () => {
  const processor = new InMemoryEventProcessor();
  const dispatcher = new InMemoryEventDispatcher();

  let employeeRepository: EmployeeRepository;
  let linkJourneyToEmployeeService: LinkJourneyToEmployeeService;
  const journeysFactory = new JourneysFactory({ dispatcher, processor });

  const mockEmployee = new Employee({
    name: 'Joe Doe',
    registrationNumber: '123',
  });

  beforeAll(async () => {
    employeeRepository = new MongoEmployeeRepository(MongoClient.getInstance());
    journeysFactory.create();

    linkJourneyToEmployeeService = new LinkJourneyToEmployeeService(
      employeeRepository,
      journeysFactory,
    );

    await employeeRepository.create(mockEmployee);
  });

  it('should link a journey to an employee', async () => {
    const journeySlug = AvailableJourneys.ADMISSION;
    const date = new Date();

    await linkJourneyToEmployeeService.execute({
      employeeId: mockEmployee.id,
      journeySlug,
      startDate: date,
    });

    const updatedData = await MongoClient.getInstance()
      .getDb()
      .collection('employee')
      .findOne({ id: mockEmployee.id });

    expect(updatedData.journey.slug).toBe(AvailableJourneys.ADMISSION);
    expect(updatedData.start_date).toBe(date.toISOString());
  });
});
