import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { 
  FileText, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Download, 
  Trash2, 
  Eye,
  Upload,
  File,
  X,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react'
import { useDocumentStore } from '../stores'
import { cn, formatDate, truncate } from '../lib/utils'
import DocumentPreview from '../components/DocumentPreview'
import toast from 'react-hot-toast'

const categories = ['All', 'HR Policy', 'Legal', 'Benefits', 'Performance', 'Training']
const statuses = ['All', 'Active', 'Draft', 'Pending', 'Archived']

export default function Documents() {
  const { documents, isLoading, addDocument, deleteDocument } = useDocumentStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [previewDoc, setPreviewDoc] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      setIsUploading(true)
      setUploadProgress(0)
      
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 10
        })
      }, 200)

      setTimeout(() => {
        clearInterval(interval)
        setUploadProgress(100)
        
        const newDoc = {
          id: Date.now().toString(),
          name: file.name,
          type: file.name.split('.').pop(),
          size: formatFileSize(file.size),
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          category: 'Uncategorized'
        }
        
        addDocument(newDoc)
        setIsUploading(false)
        setUploadProgress(0)
        toast.success('Document uploaded successfully!')
      }, 2500)
    })
  }, [addDocument])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc', '.docx'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    }
  })

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory
    const matchesStatus = selectedStatus === 'All' || doc.status === selectedStatus.toLowerCase()
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center"><FileText className="w-5 h-5 text-red-500" /></div>
      case 'docx':
      case 'doc':
        return <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center"><FileText className="w-5 h-5 text-blue-500" /></div>
      default:
        return <div className="w-10 h-10 rounded-lg bg-gray-500/10 flex items-center justify-center"><File className="w-5 h-5 text-gray-500" /></div>
    }
  }

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      draft: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      pending: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
      archived: 'bg-gray-500/10 text-gray-600 dark:text-gray-400',
    }
    
    const icons = {
      active: CheckCircle,
      draft: Clock,
      pending: AlertCircle,
      archived: Clock,
    }
    
    const Icon = icons[status] || Clock
    
    return (
      <span className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
        styles[status]
      )}>
        <Icon className="w-3.5 h-3.5" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
          <p className="text-muted-foreground mt-1">
            Manage and organize your HR documents
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => document.getElementById('file-upload').click()}
          className="px-4 py-2 bg-gradient-to-r from-gradient-purple to-gradient-blue text-white rounded-xl font-medium shadow-lg shadow-gradient-purple/25 hover:shadow-xl hover:shadow-gradient-purple/30 transition-shadow flex items-center gap-2"
        >
          <Upload className="w-4 h-4" />
          Upload Document
        </motion.button>
      </motion.div>

      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300",
          isDragActive 
            ? "border-gradient-purple bg-gradient-purple/5" 
            : "border-border hover:border-gradient-purple/50 hover:bg-accent/50"
        )}
      >
        <input {...getInputProps()} id="file-upload" />
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gradient-purple/20 to-gradient-blue/20 flex items-center justify-center">
            <Upload className="w-8 h-8 text-gradient-purple" />
          </div>
          <div>
            <p className="font-medium">
              {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              or click to browse (PDF, DOCX up to 10MB)
            </p>
          </div>
        </div>

        <AnimatePresence>
          {isUploading && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 max-w-md mx-auto"
            >
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="h-2 bg-accent rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-gradient-purple to-gradient-blue"
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border focus:border-gradient-purple focus:ring-2 focus:ring-gradient-purple/20 outline-none transition-all"
          />
        </div>
        
        <div className="flex gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-card border border-border focus:border-gradient-purple outline-none cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-card border border-border focus:border-gradient-purple outline-none cursor-pointer"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Documents Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredDocuments.map((doc, index) => (
            <motion.div
              key={doc.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="glass-card rounded-2xl p-5 group cursor-pointer"
              onClick={() => setPreviewDoc(doc)}
            >
              <div className="flex items-start justify-between">
                {getFileIcon(doc.type)}
                
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      // Show dropdown
                    }}
                    className="p-2 rounded-lg hover:bg-accent opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="font-medium truncate" title={doc.name}>
                  {truncate(doc.name, 30)}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {doc.category} • {doc.size}
                </p>
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                {getStatusBadge(doc.status)}
                <span className="text-xs text-muted-foreground">
                  {formatDate(doc.updatedAt)}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredDocuments.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="w-20 h-20 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
            <FileText className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">No documents found</h3>
          <p className="text-muted-foreground mt-1">Try adjusting your search or filters</p>
        </motion.div>
      )}

      {/* Preview Modal */}
      <AnimatePresence>
        {previewDoc && (
          <DocumentPreview 
            document={previewDoc} 
            onClose={() => setPreviewDoc(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}
