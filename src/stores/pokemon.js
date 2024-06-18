import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const usePokemonStore = defineStore('pokemon', () => {
  const typeColors = ref({
    normal: '#A9AA79',
    fire: '#F0813A',
    water: '#6992F1',
    grass: '#79C94F',
    electric: '#F8D249',
    ice: '#9AD9D9',
    fighting: '#C22C28',
    poison: '#A13EA1',
    ground: '#E1C268',
    flying: '#A991F1',
    psychic: '#ED5689',
    bug: '#A9BA37',
    rock: '#BAA135',
    ghost: '#70579A',
    dragon: '#734AF6',
    dark: '#705746',
    steel: '#BABAD1',
    fairy: '#EE9AAD'
  })

  const allPokemons = ref([])
  const displayedPokemons = ref([])
  const filteredPokemons = ref([])
  const currentPage = ref(1)
  const pageSize = ref(40)
  const searchQuery = ref('')
  const selectedPokemon = ref(null)
  const speciesDetails = ref(null)

  const fetchAllPokemons = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
      allPokemons.value = response.data.results
      filteredPokemons.value = response.data.results
      await fetchPokemonDetails()
    } catch (error) {
      console.error('Error fetching all Pokemons:', error)
    }
  }

  const fetchPokemonDetails = async () => {
    const sourceList = searchQuery.value ? filteredPokemons.value : allPokemons.value
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    const pokemonsToDisplay = sourceList.slice(start, end)

    displayedPokemons.value = await Promise.all(
      pokemonsToDisplay.map(async (pokemon) => {
        const pokemon_details = await axios.get(pokemon.url)
        return {
          name: pokemon_details.data.name,
          url: pokemon.url,
          image: pokemon_details.data.sprites.front_default,
          pokemon_details: pokemon_details.data
        }
      })
    )
  }

  const fetchSpeciesDetails = async (url) => {
    try {
      const response = await axios.get(url)
      speciesDetails.value = response.data
    } catch (error) {
      console.error('Error fetching species details:', error)
    }
  }

  const fetchSinglePokemon = async (id) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      const species_response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
      selectedPokemon.value = {
        name: response.data.name,
        image: response.data.sprites.other['official-artwork'].front_default,
        pokemon_details: response.data,
        species_details: species_response.data
      }
    } catch (error) {
      console.error('Error fetching single Pokemon:', error)
    }
  }

  const filterPokemons = async () => {
    if (searchQuery.value) {
      filteredPokemons.value = allPokemons.value.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    } else {
      filteredPokemons.value = allPokemons.value
    }
    currentPage.value = 1
    await fetchPokemonDetails()
  }

  const nextPage = async () => {
    const sourceList = searchQuery.value ? filteredPokemons.value : allPokemons.value
    if (currentPage.value * pageSize.value < sourceList.length) {
      currentPage.value += 1
      displayedPokemons.value = []
      await fetchPokemonDetails()
    }
  }

  const prevPage = async () => {
    if (currentPage.value > 1) {
      currentPage.value -= 1
      displayedPokemons.value = []

      await fetchPokemonDetails()
    }
  }

  return {
    allPokemons,
    displayedPokemons,
    filteredPokemons,
    currentPage,
    pageSize,
    searchQuery,
    speciesDetails,
    selectedPokemon,
    typeColors,
    fetchSpeciesDetails,
    fetchAllPokemons,
    fetchSinglePokemon,
    filterPokemons,
    nextPage,
    prevPage
  }
})
