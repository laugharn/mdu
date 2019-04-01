import axios from 'axios'
import Cookies from 'js-cookie'

const instance = axios.create({
  baseURL:
    process.env.BRANCH === 'master'
      ? 'https://prod--markets.bhsvcs.com'
      : Cookies.get('api')
      ? `https://${Cookies.get('api')}--markets.bhsvcs.com`
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
