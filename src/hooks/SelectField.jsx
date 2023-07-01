import { Field, ErrorMessage } from 'formik'

const SelectField = ({ options, name, id, className, style }) => {
  return (
    <>
      <Field
        name={name}
        id={id}
        as='select'
        className={`${className} bg-transparent py-4 rounded-lg outline-none cursor-pointer `}
        style={style}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
      <ErrorMessage name={name} component='div' className='error' />
    </>
  )
}

export default SelectField
