<template>
  <main>
    <PokemonDetail :name="slugId"/>
  </main>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import PokemonDetail from "@/components/PokemonDetail.vue";

const route = useRoute();
const slugId = route.params.name;
</script>

<style scoped>

</style>