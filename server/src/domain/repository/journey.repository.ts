export interface JourneyRepository {
  create(slug: string, name: string): Promise<void>;
  listAll(): Promise<{ name: string; slug: string }[]>;
}
