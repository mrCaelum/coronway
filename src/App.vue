<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    <v-toolbar-title class="toolbar-title">
        WORKSHOP
    </v-toolbar-title>
    </v-app-bar>

    <v-content>
        <router-view />
    </v-content>

    <core-footer />
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
  })
};
</script>

<style>
    html {
        overflow-y: auto;
    }

    .toolbar-title {
        font-size: 4vh !important;
        font-weight: 600 !important;
    }
</style>
