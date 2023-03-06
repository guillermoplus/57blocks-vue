<script setup lang="ts">
import Item from '@/components/Item.vue';
import Pokemon from '@/components/Pokemon.vue';
import type PaginationResult from "@/models/api/PaginationResult";

const props = defineProps({
  items: {
    type: Object as () => PaginationResult,
  }
});

const item = {};
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