import { sendEmailNotification } from './utils/send-mail'
import { downloadReleaseAssets } from './utils/download-files'
import { addErrorToLog } from './utils/log'
import { formatTimestamp } from './utils/timestamp'

type Release = {
  name: string
  body: string
  html_url: string
  published_at: string
  assets: {
    name: string
    browser_download_url: string
  }[]
}

const USERNAME: string = `vercel`
const REPO_NAME: string = `geist-font`

async function getLatestRelease(): Promise<Release | null> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${USERNAME}/${REPO_NAME}/releases/latest`
    )
    return await response.json()
  } catch (err: any) {
    addErrorToLog(`Error fetching latest release:, ${err.message}`)
    return null
  }
}

;(async function checkAndDownloadRelease() {
  const latestRelease = await getLatestRelease()
  if (!latestRelease) {
    addErrorToLog(`Could not retrieve latest release information`)
    return
  }
  const file = Bun.file(`version.json`)
  const currentVersion: { name: string } = (await file.json()) || { name: `` }
  if (currentVersion.name === latestRelease.name) {
    await sendEmailNotification(`No new release yet.`)
    return
  }
  latestRelease.assets.forEach(({ name, browser_download_url }) =>
    downloadReleaseAssets(name, browser_download_url)
  )
  await Bun.write(file, `{ "name": "${latestRelease.name}" }`)
  const publishedAt = formatTimestamp(latestRelease.published_at)

  const emailText = `Geist v${latestRelease.name} downloaded successfully.\n \n ${latestRelease.body} \n Release notes: ${latestRelease.html_url} published at ${publishedAt}`

  await sendEmailNotification(emailText)
})()
