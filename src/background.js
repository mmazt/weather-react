import day from './images/day.png'
import dayCloudy from './images/day-cloudy.png'
import dayRain from './images/day-rain.png'
import night from './images/night.png'
import nightCloudy from './images/night-cloudy.png'
import nightRain from './images/night-rain.png'

const background = (icon) => {
  let background = ''
  if (icon === '01n'){
    background = night
  }
  if(icon === '02n' || icon === '03n' || icon === '04n'){
    background = nightCloudy
  }
  if(icon === '09n' || icon === '10n' || icon === '13n'){
    background = nightRain
  }
  if (icon === '01d'){
    background = day
  }
  if(icon === '02d' || icon === '03d' || icon === '04d'){
    background = dayCloudy
  }
  if(icon === '09d' || icon === '10d' || icon === '13d'){
    background = dayRain
  }

  return background
}

export default background