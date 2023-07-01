import React from 'react'

// Define the props for the button component
const Button = ({ type, name, label, onClick, disabled, icons, className }) => {
  return (
    <button
      type={type}
      name={name}
      onClick={onClick}
      disabled={disabled}
      className={`${className} 2xl:h-36 md:h-[50px] sm:h-[50px] px-4 border-none rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <span className='text-[20px] '>{icons}</span>
      {label}
    </button>
  )
}

export default Button
