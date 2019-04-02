import axios from 'axios'
import Cookies from 'js-cookie'

const instance = axios.create({
  baseURL:
    process.env.BRANCH === 'master'
      ? 'https://prod--users.bhsvcs.com'
      : Cookies.get('api_environment')
      ? `https://${Cookies.get('api_environment')}--users.bhsvcs.com`
      : process.env.NODE_ENV !== 'production'
      ? 'http://localhost:3509'
      : 'https://dev--users.bhsvcs.com',
})

export const updateUser = async (data, token) => {
  instance.interceptors.request.use(config => {
    config.headers.Token = `${token}`

    return config
  })

  let userObj = await instance
    .patch('/me', data)
    .then(response => response.data)

  return userObj
}

export default {
  updateUser,
}
