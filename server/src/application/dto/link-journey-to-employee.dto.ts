import { AvailableJourneys } from '../../domain/types/available-journeys-slugs';

export interface LinkJourneyToEmployeeDto {
  employeeId: string;
  journeySlug: AvailableJourneys;
  startDate: Date;
}
