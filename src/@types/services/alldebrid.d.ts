export type BaseResponse<Data> =
  | {
      status: 'success'
      data: Data
    }
  | {
      status: 'error'
      error: {
        code: string
        message: string
      }
    }

export type UserResponse = {
  username: string
  email: string
  isPremium: boolean
  isSubscribed: boolean
  isTrial: boolean
  premiumUntil: string
  lang: string
  preferedDomain: string
  fidelityPoints: number
  limitedHostersQuotas: Record<string, number>
  notifications: string[]
}

type Magnet = {
  id: number
  filename: string
  size: number
  status: string
  statusCode: number
  downloaded: number
  uploaded: number
  seeders: number
  downloadSpeed: number
  uploadSpeed: number
  uploadDate: number
  completionDate: number
  links: [
    {
      link: string
      filename: string
      size: number
      files: Array<{
        n: string
        e: Magnet['links'][number]['files']
      }>
    },
  ]
}

export type MagnetStatusResponse = {
  magnets: Magnet[] | Magnet
}

type File = {
  file: string
  name: string
  size: number
  hash: string
  ready: false
  id: number
}

type FileError = {
  file: string
  error: {
    code: string
    message: string
  }
}

export type MagnetUpload = {
  magnets: Array<File | FileError>
}

export type MagnetUploadFile = {
  files: Array<File | FileError>
}

export type MagnetFileNode =
  | {
      n: string
      s: number
      l: string
    }
  | {
      n: string
      e: MagnetFileNode[]
    }

export type MagnetFilesResponse = {
  magnets: Array<{
    id: number
    files: MagnetFileNode[]
  }>
}
