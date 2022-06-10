const API_KEY = '824006843643d81e267989aabe48a927'
let carregarMaisDestaque = document.getElementById('btnMoreMovies')
let carregarMaisRated = document.getElementById('loadMoreRated')
let botao = document.getElementById('btnSearch')
let botao0, botao1, botao2, botao3, botao4
botao.addEventListener('click', () => {
  localStorage.setItem('pesquisa', document.getElementById('searchInput').value)
  if (document.getElementById('searchInput').value == 0) {
    alert('Digite algo antes de pesquisar')
  } else {
    window.location.href = 'pesquisa/pesquisa.html'
  }
})
pesquisaDestaque()
mostraFilmesUpcoming()
mostraFilmesDestaque()
topRated()
seriesManda()
function mostraFilmesDestaque() {
  let card1 = document.getElementById('card1')
  let card2 = document.getElementById('card2')
  let card3 = document.getElementById('card3')
  let card4 = document.getElementById('card4')

  let dados = JSON.parse(this.responseText)
  for (let i = 0; i < 4; i++) {
    let destaques = dados.results[i]
    if (i == 0) {
      card1.setAttribute(
        'src',
        `https://image.tmdb.org/t/p/original/${destaques.poster_path}`
      )
      card1.setAttribute('id', destaques.id)
    }
    if (i == 1) {
      card2.setAttribute(
        'src',
        `https://image.tmdb.org/t/p/original/${destaques.poster_path}`
      )
      card2.setAttribute('id', destaques.id)
    }
    if (i == 2) {
      card3.setAttribute(
        'src',
        `https://image.tmdb.org/t/p/original/${destaques.poster_path}`
      )
      card3.setAttribute('id', destaques.id)
    }
    if (i == 3) {
      card4.setAttribute(
        'src',
        `https://image.tmdb.org/t/p/original/${destaques.poster_path}`
      )
      card4.setAttribute('id', destaques.id)
    }
  }
  carregarMaisDestaque.addEventListener('click', () => {
    let moreCards = document.getElementById('moreCards')
    let texto = ''
    for (let i = 4; i < 8; i++) {
      texto += `
      <div class="col-12 col-sm-12 col-md-6 col-lg-3 cards2 pb-4">
          <div class="card ">
            <img onclick="clicouBotao(this.id)" id="${dados.results[i].id}"src="https://image.tmdb.org/t/p/original/${dados.results[i].poster_path}" class="card-img-top" alt="...">
          </div>
          </div>
      `
    }
    moreCards.innerHTML = texto
  })
}

