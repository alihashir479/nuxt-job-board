import { defineStore } from 'pinia'

export interface Job {
  id: number,
  title: string,
  company: string,
  location: string,
  description: string,
  datePosted: string
}

type JobStoreState = {
  jobs: Job[],
  job: Job,
  totalPages: number
}

export type FilterType = {
  page: number,
  company?: string,
  location?: string,
  sortBy?: 'title' | 'datePosted'
}

const PAGE_SIZE = 10

export const useJobStore = defineStore('job', {
  state: (): JobStoreState => ({
    jobs: [],
    job: {} as Job,
    totalPages: 1
  }),

  getters: {
    getAllJobs: (state) => state.jobs,
    getTotalPages: (state) => state.totalPages,
    getJob: (state) => state.job
  },

  actions: {
    async fetchJobs(filters: FilterType) {
      const { data, error } = await useFetch<Job[]>('/api/jobs', { params: filters })
       if (error.value) {
        console.error('Failed to fetch jobs:', error.value)
        return
      }
      if(data.value) {
        const skipElements = (filters.page - 1) * PAGE_SIZE
        this.jobs = data.value.slice(skipElements, skipElements + PAGE_SIZE) || []
        this.totalPages = Math.max(1, Math.ceil(data.value.length / PAGE_SIZE))
        return this.jobs
      }
    },

    async getJobById(id: number) {
      const { data: job } = await useFetch(`/api/jobs/${id}`)
      this.job = job.value as Job
    }
  }
})