import { useEffect } from 'react'
import { MainLayout } from './components/layouts/main'
import { EmployeeList } from './components/organisms/EmployeeList'
import { useEmployeesStore } from './hooks/store/use-employees-store.hook'
import { useJourneysStore } from './hooks/store/use-journeys-store.hook'

function App() {
  const { getAllEmployees } = useEmployeesStore()
  const { getAvailableJourneys } = useJourneysStore()

  useEffect(() => {
    Promise.all([getAllEmployees(), getAvailableJourneys()])
  }, [])

  return (
    <MainLayout>
      <EmployeeList />
    </MainLayout>
  )
}

export default App
