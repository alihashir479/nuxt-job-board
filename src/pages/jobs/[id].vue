<template>
  <v-container class="py-8">
    <v-card class="mx-auto pa-6" max-width="700">
      <v-card-title class="text-h5 font-weight-bold mb-4">
        {{ job?.title }}
      </v-card-title>

      <v-card-subtitle class="text-subtitle-1 mb-2">
        <v-icon icon="mdi-office-building" class="mr-2" />
        {{ job?.company }}
      </v-card-subtitle>

      <v-card-subtitle class="text-subtitle-2 mb-4">
        <v-icon icon="mdi-map-marker" class="mr-2" />
        {{ job?.location }}
      </v-card-subtitle>

      <v-divider class="my-4" />

      <div class="text-body-1" v-html="job?.description"></div>

      <v-divider class="my-4" />

      <div class="text-caption text-grey">
        Posted on: {{ job?.datePosted }}
      </div>

      <v-card-actions class="justify-end mt-6">
        <v-btn 
          color="primary" 
          variant="tonal" 
          @click="navigateTo(`/`)"
        >
          ← {{ $t('Back to Job Listings') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useJobStore } from '~/stores/job'

const route = useRoute()
const jobStore = useJobStore()
const { getJob: job } = storeToRefs(jobStore)

const jobId = Number(route.params.id)
await useAsyncData(`job-${jobId}`, async () => {
  return await jobStore.getJobById(jobId)
})
</script>
