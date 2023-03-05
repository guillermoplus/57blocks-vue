<template>
  <div class="columns is-multiline">
    <div class="column is-12">
      <h2 class="title is-5" v-text="title"></h2>
    </div>
    <div class="column is-3">
      <figure class="image is-128x128">
        <img :src="image" alt="Thumbnail">
      </figure>
    </div>
    <div class="column is-9" v-text="synopsis"></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: 'Undefined movie title',
  },
  image: {
    type: String,
    default: 'https://bulma.io/images/placeholders/256x256.png',
  },
  synopsis: {
    type: String,
    default: 'Undefined movie synopsis',
  }
})


// Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum venenatis orci metus, at porttitor enim
// commodo non. Nullam sollicitudin, est mollis lobortis suscipit, enim risus scelerisque ligula, id ullamcorper
// neque est ac purus. Pellentesque a ante non ante venenatis facilisis at in urna. Proin ut sapien at enim aliquet
// varius. Praesent quis arcu eu justo bibendum vestibulum. Cras at tincidunt lorem laoreet.
</script>

<style scoped>

</style>