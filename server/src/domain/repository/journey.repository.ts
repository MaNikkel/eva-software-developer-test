export interface JourneyRepository {
  create(slug: string, name: string): Promise<void>;
  listAllSlugs(): Promise<{ name: string; slug: string }[]>;
}