function pesquisaDestaque() {
  let xhr = new XMLHttpRequest()
  xhr.onload = mostraFilmesDestaque
  xhr.open(
    'GET',
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1&region=BR`
  )
  xhr.send()

  let xhi = new XMLHttpRequest()
  xhi.onload = mostraFilmesUpcoming
  xhi.open(
    'GET',
    `https://api.themoviedb.org/3/movie/upcoming?api_key=824006843643d81e267989aabe48a927&language=pt-BR&page=1&region=BR`
  )
  xhi.send()

  let topRatedSearch = new XMLHttpRequest()
  topRatedSearch.onload = topRated
  topRatedSearch.open(
    'GET',
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=pt-BR&page=1&region=BR`
  )
  topRatedSearch.send()

  let series = new XMLHttpRequest()
  series.onload = seriesManda
  series.open(
    'GET',
    'https://api.themoviedb.org/3/tv/popular?api_key=824006843643d81e267989aabe48a927&language=pt-BR&page=1'
  )
  series.send()
}
function seriesManda() {
  let dados = JSON.parse(this.responseText)
  let divSeries = document.getElementById('divNews')
  let texto = ''
  for (let i = 0; i < 3; i++) {
    let series = dados.results[i]
    texto += `
    <div class="row news">
           <div class="col-lg-4">
             <img src="https://image.tmdb.org/t/p/original/${series.poster_path}" class="fotoNoticia" alt="">
           </div>
           <div class="col-lg-8">
            <div class="newsText">
              <h5 class="newsTitle">${series.name}</h5>
              <p>${series.overview}  </p>
              <p class="separacao"><span class="tags">${series.first_air_date}</span>
                <span class="tags"> <i class="fa-solid fa-star"></i>${series.vote_average}</span>
                </p>
                <p class="btnSeries">
                <a  href="https://www.themoviedb.org/tv/${series.id}"><button type="button" class="btn btn-lg btn-outline-info ">Saiba mais</button></p></a></p>
            </div>
           </div>
          </div>
    `
  }
  divSeries.innerHTML = texto
}
function mostraFilmesUpcoming() {
  let filmesComing = JSON.parse(this.responseText)
  let firstDiv = filmesComing.results[0]
  let divCarousel = document.getElementById('divCarousel')
  let texto = `<div class="carousel-item active" >
  <div class="row">
  <img class="col-lg-6 col-md-6 col-sm-12 imgCarousel" src="https://image.tmdb.org/t/p/original/${firstDiv.backdrop_path}" class="d-block w-100" alt="...">
  <div class="col-lg-6 col-md-6 col-sm-12 textDescription">
    <h2 class="nameMovie">${firstDiv.title}</h2>
    <p class="sinopse"><strong>Sinopse:</strong> ${firstDiv.overview}</p>
    <p  class="last"><span class="lancamento"><i class="fa-solid fa-star"></i> ${firstDiv.vote_average}</span > Lançamento: ${firstDiv.release_date}</p>
    <div class="btnAlign">
    <button onclick="clicouBotao(this.id)" type="button" id="${firstDiv.id}" class="btn btn-lg btn-outline-warning btnUpcoming">Saiba mais</button>
    </div>
  </div>
</div>
</div>`
  for (let i = 1; i < 5; i++) {
    let upcoming = filmesComing.results[i]

    texto =
      texto +
      `
    <div class="carousel-item">
    <div class="row">
    <img class="col-lg-6 col-md-6 col-sm-12 imgCarousel" src="https://image.tmdb.org/t/p/original/${upcoming.backdrop_path}" class="d-block w-100" alt="...">
    <div class="col-lg-6 col-md-6 col-sm-12 textDescription">
      <h2 class="nameMovie">${upcoming.title}</h2>
      <p class="sinopse"><strong>Sinopse: </strong> ${upcoming.overview}</p>
      <p class="last"><span class="lancamento"><i class="fa-solid fa-star"></i> ${upcoming.vote_average}</span > Lançamento: ${upcoming.release_date}</p>
      <div class="btnAlign">
      <button  onclick="clicouBotao(this.id)" type="button" id="${upcoming.id}" class="btn btn-lg btn-outline-warning btnUpcoming">Saiba mais</button>
      </div>
    </div>
    </div>
    </div>
    `
  }
  divCarousel.innerHTML = texto
}
function topRated() {
  let dados = JSON.parse(this.responseText)
  let divTopRated = document.getElementById('divRated')
  let texto = ''
  let textoStar = `
  <i class="fa-solid fa-star"></i>
  <i class="fa-solid fa-star"></i>
  <i class="fa-solid fa-star"></i>
  <i class="fa-regular fa-star"></i>
  <i class="fa-regular fa-star"></i>
  `
  for (let i = 0; i < 5; i++) {
    let rateds = dados.results[i]
    if (rateds.vote_average > 7 && rateds.vote_average < 10) {
      textoStar = `
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star-half"></i>
      `
    } else if (rateds.vote_average == 10) {
      textoStar = `
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      `
    } else if (rateds.vote_average < 8 && rateds.vote_average > 4) {
      textoStar = `
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-regular fa-star"></i>
      <i class="fa-regular fa-star"></i>
      `
    } else if (rateds.vote_average > 2 && rateds.vote_average < 5) {
      textoStar = `
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star-half"></i>
      <i class="fa-regular fa-star"></i>
      <i class="fa-regular fa-star-half"></i>
      `
    } else if (rateds.vote_average >= 0 && rateds.vote_average < 3) {
      textoStar = `
      <i class="fa-solid fa-star"></i>
      <i class="fa-regular fa-star"></i>
      <i class="fa-regular fa-star"></i>
      <i class="fa-regular fa-star"></i>
      <i class="fa-regular fa-star-half"></i>
      `
    }
    texto += `
  <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-12">
             <span>${
               i + 1
             }</span> <img onclick="clicouBotao(this.id)" src="https://image.tmdb.org/t/p/original/${
      rateds.poster_path
    }" class= "posterTopRated" id ="${rateds.id}" alt="poster">
            </div>
            <div class="avaliation col-lg-4 col-md-6 col-sm-12">
              <h4 class="name"> ${rateds.title}</h4>
              <p class="textAvaliation"> <strong>Sinopse: </strong>${
                rateds.overview
              }</p>
              <p class="d-flex topStarDate">
              <span>
                ${textoStar}
                </span>
                <strong class="data">${rateds.release_date}</strong>
              </p>
            </div>
            </div>
  `
  }
  divTopRated.innerHTML = texto
  let contador = 0

  carregarMaisRated.addEventListener('click', () => {
    let textoExtra = divTopRated.innerHTML
    if (contador == 0) {
      for (let i = 5; i < 10; i++) {
        let rateds = dados.results[i]
        if (rateds.vote_average > 7 && rateds.vote_average < 10) {
          textoStar = `
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star-half"></i>
      `
        } else if (rateds.vote_average == 10) {
          textoStar = `
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      `
        } else if (rateds.vote_average < 8 && rateds.vote_average > 4) {
          textoStar = `
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-regular fa-star"></i>
      <i class="fa-regular fa-star"></i>
      `
        } else if (rateds.vote_average > 2 && rateds.vote_average < 5) {
          textoStar = `
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star-half"></i>
      <i class="fa-regular fa-star"></i>
      <i class="fa-regular fa-star-half"></i>
      `
        } else if (rateds.vote_average >= 0 && rateds.vote_average < 3) {
          textoStar = `
      <i class="fa-solid fa-star"></i>
      <i class="fa-regular fa-star"></i>
      <i class="fa-regular fa-star"></i>
      <i class="fa-regular fa-star"></i>
      <i class="fa-regular fa-star-half"></i>
      `
        }
        textoExtra += `
      <div class="row">
      <div class="col-lg-4 col-md-6 col-sm-12">
       <span>${
         i + 1
       }</span> <img onclick="clicouBotao(this.id)" src="https://image.tmdb.org/t/p/original/${
          rateds.poster_path
        }" class= "posterTopRated" id ="${rateds.id}" alt="poster">
      </div>
      <div class="avaliation col-lg-4 col-md-6 col-sm-12">
        <h4 class="name"> ${rateds.title}</h4>
        <p class="textAvaliation"> <strong>Sinopse: </strong>${
          rateds.overview
        }</p>
        <p class="d-flex topStarDate">
        <span>
          ${textoStar}
          </span>
          <strong class="data">${rateds.release_date}</strong>
        </p>
      </div>
      </div>
      `
      }
      divTopRated.innerHTML = textoExtra
    }
    contador++
  })
}

function clicouBotao(clickedId) {
  let idFilme = document.getElementById(clickedId)
  idFilme = idFilme.getAttribute('id')
  localStorage.setItem('idFilme', idFilme)
  window.location.href = 'detalhe/detalhe.html'
}

//botoes saiba mais

//tratar cliques nos botões
