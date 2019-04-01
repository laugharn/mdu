import axios from 'axios'
import Cookies from 'js-cookie'

const instance = axios.create({
  baseURL:
    process.env.BRANCH === 'master'
      ? 'https://prod--account.bhsvcs.com'
      : Cookies.get('api')
      ? `https://${Cookies.get('api')}--account.bhsvcs.com`
      : 'https://dev--account.bhsvcs.com',
})

export const loginWithPassword = async data => {
  let userObj = await instance
    .post('/loginWithPassword', data)
    .then(response => response.data)

  return userObj
}

export const signupWithPassword = async data => {
  let userObj = await instance
    .post('/signupWithPassword', data)
    .then(response => response.data)

  return userObj
}

export default {
  instance,
  loginWithPassword,
  signupWithPassword,
}
