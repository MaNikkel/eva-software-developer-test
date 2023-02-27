import { Employee } from '../employee.entity';
import { Journey } from '../journey.entity';

describe('Employee entity', () => {
  it('should create a new employee', () => {
    const name = 'Joe Doe';
    const registrationNumber = '123';

    const employee = new Employee({ name, registrationNumber });

    expect(employee.name).toBe(name);
    expect(employee.registrationNumber).toBe(registrationNumber);
    expect(employee.journey).toBe(undefined);
  });

  it('should link a journey to an Employee', () => {
    const journeyName = 'journey';

    const employee = new Employee({ name: 'Dummy', registrationNumber: '123' });
    const journey = new Journey({ name: journeyName });

    expect(employee.journey).toBe(undefined);

    employee.linkJourney(journey);

    expect(employee.journey).toBeInstanceOf(Journey);
    expect(employee.journey.name).toBe(journeyName);
  });
});
