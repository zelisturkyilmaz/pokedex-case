<script setup>
import { onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { usePokemonStore } from '@/stores/pokemon.js';
import MaterialSymbolsSearch from '~icons/material-symbols/search';
import CarbonNextOutline from '~icons/carbon/next-outline';
import CarbonPreviousOutline from '~icons/carbon/previous-outline';


const pokemonStore = usePokemonStore();
const router = useRouter();

const viewPokemon = (url) => {
  const id = url.split('/').filter(Boolean).pop();
  router.push(`/pokemon/${id}`);
};

onMounted(async () => {
  if (!pokemonStore.allPokemons.length) {
    await pokemonStore.fetchAllPokemons();
  }
});

watch(pokemonStore.searchQuery, () => {
  pokemonStore.filterPokemons();
});
</script>

<template>
  <main class="container px-5 py-5 mx-auto flex-1 flex flex-col overflow-hidden">
    <div class="flex flex-col items-center justify-center mb-4 space-y-2">
      <h1 class="text-4xl text-white font-bold">Pokémon Index</h1>
      <div class='w-full md:w-1/2'>
        <div class="flex items-center h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
          <MaterialSymbolsSearch class="h-8 w-8 text-gray-500 mx-2" />
          <input v-model="pokemonStore.searchQuery" @input="pokemonStore.filterPokemons"
            class="h-full w-full outline-none text-sm text-gray-700 pr-2" type="text"
            placeholder="Search for a Pokémon by name.." />
        </div>
      </div>
    </div>
    <div class="shadow-xl shadow-teal-700 rounded-md bg-teal-800 overflow-y-auto flex-1 ">
      <div class="sticky -top-1 z-40 bg-teal-800 p-4 flex">
        <button @click="pokemonStore.prevPage" v-if="pokemonStore.currentPage !== 1"
          class="text-white disabled:opacity-50 flex items-center gap-1 transition ease-in-out delay-150 hover:scale-105">
          <CarbonPreviousOutline class="inline-block" />
          Previous
        </button>
        <button @click="pokemonStore.nextPage"
          v-if="pokemonStore.currentPage * pokemonStore.pageSize < pokemonStore.allPokemons.length"
          class=" ml-auto text-white disabled:opacity-50 flex items-center gap-1 transition ease-in-out delay-150 hover:scale-105">
          Next
          <CarbonNextOutline class="inline-block" />
        </button>
      </div>
      <div class=" grid grid-cols-1 md:grid-cols-5 gap-6 p-6">
        <div v-for=" pokemon in pokemonStore.displayedPokemons" :key="pokemon.name" @click="viewPokemon(pokemon.url)"
          class="rounded-2xl shadow-md bg-white flex flex-col items-center cursor-pointer transition ease-in-out delay-150 hover:scale-105">
          <img :src="pokemon.image" :alt="pokemon.name" class="object-cover h-35 w-35 -mt-7">
          <p class="text-lg font-bold mt-4 capitalize">{{ pokemon.name }}</p>
          <div class="flex justify-center mb-2 gap-1">
            <div v-for="type in pokemon.pokemon_details.types" :key="type.type.name">
              <div class="border px-2 py-1 rounded-lg">{{ type.type.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>