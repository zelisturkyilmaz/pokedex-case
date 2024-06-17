<script setup>
import { onMounted, watch, computed, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { usePokemonStore } from '@/stores/pokemon.js';
import PokemonCard from '../components/PokemonCard.vue';
import PokemonSearch from '../components/PokemonSearch.vue';
import Pagination from '../components/Pagination.vue';
import Loading from '../components/Loading.vue';



const pokemonStore = usePokemonStore();
const router = useRouter();

const viewPokemon = (url) => {
  const id = url.split('/').filter(Boolean).pop();
  router.push(`/pokemon/${id}`);
};

const isLoading = computed(() => {
  return !pokemonStore.displayedPokemons.length || pokemonStore.displayedPokemons.every(pokemon => !pokemon.pokemon_details);
});

onMounted(async () => {
  await pokemonStore.goToFirstPage()
  if (!pokemonStore.allPokemons.length) {
    await pokemonStore.fetchAllPokemons();
  }
});

</script>

<template>
  <main class="container px-5 py-5 mx-auto flex-1 flex flex-col overflow-hidden">
    <div class="flex flex-col items-center justify-center mb-4 space-y-2">
      <h1 class="text-4xl font-bold text-yellow-400 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Pokémon Index</h1>
      <div class='w-full md:w-1/2'>
        <PokemonSearch />
      </div>
    </div>
    <div class="shadow-lg shadow-cyan-700 rounded-md bg-cyan-700/50 overflow-y-auto flex-1 flex flex-col ">
      <Pagination />
      <div class=" grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6" v-if="!isLoading">
        <PokemonCard v-for=" pokemon in pokemonStore.displayedPokemons" :key="pokemon.name" @view-pokemon="viewPokemon"
          :pokemon="pokemon" />
      </div>
      <Loading v-else />
    </div>

  </main>
</template>