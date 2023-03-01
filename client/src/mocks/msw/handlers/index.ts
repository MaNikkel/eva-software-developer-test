import { employeeHandlers } from './employee'
import { journeyHandlers } from './journeys'

export const handlers = [...journeyHandlers, ...employeeHandlers]
