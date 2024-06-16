<template>
    <div>
        <img :src="pokemon.image" alt="{{ pokemon.name }}" class="w-full h-48 object-cover rounded-t-lg">
        <p class="text-lg font-bold mt-4">{{ pokemon.name }}</p>
    </div>
</template>