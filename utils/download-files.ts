import fse from 'fs-extra'
import { sendEmailNotification } from './send-mail'

const DOWNLOAD_DIR = `fonts`

await fse.ensureDir(DOWNLOAD_DIR)

export async function downloadReleaseAssets(name: string, url: string) {
  const result = await fetch(url)
  const path = `${DOWNLOAD_DIR}/${name}`
  try {
    await Bun.write(path, result)
  } catch (err: any) {
    sendEmailNotification(`Error downloading release assets: \n ${err.message}`)
  }
}
