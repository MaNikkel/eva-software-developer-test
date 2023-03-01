import { create } from 'zustand'
import { apiService } from '../../services/api'
import { Employee } from '../../types/employee.type'

interface EmployeesStore {
  employees: Employee[]
  getAllEmployees: () => Promise<void>
  linkJourneyToEmployee: (employeeId: string, journeySlug: string, startDate: Date) => Promise<void>
}

export const useEmployeesStore = create<EmployeesStore>((set) => ({
  employees: [],

  linkJourneyToEmployee: async (employeeId: string, journeySlug: string, startDate: Date) => {
    try {
      await apiService.post(`/employees/${employeeId}/journeys/${journeySlug}`, {
        startDate: startDate.toISOString(),
      })

      set((state) => {
        const updatedEmployees = state.employees.map((e) =>
          e.id === employeeId ? { ...e, startDate } : e,
        )

        return {
          employees: updatedEmployees,
        }
      })
    } catch (err) {
      console.log(err)
    }
  },

  getAllEmployees: async () => {
    const { data } = await apiService.get<Employee[]>('/employees')

    set({ employees: data })
  },
}))
