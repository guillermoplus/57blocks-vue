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
  }
});

const emit = defineEmits(['previousPage', 'nextPage', 'pageClicked']);

const pagination = ref<PaginationParams>({
  limit: 20,
  offset: 0,
  total: props.items?.count,
  next: props.items?.next,
  previous: props.items?.previous,
  currentPage: 1,
  lastPage: 1,
});

const totalPages = computed<number>(() => {
  let pages = props.items?.count / 20;
  return pages % 2 === 0 ? pages : Math.trunc(pages) + 1;
});

const middlePages = computed<number[]>(() => {
  const middle = Math.trunc(totalPages.value / 2);
  return [middle - 1, middle, middle + 1];
});

const nextPage = () => {
  pagination.value.currentPage = pagination.value.currentPage + 1;
  pagination.value.offset = (pagination.value.currentPage * pagination.value.limit) + 1;
  pagination.value.lastPage = totalPages.value;
  console.log('nextPage');
  emit('nextPage');
};

const previousPage = () => {
  pagination.value.currentPage = pagination.value.currentPage - 1;
  pagination.value.offset = (pagination.value.currentPage * pagination.value.limit) + 1;
  pagination.value.lastPage = totalPages.value;
  console.log('previousPage');
  emit('previousPage');
}

const pageClicked = (pageNumber: number) => {
  pagination.value.currentPage = pageNumber;
  pagination.value.offset = (pageNumber * pagination.value.limit) + 1;
  pagination.value.lastPage = totalPages.value;
  emit('pageClicked', pagination);
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
    <a class="pagination-previous" @click="previousPage">Previous</a>
    <a class="pagination-next" @click="nextPage">Next page</a>
    <ul class="pagination-list">
      <li><a :class="{'pagination-link': true, 'is-current': pagination.currentPage === 1}" aria-label="Goto page 1"
             @click="pageClicked(1)">1</a></li>
      <li><span class="pagination-ellipsis">&hellip;</span></li>
      <li v-for="page in middlePages" :key="page">
        <a :class="{'pagination-link': true, 'is-current': pagination.currentPage === page}"
           :aria-label="`Goto page ${page}`" @click="pageClicked(page)">{{ page }}</a>
      </li>
      <li><span class="pagination-ellipsis">&hellip;</span></li>
      <li><a :class="{'pagination-link': true, 'is-current': pagination.currentPage === totalPages}"
             aria-label="Goto page 86" @click="pageClicked(totalPages)">{{ totalPages }}</a></li>
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