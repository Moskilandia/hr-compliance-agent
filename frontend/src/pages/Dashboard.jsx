import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Users, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Bell
} from 'lucide-react'
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { useDocumentStore, useEmployeeStore, useUIStore } from '../stores'
import { cn, formatDate } from '../lib/utils'
import StatCard from '../components/StatCard'
import ActivityTimeline from '../components/ActivityTimeline'

const chartData = [
  { name: 'Mon', documents: 12, signed: 8 },
  { name: 'Tue', documents: 18, signed: 12 },
  { name: 'Wed', documents: 15, signed: 10 },
  { name: 'Thu', documents: 22, signed: 18 },
  { name: 'Fri', documents: 28, signed: 22 },
  { name: 'Sat', documents: 8, signed: 6 },
  { name: 'Sun', documents: 5, signed: 4 },
]

const complianceData = [
  { name: 'Completed', value: 68, color: '#8B5CF6' },
  { name: 'Pending', value: 24, color: '#3B82F6' },
  { name: 'Overdue', value: 8, color: '#EF4444' },
]

const departmentData = [
  { name: 'Engineering', employees: 45, compliance: 92 },
  { name: 'Sales', employees: 32, compliance: 88 },
  { name: 'Marketing', employees: 18, compliance: 95 },
  { name: 'HR', employees: 12, compliance: 98 },
  { name: 'Design', employees: 15, compliance: 90 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 100 }
  }
}

export default function Dashboard() {
  const { documents, fetchDocuments } = useDocumentStore()
  const { employees } = useEmployeeStore()
  const { addNotification } = useUIStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetchDocuments()
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        addNotification({
          message: 'New document signed by employee',
          type: 'success',
          read: false
        })
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const stats = [
    {
      title: 'Total Documents',
      value: documents.length,
      change: '+12%',
      trend: 'up',
      icon: FileText,
      color: 'from-violet-500 to-purple-600'
    },
    {
      title: 'Active Employees',
      value: employees.filter(e => e.status === 'active').length,
      change: '+5%',
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Pending Signatures',
      value: employees.reduce((acc, e) => acc + e.documentsPending, 0),
      change: '-8%',
      trend: 'down',
      icon: Clock,
      color: 'from-amber-500 to-orange-600'
    },
    {
      title: 'Compliance Rate',
      value: '94%',
      change: '+3%',
      trend: 'up',
      icon: CheckCircle,
      color: 'from-emerald-500 to-teal-600'
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening with your HR compliance.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 bg-gradient-to-r from-gradient-purple to-gradient-blue text-white rounded-xl font-medium shadow-lg shadow-gradient-purple/25 hover:shadow-xl hover:shadow-gradient-purple/30 transition-shadow"
        >
          + New Document
        </motion.button>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div key={stat.title} variants={itemVariants}>
            <StatCard {...stat} />
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Row */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Main Chart */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-2 glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Document Activity</h3>
              <p className="text-sm text-muted-foreground">Documents created vs signed over time</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-purple" />
                <span className="text-sm text-muted-foreground">Created</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-cyan" />
                <span className="text-sm text-muted-foreground">Signed</span>
              </div>
            </div>
          </div>
          
          <div className="h-80">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorDocuments" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorSigned" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: 'var(--radius)',
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="documents" 
                    stroke="#8B5CF6" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorDocuments)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="signed" 
                    stroke="#06B6D4" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorSigned)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>

        {/* Compliance Chart */}
        <motion.div 
          variants={itemVariants}
          className="glass-card rounded-2xl p-6"
        >
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Compliance Status</h3>
            <p className="text-sm text-muted-foreground">Overall document completion</p>
          </div>
          
          <div className="h-64">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={complianceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {complianceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: 'var(--radius)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
          
          <div className="space-y-3 mt-4">
            {complianceData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className="text-sm font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Row */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Department Compliance */}
        <motion.div 
          variants={itemVariants}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Department Compliance</h3>
              <p className="text-sm text-muted-foreground">Compliance rates by department</p>
            </div>
          </div>
          
          <div className="h-64">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    domain={[0, 100]}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: 'var(--radius)',
                    }}
                  />
                  <Bar 
                    dataKey="compliance" 
                    fill="url(#complianceGradient)" 
                    radius={[8, 8, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="complianceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>

        {/* Activity Timeline */}
        <motion.div 
          variants={itemVariants}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Recent Activity</h3>
              <p className="text-sm text-muted-foreground">Latest actions and updates</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="text-sm text-primary hover:underline"
            >
              View all
            </motion.button>
          </div>
          
          <ActivityTimeline />
        </motion.div>
      </motion.div>
    </div>
  )
}
