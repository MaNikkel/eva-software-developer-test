import React, { useEffect } from 'react'
import { Button } from './components/atoms/Button'
import { EmployeeItem } from './components/molecules/EmployeeItem'
import { useEmployeesStore } from './hooks/store/use-employees-store.hook'
import { useJourneysStore } from './hooks/store/use-journeys-store.hook'
import { Employee } from './types/employee.type'

function App() {
  const { getAllEmployees, employees } = useEmployeesStore()
  const { getAvailableJourneys } = useJourneysStore()

  useEffect(() => {
    Promise.all([getAllEmployees(), getAvailableJourneys()])
  }, [])

  return (
    <>
      {employees.map((e) => (
        <EmployeeItem key={e.id} employee={e} />
      ))}
    </>
  )
}

export default App
