<script setup>
import Header from './components/Header.vue'
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="bg-gray-400 h-screen flex flex-col">
    <Header />
    <RouterView />
  </div>
</template>
