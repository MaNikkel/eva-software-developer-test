import { render, renderHook, screen } from '@testing-library/react'
import { EmployeeList } from '.'
import { useEmployeesStore } from '../../../hooks/store/use-employees-store.hook'

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
