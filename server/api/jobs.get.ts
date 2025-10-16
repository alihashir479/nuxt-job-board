import mockData from '~/MOCK_DATA.json'
import { Job } from '~/stores/job'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const company = (query.company as string) || ''
  const location = (query.location as string) || ''
  const sortBy = (query.sortBy as 'title' | 'datePosted') || ''

  let filteredData = mockData.filter((job: Job) => {
    const matchesCompany = company ? job.company.toLowerCase().includes(company.toLowerCase()) : true
    const matchesLocation = location ? job.location.toLowerCase().includes(location.toLowerCase()) : true
    return matchesCompany && matchesLocation
  })

  if (sortBy) {
    filteredData = filteredData.sort((a, b) => {
      if (sortBy === 'datePosted') {
        return new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime()
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title)
      }
      return 0
    })
  }


  return filteredData
})