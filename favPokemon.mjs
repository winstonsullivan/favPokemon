import fetch from 'node-fetch';
import readline from 'readline';

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Fetches all Pokemon names
async function fetchPokemonNames() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
    const allPokemon = await response.json();
    return allPokemon.results.map((element) => element.name);
}

// Function to ask user for their favorite Pokemon
async function askFavoritePokemon() {
    const pokemonNames = await fetchPokemonNames();

    async function askQuestion() {
        for (;;) {
            const answer = await new Promise(resolve => rl.question("What is your favorite Pokemon? ", resolve));

            if (pokemonNames.includes(answer.toLowerCase())) {
                console.log(`Cool, you like ${answer}!`);
                break;
            } else {
                console.log("That's not a real Pokemon. Try again.");
            }
        }

        rl.close();
        process.exit();
    }

    askQuestion();
}

// Start the process
askFavoritePokemon();
