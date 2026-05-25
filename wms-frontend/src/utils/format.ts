export function formatFecha(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleString('es-GT', {
    dateStyle: 'short',
    timeStyle: 'short',
  })
}
