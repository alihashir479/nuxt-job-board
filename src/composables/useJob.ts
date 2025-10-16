import { useJobStore } from '~/stores/job'

export const useJob = () => {
  const jobStore = useJobStore()

  return {
    jobs: computed(() => jobStore.getAllJobs),
    totalPages: computed(() => jobStore.getTotalPages),
  }
}
