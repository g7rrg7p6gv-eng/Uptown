// script.js

// Function to fetch Pokémon data from the PokéAPI
async function fetchPokemonData() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
    const data = await response.json();
    return data.results;
}

// Function to display Pokémon cards
function displayPokemonCards(pokemons) {
    const container = document.getElementById('pokemon-container');
    container.innerHTML = '';
    pokemons.forEach(pokemon => {
        const card = document.createElement('div');
        card.classList.add('pokemon-card');
        card.innerHTML = `<h2>${pokemon.name}</h2>`;
        container.appendChild(card);
    });
}

// Search functionality
function searchPokemon(event) {
    const searchTerm = event.target.value.toLowerCase();
    const filteredPokemons = pokemons.filter(pokemon => pokemon.name.includes(searchTerm));
    displayPokemonCards(filteredPokemons);
}

let pokemons = [];

// Initial fetch and setup
fetchPokemonData().then(data => {
    pokemons = data;
    displayPokemonCards(pokemons);
    document.getElementById('search-input').addEventListener('input', searchPokemon);
});