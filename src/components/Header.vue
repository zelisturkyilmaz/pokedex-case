<template>
    <header class="sticky top-0 ">
        <nav class="text-gray-200 w-full grid grid-cols-4 grid-rows-2 ">
            <div class=" bg-red-700 row-span-2 flex items-center border-red-700 border-r">
                <RouterLink to="/">
                    <HugeiconsPokeball
                        class="h-20 w-20 ml-2 transition ease-in-out delay-150 hover:scale-110 hover:text-cyan-900 hover:brightness-200" />
                </RouterLink>
            </div>
            <div class="py-14 bg-red-700 row-span-2 [clip-path:polygon(0_0,100%_0,100%_50%,0_100%)]">
            </div>
            <div class="col-span-2 bg-red-700 -ml-1 flex items-center justify-end">
                <a href="https://github.com/zelisturkyilmaz/pokedex-case" target="_blank">
                    <MdiGithub
                        class="h-10 w-10 mr-2 transition ease-in-out delay-150 hover:scale-110 hover:text-cyan-900 hover:brightness-200" />
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