<script setup>
import Header from './components/Header.vue'
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="bg-gray-200 h-dvh flex flex-col">
    <Header />
    <RouterView />
  </div>
</template>
