<script setup>
import { usePokemonStore } from '@/stores/pokemon';
import MaterialSymbolsSearch from '~icons/material-symbols/search';


const pokemonStore = usePokemonStore();

</script>

<template>
    <div class="flex items-center h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
        <MaterialSymbolsSearch class="h-8 w-8 text-gray-500 mx-2" />
        <input v-model="pokemonStore.searchQuery" @input="pokemonStore.filterPokemons"
            class="h-full w-full outline-none text-sm text-gray-700 pr-2" type="text"
            placeholder="Search for a Pokémon by name.." />
    </div>
</template>
