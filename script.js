
const greetingElement = document.getElementById("greeting");
const currentHour = new Date().getHours();


const greetingMessage =
    currentHour >= 5 && currentHour < 12
        ? "Bom dia"
        : currentHour >= 12 && currentHour < 18
        ? "Boa tarde"
        : "Boa noite";

greetingElement.textContent = greetingMessage;

const searchInput = document.getElementById('search-input');
const resultsArtist = document.getElementById('result-artists');
const resultPlaylist = document.getElementById('result-playlists');
const listArtist = document.getElementById('result-artists-list');

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`;

    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result))
}

function displayResults(result) {
    resultPlaylist.classList.add('hidden');
    listArtist.innerHTML = '';

    result.forEach((element, index ) => {

        listArtist.innerHTML += `
            <div class="artist-card" id="artist-card-${index}">
                <div class="card-img">
                    <img id="artist-img" class="artist-img" src="${element.urlImg}">
                    <div class="play">
                        <span class="fa fa-solid fa-play"></span>
                    </div>
                </div>

                <div class="card-text">
                    <a href="" title="Artista">
                        <span class="artist-name" id="artist-name">${element.name}</span>
                        <span class="artist-categorie">Artista</span>
                    </a>
                </div>
            </div>
        `;
    });

    resultsArtist.classList.remove('hidden');
}

document.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase();

    if(searchTerm === '') {
        resultPlaylist.classList.remove('hidden');
        resultsArtist.classList.add('hidden');
        listArtist.innerHTML = '';
        return;
    }

    requestApi(searchTerm);

});