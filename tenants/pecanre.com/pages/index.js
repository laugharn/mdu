import AccountContainer from '~/containers/account'
import { get } from 'shared/utils/api/markets'
import { Input, Select } from 'shared/components/form'
import { LayoutDefault } from '~/components/layouts'
import Title from 'shared/components/seo/title'
import { useContext, useEffect, useState } from 'react'
import useForm from 'shared/utils/hooks/useForm'

const splitAt = index => x => [x.slice(0, index), x.slice(index)]

export default () => {
  const [markets, setMarkets] = useState([])
  const { qualifyToTour } = useContext(AccountContainer.Context)

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
          <div className="bg-black h-4 mr-4 rounded-full w-4" />
          <div className="bg-black h-4 mr-4 rounded-full w-4" />
          <div className="bg-black h-4 rounded-full w-4" />
        </div>
      </div>
    )
  }

  return (
    <LayoutDefault>
      <>
        <Title title="Qualify Now" />
        <div className="m-auto px-2 py-4 max-w-xl">
          {submitting && <Submitting />}
          {qualified && !submitting && (
            <div className="font-serif p-2 text-3xl text-center w-full">
              Congratulations, you're qualified!
            </div>
          )}
          {!qualified && !submitting && (
            <>
              <div className="font-serif p-2 text-3xl text-center w-full">
                Unlock Home Tour Access
              </div>
              <div className="p-2 text-center text-gray-700 w-full">
                Fill out the form below to unlock access to tour anytime between
                8am-8pm, 7 days a week.
              </div>
              <form className="flex flex-wrap" onSubmit={handleSubmit}>
                <div className="px-2 py-3 w-full">
                  <label className="block pb-1 text-gray-700 w-full">
                    Market
                  </label>
                  <Select
                    name="marketOfInterest"
                    onChange={handleChange}
                    options={[
                      { title: '', value: null },
                      ...markets.map(market => ({
                        title: market.name,
                        value: market.id,
                      })),
                    ]}
                  />
                </div>
                <div className="px-2 py-3 w-full">
                  <label className="block pb-1 text-gray-700 w-full">
                    I am...
                  </label>
                  <Select
                    name="type"
                    onChange={handleChange}
                    options={[
                      { title: '', value: null },
                      { title: 'Agent', value: 'Agent' },
                      { title: 'Buyer', value: 'Buyer' },
                    ]}
                  />
                </div>
                {values.type === 'Agent' && (
                  <div className="px-2 py-3 w-full">
                    <label className="block pb-1 text-gray-700 w-full">
                      Brokerage Name
                    </label>
                    <Input
                      name="agentBrokerageName"
                      onChange={handleChange}
                      placeholder="Name of Your Brokerage"
                    />
                  </div>
                )}
                {values.type === 'Buyer' && (
                  <>
                    <div className="px-2 py-3 w-full lg:w-1/2">
                      <label className="block pb-1 w-full">
                        Have You Been Pre-Approved?
                      </label>
                      <Select
                        name="preApproved"
                        onChange={handleChange}
                        options={[
                          { title: '', value: null },
                          { title: 'Yes', value: 'yes' },
                          { title: 'No', value: 'no' },
                        ]}
                      />
                    </div>
                    <div className="px-2 py-3 w-full lg:w-1/2">
                      <label className="block pb-1 w-full">
                        Working with an Agent?
                      </label>
                      <Select
                        name="hasAgent"
                        onChange={handleChange}
                        options={[
                          { title: '', value: null },
                          { title: 'Yes', value: true },
                          { title: 'No', value: false },
                        ]}
                      />
                    </div>
                  </>
                )}
                <div className="px-2 py-3 w-full lg:w-1/2">
                  <label className="block pb-1 text-gray-700 w-full">
                    First Name
                  </label>
                  <Input
                    name="firstName"
                    onChange={handleChange}
                    placeholder="First Name"
                  />
                </div>
                <div className="px-2 py-3 w-full lg:w-1/2">
                  <label className="block pb-1 text-gray-700 w-full">
                    Last Name
                  </label>
                  <Input
                    name="lastName"
                    onChange={handleChange}
                    placeholder="Last Name"
                  />
                </div>
                <div className="px-2 py-3 w-full lg:w-1/2">
                  <label className="block pb-1 text-gray-700 w-full">
                    Email Address
                  </label>
                  <Input
                    name="email"
                    onChange={handleChange}
                    placeholder="Email Address"
                    type="email"
                  />
                </div>
                <div className="px-2 py-3 w-full lg:w-1/2">
                  <label className="block pb-1 text-gray-700 w-full">
                    Cell Phone Number
                  </label>
                  <Input
                    name="phone"
                    onChange={handlePhoneChange}
                    placeholder="Phone"
                    type="tel"
                  />
                </div>
                <div className="px-2 py-3 w-full">
                  <button
                    className={`bg-black hover:bg-gray-900 block p-2 rounded text-white w-full ${
                      !Boolean(values.phone) ? 'disabled' : ''
                    }`}
                    disabled={!Boolean(values.phone)}
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </>
    </LayoutDefault>
  )
}
