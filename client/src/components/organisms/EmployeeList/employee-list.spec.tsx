import { render, renderHook, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EmployeeList } from '.'
import { useEmployeesStore } from '../../../hooks/store/use-employees-store.hook'
import { useJourneysStore } from '../../../hooks/store/use-journeys-store.hook'
import { journeys } from '../../../mocks/msw/handlers/journeys'

describe('EmployeeList', () => {
  const setup = () => {
    const renderResult = render(<EmployeeList />)

    return {
      ...renderResult,
    }
  }

  beforeAll(async () => {
    const { result: employeeResult } = renderHook(() => useEmployeesStore())

    await employeeResult.current.getAllEmployees()
  })

  it('should render correctly', async () => {
    setup()

    expect(screen.getByRole('heading', { name: /nome: fritz/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /nome: sofia/i })).toBeInTheDocument()
  })
})
