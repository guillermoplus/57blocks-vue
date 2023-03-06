<template>
  <div class="card">
    <div v-if="pokemon === undefined" class="has-text-centered">
      <h1 class="title is-1">404 Pokemon not found</h1>
    </div>
    <div v-else>
      <div class="card-image">
        <figure class="image is-128x128" style="margin: 0 auto;">
          <img :src="pokemon.sprites.other['official-artwork'].front_default ?? './src/assets/who-is.png'"
               alt="Placeholder image">
        </figure>
        {{ pokemon }}
      </div>
      <div class="card-content">
        {{ name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import type Pokemon from "@/models/api/Pokemon";
import PokeApiService from "@/services/api/PokeApiService";
import {AxiosError} from "axios";

const props = defineProps({
  name: {
    type: String,
    required: true,
  }
});

const pokemon = ref<Pokemon>();
onBeforeMount(async () => {
  const response = await PokeApiService.getPokemon(props.name);
  if (typeof response !== typeof AxiosError) {
    pokemon.value = response.data;
  }
});
</script>

<style scoped>

</style>