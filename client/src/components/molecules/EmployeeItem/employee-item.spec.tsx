import { render, renderHook, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EmployeeItem } from '.'
import { useEmployeesStore } from '../../../hooks/store/use-employees-store.hook'
import { useJourneysStore } from '../../../hooks/store/use-journeys-store.hook'
import { journeys } from '../../../mocks/msw/handlers/journeys'
import { Employee } from '../../../types/employee.type'

jest.useFakeTimers().setSystemTime(new Date('2020-01-01T00:00:00.000Z'))
describe('EmployeeItem', () => {
  const mockedEmployee: Employee = {
    id: 'dummy',
    name: 'Joe Doe',
    registrationNumber: '123',
  }
  let linkSpy: jest.SpyInstance

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
    const { result: employeeResult } = renderHook(() => useEmployeesStore())

    await result.current.getAvailableJourneys()

    linkSpy = jest.spyOn(employeeResult.current, 'linkJourneyToEmployee')
  })

  it('should render correctly', async () => {
    const { saveButton, journeysSelect } = setup()

    expect(saveButton).toBeInTheDocument()
    expect(journeysSelect).toBeInTheDocument()
  })

  it('should list available journeys', async () => {
    setup()

    const options = screen.getAllByTestId('select-option')

    await waitFor(() => {
      expect(options.length).toBe(journeys.length)
    })
  })

  it('should save a journey to an employee', async () => {
    const { saveButton } = setup()

    userEvent.click(saveButton)

    await waitFor(() => {
      expect(linkSpy).toHaveBeenCalledTimes(1)
      expect(linkSpy).toHaveBeenCalledWith(
        'dummy',
        'admission-journey',
        new Date('2020-01-01T00:00:00.000Z'),
      )
    })
  })
})
