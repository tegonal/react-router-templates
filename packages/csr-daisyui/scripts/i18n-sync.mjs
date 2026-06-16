#!/usr/bin/env node
/**
 * i18n Sync Script
 *
 * Regenerates EN translations from code defaults and outputs a JSON file
 * with all changed keys for use with automated translation services.
 *
 * Output: ./.i18n-cache/i18n-changes.json
 */

import { execSync } from 'node:child_process'
import { mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const localesDir = join(__dirname, '../public/locales')
const cacheDir = join(__dirname, '../.i18n-cache')
const enFile = join(localesDir, 'common.en.json')
const changesFile = join(cacheDir, 'i18n-changes.json')

mkdirSync(cacheDir, { recursive: true })

/**
 * Find differences between two flattened objects
 */
function findChanges(oldFlat, newFlat) {
  const added = {}
  const modified = {}
  const removed = {}

  // Find added and modified
  for (const [key, value] of Object.entries(newFlat)) {
    if (!(key in oldFlat)) {
      added[key] = value
    } else if (oldFlat[key] !== value) {
      modified[key] = { new: value, old: oldFlat[key] }
    }
  }

  // Find removed
  for (const key of Object.keys(oldFlat)) {
    if (!(key in newFlat)) {
      removed[key] = oldFlat[key]
    }
  }

  return { added, modified, removed }
}

/**
 * Flatten nested object to dot-notation keys
 */
function flattenObject(obj, prefix = '') {
  const result = {}
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value, newKey))
    } else {
      result[newKey] = value
    }
  }
  return result
}

async function main() {
  console.log('🔄 Syncing i18n translations...\n')

  // 1. Read current EN file
  let oldEn = {}
  try {
    oldEn = JSON.parse(readFileSync(enFile, 'utf8'))
  } catch {
    console.log('No existing EN file, will create new one')
  }
  const oldFlat = flattenObject(oldEn)

  // 2. Backup and delete EN file
  const backupFile = join(cacheDir, 'common_backup.json')
  if (Object.keys(oldEn).length > 0) {
    writeFileSync(backupFile, JSON.stringify(oldEn, null, 2))
  }

  try {
    unlinkSync(enFile)
  } catch {
    // File might not exist
  }

  // 3. Run i18next extraction
  console.log('📝 Extracting translations from code...')
  try {
    execSync('yarn i18n:extract', { cwd: join(__dirname, '..'), stdio: 'inherit' })
  } catch (error) {
    console.error('Failed to extract translations:', error.message)
    // Restore backup
    if (Object.keys(oldEn).length > 0) {
      writeFileSync(enFile, JSON.stringify(oldEn, null, 2))
    }
    process.exit(1)
  }

  // 4. Read new EN file
  const newEn = JSON.parse(readFileSync(enFile, 'utf8'))
  const newFlat = flattenObject(newEn)

  // 5. Find changes
  const changes = findChanges(oldFlat, newFlat)
  const hasChanges =
    Object.keys(changes.added).length > 0 ||
    Object.keys(changes.modified).length > 0 ||
    Object.keys(changes.removed).length > 0

  // 6. Output changes
  if (hasChanges) {
    const output = {
      changes: {
        added: changes.added,
        modified: Object.fromEntries(
          Object.entries(changes.modified).map(([key, { new: newVal }]) => [key, newVal]),
        ),
        removed: Object.keys(changes.removed),
      },
      // Keys that need translation (added + modified)
      keysToTranslate: {
        ...changes.added,
        ...Object.fromEntries(
          Object.entries(changes.modified).map(([key, { new: newVal }]) => [key, newVal]),
        ),
      },
      summary: {
        added: Object.keys(changes.added).length,
        modified: Object.keys(changes.modified).length,
        removed: Object.keys(changes.removed).length,
      },
      timestamp: new Date().toISOString(),
    }

    writeFileSync(changesFile, JSON.stringify(output, null, 2))

    console.log('\n✅ Changes detected:\n')
    console.log(`   Added:    ${output.summary.added} keys`)
    console.log(`   Modified: ${output.summary.modified} keys`)
    console.log(`   Removed:  ${output.summary.removed} keys`)
    console.log(`\n📄 Changes written to: ${changesFile}`)
    console.log('\n🌐 Keys to translate for other locales:')
    for (const [key, value] of Object.entries(output.keysToTranslate)) {
      console.log(`   ${key}: "${value}"`)
    }
  } else {
    console.log('\n✅ No changes detected')
    // Remove old changes file if exists
    try {
      unlinkSync(changesFile)
    } catch {
      // File might not exist
    }
  }

  // Clean up backup
  try {
    unlinkSync(backupFile)
  } catch {
    // File might not exist
  }
}

main().catch(console.error)
