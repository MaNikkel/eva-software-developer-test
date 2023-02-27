import { AdmissionJourneyFactory } from '../admission-journey/admission-journey.factory';
import { InMemoryEventDispatcher } from '../../../adapters/event/imp/in-memory/in-memory-dispatcher.event';
import { Journey } from 'src/domain/value-objects/journey.valueobject';

describe('Admission Journey', () => {
  const eventDispatcher = new InMemoryEventDispatcher();

  let journey: Journey;

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
    journey = new AdmissionJourneyFactory({
      dispatcher: eventDispatcher,
      data: { name: 'Dummy', registrationNumber: '123' },
    }).create();

    journey.start();

    expect(journey).toBeDefined();
  });
});
