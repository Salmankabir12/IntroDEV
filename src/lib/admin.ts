export async function createSessionToken(secret: string): Promise<string> {
  const payload = crypto.randomUUID()
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload))
  const b64sig = btoa(String.fromCharCode(...new Uint8Array(sig)))
  return `${payload}.${b64sig}`
}

export async function verifySession(token: string, secret: string): Promise<boolean> {
  const [payload, b64sig] = token.split('.')
  if (!payload || !b64sig) return false
  try {
    const key = await crypto.subtle.importKey(
      'raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']
    )
    const sig = Uint8Array.from(atob(b64sig), c => c.charCodeAt(0))
    return await crypto.subtle.verify('HMAC', key, sig, new TextEncoder().encode(payload))
  } catch {
    return false
  }
}

export function getSessionCookie(request: Request): string | null {
  const cookie = request.headers.get('cookie') || ''
  const match = cookie.match(/admin_session=([^;]+)/)
  return match ? match[1] : null
}
