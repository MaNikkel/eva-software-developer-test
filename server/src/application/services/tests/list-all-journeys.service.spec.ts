import { IEvent } from '../../../adapters/event/event';
import { InMemoryEventDispatcher } from '../../../adapters/event/imp/in-memory/in-memory-dispatcher.event';
import { JourneyRepository } from '../../../domain/repository/journey.repository';
import { AvailableJourneys } from '../../../domain/types/available-journeys-slugs';
import { Journey } from '../../../domain/value-objects/journey.valueobject';
import { MongoClient } from '../../../infra/config/database/mongo-config';
import { MongoJourneyRepository } from '../../../infra/repositories/mongo/journey.repository';
import { ListAllJourneysService } from '../list-all-journeys.service';

describe('ListAllJourneysService', () => {
  let journeyRepository: JourneyRepository;
  let listAllJourneysService: ListAllJourneysService;
  const dispatcher = new InMemoryEventDispatcher();

  const mockJourney = new Journey({
    name: 'Joe Doe',
    slug: AvailableJourneys.ADMISSION,
    dispatcher,
    startEvent: <IEvent>{},
  });

  beforeAll(async () => {
    journeyRepository = new MongoJourneyRepository(MongoClient.getInstance());

    listAllJourneysService = new ListAllJourneysService(journeyRepository);

    await journeyRepository.create(mockJourney.slug, mockJourney.name);
  });

  it('should list all employees', async () => {
    const journeys = await listAllJourneysService.execute();

    expect(journeys[0].slug).toContain(mockJourney.slug);
  });
});
