import hotkeys from 'hotkeys-js'
import { useEffect } from 'react'

export default (keys, callback) => {
  useEffect(() => {
    hotkeys(keys, (event, handler) => callback(event, handler))

    return () => {
      hotkeys.unbind(keys)
    }
  })
}