import cron from 'node-cron'
import { exec } from 'child_process'
import { addErrorToLog, addInfoToLog } from './utils/log'

cron.schedule(`0 0,6,12,18 * * *`, () => {
  const command = `bun run index.ts`
  exec(command, (err, stdout, stderr) => {
    if (err) {
      addErrorToLog(`Error executing script: ${err}`)
      return
    }
    addInfoToLog(`Script output: ${stdout}`)
    addErrorToLog(`Script errors: ${stderr}`)
  })
})

addInfoToLog(`Scheduled task to run four times a day.`)
