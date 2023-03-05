<script setup lang="ts">
import Item from '@/components/Item.vue';
import Movie from '@/components/item-types/Movie.vue';

const props = defineProps({
  items: {
    type: Array,
    default: new Array(0)
  }
})

const arrTemp = new Array(20).fill('');
</script>

<template>
  <table class="table is-fullwidth is-hoverable">
    <tbody>
    <tr v-for="item in items" :key="item.id">
      <td>
        <Item>
          <Movie v-bind="item"/>
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