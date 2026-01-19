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
        const downloadLinks = await AllDebrid.getMagnetFiles([file.id])
        if (downloadLinks.length > 0) {
          await navigator.clipboard
            .writeText(downloadLinks.join('\n'))
            // eslint-disable-next-line no-alert
            .catch(error => window.alert(error.message))
          flash.textContent += ` ${downloadLinks.length} link${
            downloadLinks.length > 1 ? 's have' : ' has'
          } been copied to your clipboard.`
        }
      }
      document.body.append(flash)
    }
  } else {
    const text = await resp.text()
    throw new Error(text)
  }
}
