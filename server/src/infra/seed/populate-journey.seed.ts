import { AvailableJourneys } from '../../domain/types/available-journeys-slugs';
import { MongoClient } from '../config/database/mongo-config';
import { journeyRepository } from '../instances/journey-repository.instance';

function makeTitle(slug: string) {
  const words = slug.split('-');

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    words[i] = word.charAt(0).toUpperCase() + word.slice(1);
  }

  return words.join(' ');
}

export async function populateJourneys() {
  await MongoClient.getInstance().getDb().collection('journey').deleteMany();

  const values = Object.values(AvailableJourneys);

  for (const value of values) {
    await journeyRepository.create(value, makeTitle(value));
  }
}
