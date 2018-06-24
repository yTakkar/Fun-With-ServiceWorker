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

// FETCH IMAGE FROM NASA
fetch(
  `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`
)
  .then(d => d.json())
  .then(s => {
    console.log(s)
    let { url } = s
    document.querySelector('.s_img').src = url
  })
  .catch(e => console.log(e))

// FETCH PHOTOS
fetch('https://jsonplaceholder.typicode.com/photos')
  .then(resp => resp.json())
  .then(resp => {
    let images = resp.slice(0, 10)
    let UL = document.querySelector('.photos')

    console.log(images)
    images.forEach(image => {
      let LI = document.createElement('li')
      let IMG = document.createElement('img')

      IMG.setAttribute('src', image.thumbnailUrl)
      LI.appendChild(IMG)
      UL.appendChild(LI)
    })

  })
  .catch(e => console.log(e))

// FETCH GITHUB
fetch('https://api.github.com/users/yTakkar/repos')
  .then(resp => resp.json())
  .then(repos => {
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

  })
  .catch(e => console.log(e))
