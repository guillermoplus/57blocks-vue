<template>
  <div class="columns is-mobile is-multiline">
    <div class="column is-8-mobile is-10-tablet cursor-pointer" @click="viewDetail">
      <slot></slot>
    </div>
    <div class="column is-4-mobile is-2-tablet">
      <button class="button is-white has-text-danger" @click="clickOnFavorite">
        <i :class="[isFavorite ? 'fa-solid' : 'fa-regular', 'fa-heart']"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import StoreService from "@/services/StoreService";

const props = defineProps({
  id: {
    type: String,
    default: '0',
    required: true
  }
});

const emit = defineEmits(['addToFavorite', 'removeFromFavorite', 'viewDetail']);

const isFavorite = ref(false);

onBeforeMount(() => {
  isFavorite.value = StoreService.getFavorite(props.id) !== null;
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
    StoreService.storeFavorite(props.id);
    isFavorite.value = true;
    emit('addToFavorite');
  } catch {
    isFavorite.value = false;
  }
};

const removeFromFavorite = () => {
  try {
    StoreService.removeFavorite(props.id);
    isFavorite.value = false;
    emit('removeFromFavorite');
  } catch {
    isFavorite.value = true;
  }
};

const viewDetail = () => {
  emit('viewDetail', props.id);
};
</script>

<style scoped>
.cursor-pointer:hover {
  cursor: pointer;
}
</style>