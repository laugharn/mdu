import Cookies from 'js-cookie'
import { Select } from 'shared/components/form'
import { useState } from 'react'

export default () => {
  const [environment, setEnvironment] = useState(
    Cookies.get('api_environment') || '',
  )

  const changeSelect = event => {
    setEnvironment(event.target.value)
  }

  const updateEnvironment = event => {
    if (environment === '') {
      Cookies.remove('api_environment')
    } else {
      Cookies.set('api_environment', environment)

      alert(`Environment set to ${environment}. Reloading the page.`)

      location.reload()
    }
  }

  return (
    <div className="bg-white border-b fixed flex p-2 w-full z-50">
      <div className="p-2 w-1/2 lg:w-3/4">
        <Select
          onChange={changeSelect}
          options={[
            { title: 'Select an Environment', value: '' },
            { title: 'Local', value: 'local' },
            { title: 'Dev', value: 'dev' },
            { title: 'QA', value: 'qa' },
            { title: 'Production', value: 'prod' },
          ]}
          value={environment}
        />
      </div>
      <div className="p-2 w-1/2 lg:w-1/4">
        <button
          className="bg-pink-500 block hover:bg-pink-700 block p-2 rounded text-center text-white w-full"
          onClick={updateEnvironment}
        >
          Update Environment
        </button>
      </div>
    </div>
  )
}
