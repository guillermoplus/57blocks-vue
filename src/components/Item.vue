<template>
  <div class="columns is-mobile is-multiline">
    <div class="column is-10-mobile is-11-tablet">
      <slot></slot>
    </div>
    <div class="column is-2-mobile is-1-tablet">
      <button class="button is-white has-text-danger" @click="addToFavorite">
        <i :class="[isFavorite ? 'fa-solid' : 'fa-regular', 'fa-heart']"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  id: {
    type: Number,
    default: 0,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['addToFavorite']);

const addToFavorite = () => {
  console.log('addToFavorite', props.id);
  emit('addToFavorite', props.id);
};
</script>

<style scoped>

</style>