import { Field, ErrorMessage } from 'formik'

const InputField = ({ type, name, id, placeholder, className, style }) => {
  return (
    <div>
      <Field
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        className={`${className} bg-transparent py-4 rounded-lg indent-2 outline-none border-2 border-color2 focus:border-hover `}
        style={style}
      />
      <ErrorMessage name={name} component='div' className='error' />
    </div>
  )
}

export default InputField
