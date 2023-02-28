import { PropsWithChildren } from 'react'

interface ButtonProps {
  onClick?: () => void
}

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className='
    bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md'
    >
      {children}
    </button>
  )
}
