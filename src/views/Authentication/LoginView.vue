<template>
  <div class="columns is-multiline">
    <div class="column is-6 is-offset-3">
      <div class="card">
        <div class="card-content" @submit.prevent="submit">
          <h3 class="title is-3">Login</h3>
          <form action="">
            <div class="field">
              <label for="username" class="label">Username</label>
              <div class="control">
                <input type="text" id="username" class="input" placeholder="Email" v-model="form.username">
              </div>
            </div>
            <div class="field">
              <label for="password" class="label">Password</label>
              <div class="control">
                <input type="password" id="password" class="input" placeholder="Password" v-model="form.password">
              </div>
            </div>
            <div class="field">
              <button class="button is-link">Iniciar sesión</button>
              <a href="#" class="button is-ghost">Olvidó su contraseña</a>
            </div>
            <div class="notification is-danger">
              This is only an authentication system simulation, you can use any username and password to log in.
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import Authentication from "@/helpers/authentication";
import router from "@/router";

const form = ref({
  username: '',
  password: '',
})
const submit = () => {
  if (!form.value.username || !form.value.password) {
    alert('You must fill in all the fields of the login form!');
  }
  Authentication.authenticate(form.value.username, form.value.password);
  router.push({name: 'home'});
};
</script>

<style scoped>

</style>