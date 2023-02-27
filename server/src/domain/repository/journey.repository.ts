import { Journey } from '../entities/journey.entity';

export interface JourneyRepository {
  create(journey: Journey): Promise<void>;
  getBySlug(slug: string): Promise<Journey>;
  listAll(): Promise<Journey[]>;
}
