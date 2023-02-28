import { ButtonHTMLAttributes, PropsWithChildren } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className='
    bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md'
    >
      {children}
    </button>
  )
}
