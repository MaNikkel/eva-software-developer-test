import { useState } from 'react'
import { Employee } from '../../../types/employee.type'
import { Button } from '../../atoms/Button'
import DatePicker from 'react-datepicker'
import { useJourneysStore } from '../../../hooks/store/use-journeys-store.store'

interface EmployeeItemProps {
  employee: Employee
}

export const EmployeeItem: React.FC<EmployeeItemProps> = ({ employee }) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date())

  const { journeys } = useJourneysStore()

  return (
    <div className='border-2 rounded-md hover:bg-blue-50 border-zinc-900 m-2 p-1 flex justify-center'>
      <div className='flex justify-between max-w-screen-md  w-screen'>
        <div className='flex flex-col'>
          <h1 className='font-semibold text-2xl font-sans'>Nome: {employee.name}</h1>
          <h2 className='text-base text-gray-700'>Matrícula: {employee.registrationNumber}</h2>
        </div>

        <h2 className='flex flex-col'>
          Data de início:
          {employee?.startDate ? (
            <span className='w-36 h-10 py-2'>
              {new Date(employee?.startDate).toLocaleDateString()}
            </span>
          ) : (
            <DatePicker
              locale='pt-BR'
              customInput={
                <input className='block appearance-none w-36 h-10 bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500' />
              }
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          )}
        </h2>
        <h2 className='flex flex-col'>
          Jornada atual:
          <select className='block appearance-none w-36 h-10 bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'>
            {journeys.map((j) => (
              <option value={j.slug} key={j.slug} selected={j.slug === employee.journey?.slug}>
                {j.name}
              </option>
            ))}
          </select>
        </h2>
        <Button>Salvar</Button>
      </div>
    </div>
  )
}
