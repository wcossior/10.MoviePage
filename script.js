const cardsContainer = document.querySelector('.content');
const search = document.querySelector('.search');
const nav = document.querySelector('.nav');
const loading = document.querySelector('.loading');

const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9538f003802638aeb488faf958e7311d&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=9538f003802638aeb488faf958e7311d&query='

getMovies(API_URL);

async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    loading.classList.remove('hide');
    setTimeout(() => {
    loading.classList.add('hide');
        if (data.results!=[]) {
            showCards(data.results);
        }
    }, 2000);
}

search.addEventListener('input', (event) => {
    event.preventDefault();
    const searchText = search.value;
    if (searchText!=='') {
        searchMovie(searchText);
    } else{
        location.reload();
    }
});


async function searchMovie(searchText) {
    const res = await fetch(SEARCH_API + searchText);
    const data = await res.json();
    showCards(data.results);
}

function showCards(movies) {
    cardsContainer.innerHTML = '';

    movies.forEach(movie => {
        let { title, poster_path, overview } = movie;
        const movieCard = document.createElement('div');
        movieCard.classList.add('card');
        movieCard.innerHTML =
            `
            <div class="img-container">
                <img class="movie-img" src=${IMG_PATH + poster_path} alt=${title}>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                <span>${overview}</span>
            </div>`;
        cardsContainer.appendChild(movieCard);
    });
}

window.addEventListener('scroll',()=>{
    let scrollY = window.scrollY; 
    if (scrollY>90) {
        nav.classList.add('whenScrolling');
    }else{
        nav.classList.remove('whenScrolling');
    }
    
});
