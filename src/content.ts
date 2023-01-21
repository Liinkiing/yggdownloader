import { createFlash, createTorrentButton, findAllTorrentLinks } from '~/utils/dom'
import { downloadTorrent } from '~/utils/ygg'
import { AllDebrid, isValidFile } from '~/services/alldebrid'

const isLoggedIn = document.querySelector('a#register') === null

if (isLoggedIn) {
  // eslint-disable-next-line
  for (const link of findAllTorrentLinks()) {
    const button = createTorrentButton()
    button.addEventListener('click', async () => {
      const href = link.getAttribute('href') ?? ''
      const hrefParts = href.split('/')
      const id = (hrefParts[hrefParts.length - 1] ?? '').split('-')[0]
      const resp = await downloadTorrent(id)
      if (resp.ok) {
        const torrent = await resp.blob()
        const file = await AllDebrid.uploadTorrent(torrent)
        if (isValidFile(file)) {
          const flash = createFlash(`${file.name} added to AllDebrid.`)
          if (file.ready) {
            const status = await AllDebrid.getMagnetStatus(file.id)
            if (status.links.length > 0) {
              await navigator.clipboard
                .writeText(status.links.map(l => l.link).join('\n'))
                // eslint-disable-next-line no-alert
                .catch(error => window.alert(error.message))
              flash.textContent += ` ${status.links.length} links have been copied to your clipboard.`
            }
          }
          document.body.append(flash)
        }
      } else {
        const text = await resp.text()
        throw new Error(text)
      }
    })
    link.parentNode?.append(button)
  }
}
