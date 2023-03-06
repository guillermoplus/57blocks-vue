<script setup lang="ts">
import List from '@/components/List.vue';
import PokeApiService from "@/services/api/PokeApiService";
import {onBeforeMount, ref} from "vue";
import type PaginationResult from "@/models/api/PaginationResult";

const paginationResultIndex = ref<PaginationResult>({results: [], count: 0, next: null, previous: null});
onBeforeMount(async () => {
  paginationResultIndex.value = (await PokeApiService.index()).data;
});
</script>

<template>
  <main>
    <List :items="paginationResultIndex"/>
  </main>
</template>
