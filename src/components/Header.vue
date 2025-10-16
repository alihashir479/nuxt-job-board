<template>
  <v-app-bar color="primary" dark>
    <v-toolbar-title>{{$t('appTitle')}}</v-toolbar-title>
    <template #append>
      <ChangeLang />
    </template>
  </v-app-bar>
</template>
<script setup>
import ChangeLang from './lang/ChangeLang.vue'
</script>