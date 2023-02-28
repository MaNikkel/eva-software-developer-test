import { Journey } from './journey.type'

export type Employee = {
  registrationNumber: string
  name: string
  id: string
  startDate?: Date
  journey?: Journey
}
