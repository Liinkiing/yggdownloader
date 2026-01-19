import type { AxiosInstance } from 'axios'
import axios from 'axios'

import type {
  BaseResponse,
  File,
  FileError,
  Magnet,
  MagnetStatusResponse,
  MagnetUploadFile,
  UserResponse,
  MagnetFilesResponse,
  MagnetFileNode,
} from '~/@types/services/alldebrid'

export const isValidFile = (file: File | FileError): file is File => !('error' in file)

class AllDebridService {
  private client: AxiosInstance

  constructor(private apiKey: string) {
    this.client = axios.create({
      baseURL: 'https://api.alldebrid.com/v4.1/',
      params: {
        agent: 'ezdownloader/v0',
        apikey: this.apiKey,
      },
    })
  }

  public async getMyInformations(): Promise<UserResponse> {
    const response = await this.client.get<BaseResponse<UserResponse>>('user')
    if (response.data.status === 'error') {
      throw new Error(response.data.error.message)
    }
    return response.data.data
  }

  public async getMagnetStatus(id: number): Promise<Magnet> {
    const response = await this.client.get<BaseResponse<MagnetStatusResponse>>('magnet/status', {
      params: {
        id,
      },
    })
    if (response.data.status === 'error') {
      throw new Error(response.data.error.message)
    }

    return Array.isArray(response.data.data.magnets) ? response.data.data.magnets[0] : response.data.data.magnets
  }

  public async getMagnetFiles(magnetIds: number[]): Promise<string[]> {
    const response = await this.client.get<BaseResponse<MagnetFilesResponse>>('magnet/files', {
      params: {
        id: magnetIds,
      },
    })

    if (response.data.status === 'error') {
      throw new Error(response.data.error.message)
    }

    const { magnets } = response.data.data

    if (!magnets || magnets.length === 0) {
      return []
    }

    const findAllFiles = (nodes: MagnetFileNode[]): string[] => {
      const links: string[] = []
      // eslint-disable-next-line no-restricted-syntax
      for (const node of nodes) {
        if ('l' in node) {
          links.push(node.l)
        }
        if ('e' in node) {
          links.push(...findAllFiles(node.e))
        }
      }
      return links
    }

    const allLinks: string[] = []
    // eslint-disable-next-line no-restricted-syntax
    for (const magnet of magnets) {
      if (magnet.files && magnet.files.length > 0) {
        allLinks.push(...findAllFiles(magnet.files))
      }
    }

    return allLinks
  }

  public async uploadTorrent(file: Blob): Promise<File | FileError> {
    const formData = new FormData()
    formData.append('files[]', file, 'upload.torrent')
    const response = await this.client.post<BaseResponse<MagnetUploadFile>>(`magnet/upload/file`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    if (response.data.status === 'error') {
      throw new Error(response.data.error.message)
    }
    return response.data.data.files[0]
  }
}

if (!import.meta.env.VITE_ALLDEBRID_API_KEY) {
  throw new Error('Missing VITE_ALLDEBRID_API_KEY')
}

export const AllDebrid = Object.freeze(new AllDebridService(import.meta.env.VITE_ALLDEBRID_API_KEY))
