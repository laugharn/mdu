import AccountContainer from '~/containers/account'
import { get } from 'shared/utils/api/markets'
import Title from 'shared/components/seo/title'
import { useContext, useEffect, useState } from 'react'
import useForm from 'shared/utils/hooks/useForm'

const splitAt = index => x => [x.slice(0, index), x.slice(index)]

export default () => {
  const [markets, setMarkets] = useState([])
  const { signupWithPassword, updateUser, user } = useContext(
    AccountContainer.Context,
  )
  const [qualified, setQualified] = useState(false)

  const { handleChange, handleSubmit, submitting, values } = useForm({
    defaultValues: {
      brokerageName: null,
      defaultMarketId: null,
      email: null,
      firstName: null,
      hasAgent: null,
      lastName: null,
      leadSource: 'Real Estate Agent / MLS',
      password: 'Passw0rd',
      phone: null,
      preApproved: null,
      type: null,
    },
    onSubmit,
  })

  async function onSubmit() {
    const {
      agentBrokerageName,
      defaultMarketId,
      email,
      firstName,
      hasAgent,
      lastName,
      password,
      phone,
      type,
    } = values

    try {
      await signupWithPassword({
        email,
        marketOfInterest: defaultMarketId,
        originationSource: 'Pecan RE Self-Qual',
        password,
      })

      await updateUser({
        email,
        firstName,
        lastName,
        phone,
        type,
      })

      setQualified(true)
    } catch (error) {}
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

  const Submitting = () => {
    return (
      <div className="flex p-2 w-full">
        <div className="flex m-auto p-2">
          <div className="bg-orange-500 h-4 mr-4 rounded-full w-4" />
          <div className="bg-orange-500 h-4 mr-4 rounded-full w-4" />
          <div className="bg-orange-500 h-4 rounded-full w-4" />
        </div>
      </div>
    )
  }

  return (
    <>
      <Title title="Qualify Now" />
      <div className="bg-gray-500 flex min-h-screen p-4 w-full">
        <div className="bg-white border m-auto p-2 rounded w-full lg:w-1/2">
          {submitting && <Submitting />}
          {qualified && !submitting && (
            <div className="font-serif p-2 text-3xl text-center w-full">
              Congratulations, you're qualified!
            </div>
          )}
          {!qualified && !submitting && (
            <>
              <div className="font-serif p-2 text-3xl text-center w-full">
                Qualify to Tour
              </div>
              <form className="flex flex-wrap" onSubmit={handleSubmit}>
                <div className="p-2 relative w-full">
                  <select
                    className="appearance-none block border p-2 rounded w-full"
                    name="defaultMarketId"
                    onChange={handleChange}
                  >
                    <option value={null}>Market of Interest</option>
                    {markets.map(market => (
                      <option key={market.id} value={market.id}>
                        {market.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
                <div className="p-2 relative w-full">
                  <select
                    className="appearance-none block border p-2 rounded w-full"
                    name="type"
                    onChange={handleChange}
                  >
                    <option value={null}>Agent or Buyer?</option>
                    <option value="Agent">Agent</option>
                    <option value="Buyer">Buyer</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
                {values.type === 'Agent' && (
                  <div className="p-2 w-full">
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
                    <div className="p-2 relative w-full lg:w-1/2">
                      <select
                        className="appearance-none block border p-2 rounded w-full"
                        name="preApproved"
                        onChange={handleChange}
                      >
                        <option value={null}>
                          Have You Been Pre-Approved?
                        </option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                    <div className="p-2 relative w-full lg:w-1/2">
                      <select
                        className="appearance-none block border p-2 rounded w-full"
                        name="hasAgent"
                        onChange={handleChange}
                      >
                        <option value={null}>Working With an Agent?</option>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </>
                )}
                <div className="p-2 w-full lg:w-1/2">
                  <input
                    className="block border p-2 rounded w-full"
                    name="firstName"
                    onChange={handleChange}
                    placeholder="First Name"
                  />
                </div>
                <div className="p-2 w-full lg:w-1/2">
                  <input
                    className="block border p-2 rounded w-full"
                    name="lastName"
                    onChange={handleChange}
                    placeholder="Last Name"
                  />
                </div>
                <div className="p-2 w-full lg:w-1/2">
                  <input
                    className="block border p-2 rounded w-full"
                    name="email"
                    onChange={handleChange}
                    placeholder="Email Address"
                    type="email"
                  />
                </div>
                <div className="p-2 w-full lg:w-1/2">
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
                    className="bg-orange-500 hover:bg-orange-700 block p-2 rounded text-white w-full"
                    type="submit"
                  >
                    Get Started
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  )
}
