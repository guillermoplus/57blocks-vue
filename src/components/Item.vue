<template>
  <div class="columns is-mobile is-multiline">
    <div class="column is-8-mobile is-10-tablet">
      <slot></slot>
    </div>
    <div class="column is-4-mobile is-2-tablet">
      <button class="button" @click="viewDetail">View detail</button>
      <button class="button is-white has-text-danger" @click="clickOnFavorite">
        <i :class="[isFavorite ? 'fa-solid' : 'fa-regular', 'fa-heart']"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onBeforeMount, ref} from "vue";
import StoreServices from "@/services/StoreServices";

const props = defineProps({
  id: {
    type: Number,
    default: 0,
  }
});

const emit = defineEmits(['addToFavorite', 'removeFromFavorite', 'viewDetail']);

const isFavorite = ref(false);

onBeforeMount(() => {
  isFavorite.value = StoreServices.getFavorite(props.id) !== null;
});

const clickOnFavorite = () => {
  if (!isFavorite.value) {
    addToFavorite();
  } else {
    removeFromFavorite();
  }
}

const addToFavorite = () => {
  try {
    StoreServices.storeFavorite(props.id);
    isFavorite.value = true;
    emit('addToFavorite');
  } catch {
    isFavorite.value = false;
  }
};

const removeFromFavorite = () => {
  try {
    StoreServices.removeFavorite(props.id);
    isFavorite.value = false;
    emit('removeFromFavorite');
  } catch {
    isFavorite.value = true;
  }
};

const viewDetail = () => {
  console.log('viewDetail');
  emit('viewDetail');
};
</script>

<style scoped>

</style>