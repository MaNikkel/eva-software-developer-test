import { JourneyRepository } from '../../../../domain/repository/journey.repository';
import { MongoClient } from '../../../../config/database/mongo-config';
import { MongoJourneyRepository } from '../journey.repository';
import { Collection } from 'mongodb';

describe('Mongo Journey Repository', () => {
  let journeyRepository: JourneyRepository;
  let collection: Collection;

  const recordsToAdd = [
    { slug: '1', name: 'One' },
    { slug: '2', name: 'Two' },
  ];

  beforeAll(async () => {
    journeyRepository = new MongoJourneyRepository(MongoClient.getInstance());

    collection = MongoClient.getInstance().getDb().collection('journey');

    const promises = recordsToAdd.map((record) =>
      collection.insertOne({ slug: record.slug, name: record.name }),
    );

    await Promise.all(promises);
  });

  afterEach(async () => await collection.deleteMany());
  it('should list all available journey slugs', async () => {
    const availableJourneys = await journeyRepository.listAllSlugs();

    expect(availableJourneys.length).toEqual(recordsToAdd.length);
  });
  it('should create a new journey', async () => {
    const slug = 'dummy';
    const name = 'dummy name';
    await journeyRepository.create(slug, name);

    const result = await collection.findOne({ slug: slug });

    expect(result.slug).toBe(slug);
    expect(result.name).toBe(name);
  });
});
