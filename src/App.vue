<script setup lang="ts">
import {RouterLink, RouterView, useRoute} from 'vue-router'
import {computed, ref, watch} from "vue";
import Authentication from "@/helpers/authentication";
import DetailView from '@/views/DetailView.vue';

const route = useRoute();
const path = computed(() => route.path);
const isLoggedIn = ref(false);

watch(route, () => {
  isLoggedIn.value = Authentication.isAuthenticated();
});

const logout = () => {
  Authentication.logout();
  window.location.reload();
}

const hasTransition = (path: string) => {
  return path.match('\\/detail\\/[A-z]*[0-9]*') !== null || path === '/';
}
</script>

<template>
  <header>
    <div class="logo">
      <img alt="Vue logo" src="@/assets/logo.png"/>
    </div>
    <div class="tabs is-centered">
      <ul>
        <li :class="{'is-active':path==='/'}" v-show="isLoggedIn">
          <RouterLink to="/">
            <span class="icon is-small"><i class="fas fa-house" aria-hidden="true"></i></span>
            <span>Home</span>
          </RouterLink>
        </li>
        <li :class="{'is-active':path==='/favorites'}" v-show="isLoggedIn">
          <RouterLink to="/favorites">
            <span class="icon is-small"><i class="fas fa-heart" aria-hidden="true"></i></span>
            <span>Favorites</span>
          </RouterLink>
        </li>
        <li :class="{'is-active':path==='/login'}" v-show="!isLoggedIn">
          <RouterLink to="/login">
            <span class="icon is-small"><i class="fas fa-user" aria-hidden="true"></i></span>
            <span>Login</span>
          </RouterLink>
        </li>
        <li v-show="isLoggedIn">
          <a @click="logout">
            <span class="icon is-small"><i class="fas fa-times" aria-hidden="true"></i></span>
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </div>
  </header>

  <div class="container is-widescreen">
    <RouterView v-slot="{Component, route}">
      <transition
          mode="out-in"
          :enter-active-class="hasTransition(route.path) ? route.meta.enterClass : ''"
          :leave-active-class="hasTransition(route.path) ? route.meta.leaveClass : ''">
        <component :is="Component"/>
      </transition>
    </RouterView>
  </div>
</template>

<style scoped>
.logo img {
  max-width: 120px;
}

.logo {
  text-align: center;
}
</style>
