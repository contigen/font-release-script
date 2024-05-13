export function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp)
  return date.toLocaleString(`en-NG`, {
    dateStyle: `full`,
  })
}
