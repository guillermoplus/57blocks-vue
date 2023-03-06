<script setup lang="ts">
import List from '@/components/List.vue';
import PokeApiService from "@/services/api/PokeApiService";
import {onBeforeMount, ref} from "vue";
import type PaginationResult from "@/models/api/PaginationResult";
import type PaginationParams from "@/models/PaginationParams";

const paginationResultIndex = ref<PaginationResult>({results: [], count: 0, next: null, previous: null});
onBeforeMount(async () => {
  paginationResultIndex.value = (await PokeApiService.index()).data;
});

const pageClickedHandler = ($event: PaginationParams) => {
  console.log($event);
}

const nextPageHandler = ($event: PaginationParams) => {
  console.log($event);
}

const previousPage = ($event: PaginationParams) => {
  console.log($event);
}
</script>

<template>
  <main>
    <List :items="paginationResultIndex" @page-clicked="pageClickedHandler" @next-page="nextPageHandler"
          @previous-page="previousPage"/>
  </main>
</template>
