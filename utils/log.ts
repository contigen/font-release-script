import { appendFile } from 'fs-extra'

export async function addErrorToLog(entry: string) {
  await appendFile(`error.txt`, `${entry} at ${new Date()} \n \n`)
}

export async function addInfoToLog(entry: string) {
  await appendFile(`info.txt`, `${entry} at ${new Date()} \n \n`)
}
