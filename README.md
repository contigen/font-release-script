# Font Release Script

This is an automated script that notifies me via email about a new release of Vercel's [Geist](https://github.com/vercel/geist-font), in relation to the package I maintain, [non.geist](https://github.com/contigen/non.geist).
As my package depends on Vercel's [Geist](https://github.com/vercel/geist-font) font files

## Workflow

It uses `node-mailer` to send me configured emails 4 times each day (12 AM, 6 AM, 12 PM, and 6 PM) with appropriate information depending whether a new release exists, and accordingly downloads the assets if available.

The script is initialiased by a cron using `node-cron` and runs indefinitely, restarts automatically on system reboot using `pm2`, essentially making it a startup service (on a Linux machine).

Any error and/or info (timestamped) are saved to individual files to keep track of updates.

## The Why

Folks use my package, I want them to have the latest version of the font files I depend on.

PS: Feedback, from an [issue](https://github.com/contigen/non.geist/issues/3), might have prompted me to do this.

### Runtime

[Bun](https://bun.sh) file operations' APIs are so declarative & pro good DX.

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.1.8. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
