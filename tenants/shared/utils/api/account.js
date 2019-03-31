import axios from 'axios'

const instance = axios.create({
  baseURL:
    process.env.BRANCH === 'master'
      ? 'https://prod--account.bhsvcs.com'
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
  loginWithPassword,
  signupWithPassword,
}
