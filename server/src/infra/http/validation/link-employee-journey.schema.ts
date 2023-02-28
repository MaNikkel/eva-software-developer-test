import Joi from 'joi';
import { AvailableJourneys } from '../../../domain/types/available-journeys-slugs';

export const employeeJourneySchema = Joi.object().keys({
  employeeId: Joi.string().uuid(),
  startDate: Joi.date().required(),
  journeySlug: Joi.string().valid(...Object.values(AvailableJourneys)),
});
