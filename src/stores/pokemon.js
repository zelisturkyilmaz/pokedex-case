import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const usePokemonStore = defineStore('pokemon', () => {
  const allPokemons = ref([]);
  const displayedPokemons = ref([]);
  const currentPage = ref(1);
  const pageSize = ref(40);
  const searchQuery = ref('');
  const selectedPokemon = ref(null);

  const fetchAllPokemons = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10000');
      allPokemons.value = response.data.results;
      await fetchPokemonDetails();
    } catch (error) {
      console.error('Error fetching all Pokemons:', error);
    }
  };

  const fetchPokemonDetails = async () => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    const pokemonsToDisplay = allPokemons.value.slice(start, end);

    displayedPokemons.value = await Promise.all(
      pokemonsToDisplay.map(async (pokemon) => {
        const details = await axios.get(pokemon.url);
        return {
          name: details.data.name,
          url: pokemon.url,
          image: details.data.sprites.front_default,
          pokemon_details: details.data
        }
      })
    );
  };

  const fetchSinglePokemon = async (id) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      selectedPokemon.value = {
        name: response.data.name,
        image: response.data.sprites.front_default,
        pokemon_details: details.data
      }
    } catch (error) {
      console.error('Error fetching single Pokemon:', error);
    }
  };

  const filterPokemons = async () => {
    if (searchQuery.value) {
      const filteredPokemons = allPokemons.value.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
      displayedPokemons.value = await Promise.all(
        filteredPokemons.slice(0, pageSize.value).map(async (pokemon) => {
          const details = await axios.get(pokemon.url);
          return {
            name: details.data.name,
            url: pokemon.url,
            image: details.data.sprites.front_default,
            pokemon_details: details.data
          }
        })
      );
    } else {
      await fetchPokemonDetails();
    }
  };

  const nextPage = async () => {
    if (currentPage.value * pageSize.value < allPokemons.value.length) {
      currentPage.value += 1;
      await fetchPokemonDetails();
    }
  };

  const prevPage = async () => {
    if (currentPage.value > 1) {
      currentPage.value -= 1;
      await fetchPokemonDetails();
    }
  };

  return {
    allPokemons,
    displayedPokemons,
    currentPage,
    pageSize,
    searchQuery,
    selectedPokemon,
    fetchAllPokemons,
    fetchSinglePokemon,
    filterPokemons,
    nextPage,
    prevPage,
  };
});
