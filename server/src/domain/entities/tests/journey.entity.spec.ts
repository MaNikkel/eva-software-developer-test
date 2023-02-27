import { Journey } from '../journey.entity';
import { InMemoryEventDispatcher } from '../../../adapters/event/imp/in-memory/in-memory-dispatcher.event';
import { IEvent } from '../../../adapters/event/event';

describe('Journey entity', () => {
  const eventDispatcher = new InMemoryEventDispatcher();
  const startEvent: IEvent = {
    dataTimeOccurred: new Date(),
    eventData: {},
  };
  it('should create a new journey', () => {
    const name = 'journey';

    const journey = new Journey({
      name: name,
      dispatcher: eventDispatcher,
      startEvent,
    });

    expect(journey.name).toBe(name);
    expect(journey.id).toBeDefined();
  });

  it('should start a journey', () => {
    const name = 'journey';

    const journey = new Journey({
      name: name,
      dispatcher: eventDispatcher,
      startEvent,
    });

    const spy = jest.spyOn(eventDispatcher, 'notify');

    journey.start();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
