const input = document.querySelector('input');
const paises = document.querySelector('.paises');
const root = document.querySelector('body');

fetch('https://restcountries.com/v2/all').then((resposta) => {
  const promiseBody = resposta.json();

  promiseBody.then((body) => {
    body.forEach((elemento) => {
      const div = document.createElement('div');
      div.classList.add('pais');

      const infos = document.createElement('div');
      infos.classList.add('infos');

      const name = document.createElement('h2');
      name.textContent = elemento.name;

      const region = document.createElement('p');
      region.textContent = `Região: ${elemento.region}`;

      const capital = document.createElement('p');
      capital.textContent = `Capital: ${elemento.capital}`;

      const population = document.createElement('p');
      population.textContent = `População: ${elemento.population} pessoas`;

      const flag = document.createElement('img');
      flag.src = elemento.flag;

      infos.append(name, region, capital, population);
      div.append(flag, infos);
      paises.append(div)
      root.append(paises);
    });
  })
})

input.addEventListener('keydown', esconderPaises);

function esconderPaises(event) {
  if (event.key !== 'Enter' || event.value === '' || input.value === '') {
    return;
  }

  const paisProcurado = input.value;
  const listaDePais = document.querySelectorAll('.pais');

  listaDePais.forEach((paisSelecionado) => {
    const pais = paisSelecionado.children[1];
    const paisInfos = pais.children[0];

    if (paisInfos.textContent.toLowerCase() !== paisProcurado.toLowerCase()) {
      paisSelecionado.classList.add('hidden');
    };

    if (paisInfos.textContent.toLowerCase() === paisProcurado.toLowerCase()) {
      paisSelecionado.classList.remove('hidden');
    };
    input.value = '';
  });
}