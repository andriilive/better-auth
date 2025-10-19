export interface ImageUpload {
  id: string
  file: File
  dataUrl: string
  uploadedAt: number
  name: string
  size: number
  type: string
}

const DB_NAME = "ImageUploadsDB"
const STORE_NAME = "uploads"
const DB_VERSION = 1

// Initialize IndexedDB
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const objectStore = db.createObjectStore(STORE_NAME, { keyPath: "id" })
        objectStore.createIndex("uploadedAt", "uploadedAt", { unique: false })
        objectStore.createIndex("name", "name", { unique: false })
      }
    }
  })
}

// Convert File to data URL for storage
function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// Upload a new image
export async function uploadNew(file: File): Promise<ImageUpload> {
  const db = await openDB()
  const dataUrl = await fileToDataUrl(file)

  const upload: ImageUpload = {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    file,
    dataUrl,
    uploadedAt: Date.now(),
    name: file.name,
    size: file.size,
    type: file.type,
  }

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite")
    const store = transaction.objectStore(STORE_NAME)
    const request = store.add(upload)

    request.onsuccess = () => resolve(upload)
    request.onerror = () => reject(request.error)
  })
}

// Count total uploads
export async function countUploads(): Promise<number> {
  const db = await openDB()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readonly")
    const store = transaction.objectStore(STORE_NAME)
    const request = store.count()

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

// List uploads with pagination
export interface ListUploadsOptions {
  page?: number
  pageSize?: number
  sortBy?: "uploadedAt" | "name"
  sortOrder?: "asc" | "desc"
}

export interface ListUploadsResult {
  uploads: ImageUpload[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export async function listUploads(options: ListUploadsOptions = {}): Promise<ListUploadsResult> {
  const { page = 1, pageSize = 10, sortBy = "uploadedAt", sortOrder = "desc" } = options
  const db = await openDB()

  const total = await countUploads()
  const totalPages = Math.ceil(total / pageSize)

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readonly")
    const store = transaction.objectStore(STORE_NAME)
    const index = store.index(sortBy)

    const direction = sortOrder === "asc" ? "next" : "prev"
    const request = index.openCursor(null, direction)

    const uploads: ImageUpload[] = []
    let skipped = 0
    const skipCount = (page - 1) * pageSize

    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result

      if (cursor) {
        if (skipped < skipCount) {
          skipped++
          cursor.continue()
        }
        else if (uploads.length < pageSize) {
          uploads.push(cursor.value)
          cursor.continue()
        }
        else {
          resolve({ uploads, total, page, pageSize, totalPages })
        }
      }
      else {
        resolve({ uploads, total, page, pageSize, totalPages })
      }
    }

    request.onerror = () => reject(request.error)
  })
}

// Get a single upload by ID
export async function getUpload(id: string): Promise<ImageUpload | null> {
  const db = await openDB()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readonly")
    const store = transaction.objectStore(STORE_NAME)
    const request = store.get(id)

    request.onsuccess = () => resolve(request.result || null)
    request.onerror = () => reject(request.error)
  })
}

// Remove an upload by ID
export async function removeUpload(id: string): Promise<void> {
  const db = await openDB()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite")
    const store = transaction.objectStore(STORE_NAME)
    const request = store.delete(id)

    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
  })
}

// Clear all uploads (utility function)
export async function clearAllUploads(): Promise<void> {
  const db = await openDB()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite")
    const store = transaction.objectStore(STORE_NAME)
    const request = store.clear()

    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
  })
}
