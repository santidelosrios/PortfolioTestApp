import axios from 'axios'
import config from '../../confis/configs'

export const getUserPortfolio = (userId) => {
  return new Promise((resolve, reject) => {
    axios.get(`${config.API_BASE_PATH}/${config.USER_PORTFOLIO_PATH}/1`)
      .then(res => resolve(res.data))
      .catch(err => reject(err))
  })
}