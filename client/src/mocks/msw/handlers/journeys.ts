import { Journey } from '../../../types/journey.type'
import { rest } from 'msw'

export const journeys: Journey[] = [
  {
    slug: 'admission-journey',
    name: 'Admission Journey',
  },
  {
    slug: 'first-days-journey',
    name: 'First Days Journey',
  },
]

export const journeyHandlers = [
  rest.get('/journeys', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(journeys))
  }),
]
