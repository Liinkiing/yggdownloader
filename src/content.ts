import { createFlash, createRiverButton, findAllRiverLinks } from '~/utils/dom'
import { downloadRiver } from '~/utils/ygg'
import { AllDebrid, isValidFile } from '~/services/alldebrid'

// eslint-disable-next-line
for (const link of findAllRiverLinks()) {
  const button = createRiverButton()
  button.addEventListener('click', async () => {
    const href = link.getAttribute('href') ?? ''
    const hrefParts = href.split('/')
    const id = (hrefParts[hrefParts.length - 1] ?? '').split('-')[0]
    const resp = await downloadRiver(id)
    if (resp.ok) {
      const river = await resp.blob()
      const file = await AllDebrid.uploadTorrent(river)
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
