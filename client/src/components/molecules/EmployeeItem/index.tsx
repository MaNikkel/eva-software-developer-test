import { useEffect, useState } from 'react'
import { Employee } from '../../../types/employee.type'
import { Button } from '../../atoms/Button'
import DatePicker from 'react-datepicker'
import { useJourneysStore } from '../../../hooks/store/use-journeys-store.hook'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useEmployeesStore } from '../../../hooks/store/use-employees-store.hook'

interface EmployeeItemProps {
  employee: Employee
}

type Inputs = {
  startDate: Date
  journeySlug: string
}

export const EmployeeItem: React.FC<EmployeeItemProps> = ({ employee }) => {
  const currentDate = new Date()

  const [startDate, setStartDate] = useState<Date | null>(currentDate)

  const { journeys } = useJourneysStore()
  const { linkJourneyToEmployee } = useEmployeesStore()

  const { register, handleSubmit, setValue } = useForm<Inputs>({
    defaultValues: {
      startDate: employee?.startDate ? new Date(employee?.startDate) : currentDate,
      // journeySlug: journeys[0]?.slug,
    },
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    linkJourneyToEmployee(employee.id, data.journeySlug, data.startDate)
  }

  const handleDateChange = (date: Date) => {
    if (date) {
      setStartDate(date)
      setValue('startDate', date)
    }
  }

  useEffect(() => {
    if (employee?.journey?.slug) setValue('journeySlug', employee?.journey?.slug)
    else if (journeys[0]?.slug) setValue('journeySlug', journeys[0]?.slug)
  }, [employee?.journey, journeys])

  return (
    <div className='border-2 rounded-md hover:bg-blue-50 border-zinc-900 m-2 p-1 flex justify-center'>
      <form
        className='flex justify-between max-w-screen-md  w-screen'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex flex-col max-w-md w-72'>
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
              // locale='pt-BR'
              customInput={
                <input
                  {...register('startDate')}
                  className='block appearance-none w-36 h-10 bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                />
              }
              selected={startDate}
              onChange={handleDateChange}
            />
          )}
        </h2>
        <h2 className='flex flex-col'>
          Jornada atual:
          <select
            {...register('journeySlug')}
            defaultValue={employee?.journey?.slug}
            className='block appearance-none w-36 h-10 bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
          >
            {journeys.map((j) => (
              <option data-testid='select-option' value={j.slug} key={j.slug}>
                {j.name}
              </option>
            ))}
          </select>
        </h2>
        <Button type='submit'>Salvar</Button>
      </form>
    </div>
  )
}
