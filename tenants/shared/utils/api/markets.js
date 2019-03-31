import axios from 'axios'

const instance = axios.create({
  baseURL:
    process.env.BRANCH === 'master'
      ? 'https://prod--markets.bhsvcs.com'
      : 'https://dev--markets.bhsvcs.com',
})

export const get = async data => {
  let marketsObj = await instance.get('/').then(response => response.data)

  return marketsObj
}

export default {
  get,
}
