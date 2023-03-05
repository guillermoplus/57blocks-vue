<script setup lang="ts">
import List from '@/components/List.vue';
import type Movie from "@/models/movie";
import PokeApi from "@/services/api/PokeApi";
import {onBeforeMount, onMounted, ref} from "vue";
import type PaginationResult from "@/models/api/PaginationResult";
import type {AxiosResponse} from "axios";

const paginationResultIndex = ref<PaginationResult>({results: [], count: 0, next: null, previous: null});
onBeforeMount(async () => {
  paginationResultIndex.value = (await PokeApi.index()).data;
});
</script>

<template>
  <main>
    <List :items="paginationResultIndex"/>
  </main>
</template>
