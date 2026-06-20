import type { APIRoute } from 'astro'
import { env } from 'cloudflare:workers'
import { getSessionCookie, verifySession } from '../../../../lib/admin'

export const POST: APIRoute = async ({ request }) => {
  const secret = env.ADMIN_SECRET || env.SANITY_PROJECT_ID || 'fallback-secret'
  const sessionToken = getSessionCookie(request)
  if (!sessionToken || !(await verifySession(sessionToken, secret))) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const data = await request.json()
    const { title, slug, excerpt, tags, body, publishedAt } = data

    if (!title || !slug || !body) {
      return new Response(JSON.stringify({ error: 'Title, slug, and body are required' }), { status: 400 })
    }

    const projectId = env.SANITY_PROJECT_ID || '2hf9u675'
    const dataset = env.SANITY_DATASET || 'production'
    const sanityToken = env.SANITY_TOKEN

    if (!sanityToken) {
      return new Response(JSON.stringify({ error: 'SANITY_TOKEN not configured' }), { status: 500 })
    }

    const doc = {
      _type: 'post',
      title,
      slug: { _type: 'slug', current: slug },
      excerpt: excerpt || '',
      tags: tags || [],
      body,
      publishedAt: publishedAt || new Date().toISOString(),
    }

    const res = await fetch(`https://${projectId}.api.sanity.io/v2024-01-01/data/mutate/${dataset}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sanityToken}`,
      },
      body: JSON.stringify({
        mutations: [{ create: doc }],
      }),
    })

    const result = await res.json()
    if (!res.ok) {
      return new Response(JSON.stringify({ error: result.message || 'Sanity mutation failed' }), { status: 500 })
    }

    return new Response(JSON.stringify({ success: true, id: result.results?.[0]?.id }), { status: 200 })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return new Response(JSON.stringify({ error: msg }), { status: 500 })
  }
}
