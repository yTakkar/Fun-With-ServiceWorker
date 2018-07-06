import { PORT, NASA_API_KEY } from '../../env'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register(`http://localhost:${PORT}/serviceWorker.js`)
    .then(() =>
      console.log('ServiceWorker is working!!')
    )
    .catch(e =>
      console.log('ServiceWorker failed to register', e)
    )
}

const f = url => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(resp => resp.json())
      .then(resp => resolve(resp))
      .catch(e => reject(e))
  })
}

const fetchFromNASA = async () => {
  const image = await f(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`)
  console.log(image)
  document.querySelector('.s_img').src = image.url
}

const fetchPhotos = async () => {
  let imagesResponse = await f('https://jsonplaceholder.typicode.com/photos')
  let images = imagesResponse.slice(0, 10)
  console.log(images)
  let UL = document.querySelector('.photos')

  images.forEach(image => {
    let LI = document.createElement('li')
    let IMG = document.createElement('img')

    IMG.setAttribute('src', image.thumbnailUrl)
    LI.appendChild(IMG)
    UL.appendChild(LI)
  })
}

const fetchRepos = async () => {
  const repos = await f('https://api.github.com/users/yTakkar/repos')
  console.log(repos)
  let UL = document.querySelector('.github_repos')

  repos.forEach(repo => {
    let LI = document.createElement('li')
    let A = document.createElement('a')

    A.setAttribute('href', `https://github.com/${repo.full_name}`)
    let AText = document.createTextNode(repo.full_name)

    A.appendChild(AText)
    LI.appendChild(A)

    UL.appendChild(LI)
  })
}

(async () => {
  fetchFromNASA()
  fetchPhotos()
  fetchRepos()
})()
