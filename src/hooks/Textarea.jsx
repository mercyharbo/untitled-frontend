import { Field, ErrorMessage } from 'formik'

const TextareaField = ({ name, id, placeholder, className, style, row, col }) => {
  return (
    <div>
      <Field
        as='textarea'
        name={name}
        id={id}
        rows={row || 5}
        cols={col || 50}
        placeholder={placeholder}
        className={`${className} bg-transparent py-4 rounded-lg indent-2 outline-none border-2 border-color2 focus:border-hover`}
        style={style}
      />
      <ErrorMessage
        name={name}
        component='span'
        className='text-sm font-medium text-red'
      />
    </div>
  )
}

export default TextareaField
