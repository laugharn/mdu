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

  const signupWithPassword = async data => {
    let response = await accountApi.signupWithPassword(data)

    await setToken(response.token)
    await setUser(response.user)
  }

  const updateUser = async data => {
    await userApi.updateUser(data, token.accessToken)
  }

  return { logout, signupWithPassword, token, updateUser, user }
}

const AuthContainer = createContainer(useAuth)

export default AuthContainer
