// Fetch Pokémon data from PokéAPI
async function fetchPokemonData() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
        return [];
    }
}

// Display Pokémon cards on page
function displayPokemonCards(pokemons) {
    const body = document.body;
    
    // Create container if it doesn't exist
    let container = document.getElementById('pokemon-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'pokemon-container';
        container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            padding: 20px;
            justify-content: center;
        `;
        body.appendChild(container);
    }
    
    container.innerHTML = '';
    
    pokemons.forEach(pokemon => {
        const card = document.createElement('div');
        card.classList.add('pokemon-card');
        card.style.cssText = `
            border: 2px solid #ddd;
            border-radius: 8px;
            padding: 15px;
            width: 180px;
            text-align: center;
            background-color: #f9f9f9;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            cursor: pointer;
            transition: transform 0.2s;
        `;
        card.innerHTML = `
            <h3 style="margin: 10px 0; text-transform: capitalize;">${pokemon.name}</h3>
            <p style="color: #666; margin: 5px 0;">ID: ${pokemon.url.split('/')[6]}</p>
        `;
        card.onmouseover = () => card.style.transform = 'scale(1.05)';
        card.onmouseout = () => card.style.transform = 'scale(1)';
        container.appendChild(card);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
    const pokemons = await fetchPokemonData();
    displayPokemonCards(pokemons);
});