import createContainer from 'constate'
import { useState } from 'react'

const useAuth = () => {
  const [authState, setAuthState] = useState({})
  const set = value => setAuthState(value)

  return { authState, set }
}

const AuthContainer = createContainer(useAuth)

export default AuthContainer
