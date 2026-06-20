import type { APIRoute } from 'astro'
import { env } from 'cloudflare:workers'
import { getSessionCookie, verifySession } from '../../../../lib/admin'

export const PUT: APIRoute = async ({ request, params }) => {
  const secret = env.ADMIN_SECRET || env.SANITY_PROJECT_ID || 'fallback-secret'
  const sessionToken = getSessionCookie(request)
  if (!sessionToken || !(await verifySession(sessionToken, secret))) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  const { slug } = params

  try {
    const data = await request.json()
    const { title, excerpt, tags, body } = data

    if (!title || !body) {
      return new Response(JSON.stringify({ error: 'Title and body are required' }), { status: 400 })
    }

    const projectId = env.SANITY_PROJECT_ID || '2hf9u675'
    const dataset = env.SANITY_DATASET || 'production'
    const sanityToken = env.SANITY_TOKEN

    if (!sanityToken) {
      return new Response(JSON.stringify({ error: 'SANITY_TOKEN not configured' }), { status: 500 })
    }

    const queryRes = await fetch(
      `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}?query=*[_type == "post" && slug.current == $slug][0]._id`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sanityToken}`,
        },
        body: JSON.stringify({ params: { slug } }),
      }
    )

    const queryResult = await queryRes.json()
    const postId = queryResult.result

    if (!postId) {
      return new Response(JSON.stringify({ error: 'Post not found' }), { status: 404 })
    }

    const patch = {
      title,
      excerpt: excerpt || '',
      tags: tags || [],
      body,
    }

    const res = await fetch(`https://${projectId}.api.sanity.io/v2024-01-01/data/mutate/${dataset}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sanityToken}`,
      },
      body: JSON.stringify({
        mutations: [{ patch: { id: postId, set: patch } }],
      }),
    })

    const result = await res.json()
    if (!res.ok) {
      return new Response(JSON.stringify({ error: result.message || 'Sanity mutation failed' }), { status: 500 })
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return new Response(JSON.stringify({ error: msg }), { status: 500 })
  }
}

export const DELETE: APIRoute = async ({ request, params }) => {
  const secret = env.ADMIN_SECRET || env.SANITY_PROJECT_ID || 'fallback-secret'
  const sessionToken = getSessionCookie(request)
  if (!sessionToken || !(await verifySession(sessionToken, secret))) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  const { slug } = params
  const projectId = env.SANITY_PROJECT_ID || '2hf9u675'
  const dataset = env.SANITY_DATASET || 'production'
  const sanityToken = env.SANITY_TOKEN

  if (!sanityToken) {
    return new Response(JSON.stringify({ error: 'SANITY_TOKEN not configured' }), { status: 500 })
  }

  try {
    const queryRes = await fetch(
      `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}?query=*[_type == "post" && slug.current == $slug][0]._id`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sanityToken}`,
        },
        body: JSON.stringify({ params: { slug } }),
      }
    )

    const queryResult = await queryRes.json()
    const postId = queryResult.result

    if (!postId) {
      return new Response(JSON.stringify({ error: 'Post not found' }), { status: 404 })
    }

    const res = await fetch(`https://${projectId}.api.sanity.io/v2024-01-01/data/mutate/${dataset}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sanityToken}`,
      },
      body: JSON.stringify({
        mutations: [{ delete: { id: postId } }],
      }),
    })

    const result = await res.json()
    if (!res.ok) {
      return new Response(JSON.stringify({ error: result.message || 'Sanity mutation failed' }), { status: 500 })
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return new Response(JSON.stringify({ error: msg }), { status: 500 })
  }
}
