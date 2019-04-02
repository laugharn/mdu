import AccountContainer from '~/containers/account'
import { get } from 'shared/utils/api/markets'
import { Input, Select } from 'shared/components/form'
import Title from 'shared/components/seo/title'
import { useContext, useEffect, useState } from 'react'
import useForm from 'shared/utils/hooks/useForm'

const splitAt = index => x => [x.slice(0, index), x.slice(index)]

export default () => {
  const [markets, setMarkets] = useState([])
  const { qualifyToTour, user } = useContext(AccountContainer.Context)

  const [qualified, setQualified] = useState(false)

  const { handleChange, handleSubmit, submitting, values } = useForm({
    defaultValues: {
      agentBrokerageName: null,
      marketOfInterest: null,
      email: null,
      firstName: null,
      hasAgent: null,
      lastName: null,
      phone: null,
      preApproved: null,
      type: null,
    },
    onSubmit,
  })

  async function onSubmit() {
    try {
      await qualifyToTour({
        ...values,
        bungalo: false,
        homeToursUnlocked: true,
        leadSource: 'Real Estate Agent / MLS',
        originationSource: 'Pecan RE Self-Qual',
        password: 'Passw0rd',
        retailSales: true,
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
      <div className="bg-gray-300 flex min-h-screen p-4 w-full">
        <div className="bg-white border shadow-xl m-auto p-2 rounded w-full lg:w-1/2">
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
                <div className="p-2 w-full">
                  <Select
                    name="marketOfInterest"
                    onChange={handleChange}
                    options={[
                      { title: 'Market of Interest', value: null },
                      ...markets.map(market => ({
                        title: market.name,
                        value: market.id,
                      })),
                    ]}
                  />
                </div>
                <div className="p-2 w-full">
                  <Select
                    name="type"
                    onChange={handleChange}
                    options={[
                      { title: 'Agent or Buyer?', value: null },
                      { title: 'Agent', value: 'Agent' },
                      { title: 'Buyer', value: 'Buyer' },
                    ]}
                  />
                </div>
                {values.type === 'Agent' && (
                  <div className="p-2 w-full">
                    <Input
                      name="agentBrokerageName"
                      onChange={handleChange}
                      placeholder="Brokerage Name"
                    />
                  </div>
                )}
                {values.type === 'Buyer' && (
                  <>
                    <div className="p-2 w-full lg:w-1/2">
                      <Select
                        name="preApproved"
                        onChange={handleChange}
                        options={[
                          { title: 'Have You Been Pre-Approved', value: null },
                          { title: 'Yes', value: 'yes' },
                          { title: 'No', value: 'no' },
                        ]}
                      />
                    </div>
                    <div className="p-2 w-full lg:w-1/2">
                      <Select
                        name="hasAgent"
                        onChange={handleChange}
                        options={[
                          { title: 'Working with an Agent?', value: null },
                          { title: 'Yes', value: true },
                          { title: 'No', value: false },
                        ]}
                      />
                    </div>
                  </>
                )}
                <div className="p-2 w-full lg:w-1/2">
                  <Input
                    name="firstName"
                    onChange={handleChange}
                    placeholder="First Name"
                  />
                </div>
                <div className="p-2 w-full lg:w-1/2">
                  <Input
                    name="lastName"
                    onChange={handleChange}
                    placeholder="Last Name"
                  />
                </div>
                <div className="p-2 w-full lg:w-1/2">
                  <Input
                    name="email"
                    onChange={handleChange}
                    placeholder="Email Address"
                    type="email"
                  />
                </div>
                <div className="p-2 w-full lg:w-1/2">
                  <Input
                    name="phone"
                    onChange={handlePhoneChange}
                    placeholder="Phone"
                    type="tel"
                  />
                </div>
                <div className="p-2 w-full">
                  <button
                    className={`bg-orange-500 hover:bg-orange-700 block p-2 rounded text-white w-full ${
                      !Boolean(values.phone) ? 'disabled' : ''
                    }`}
                    disabled={!Boolean(values.phone)}
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
