import { PropsWithChildren } from 'react'

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='flex justify-center'>
      <div className='max-w-screen-md'>{children}</div>
    </div>
  )
}
