const BASE_URI = import.meta.env.VITE_YGG_BASE_URI

export const downloadRiver = (id: string) =>
  fetch(`${BASE_URI}/engine/download_torrent?id=${id}`, { method: 'GET', body: null })
