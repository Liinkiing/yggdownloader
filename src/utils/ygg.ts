import { AllDebrid, isValidFile } from '~/services/alldebrid'
import { createFlash } from '~/utils/dom'

const BASE_URI = import.meta.env.VITE_YGG_BASE_URI

export const downloadTorrentWithAllDebrid = async (id: string) => {
  const resp = await fetch(`${BASE_URI}/engine/download_torrent?id=${id}`, { method: 'GET', body: null })
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
}
