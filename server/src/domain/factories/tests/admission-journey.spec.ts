import { AdmissionJourneyFactory } from '../admission-journey/admission-journey.factory';
import { Journey } from 'src/domain/value-objects/journey.valueobject';
import { IEventDispatcher } from 'src/adapters/event/dispatcher.event';
import { InMemoryEventDispatcher } from '../../../adapters/event/imp/in-memory/in-memory-dispatcher.event';

describe('Admission Journey', () => {
  let eventDispatcher: IEventDispatcher;

  let journey: Journey;

  beforeAll(() => {
    eventDispatcher = new InMemoryEventDispatcher();

    eventDispatcher.process();
  });

  afterEach(() => {
    journey.clearActions();
  });
  it('should create the journey', () => {
    journey = new AdmissionJourneyFactory({
      dispatcher: eventDispatcher,
      data: { name: 'Dummy', registrationNumber: '123' },
    }).create();

    expect(journey).toBeDefined();
  });

  it('should start the admission journey', async () => {
    const logSpy = jest.spyOn(console, 'log');

    journey = new AdmissionJourneyFactory({
      dispatcher: eventDispatcher,
      data: { name: 'Dummy', registrationNumber: '123' },
    }).create();

    journey.start();

    expect(journey).toBeDefined();
    expect(logSpy).toHaveBeenCalledTimes(3);
    expect(logSpy).toHaveBeenCalledWith({
      name: 'Dummy',
      registrationNumber: '123',
    });
    expect(logSpy).toHaveBeenCalledWith('documents');
    expect(logSpy).toHaveBeenCalledWith('finish journey');
  });
});
