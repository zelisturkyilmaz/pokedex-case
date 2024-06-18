<script setup>
import { computed } from 'vue';
import { usePokemonStore } from '@/stores/pokemon';
import CarbonNextOutline from '~icons/carbon/next-outline';
import CarbonPreviousOutline from '~icons/carbon/previous-outline';

const pokemonStore = usePokemonStore();

const totalPokemons = computed(() => {
    return pokemonStore.searchQuery ? pokemonStore.filteredPokemons.length : pokemonStore.allPokemons.length
});

</script>

<template>
    <div class="sticky -top-1 z-40 bg-cyan-800 p-3 flex">
        <button @click="pokemonStore.prevPage"
            :disabled="!pokemonStore.displayedPokemons.length || pokemonStore.currentPage === 1"
            class="text-white disabled:opacity-50 flex items-center gap-1 transition ease-in-out delay-150 hover:scale-105">
            <CarbonPreviousOutline class="inline-block" />
            Previous
        </button>
        <button @click="pokemonStore.nextPage"
            :disabled="!pokemonStore.displayedPokemons.length || pokemonStore.currentPage * pokemonStore.pageSize >= totalPokemons"
            class=" ml-auto text-white disabled:opacity-50 flex items-center gap-1 transition ease-in-out delay-150 hover:scale-105">
            Next
            <CarbonNextOutline class="inline-block" />
        </button>
    </div>


</template>