import React from 'react'
import { motion } from 'framer-motion'
import { 
  FileSignature, 
  UserPlus, 
  FileCheck, 
  AlertCircle,
  Clock
} from 'lucide-react'
import { formatDate } from '../lib/utils'

const activities = [
  {
    id: 1,
    type: 'signature',
    message: 'Sarah Chen signed Employee Handbook',
    time: '2 minutes ago',
    icon: FileSignature,
    color: 'bg-emerald-500'
  },
  {
    id: 2,
    type: 'employee',
    message: 'New employee David Kim onboarded',
    time: '1 hour ago',
    icon: UserPlus,
    color: 'bg-blue-500'
  },
  {
    id: 3,
    type: 'document',
    message: 'Remote Work Policy updated',
    time: '3 hours ago',
    icon: FileCheck,
    color: 'bg-violet-500'
  },
  {
    id: 4,
    type: 'alert',
    message: '3 documents pending signature',
    time: '5 hours ago',
    icon: AlertCircle,
    color: 'bg-amber-500'
  },
  {
    id: 5,
    type: 'document',
    message: 'NDA template created',
    time: 'Yesterday',
    icon: FileCheck,
    color: 'bg-violet-500'
  },
]

export default function ActivityTimeline() {
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-start gap-4 group cursor-pointer"
        >
          {/* Icon */}
          <div className="relative">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg",
                activity.color
              )}
            >
              <activity.icon className="w-5 h-5" />
            </motion.div>
            
            {index !== activities.length - 1 && (
              <div className="absolute top-10 left-1/2 w-px h-12 bg-border -translate-x-1/2" />
            )}
          </div>
          
          {/* Content */}
          <div className="flex-1 pb-6">
            <p className="text-sm font-medium group-hover:text-primary transition-colors">
              {activity.message}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <Clock className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
