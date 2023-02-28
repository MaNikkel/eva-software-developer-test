import { useEmployeesStore } from '../../../hooks/store/use-employees-store.hook'
import { EmployeeItem } from '../../molecules/EmployeeItem'

export const EmployeeList: React.FC = () => {
  const { employees } = useEmployeesStore()

  return (
    <div>
      {employees.map((e) => (
        <EmployeeItem key={e.id} employee={e} />
      ))}
    </div>
  )
}
