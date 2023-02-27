import { AdmissionJourneyFactory } from '../admission-journey/admission-journey.factory';
import { InMemoryEventDispatcher } from '../../../adapters/event/imp/in-memory/in-memory-dispatcher.event';
import { Journey } from 'src/domain/entities/journey.entity';

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

  it('should start the journey journey', async () => {
    journey = new AdmissionJourneyFactory({
      dispatcher: eventDispatcher,
      data: { name: 'Dummy', registrationNumber: '123' },
    }).create();

    journey.start();

    expect(journey).toBeDefined();
  });
});
