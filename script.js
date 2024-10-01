const apiKey = 'c3ed7390e52d4dddf37320bd22ea8a64';

function pesquisarFilmes(nome_do_filme) {
    const generoSelecionado = document.getElementById('genero').value;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=pt-BR&query=${nome_do_filme}`;

    if (generoSelecionado) {
        url += `&with_genres=${generoSelecionado}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                const filmesComCapa = data.results.filter(filme => filme.poster_path);
                if (filmesComCapa.length > 0) {
                    exibirFilmes(filmesComCapa, generoSelecionado); 
                } else {
                    alert("Nenhum dos filmes encontrados tem capa disponível.");
                }
            } else {
                alert("Nenhum resultado encontrado.");
            }
        })
        .catch(error => console.error('Erro ao buscar filmes:', error));
}

function exibirFilmes(filmes, generoSelecionado) {
    const listaFilmes = document.getElementById('listaFilmes');
    listaFilmes.innerHTML = '';

    let filmesFiltrados = filmes.filter(filme => {
        return filme.genre_ids.includes(Number(generoSelecionado)); 
    });
    
    if (filmesFiltrados.length === 0) {
        filmesFiltrados = filmes;
    }

    filmesFiltrados.forEach(filme => {
        const moviePosterPath = `https://image.tmdb.org/t/p/w500${filme.poster_path}`;

        const li = document.createElement('li');
        li.classList.add('filme-item');
        
        li.innerHTML = `
            <img src="${moviePosterPath}" alt="${filme.title}" class="filme-capa">
            <div class="filme-info">
                <h3 class="filme-titulo">${filme.title}</h3>
                <p class="filme-ano">${filme.release_date ? filme.release_date.split('-')[0] : 'Ano desconhecido'}</p>
            </div>
        `;

        li.dataset.id = filme.id;

        li.addEventListener('click', () => abrirModal(filme));

        listaFilmes.appendChild(li);
    });
}

function abrirModal(filme) {
    const modal = document.getElementById('modal');
    document.getElementById('modalTitulo').textContent = filme.title;
    document.getElementById('modalAno').textContent = filme.release_date ? filme.release_date.split('-')[0] : 'Ano desconhecido';
    document.getElementById('modalResumo').textContent = filme.overview || 'Sem resumo disponível.';
    
    modal.style.display = 'flex';
}

document.getElementById('closeModal').addEventListener('click', () => {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
});

function carregarGeneros() {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=pt-BR`)
        .then(response => response.json())
        .then(data => {
            const selectGenero = document.getElementById('genero');
            data.genres.forEach(genero => {
                const option = document.createElement('option');
                option.value = genero.id;
                option.textContent = genero.name;
                selectGenero.appendChild(option);
            });
        })
        .catch(error => console.error('Erro ao carregar gêneros:', error));
}

window.onload = carregarGeneros;

document.getElementById('formFilme').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const nome_do_filme = document.getElementById('filtro').value.trim();
    
    if (nome_do_filme) {
        pesquisarFilmes(nome_do_filme); 
    }
});
