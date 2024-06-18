<script setup>
import { usePokemonStore } from '@/stores/pokemon';

const pokemonStore = usePokemonStore();

const props = defineProps({
    pokemon: {
        type: Object,
        required: true,
    },
})

const emit = defineEmits(['view-pokemon'])

const handleViewPokemon = () => {
    emit('view-pokemon', props.pokemon.url)
}

</script>

<template>
    <div class="rounded-2xl shadow-md bg-white flex flex-col justify-end items-center cursor-pointer transition ease-in-out delay-150 hover:scale-105 relative h-44"
        @click="handleViewPokemon">
        <img :src="pokemon.image || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'"
            :alt="pokemon.name" class="absolute h-36 w-36 -top-6" />
        <p class="text-sm font-bold mt-4 capitalize">{{ pokemon.name }}</p>
        <div class="flex justify-center mb-2 gap-1">
            <div v-for="type in pokemon.pokemon_details.types" :key="type.type.name">
                <div class="border px-2 py-1 rounded-lg" :class="`bg-[${pokemonStore.typeColors[type.type.name]}]`">{{
                    type.type.name }}</div>
            </div>
        </div>
    </div>
</template>