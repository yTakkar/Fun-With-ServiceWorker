import { PORT, NASA_API_KEY } from '../../../browser-env'
import $ from 'jquery'

if ('serviceWorker' in navigator) {

  navigator.serviceWorker
    .register(`http://localhost:${PORT}/js/src/service-worker.js`)
    .then(() => console.log('ServiceWorker is working!!') )
    .catch(e => console.log(e))

}

fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`)
  .then(d => d.json())
  .then(s => $('.s_img').attr('src', s.url) )
  .catch(e => console.log(e))
