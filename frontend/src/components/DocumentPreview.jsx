import React from 'react'
import { motion } from 'framer-motion'
import { X, Download, Share2, Trash2, FileText, ExternalLink } from 'lucide-react'
import { cn, formatDate } from '../lib/utils'
import toast from 'react-hot-toast'

export default function DocumentPreview({ document, onClose }) {
  const handleDownload = () => {
    toast.success('Document download started!')
  }

  const handleShare = () => {
    navigator.clipboard.writeText(`https://hr-compliance.com/doc/${document.id}`)
    toast.success('Link copied to clipboard!')
  }

  const handleDelete = () => {
    toast.success('Document moved to trash')
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="fixed inset-4 md:inset-10 lg:inset-16 glass-card rounded-3xl z-50 flex flex-col overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-purple/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-gradient-purple" />
            </div>
            <div>
              <h2 className="font-semibold">{document.name}</h2>
              <p className="text-sm text-muted-foreground">
                {document.category} • {document.size} • Updated {formatDate(document.updatedAt)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
              title="Download"
            >
              <Download className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
              title="Share"
            >
              <Share2 className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDelete}
              className="p-2 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors"
              title="Delete"
            >
              <Trash2 className="w-5 h-5" />
            </motion.button>
            
            <div className="w-px h-6 bg-border mx-2" />
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* PDF Viewer Placeholder */}
          <div className="flex-1 bg-accent/30 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-40 mx-auto mb-4 rounded-lg bg-card shadow-lg flex items-center justify-center border border-border">
                <FileText className="w-16 h-16 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">PDF Preview</p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownload}
                className="mt-4 px-4 py-2 bg-gradient-to-r from-gradient-purple to-gradient-blue text-white rounded-xl font-medium flex items-center gap-2 mx-auto"
              >
                <ExternalLink className="w-4 h-4" />
                Open in New Tab
              </motion.button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 border-l border-border p-6 overflow-y-auto">
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Document Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type</span>
                    <span className="font-medium uppercase">{document.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Size</span>
                    <span className="font-medium">{document.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Created</span>
                    <span className="font-medium">{formatDate(document.createdAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Modified</span>
                    <span className="font-medium">{formatDate(document.updatedAt)}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <h3 className="font-medium mb-3">Signatures</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-accent/50">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-medium">
                      SC
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Sarah Chen</p>
                      <p className="text-xs text-muted-foreground">Signed Feb 20, 2024</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-accent/50">
                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-medium">
                      MJ
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Marcus Johnson</p>
                      <p className="text-xs text-muted-foreground">Pending</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <h3 className="font-medium mb-3">Actions</h3>
                <div className="space-y-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-gradient-purple to-gradient-blue text-white font-medium text-sm"
                  >
                    Request Signature
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-4 py-2.5 rounded-xl border border-border hover:bg-accent font-medium text-sm"
                  >
                    Edit Document
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
