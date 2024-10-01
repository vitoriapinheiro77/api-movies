const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '0e7d89ed72msh2797fbbc55d8e24p1587bcjsn1c095c196cab',  // Substitua pela sua chave
        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
    }
};

fetch('https://imdb8.p.rapidapi.com/title/get-popular-movies', options)
    .then(response => response.json())
    .then(data => console.log(data))  // Aqui você pode manipular os dados recebidos
    .catch(error => console.error('Erro:', error));
