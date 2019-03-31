import cloneDeep from 'lodash/cloneDeep'
import set from 'lodash/set'
import { useEffect, useState } from 'react'
import validate from 'validate.js'

export default ({ constraints = {}, defaultValues = {}, onSubmit }) => {
  const [submitting, setSubmitting] = useState(false)
  const [validation, setValidation] = useState(null)
  const [values, setValues] = useState(defaultValues)

  useEffect(() => {
    setValidation(validate(values, constraints) || null)
  }, [constraints, values])

  const handleChange = event => {
    event.persist()

    let clone = cloneDeep(values)
    set(clone, event.target.name, event.target.value)

    setValues(values => clone)
  }

  const handleSubmit = async event => {
    setSubmitting(true)

    if (event) event.preventDefault()

    await onSubmit()

    setSubmitting(false)
  }

  return {
    handleChange,
    handleSubmit,
    setValues,
    submitting,
    validation,
    values,
  }
}
