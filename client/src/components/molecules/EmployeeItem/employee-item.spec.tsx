import { render, renderHook, screen, waitFor } from '@testing-library/react'
import { EmployeeItem } from '.'
import { useJourneysStore } from '../../../hooks/store/use-journeys-store.store'
import { journeys } from '../../../mocks/msw/handlers/journeys'
import { Employee } from '../../../types/employee.type'

describe('EmployeeItem', () => {
  const mockedEmployee: Employee = {
    id: 'dummy',
    name: 'Joe Doe',
    registrationNumber: '123',
  }

  const setup = (employee = mockedEmployee) => {
    const renderResult = render(<EmployeeItem employee={employee} />)

    const saveButton = renderResult.getByRole('button', { name: /salvar/i })
    const journeysSelect = renderResult.getByRole('combobox')

    return {
      ...renderResult,
      saveButton,
      journeysSelect,
    }
  }

  beforeAll(async () => {
    const { result } = renderHook(() => useJourneysStore())

    await result.current.getAvailableJourneys()
  })

  it('should render correctly', async () => {
    const { saveButton, journeysSelect } = setup()

    expect(saveButton).toBeInTheDocument()
    expect(journeysSelect).toBeInTheDocument()
  })

  it('should list available journeys', async () => {
    setup()

    screen.logTestingPlaygroundURL()

    const options = screen.getAllByTestId('select-option')

    expect(options.length).toBe(journeys.length)
  })
})
