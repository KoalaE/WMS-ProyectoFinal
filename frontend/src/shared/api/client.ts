export async function parseApiError(res: Response): Promise<string> {
  try {
    const data = await res.json()
    if (data.mensaje) return data.mensaje
    if (data.title) return data.title
    const first = Object.values(data.errors ?? {})[0] as string[] | undefined
    if (first?.[0]) return first[0]
  } catch {
    /* ignore */
  }
  return `Error ${res.status}`
}

export function buildQuery(params: Record<string, string | number | undefined>): string {
  const q = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') {
      q.set(key, String(value))
    }
  }
  const s = q.toString()
  return s ? `?${s}` : ''
}
