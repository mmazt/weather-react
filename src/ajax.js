import axios from 'axios'

export const geo_locate = () => {
  let cidade = {}
  return axios.get('http://freegeoip.net/json/')
  .then(response => {
    cidade = response.data
    let data = axios.get('http://api.openweathermap.org/data/2.5/weather?q=' + response.data.city.toLowerCase() + '&APPID=4f625be4621970295e012c5527369769&units=metric')
      .then(response => {
        response.data.cidade = cidade
        return response.data
      })

    return data
  })
}