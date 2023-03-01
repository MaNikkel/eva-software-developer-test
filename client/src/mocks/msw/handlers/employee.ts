import { rest } from 'msw'
import { Employee } from '../../../types/employee.type'

export const employees: Employee[] = [
  {
    name: 'Fritz',
    id: '1',
    registrationNumber: '1',
  },
  {
    name: 'Sofia',
    id: '2',
    registrationNumber: '2',
  },
]

export const employeeHandlers = [
  rest.get('/employees', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(employees))
  }),
]
