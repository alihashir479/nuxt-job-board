<template>
  <v-btn-toggle
    v-model="currentLang"
    @update:model-value="changeLanguage"
    color="primary"
    density="comfortable"
    class="language-toggle"
    mandatory
  >
    <v-btn
      v-for="lang in locales"
      :key="lang.code"
      :value="lang.code"
      class="lang-btn"
      :class="{ 'active-lang': locale === lang.code }"
    >
      {{ lang.name }}
    </v-btn>
  </v-btn-toggle>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { locale, setLocale, locales } = useI18n()
const currentLang = ref(locale || 'en')

const changeLanguage = (val) => {
  setLocale(val)
}
</script>

<style scoped>
.language-toggle {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.lang-btn {
  transition: all 0.2s ease;
  text-transform: none;
  font-weight: 500;
  background-color: var(--v-theme-surface);
}

.active-lang {
  background-color: var(--v-theme-primary) !important;
  color: white !important;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

</style>
