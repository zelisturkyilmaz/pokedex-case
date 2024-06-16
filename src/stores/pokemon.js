import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const usePokemonStore = defineStore('pokemon', () => {
  const pokemons = ref([])
  const nextPageUrl = ref('https://pokeapi.co/api/v2/pokemon?limit=40')

  async function fetchPokemons() {
    const response = await axios.get(nextPageUrl.value)
    const results = response.data.results
    nextPageUrl.value = response.data.next

    const detailedPokemons = await Promise.all(
      results.map(async (pokemon) => {
        const details = await axios.get(pokemon.url)
        return {
          name: details.data.name,
          url: pokemon.url,
          image: details.data.sprites.front_default,
          pokemon_details: details.data
        }
      })
    )

    pokemons.value.push(...detailedPokemons)
  }

  async function fetchPokemonById(id) {
    const existingPokemon = this.getPokemonById(id)
    if (!existingPokemon) {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      const newPokemon = {
        name: response.data.name,
        url: `https://pokeapi.co/api/v2/pokemon/${id}/`,
        image: response.data.sprites.front_default,
        abilities: response.data.abilities
      }
      this.pokemons.push(newPokemon)
      return newPokemon
    }
    return existingPokemon
  }

  const getPokemonById = computed((id) =>
    state.pokemons.find((pokemon) => pokemon.url.split('/').filter(Boolean).pop() === id)
  )

  return { pokemons, fetchPokemons, getPokemonById, fetchPokemonById }
})
