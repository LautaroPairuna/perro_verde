import { LocalProvider } from '@adminjs/upload'
import fsExtra           from 'fs-extra'
import path              from 'path'
import fs                from 'fs'

export class CrossDriveProvider extends LocalProvider {
  async upload(file, key) {
    const dest = this.path(key)
    await fsExtra.ensureDir(path.dirname(dest))
    await fsExtra.move(file.path, dest, { overwrite: true })
  }
  async delete(key, bucket) {
    await super.delete(key, bucket)
    const thumb = path.join(bucket, 'thumbs', `thumb_${path.basename(key)}`)
    if (fs.existsSync(thumb)) await fs.promises.unlink(thumb)
  }
}
export const crossDriveProvider = new CrossDriveProvider({
  bucket: path.join(process.cwd(), 'uploads'),
  thumbs: {
    bucket: path.join(process.cwd(), 'uploads/thumbs'),
    sizes:  [100, 200, 300],
  },
})