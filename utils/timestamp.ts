export function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp)
  return date.toLocaleString(`en-NG`, {
    dateStyle: `full`,
  })
}

const isoTimestamp = '2024-03-25T17:36:20Z'
const readableTimestamp = formatTimestamp(isoTimestamp)
console.log(readableTimestamp)
