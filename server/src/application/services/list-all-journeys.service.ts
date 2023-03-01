import { JourneyRepository } from '../../domain/repository/journey.repository';

export class ListAllJourneysService {
  constructor(private journeyRepository: JourneyRepository) {}

  async execute() {
    const journeys = await this.journeyRepository.listAll();

    return journeys;
  }
}
