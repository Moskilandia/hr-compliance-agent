import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { cn } from '../lib/utils'

export default function StatCard({ 
  title, 
  value, 
  change, 
  trend, 
  icon: Icon, 
  color,
  className 
}) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={cn(
        "glass-card rounded-2xl p-6 relative overflow-hidden group cursor-pointer",
        className
      )}
    >
      {/* Background gradient */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br",
        color
      )} />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br",
            color
          )}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          
          <div className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
            trend === 'up' 
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "bg-red-500/10 text-red-600 dark:text-red-400"
          )}>
            {trend === 'up' ? (
              <ArrowUpRight className="w-3 h-3" />
            ) : (
              <ArrowDownRight className="w-3 h-3" />
            )}
            {change}
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-muted-foreground text-sm">{title}</p>
          <motion.h3 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, type: 'spring' }}
            className="text-3xl font-bold mt-1"
          >
            {value}
          </motion.h3>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
      </div>
    </motion.div>
  )
}
