import { IEvent } from '../../../adapters/event/event';
import { InMemoryEventDispatcher } from '../../../adapters/event/imp/in-memory/in-memory-dispatcher.event';
import { Employee } from '../employee.entity';
import { Journey } from '../../value-objects/journey.valueobject';

describe('Employee entity', () => {
  const eventDispatcher = new InMemoryEventDispatcher();
  it('should create a new employee', () => {
    const name = 'Joe Doe';
    const registrationNumber = '123';

    const employee = new Employee({ name, registrationNumber });

    expect(employee.name).toBe(name);
    expect(employee.registrationNumber).toBe(registrationNumber);
    expect(employee.journey).toBe(undefined);
  });

  it('should link a journey to an Employee', () => {
    const journeySlug = 'journey';

    const employee = new Employee({ name: 'Dummy', registrationNumber: '123' });
    const journey = new Journey({
      slug: journeySlug,
      dispatcher: eventDispatcher,
      startEvent: <IEvent>{},
      name: 'dummy',
    });

    expect(employee.journey).toBe(undefined);

    employee.linkJourney(journey);

    expect(employee.journey).toBeInstanceOf(Journey);
    expect(employee.journey.slug).toBe(journeySlug);
  });

  it('should define a start date', () => {
    const date = new Date();
    const employee = new Employee({ name: 'Dummy', registrationNumber: '123' });

    expect(employee.startDate).toBeUndefined();

    employee.defineStartDate(date);

    expect(employee.startDate).toBe(date);
  });
});
