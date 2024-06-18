<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { usePokemonStore } from '@/stores/pokemon';
import Loading from '../components/Loading.vue';


const pokemonStore = usePokemonStore();

const route = useRoute();
const pokemonId = route.params.id;

const pokemon = computed(() => {
    const pokemonFromStore = pokemonStore.displayedPokemons.find(pokemon => pokemon.url.split('/').filter(Boolean).pop() === pokemonId);
    if (pokemonFromStore) {
        return {
            name: pokemonFromStore.name,
            image: pokemonFromStore.pokemon_details.sprites.other['official-artwork'].front_default,
            pokemon_details: pokemonFromStore.pokemon_details,
            species_details: pokemonStore.speciesDetails
        };
    }
    return pokemonStore.selectedPokemon;
});

const description = computed(() => {
    return pokemon.value.species_details.flavor_text_entries.filter(text => text.language.name === 'en')[1].flavor_text
});


onMounted(async () => {
    if (!pokemon.value) {
        await pokemonStore.fetchSinglePokemon(pokemonId);
    } else {
        await pokemonStore.fetchSpeciesDetails(pokemon.value.pokemon_details.species.url);
    }
});

</script>

<template>
    <main class="container py-10 px-5 mx-auto flex-1 flex flex-col md:flex-row bg-gray-200 md:overflow-hidden"
        v-if="pokemon && pokemon.species_details">
        <div class="p-5 md:flex-1 flex items-center justify-center">
            <img :src="pokemon.image" :alt="pokemon.name" loading="eager" class="md:w-2/3 w-3/5 h-auto ">
        </div>
        <div class="px-3 overflow-y-auto flex-1">
            <div class="flex items-center flex-wrap sticky top-0 bg-gray-200">
                <h2 class="text-4xl font-semibold capitalize">{{ pokemon.name }}</h2>
                <div class="flex gap-3 ml-2">
                    <div v-for="type in pokemon.pokemon_details.types" :key="type.type.name">
                        <div class="border border-black px-2 py-1 rounded-lg">{{ type.type.name }}</div>
                    </div>
                </div>
                <span class="text-md text-gray-600 w-full ">ID#{{ pokemonId }}</span>
            </div>
            <p class="text-md mt-2">{{ description }}</p>
            <div class="mt-4 text-center">
                <p class="text-lg font-semibold">Abilities</p>
                <div class="flex flex-wrap justify-center">
                    <div v-for="ability in pokemon.pokemon_details.abilities" :key="ability.ability.name"
                        class="mr-2 mt-2 px-3 py-1 rounded-xl bg-white text-gray-600">
                        {{ ability.ability.name }}
                    </div>
                </div>
            </div>
            <p class="mt-4 text-lg font-semibold text-center">Details</p>
            <div class="border-t border-gray-800 pt-3">
                <div class="grid grid-cols-6 mt-2 items-center">
                    <span class="col-span-2 uppercase font-medium">Height:</span>
                    <div class="col-span-4 text-center px-3 py-1 rounded-xl bg-gray-300">
                        {{ pokemon.pokemon_details.height / 10 }}m
                    </div>
                </div>
                <div class="grid grid-cols-6 mt-2 items-center">
                    <span class="col-span-2 uppercase font-medium">Weigth:</span>
                    <div class="col-span-4 text-center px-3 py-1 rounded-xl bg-gray-300">
                        {{ pokemon.pokemon_details.weight / 10 }}Kg
                    </div>
                </div>
                <div class="grid grid-cols-6 mt-2 items-center">
                    <span class="col-span-2 uppercase font-medium">Base EXP:</span>
                    <div class="col-span-4 text-center px-3 py-1 rounded-xl bg-gray-300">
                        {{ pokemon.pokemon_details.base_experience }}
                    </div>
                </div>
            </div>
            <p class="mt-4 text-lg font-semibold text-center">Stats</p>
            <div class="border-t border-gray-800 pt-3">
                <div class="grid grid-cols-6 mt-2 items-center" v-for="stat in pokemon.pokemon_details.stats"
                    :key="stat.stat.name">
                    <span class="col-span-2 uppercase font-medium">{{ stat.stat.name }}:</span>
                    <div class="col-span-4 text-center px-3 py-1 rounded-xl bg-gray-300">
                        {{ stat.base_stat }}
                    </div>
                </div>
            </div>
        </div>
    </main>
    <Loading v-else />

</template>