<script setup lang="ts">
import List from '@/components/List.vue';
import PokeApiService from "@/services/api/PokeApiService";
import {onBeforeMount, ref} from "vue";
import type PaginationResult from "@/models/api/PaginationResult";
import type PaginationParams from "@/models/PaginationParams";

const currentPage = ref<number>(1);
const totalPages = ref<number>(1);
const perPage = ref<number>(20);

const paginationResultIndex = ref<PaginationResult>({results: [], count: 0, next: null, previous: null});
onBeforeMount(async () => {
  paginationResultIndex.value = (await PokeApiService.index()).data;
  totalPages.value = getTotalPages(paginationResultIndex.value.count);
});

const onPageChangeHandler = async (params: PaginationParams) => {
  paginationResultIndex.value = (await PokeApiService.index(params.limit, params.offset)).data;
  currentPage.value = params.currentPage;
}

const getTotalPages = (totalItems: number): number => {
  let pages = totalItems / 20;
  return pages % 2 === 0 ? pages : Math.trunc(pages) + 1;
};
</script>

<template>
  <main>
    <List :items="paginationResultIndex" :current-page="currentPage" :per-page="perPage" :total-pages="totalPages"
          @page-change="onPageChangeHandler"/>
  </main>
</template>
