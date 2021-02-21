import nanoid from 'nanoid'

// Utils
import { getRandomInt } from './getRandomInt'


/**
 * Mock API call
 * @param payload
 * @param {number} timeout
 * @returns {Promise<string>}
 */
export const mockIncrement = (payload, timeout = 1000) => {
  const randomInt = getRandomInt(9)

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      randomInt > 1
        ? resolve({ message: 'Mock increment API success!', data: payload })
        : reject({ message: 'Mock increment API error', id: nanoid() })
    }, timeout)
  })
}


