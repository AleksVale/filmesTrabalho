const API_KEY = '824006843643d81e267989aabe48a927'
const idPesquisado = localStorage.getItem('idFilme')
pesquisaFilmeClicado()
mostraFilmeClicado()
mostraRecomendacoes()
function mostraFilmeClicado() {
  let divMain = document.getElementById('divMain')
  let texto = ''
  let tamanhoGenero
  let textoGenero = ''
  let tamanhoEmpresa
  let textoEmpresa = ''
  let filmeClicado = JSON.parse(this.responseText)
  tamanhoGenero = filmeClicado.genres
  tamanhoGenero = tamanhoGenero.length
  tamanhoEmpresa = filmeClicado.production_companies.length
  for (let i = 0; i < tamanhoEmpresa; i++) {
    textoEmpresa += ` 
    <p class="empresas1">${filmeClicado.production_companies[i].name}</p>
    `
  }

  let lancamento = filmeClicado.release_date
  for (let i = 0; i < tamanhoGenero; i++) {
    textoGenero += `<span class="genero">${filmeClicado.genres[i].name}</span>`
  }
  texto = `
  <div class="col-lg-4 col-md-6 col-sm-12">
          <img
            class="imgMovie"
            src="https://image.tmdb.org/t/p/original/${filmeClicado.poster_path}"
            alt=""
          />
        </div>
        <div class="col-lg-8 col-md-6 col-sm-12 movieInfos">
          <h1 class="movieTitle">${filmeClicado.title}</h1>
          <p class="movieSinopse">
            ${filmeClicado.overview}
          </p>
          <p class="genre">
            ${textoGenero}
          </p>
          
          <p class="lancamento d-flex">
            Lançamento: ${lancamento} <span class="budget">Orçamento: ${filmeClicado.budget}$</span> <span class="tamanho"> <strong>${filmeClicado.runtime}</strong> minutos</span>
          </p>
          <p class="star"><i class="fa-solid fa-star"></i> <span>${filmeClicado.vote_average}</span></p>
          <div class="empresas">
            <p>Produzido por:</p>
            ${textoEmpresa}
          </div>
        </div>
      </div>
  `

  divMain.innerHTML = texto
}
function mostraRecomendacoes() {
  let divSimilar = document.getElementById('divSimilar')
  let similares = JSON.parse(this.responseText)
  let texto = ''
  for (let i = 0; i < 9; i++) {
    texto += `
    <div class="col-lg-4 col-md-6 col-sm-12">
    <img
      class="cards"
      src="https://image.tmdb.org/t/p/original//${similares.results[i].poster_path}"
      alt=""
    />
    <div class="knowMore d-flex">
    <span><i class="fa-solid fa-star"> ${similares.results[i].vote_average}</i></span>
      <a href="https://www.themoviedb.org/movie/${similares.results[i].id}">
        <button type="button" class="btn btn-info">Saiba mais</button></a
      >
      
    </div>
  </div>
    `
  }
  divSimilar.innerHTML = texto
}

function pesquisaFilmeClicado() {
  let xhr = new XMLHttpRequest()
  xhr.onload = mostraFilmeClicado
  xhr.open(
    'GET',
    `https://api.themoviedb.org/3/movie/${idPesquisado}?api_key=${API_KEY}&language=pt-BR`
  )
  xhr.send()

  let similar = new XMLHttpRequest()
  similar.onload = mostraRecomendacoes
  similar.open(
    'GET',
    `https://api.themoviedb.org/3/movie/${idPesquisado}/similar?api_key=${API_KEY}&language=pt-BR`
  )
  similar.send()
}
