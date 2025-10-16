<template>
  <v-container class="py-8">
    <div class="d-flex justify-end align-center mb-6">
      <v-text-field
        v-model="filters.company"
        :label="$t('Filter by Company')"
        variant="outlined"
        dense
        class="mr-4 w-25"
        style="max-width: 250px;"
        @input="loadJobsDebounced(filters)"
      />
      <v-text-field
        v-model="filters.location"
        :label="$t('Filter by Location')"
        variant="outlined"
        style="max-width: 250px;"
        class="mr-4 w-25"
        dense
        @input="loadJobsDebounced(filters)"
      />
      <v-select
        v-model="filters.sortBy"
        :items="[
          { title: $t('Sort By Date'), value: 'datePosted' },
          { title: $t('Sort By Title'), value: 'title' }
        ]"
        :label="$t('Sort By')"
        variant="outlined"
        dense
        style="max-width: 200px;"
        @update:model-value="loadJobs(filters)"
      />
    </div>
    <v-row dense>
      <v-col
        v-for="job in jobs"
        :key="job.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="elevation-2 rounded-lg hover:scale-105 transition-transform duration-300">
          <v-card-title class="text-h6 font-weight-medium">
            {{ job.title }}
          </v-card-title>

          <v-card-subtitle class="text-body-2 text-grey-darken-1">
            {{ job.company }} — {{ job.location }}
          </v-card-subtitle>

          <v-card-text>
            <client-only>
              <p class="text-body-2" v-html="getDescription(job.description)"></p>
            </client-only>

            <p class="text-caption text-grey mt-2">
              {{ job.datePosted }}
            </p>
          </v-card-text>

          <v-card-actions>
            <v-btn 
              color="primary" 
              variant="flat" 
              size="small"
              @click="navigateTo(`/jobs/${job.id}`)"
            >
              {{ $t('View Details') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <div class="d-flex justify-center mt-6">
      <v-pagination
        v-model="filters.page"
        :key="totalPages"
        :length="totalPages"
        color="primary"
        @update:model-value="loadJobs(filters)"
      />
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { useJobStore, type FilterType } from '~/stores/job'
import { debounce } from '~/utils/helper'
import { storeToRefs } from 'pinia'
import { reactive } from 'vue'

const jobStore = useJobStore()
const { getAllJobs: jobs, getTotalPages: totalPages } = storeToRefs(jobStore)

const filters = reactive<FilterType>({
  page: 1,
  company: '',
  location: '',
  sortBy: ''
})

const getDescription = (description: string) =>
  description.length > 100 ? description.slice(0, 100) + '...' : description


const loadJobs = async (filters: FilterType) => {
  await jobStore.fetchJobs(filters)
}

const loadJobsDebounced = debounce(loadJobs, 500)

await useAsyncData('jobs', async () => {
  return await jobStore.fetchJobs(filters)
})
</script>
