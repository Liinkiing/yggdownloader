/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ALLDEBRID_API_KEY: string
  readonly VITE_YGG_BASE_URI: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
