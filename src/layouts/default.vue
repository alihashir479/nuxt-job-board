<template>
  <v-app>
    <Header />
    <v-main>
      <v-container class="py-6">
        <slot />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script setup>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
</script>
