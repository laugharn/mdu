import axios from 'axios'
import Cookies from 'js-cookie'

const instance = axios.create({
  baseURL:
    process.env.BRANCH === 'master'
      ? 'https://prod--users.bhsvcs.com'
      : Cookies.get('api')
      ? `https://${Cookies.get('api')}--users.bhsvcs.com`
      : 'https://dev--users.bhsvcs.com',
})

export const updateUser = async (data, token) => {
  instance.interceptors.request.use(function(config) {
    config.headers.Authorization = `Bearer ${token}`

    return config
  })

  let userObj = await instance
    .patch('/me', data)
    .then(response => response.data)

  console.log(userObj)

  return userObj
}

export default {
  updateUser,
}
