<script setup lang="ts">
import type PaginationResultItem from "@/models/api/PaginationResultItem";
import PokeApiService from "@/services/api/PokeApiService";

const props = defineProps({
  pokemon: Object as () => PaginationResultItem
});

const pokemonInfo = (await PokeApiService.getPokemon(props.pokemon?.name ?? '')).data;

</script>

<template>
  <div class="columns is-multiline">
    <div class="column is-12">
      <h2 class="title is-5 is-capitalized" v-text="pokemon.name"></h2>
    </div>
    <div class="column is-3">
      <figure class="image is-128x128">
        <img :src="pokemonInfo.sprites.front_default" alt="Thumbnail">
      </figure>
    </div>
    <div class="column is-9"></div>
  </div>
</template>

<style scoped>

</style>