import { get } from 'shared/utils/api/markets'
import { signupWithPassword } from 'shared/utils/api/account'
import Title from 'shared/components/seo/title'
import { useEffect, useState } from 'react'
import useForm from 'shared/utils/hooks/useForm'

const splitAt = index => x => [x.slice(0, index), x.slice(index)]

export default () => {
  const [markets, setMarkets] = useState([])

  const { handleChange, handleSubmit, values } = useForm({
    constraints: {
      email: {
        email: true,
        presence: true,
      },
    },
    defaultValues: {
      brokerageName: null,
      email: null,
      firstName: null,
      hasAgent: null,
      lastName: null,
      leadSource: 'Real Estate Agent / MLS',
      marketOfInterest: null,
      phone: null,
      preApproved: null,
      type: null,
    },
    onSubmit,
  })

  async function onSubmit() {
    alert(JSON.stringify(values))
  }

  const handlePhoneChange = event => {
    event.preventDefault()

    const value = event.target.value.replace(/-/g, '')

    if (Number(value) && value.length < 11) {
      handleChange(event)

      if (value.length > 3) {
        let first, second, third
        ;[first, second] = splitAt(3)(value)

        event.target.value = `${first}-${second}`

        if (value.length > 7) {
          ;[second, third] = splitAt(3)(second)

          event.target.value = `${first}-${second}-${third}`
        }
      }
    } else {
      event.target.value = event.target.value.substring(
        0,
        event.target.value.length - 1,
      )
    }
  }

  useEffect(() => {
    get().then(response => setMarkets(response))
  }, [])

  return (
    <>
      <Title title="Qualify Now" />
      <div className="bg-gray-500 flex min-h-screen p-4 w-full">
        <form className="m-auto w-1/2" onSubmit={handleSubmit}>
          <div className="bg-white border flex flex-wrap p-2 rounded">
            <div className="w-full p-2">
              <label className="block pb-1 text-gray-500 w-full">
                Market of Interest
              </label>
              <select
                className="appearance-none block border p-2 rounded w-full"
                name="marketOfInterest"
                onChange={handleChange}
              >
                <option value={null} />
                {markets.map(market => (
                  <option value={market.id}>{market.name}</option>
                ))}
              </select>
            </div>
            <div className="w-full p-2">
              <label className="block pb-1 text-gray-500 w-full">
                Agent or Buyer?
              </label>
              <select
                className="appearance-none block border p-2 rounded w-full"
                name="type"
                onChange={handleChange}
              >
                <option value={null} />
                <option value="Agent">Agent</option>
                <option value="Buyer">Buyer</option>
              </select>
            </div>
            {values.type === 'Agent' && (
              <div className="w-full p-2">
                <input
                  className="block border p-2 rounded w-full"
                  name="brokerageName"
                  onChange={handleChange}
                  placeholder="Brokerage Name"
                />
              </div>
            )}
            {values.type === 'Buyer' && (
              <>
                <div className="w-1/2 p-2">
                  <label className="block pb-1 text-gray-500 w-full">
                    Have You Been Pre-Approved?
                  </label>
                  <select
                    className="appearance-none block border p-2 rounded w-full"
                    name="preApproved"
                    onChange={handleChange}
                  >
                    <option value={null} />
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div className="w-1/2 p-2">
                  <label className="block pb-1 text-gray-500 w-full">
                    Working with an Agent?
                  </label>
                  <select
                    className="appearance-none block border p-2 rounded w-full"
                    name="hasAgent"
                    onChange={handleChange}
                  >
                    <option value={null} />
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>
              </>
            )}
            <div className="w-1/2 p-2">
              <input
                className="block border p-2 rounded w-full"
                name="firstName"
                onChange={handleChange}
                placeholder="First Name"
              />
            </div>
            <div className="w-1/2 p-2">
              <input
                className="block border p-2 rounded w-full"
                name="lastName"
                onChange={handleChange}
                placeholder="Last Name"
              />
            </div>
            <div className="w-1/2 p-2">
              <input
                className="block border p-2 rounded w-full"
                name="email"
                onChange={handleChange}
                placeholder="Email Address"
                type="email"
              />
            </div>
            <div className="w-1/2 p-2">
              <input
                className="block border p-2 rounded w-full"
                name="phone"
                onChange={handlePhoneChange}
                placeholder="Phone"
                type="tel"
              />
            </div>
            <div className="p-2 w-full">
              <button
                className="bg-blue-500 hover:bg-blue-700 block p-2 rounded text-white w-full"
                type="submit"
              >
                Qualify to Tour
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
