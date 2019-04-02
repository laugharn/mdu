import accountApi from 'shared/utils/api/account'
import createContainer from 'constate'
import userApi from 'shared/utils/api/user'
import usePersistedState from 'use-persisted-state'

const useAuth = () => {
  const useTokenState = usePersistedState('token')
  const useUserState = usePersistedState('user')

  const [token, setToken] = useTokenState({})
  const [user, setUser] = useUserState({})

  const logout = async () => {
    setToken({})
    setUser({})
  }

  const qualifyToTour = async data => {
    const {
      email,
      marketOfInterest,
      originationSource,
      password,
      ...values
    } = data
    let response = await accountApi.signupWithPassword({
      email,
      marketOfInterest,
      originationSource,
      password,
    })

    let updatedUser = await userApi.updateUser(
      {
        email,
        ...values,
      },
      response.token.accessToken,
    )

    setToken(response.token)
    setUser(updatedUser)

    return true
  }

  return { logout, qualifyToTour, token, user }
}

const AuthContainer = createContainer(useAuth)

export default AuthContainer
