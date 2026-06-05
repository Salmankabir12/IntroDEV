import { createClient } from '@sanity/client'

const projectId = import.meta.env.SANITY_PROJECT_ID || '2hf9u675'
const dataset = import.meta.env.SANITY_DATASET || 'production'

export const sanityClient = createClient({
  projectId,
  dataset,
  useCdn: true,
  apiVersion: '2024-01-01',
})
