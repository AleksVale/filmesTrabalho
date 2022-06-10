const API_KEY = '824006843643d81e267989aabe48a927'
let pesquisa1 = localStorage.getItem('pesquisa')
console.log(pesquisa1)
window.onload = () => {
  pesquisa()
  mostraFilmes()

  function mostraFilmes() {
    let divTela = document.getElementById('infoMovie')
    let texto = ''

    let dados = JSON.parse(this.responseText)
    console.log(dados)
    for (let i = 0; i < dados.results.length; i++) {
      let filme = dados.results[i]

      document.getElementById('pesquisaName').innerText =
        pesquisa1.toUpperCase()
      texto += `
      
      <div class="row" id="infoMovie">
      <div class="col-4">
        <img class="image" src="https://image.tmdb.org/t/p/original/${filme.poster_path}" alt="" />
      </div>
      <div class="col-8">
        <p class="textMovie"><strong>Nome: </strong> ${filme.original_title}</p>
        <p class="textMovie"><strong>Resumo: </strong>${filme.overview}</p>
        <p class="textMovie"><strong>Lançamento: </strong>${filme.release_date}</p>
        <a onclick="clicouBotao(this.id)" href="https://www.themoviedb.org/movie/${filme.id}" target="_blank" id="${filme.id}"><p class="textMovie link-success">Saiba mais</p></a>
      </div>
    </div>
      `
    }
    divTela.innerHTML = texto
  }
  function pesquisa() {
    let xhr = new XMLHttpRequest()
    xhr.onload = mostraFilmes
    xhr.open(
      'GET',
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR&query=${pesquisa1}&page=1`
    )
    xhr.send()
  }
}
function clicouBotao(clickedId) {
  let idFilme = document.getElementById(clickedId)
  idFilme = idFilme.getAttribute('id')
  localStorage.setItem('idFilme', idFilme)
  window.location.href = '../detalhe/detalhe.html'
}
