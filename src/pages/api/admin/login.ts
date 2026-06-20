import type { APIRoute } from 'astro'
import { env } from 'cloudflare:workers'
import { createSessionToken } from '../../../lib/admin'

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json()
  const { password } = data

  const adminPassword = env.ADMIN_PASSWORD
  if (!adminPassword || password !== adminPassword) {
    return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 401 })
  }

  const secret = env.ADMIN_SECRET || env.SANITY_PROJECT_ID || 'fallback-secret'
  const token = await createSessionToken(secret)

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Set-Cookie': `admin_session=${token}; Path=/admin; HttpOnly; SameSite=Lax; Max-Age=86400`,
      'Content-Type': 'application/json',
    },
  })
}
