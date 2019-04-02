import cloneDeep from 'lodash/cloneDeep'
import set from 'lodash/set'
import { useEffect, useState } from 'react'

export default ({ defaultValues = {}, onSubmit, rules = null }) => {
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [validationErrors, setValidationErrors] = useState([])
  const [values, setValues] = useState(defaultValues)

  useEffect(() => {}, [rules, values])

  const handleChange = event => {
    event.persist()

    let clone = cloneDeep(values)
    set(clone, event.target.name, event.target.value)

    setValues(values => clone)
  }

  const handleSubmit = async event => {
    setSubmitting(true)

    if (event) event.preventDefault()

    try {
      await onSubmit()
    } catch (caughtError) {
      setError(caughtError.response)
    }

    setSubmitting(false)
  }

  return {
    error,
    handleChange,
    handleSubmit,
    setValues,
    submitting,
    validationErrors,
    values,
  }
}
