<script setup>
import { usePokemonStore } from '@/stores/pokemon.js';
const pokemonStore = usePokemonStore();

</script>

<template>
    <div class="flex items-center justify-center flex-1">
        <img src="/src/assets/img/pokeball.png" alt="" class="animate-spin mx-auto h-40 w-40 " v-if="!pokemonStore.searchQuery">
        <div class="text-white text-2xl" v-else> No Pokémon Found :(</div>
    </div>
</template>