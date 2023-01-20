const FLASH_DURATION = 6000

export const findAllRiverLinks = (): HTMLAnchorElement[] => {
  const riverLinks = document.querySelectorAll<HTMLAnchorElement>('a#torrent_name')
  return [...riverLinks]
}

export const createRiverButton = (): HTMLButtonElement => {
  const button = document.createElement('button')
  button.style.all = 'unset'
  button.style.marginLeft = '4px'
  button.style.cursor = 'pointer'
  button.innerHTML = `
<img src="https://cdn.alldebrid.com/lib/images/default/favicon.png" alt="AllDebrid" width="16" height="16"/>
  `

  return button
}

export const createFlash = (message: string): HTMLDivElement => {
  const flash = document.createElement('div')
  flash.style.position = 'fixed'
  flash.style.top = '0'
  flash.style.left = '0'
  flash.style.right = '0'
  flash.style.padding = '8px'
  flash.style.backgroundColor = '#333'
  flash.style.color = '#fff'
  flash.style.textAlign = 'center'
  flash.style.zIndex = '9999'
  flash.textContent = message

  setTimeout(() => {
    flash.remove()
  }, FLASH_DURATION)

  return flash
}
