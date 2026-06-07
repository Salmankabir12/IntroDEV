import type { APIRoute } from 'astro'

const COEF = [1.28643584, 0.20513572, 0.68739975]
const INTERCEPT = 1.5939235040099078

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json()
    const { hours, attendance, previous_marks } = body

    if (typeof hours !== 'number' || typeof attendance !== 'number' || typeof previous_marks !== 'number') {
      return new Response(JSON.stringify({ error: 'Missing or invalid fields' }), { status: 400 })
    }
    if (hours < 0 || hours > 24 || attendance < 0 || attendance > 100 || previous_marks < 0 || previous_marks > 100) {
      return new Response(JSON.stringify({ error: 'Values out of range' }), { status: 400 })
    }

    const predicted =
      hours * COEF[0] + attendance * COEF[1] + previous_marks * COEF[2] + INTERCEPT

    return new Response(JSON.stringify({ predicted_marks: Math.round(predicted * 100) / 100 }))
  } catch {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 })
  }
}
