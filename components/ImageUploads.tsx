"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast";
import { countUploads, getUpload, type ImageUpload, listUploads, type ListUploadsResult, removeUpload, uploadNew } from "@/lib/browser-uploads"
import { ChevronLeft, ChevronRight, ImageIcon, Trash2, Upload } from "lucide-react"
import { useCallback, useEffect, useState } from "react"

export default function ImageUploads() {
  const [uploads, setUploads] = useState<ListUploadsResult | null>(null)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<ImageUpload | null>(null)
  const { errorToast, successToast } = useToast();


  const pageSize = 6

  // Load uploads
  const loadUploads = useCallback(async (page: number = currentPage) => {
    try {
      const result = await listUploads({ page, pageSize })
      setUploads(result)
      const count = await countUploads()
      setTotalCount(count)
    } catch (error) {
      console.error("[v0] Error loading uploads:", error)
      errorToast("Failed to load uploads");
    }
  }, [currentPage, errorToast])

  useEffect(() => {
    loadUploads()
  }, [currentPage, loadUploads])

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)

    try {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) {
          errorToast("Invalid file", {
            description: `${file.name} is not an image`,
          })
          continue
        }

        await uploadNew(file)
      }

      successToast(`Uploaded successfully`, {
        description: `${files.length} image(s) uploaded`,
      })

      // Reset to first page and reload
      setCurrentPage(1)
      await loadUploads(1)
    } catch (error) {
      console.error("[v0] Error uploading files:", error)
      errorToast("Failed to upload images");
    } finally {
      setIsUploading(false)
      event.target.value = ""
    }
  }

  // Handle delete
  const handleDelete = async (id: string) => {
    try {

      await removeUpload(id)
      //TODO: undo action
      successToast("Removed image", {
        description: `Successfully removed the image`,
      })

      await loadUploads()
    } catch (error) {
      console.error("[v0] Error deleting upload:", error)
      errorToast("Failed to delete image");
    }
  }

  // Handle view details
  const handleViewDetails = async (id: string) => {
    try {
      const upload = await getUpload(id)
      setSelectedImage(upload)
    } catch (error) {
      console.error("[v0] Error getting upload:", error)
      errorToast("Failed to load", {
        description: "Failed to load image details",
      });
    }
  }

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className='min-h-screen bg-background p-6'>
      <div className='mx-auto max-w-7xl'>
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-foreground mb-2'>Image Uploads</h1>
          <p className='text-muted-foreground'>Upload and manage images using IndexedDB storage</p>
        </div>

        {/* Upload Section */}
        <Card className='mb-8'>
          <CardHeader>
            <CardTitle>Upload Images</CardTitle>
            <CardDescription>Select one or multiple images to upload. Total uploads: {totalCount}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex items-center gap-4'>
              <Input
                type='file'
                accept='image/*'
                multiple
                onChange={handleFileUpload}
                disabled={isUploading}
                className='flex-1'
              />
              <Button disabled={isUploading}>
                <Upload className='mr-2 h-4 w-4'/>
                {isUploading ? "Uploading..." : "Upload"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Gallery Grid */}
        {uploads && uploads.uploads.length > 0 ? (
          <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
              {uploads.uploads.map((upload) => (
                <Card key={upload.id} className='overflow-hidden'>
                  <div className='aspect-video relative bg-muted'>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={upload.dataUrl || "/placeholder.svg"}
                      alt={upload.name}
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <CardContent className='p-4'>
                    <div className='flex items-start justify-between gap-2 mb-2'>
                      <h3 className='font-medium text-sm truncate flex-1'>{upload.name}</h3>
                      <Badge variant='secondary' className='text-xs'>
                        {formatFileSize(upload.size)}
                      </Badge>
                    </div>
                    <p className='text-xs text-muted-foreground mb-4'>{new Date(upload.uploadedAt).toLocaleString()}</p>
                    <div className='flex gap-2'>
                      <Button
                        variant='outline'
                        size='sm'
                        className='flex-1 bg-transparent'
                        onClick={() => handleViewDetails(upload.id)}
                      >
                        <ImageIcon className='mr-2 h-4 w-4'/>
                        View
                      </Button>
                      <Button variant='destructive' size='sm' onClick={() => handleDelete(upload.id)}>
                        <Trash2 className='h-4 w-4'/>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {uploads.totalPages > 1 && (
              <div className='flex items-center justify-center gap-4'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className='h-4 w-4 mr-2'/>
                  Previous
                </Button>
                <span className='text-sm text-muted-foreground'>
                  Page {currentPage} of {uploads.totalPages}
                </span>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setCurrentPage((p) => Math.min(uploads.totalPages, p + 1))}
                  disabled={currentPage === uploads.totalPages}
                >
                  Next
                  <ChevronRight className='h-4 w-4 ml-2'/>
                </Button>
              </div>
            )}
          </>
        ) : (
          <Card>
            <CardContent className='flex flex-col items-center justify-center py-16'>
              <ImageIcon className='h-16 w-16 text-muted-foreground mb-4'/>
              <h3 className='text-lg font-medium mb-2'>No images uploaded yet</h3>
              <p className='text-sm text-muted-foreground'>Upload your first image to get started</p>
            </CardContent>
          </Card>
        )}

        {/* Image Details Modal */}
        {selectedImage && (
          <div
            className='fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50'
            onClick={() => setSelectedImage(null)}
          >
            <Card className='max-w-4xl w-full max-h-[90vh] overflow-auto' onClick={(e) => e.stopPropagation()}>
              <CardHeader>
                <CardTitle>{selectedImage.name}</CardTitle>
                <CardDescription>Image Details</CardDescription>
              </CardHeader>
              <CardContent>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedImage.dataUrl || "/placeholder.svg"}
                  alt={selectedImage.name}
                  className='w-full rounded-lg mb-4'
                />
                <div className='grid grid-cols-2 gap-4 text-sm'>
                  <div>
                    <span className='text-muted-foreground'>File Size:</span>
                    <p className='font-medium'>{formatFileSize(selectedImage.size)}</p>
                  </div>
                  <div>
                    <span className='text-muted-foreground'>Type:</span>
                    <p className='font-medium'>{selectedImage.type}</p>
                  </div>
                  <div>
                    <span className='text-muted-foreground'>Uploaded:</span>
                    <p className='font-medium'>{new Date(selectedImage.uploadedAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <span className='text-muted-foreground'>ID:</span>
                    <p className='font-medium text-xs'>{selectedImage.id}</p>
                  </div>
                </div>
                <Button variant='outline' className='w-full mt-4 bg-transparent' onClick={() => setSelectedImage(null)}>
                  Close
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
