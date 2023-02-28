import React from 'react'
import { Button } from './components/atoms/Button'
import { EmployeeItem } from './components/molecules/EmployeeItem'
import { Employee } from './types/employee.type'

function App() {
  const employee: Employee = {
    id: 'asfd',
    name: 'Mathias',
    registrationNumber: '1233',
    startDate: new Date(),
    // journey: {
    //   name: 'Test',
    //   slug: 'test',
    // },
  }

  return (
    <>
      <EmployeeItem employee={employee} />
      <EmployeeItem employee={employee} />
    </>
  )
}

export default App
