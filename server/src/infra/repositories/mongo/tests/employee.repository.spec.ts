import { Collection } from 'mongodb';
import { IEvent } from '../../../../adapters/event/event';
import { InMemoryEventDispatcher } from '../../../../adapters/event/imp/in-memory/in-memory-dispatcher.event';
import { MongoClient } from '../../../../config/database/mongo-config';
import { Employee } from '../../../../domain/entities/employee.entity';
import { Journey } from '../../../../domain/value-objects/journey.valueobject';
import { EmployeeRepository } from '../../../../domain/repository/employee.repository';
import { MongoEmployeeRepository } from '../employee.repository';

describe('Mongo Employee Repository', () => {
  let employeeRepository: EmployeeRepository;
  let collection: Collection;

  const eventDispatcher = new InMemoryEventDispatcher();
  const startEvent: IEvent = {
    dataTimeOccurred: new Date(),
    eventData: {},
  };
  const mockEmployee = new Employee({
    name: 'dummy',
    registrationNumber: '123',
  });

  const mockJourney = new Journey({
    dispatcher: eventDispatcher,
    name: 'journey name',
    slug: 'journey',
    startEvent,
  });

  mockEmployee.linkJourney(mockJourney);

  beforeAll(async () => {
    employeeRepository = new MongoEmployeeRepository(MongoClient.getInstance());
    collection = MongoClient.getInstance().getDb().collection('employee');

    await collection.insertOne({
      id: mockEmployee.id,
      name: mockEmployee.name,
      registration_number: mockEmployee.registrationNumber,
      journey: {
        slug: mockEmployee?.journey.slug,
        name: mockEmployee?.journey.name,
      },
    });
  });

  it('should list all employees', async () => {
    const employees = await employeeRepository.listAll();

    expect(employees.length).toBe(1);
  });

  it('should get employee by id', async () => {
    const employee = await employeeRepository.getById(mockEmployee.id);

    expect(employee.id).toBe(mockEmployee.id);
    expect(employee.name).toBe(mockEmployee.name);
  });

  it('should create a new employee and add a journey to it', async () => {
    const employee = new Employee({
      name: 'joe doe',
      registrationNumber: '12333',
    });

    await employeeRepository.create(employee);

    let data = await collection.findOne({ id: employee.id });

    expect(data.name).toBe(employee.name);
    expect(data.registration_number).toBe(employee.registrationNumber);
    expect(data.journey.slug).toBeNull();
    expect(data.journey.name).toBeNull();

    employee.linkJourney(mockJourney);

    await employeeRepository.linkJourney(employee.id, employee.journey);

    data = await collection.findOne({ id: employee.id });
    expect(data.journey.slug).toBe(mockJourney.slug);
    expect(data.journey.name).toBe(mockJourney.name);
  });
});
