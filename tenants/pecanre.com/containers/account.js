import accountApi from 'shared/utils/api/account'
import createContainer from 'constate'
import userApi from 'shared/utils/api/user'
import { useState } from 'react'
import usePersistedState from 'use-persisted-state'

const useAuth = () => {
  const useTokenState = usePersistedState('token')
  const useUserState = usePersistedState('user')

  const [token, setToken] = useTokenState({})
  const [user, setUser] = useUserState({})

  const signupWithPassword = async data => {
    console.log('signing up with password')
    let response = await accountApi.signupWithPassword(data)
    console.log(response)

    setToken(response.token)
    setUser(response.user)
  }

  return { signupWithPassword, token, user }
}

const AuthContainer = createContainer(useAuth)

export default AuthContainer
