<script setup lang="ts">
import List from '@/components/List.vue';
import type Movie from "@/models/movie";

const movies: Movie[] = [
  {
    title: 'Die hard',
    image: 'https://www.mundiario.com/asset/thumbnail,1280,720,center,center/media/mundiario/images/2022/12/02/2022120207414343615.png',
    synopsis: 'New York City policeman John McClane (Bruce Willis) is visiting his estranged wife (Bonnie Bedelia) and two daughters on Christmas Eve. He joins her at a holiday party in the headquarters of the Japanese-owned business she works for. But the festivities are interrupted by a group of terrorists who take over the exclusive high-rise, and everyone in it. Very soon McClane realizes that there\'s no one to save the hostages -- but him.'
  },
  {
    title: 'Jumanji',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Jumanji_poster.jpg/220px-Jumanji_poster.jpg',
    synopsis: 'A magical board game unleashes a world of adventure on siblings Peter (Bradley Pierce) and Judy Shepherd (Kirsten Dunst). While exploring an old mansion, the youngsters find a curious, jungle-themed game called Jumanji in the attic. When they start playing, they free Alan Parrish (Robin Williams), who\'s been stuck in the game\'s inner world for decades. If they win Jumanji, the kids can free Alan for good -- but that means braving giant bugs, ill-mannered monkeys and even stampeding rhinos!'
  }
];
</script>

<template>
  <main>
    <List :items="movies"/>
  </main>
</template>
