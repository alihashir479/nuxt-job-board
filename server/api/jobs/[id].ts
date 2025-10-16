import mockData from '~/MOCK_DATA.json'
import { Job } from '~/stores/job'

export default defineEventHandler((event) => {
  const params = event.context.params as { id: string }
  const jobId = Number(params.id)

  const job = mockData.find((item: Job) => item.id === jobId)

  if (!job) {
    throw createError({
      statusCode: 404,
      statusMessage: `Job with ID ${params.id} not found`
    })
  }

  return job
})
