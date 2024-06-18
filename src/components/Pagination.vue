<script setup>
import { ref, watch } from 'vue';
import { usePokemonStore } from '@/stores/pokemon';
import CarbonNextOutline from '~icons/carbon/next-outline';
import CarbonPreviousOutline from '~icons/carbon/previous-outline';

const pokemonStore = usePokemonStore();


</script>

<template>
    <div class="sticky -top-1 z-40 bg-cyan-800 p-3 flex">
        <button @click="pokemonStore.prevPage" v-if="pokemonStore.currentPage !== 1"
            :disabled="!pokemonStore.displayedPokemons.length"
            class="text-white disabled:opacity-50 flex items-center gap-1 transition ease-in-out delay-150 hover:scale-105">
            <CarbonPreviousOutline class="inline-block" />
            Previous
        </button>
        <button @click="pokemonStore.nextPage" :disabled="!pokemonStore.displayedPokemons.length"
            v-if="pokemonStore.currentPage * pokemonStore.pageSize < pokemonStore.allPokemons.length"
            class=" ml-auto text-white disabled:opacity-50 flex items-center gap-1 transition ease-in-out delay-150 hover:scale-105">
            Next
            <CarbonNextOutline class="inline-block" />
        </button>
    </div>


</template>