import axios from 'axios'
import Cookies from 'js-cookie'

const instance = axios.create({
  baseURL:
    process.env.BRANCH === 'master'
      ? 'https://prod--markets.bhsvcs.com'
      : Cookies.get('api_environment')
      ? `https://${Cookies.get('api_environment')}--markets.bhsvcs.com`
      : process.env.NODE_ENV !== 'production'
      ? 'http://localhost:3503'
      : 'https://dev--markets.bhsvcs.com',
})

export const get = async data => {
  let marketsObj = await instance.get('/').then(response => response.data)

  return marketsObj
}

export default {
  get,
  instance,
}
