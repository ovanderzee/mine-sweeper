import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const projectFolderName = dirname(fileURLToPath(import.meta.url))
export const dataPath = resolve(projectFolderName, 'data/data.json')
