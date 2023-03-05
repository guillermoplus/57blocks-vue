<script setup lang="ts">
import {RouterLink, RouterView, useRoute} from 'vue-router'
import {computed, ref, watch} from "vue";
import Authentication from "@/helpers/authentication";

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
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125"/>
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
    <RouterView/>
  </div>
</template>

<style scoped>

</style>
