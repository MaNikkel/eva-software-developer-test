import { journeyRepository } from '../../instances/journey-repository.instance';
import { ListAllJourneysService } from '../../../application/services/list-all-journeys.service';
import { Request, Response } from 'express';

export class JourneyController {
  private _listAllJourneysService: ListAllJourneysService;

  constructor() {
    this._listAllJourneysService = new ListAllJourneysService(
      journeyRepository,
    );
  }

  async getAllJourneys(_: Request, res: Response) {
    const journeys = await this._listAllJourneysService.execute();

    return res.status(200).json(journeys);
  }
}
