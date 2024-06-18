<template>
    <header class="sticky top-0 z-50">
        <nav class="text-gray-200 w-full grid grid-cols-4 grid-rows-2 ">
            <div class=" bg-red-700 row-span-2 flex items-center border-red-700 border-r border-2">
                <RouterLink to="/">
                    <HugeiconsPokeball
                        class="h-16 w-16 ml-1 transition ease-in-out delay-150 hover:scale-110 hover:text-cyan-900 hover:brightness-200" />
                </RouterLink>
            </div>
            <div class="py-12 bg-red-700 -ml-0.5 row-span-2 [clip-path:polygon(0_0,100%_0,100%_50%,0_100%)]">
            </div>
            <div class="col-span-2 bg-red-700 -ml-1 flex items-center justify-end">
                <a href="https://github.com/zelisturkyilmaz/pokedex-case" target="_blank">
                    <MdiGithub
                        class="h-10 w-10 mr-1 transition ease-in-out delay-150 hover:scale-110 hover:text-cyan-900 hover:brightness-200" />
                </a>
            </div>
        </nav>
    </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import HugeiconsPokeball from '~icons/hugeicons/pokeball';
import MdiGithub from '~icons/mdi/github';

</script>