/* eslint-disable no-console */
import { createTorrentButton, findAllTorrentLinks } from '~/utils/dom'
import { downloadTorrentWithAllDebrid } from '~/utils/ygg'

const isLoggedIn = document.querySelector('a#register') === null
const downloadButtonTorrentPage = document.querySelector('a[href^="/engine/download_torrent"]')
const isTorrentPage = downloadButtonTorrentPage !== null

if (isLoggedIn) {
  if (isTorrentPage) {
    const button = createTorrentButton()
    button.addEventListener('click', () => {
      const id = downloadButtonTorrentPage?.getAttribute('href')?.split('=')[1]
      if (id) {
        downloadTorrentWithAllDebrid(id).catch(console.error)
      }
    })
    downloadButtonTorrentPage?.parentNode?.append(button)
  } else {
    // eslint-disable-next-line
    for (const link of findAllTorrentLinks()) {
      const button = createTorrentButton()
      button.addEventListener('click', () => {
        const href = link.getAttribute('href') ?? ''
        const hrefParts = href.split('/')
        const id = (hrefParts[hrefParts.length - 1] ?? '').split('-')[0]
        downloadTorrentWithAllDebrid(id).catch(console.error)
      })
      link.parentNode?.append(button)
    }
  }
} else {
  console.log('[YggDownloader] - Not logged in.')
}
