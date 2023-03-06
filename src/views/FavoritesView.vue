<template>
  <main>
    <List :items="resultsWithActions" :current-page="currentPage" :per-page="perPage" :total-pages="totalPages"
          @page-change="onPageChangeHandler"/>
  </main>
</template>

<script setup lang="ts">
import List from '@/components/List/List.vue';
import {computed, onBeforeMount, ref} from "vue";
import type PaginationResult from "@/models/api/PaginationResult";
import PokeApiService from "@/services/api/PokeApiService";
import type PaginationParams from "@/models/PaginationParams";
import router from "@/router";
import StoreService from "@/services/StoreService";


const currentPage = ref<number>(1);
const totalPages = ref<number>(1);
const perPage = ref<number>(20);
const paginatedResult = ref<PaginationResult>({results: [], count: 0, next: null, previous: null});

onBeforeMount(async () => {
  const favorites = StoreService.getFavorites(-1);
  paginatedResult.value = {
    count: favorites.length,
    previous: null,
    next: null,
    results: favorites.map(fav => {
      return {
        name: fav,
        url: ''
      };
    })
  };
  totalPages.value = getTotalPages(paginatedResult.value.count);
});

const onPageChangeHandler = async (params: PaginationParams) => {
  const favorites = StoreService.getFavorites(params.limit, params.offset);
  paginatedResult.value = {
    count: favorites.length,
    previous: null,
    next: null,
    results: favorites.map(fav => {
      return {
        name: fav,
        url: ''
      };
    })
  };
  currentPage.value = params.currentPage;
}

const resultsWithActions = computed(() => {
  const newResult: PaginationResult = {
    results: paginatedResult.value.results.map(pokemon => {
      pokemon.action = () => router.push({path: `/detail/${pokemon.name}`})
      return pokemon;
    }),
    next: paginatedResult.value.next,
    previous: paginatedResult.value.previous,
    count: paginatedResult.value.count,
  };
  return newResult;
});

const getTotalPages = (totalItems: number): number => {
  let pages = totalItems / 20;
  return pages % 2 === 0 ? pages : Math.trunc(pages) + 1;
};
</script>

<style scoped>

</style>
