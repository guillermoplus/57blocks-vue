<script setup lang="ts">
import Item from '@/components/Item.vue';
import Pokemon from '@/components/Pokemon.vue';
import type PaginationResult from "@/models/api/PaginationResult";
import {computed, ref} from "vue";
import type PaginationParams from "@/models/PaginationParams";

const props = defineProps({
  pagination: {
    type: Object,
    required: true,
  },
  items: {
    type: Object as () => PaginationResult,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
    default: 1,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  visiblePageRange: {
    type: Number,
    default: 5,
  },
  perPage: {
    type: Number,
    default: 20,
  }
});

const emit = defineEmits(['pageChange']);

const paginationParams = ref<PaginationParams>({
  limit: props.perPage,
  offset: 0,
  total: props.items?.count,
  next: props.items?.next,
  previous: props.items?.previous,
  currentPage: props.currentPage,
  lastPage: props.totalPages,
});

const showPreviousButton = computed(() => props.currentPage > 1);

const showNextButton = computed(() => props.currentPage < props.totalPages);

const visiblePages = computed(() => {
  const halfRange = Math.floor(props.visiblePageRange / 2);
  const startPage = Math.max(1, props.currentPage - halfRange);
  const endPage = Math.min(props.totalPages, startPage + props.visiblePageRange - 1);
  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return pages
});

const onPageChange = (pageNumber: number) => {
  if (pageNumber < 1 || pageNumber > props.totalPages || pageNumber === props.currentPage) {
    return;
  }
  updatePaginationParams(pageNumber);
  emit('pageChange', paginationParams.value);
};

const updatePaginationParams = (newCurrentPage: number) => {
  paginationParams.value.currentPage = newCurrentPage;
  paginationParams.value.offset = ((newCurrentPage - 1) * paginationParams.value.limit);
  paginationParams.value.lastPage = props.totalPages;
};
</script>

<template>
  <table class="table is-fullwidth is-hoverable">
    <tbody>
    <tr v-for="item in items.results" :key="item.name">
      <td>
        <Item :id="item.name">
          <Suspense>
            <Pokemon :pokemon="item"/>
          </Suspense>
        </Item>
      </td>
    </tr>
    </tbody>
  </table>
  <nav class="pagination is-centered" role="navigation" aria-label="pagination">
    <a class="pagination-previous" v-show="showPreviousButton" @click="onPageChange(currentPage - 1)">Previous</a>
    <a class="pagination-next" v-show="showNextButton" @click="onPageChange(currentPage + 1)">Next page</a>
    <ul class="pagination-list">
      <li v-for="page in visiblePages" :key="page">
        <a :class="{'pagination-link': true, 'is-current': currentPage === page}"
           :aria-label="`Goto page ${page}`" @click="onPageChange(page)">{{ page }}</a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.table tbody {
  overflow-y: scroll;
  height: 70vh;
}

.table tbody, tbody tr, tbody td {
  width: 100%;
  display: inline-block;
}

</style>