import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'

import { CACHE_DIR } from '~/features/image-service/config.server.ts'
import { logger } from '~/lib/logger.ts'

import { type ImageTransformOptions } from './types'

// Track if we've already purged the cache this session
let cacheAlreadyPurged = false

export async function deleteCachedImage(cacheKey: string): Promise<boolean> {
  try {
    const cachePath = path.join(CACHE_DIR, `${cacheKey}.bin`)
    await fs.unlink(cachePath)
    return true
  } catch {
    return false
  }
}

export async function getCachedImage(cacheKey: string): Promise<Buffer | null> {
  try {
    const cachePath = path.join(CACHE_DIR, `${cacheKey}.bin`)
    return await fs.readFile(cachePath)
  } catch {
    return null
  }
}

export function getCacheKey(src: string, options: ImageTransformOptions): string {
  const optionsString = JSON.stringify(options, Object.keys(options).toSorted())
  return crypto.createHash('md5').update(`${src}:${optionsString}`).digest('hex')
}

export async function getCacheStats(): Promise<{
  files: number
  newestFile?: Date
  oldestFile?: Date
  totalSize: number
}> {
  try {
    await fs.mkdir(CACHE_DIR, { recursive: true })
    const files = await fs.readdir(CACHE_DIR)
    let totalSize = 0
    let oldestFile: Date | undefined
    let newestFile: Date | undefined
    let fileCount = 0

    for (const file of files) {
      if (!file.endsWith('.bin')) continue

      try {
        const filePath = path.join(CACHE_DIR, file)
        const stats = await fs.stat(filePath)
        totalSize += stats.size
        fileCount++

        if (!oldestFile || stats.mtime < oldestFile) {
          oldestFile = stats.mtime
        }
        if (!newestFile || stats.mtime > newestFile) {
          newestFile = stats.mtime
        }
      } catch {
        // Skip files that can't be read
      }
    }

    return {
      files: fileCount,
      newestFile,
      oldestFile,
      totalSize,
    }
  } catch {
    return { files: 0, totalSize: 0 }
  }
}

export async function purgeCache(maxAge?: number): Promise<{ deleted: number; errors: number }> {
  let deleted = 0
  let errors = 0

  try {
    await fs.mkdir(CACHE_DIR, { recursive: true })
    const files = await fs.readdir(CACHE_DIR)
    const cutoffTime = maxAge ? Date.now() - maxAge : 0

    for (const file of files) {
      if (!file.endsWith('.bin')) continue

      try {
        const filePath = path.join(CACHE_DIR, file)
        const stats = await fs.stat(filePath)

        // Delete if maxAge is provided and file is older, or if no maxAge delete all
        if (!maxAge || stats.mtime.getTime() < cutoffTime) {
          await fs.unlink(filePath)
          deleted++
        }
      } catch {
        errors++
      }
    }
  } catch (error) {
    console.error('Failed to purge cache:', error)
    errors++
  }

  return { deleted, errors }
}

export function purgeCacheOnStartup(): void {
  if (!cacheAlreadyPurged) {
    cacheAlreadyPurged = true
    logger.debug('Purging image cache on server startup (development mode)')
    purgeCache().catch((error) => {
      logger.error('Failed to purge image cache on startup:', error)
    })
  }
}

export async function setCachedImage(cacheKey: string, buffer: Buffer): Promise<void> {
  try {
    await fs.mkdir(CACHE_DIR, { recursive: true })
    const cachePath = path.join(CACHE_DIR, `${cacheKey}.bin`)
    await fs.writeFile(cachePath, buffer)
  } catch (error) {
    console.error('Failed to cache image:', error)
  }
}
