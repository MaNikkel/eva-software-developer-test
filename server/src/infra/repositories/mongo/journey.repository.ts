import { Collection } from 'mongodb';
import { MongoClient } from 'src/config/database/mongo-config';
import { Journey } from '../../../domain/entities/journey.entity';
import { JourneyRepository } from '../../../domain/repository/journey.repository';

export class MongoJourneyRepository implements JourneyRepository {
  private journeyCollection: Collection;

  constructor(private mongoClient: MongoClient) {
    this.journeyCollection = this.mongoClient.getDb().collection('journey');
  }

  async create(slug: string, name: string): Promise<void> {
    await this.journeyCollection.insertOne({
      slug,
      name,
    });
  }

  async listAllSlugs(): Promise<{ name: string; slug: string }[]> {
    const result = await this.journeyCollection.find().toArray();

    return result.map((r) => ({ slug: r?.slug, name: r?.name }));
  }
}
