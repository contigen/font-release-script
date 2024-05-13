import { sendEmailNotification } from './send-mail'

export async function downloadReleaseAssets(name: string, url: string) {
  const result = await fetch(url)
  const path = `fonts/${name}`
  try {
    await Bun.write(path, result)
  } catch (err: any) {
    sendEmailNotification(`Error downloading release assets: \n ${err.message}`)
  }
}
