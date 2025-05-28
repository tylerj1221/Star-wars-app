<!-- src/App.vue -->
<template>
  <v-app>
    <v-main class="background">
      <v-container class="pa-4">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>
