import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  MoreHorizontal,
  Mail,
  Phone,
  Building2,
  CheckCircle2,
  Clock,
  UserX,
  ChevronDown,
  Download,
  Trash2,
  Edit2,
  UserPlus
} from 'lucide-react'
import { useEmployeeStore } from '../stores'
import { cn, getInitials, formatDate } from '../lib/utils'
import toast from 'react-hot-toast'

const departments = ['All', 'Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'HR', 'Analytics']
const statuses = ['All', 'Active', 'Onboarding', 'Inactive']

export default function Employees() {
  const { 
    employees, 
    viewMode, 
    setViewMode, 
    searchQuery, 
    setSearchQuery,
    filterStatus,
    setFilterStatus 
  } = useEmployeeStore()
  
  const [selectedDept, setSelectedDept] = useState('All')
  const [selectedEmployees, setSelectedEmployees] = useState([])

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDept = selectedDept === 'All' || emp.department === selectedDept
    const matchesStatus = filterStatus === 'All' || emp.status === filterStatus.toLowerCase()
    return matchesSearch && matchesDept && matchesStatus
  })

  const toggleSelection = (id) => {
    setSelectedEmployees(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    )
  }

  const selectAll = () => {
    if (selectedEmployees.length === filteredEmployees.length) {
      setSelectedEmployees([])
    } else {
      setSelectedEmployees(filteredEmployees.map(e => e.id))
    }
  }

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      onboarding: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
      inactive: 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20',
    }
    
    const icons = {
      active: CheckCircle2,
      onboarding: Clock,
      inactive: UserX,
    }
    
    const Icon = icons[status] || Clock
    
    return (
      <span className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
        styles[status]
      )}>
        <Icon className="w-3.5 h-3.5" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const getComplianceColor = (signed, pending) => {
    const total = signed + pending
    const rate = total > 0 ? (signed / total) * 100 : 0
    if (rate >= 90) return 'bg-emerald-500'
    if (rate >= 70) return 'bg-amber-500'
    return 'bg-red-500'
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
          <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
          <p className="text-muted-foreground mt-1">
            Manage your team and track compliance
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 bg-gradient-to-r from-gradient-purple to-gradient-blue text-white rounded-xl font-medium shadow-lg shadow-gradient-purple/25 hover:shadow-xl hover:shadow-gradient-purple/30 transition-shadow flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          Add Employee
        </motion.button>
      </motion.div>

      {/* Bulk Actions Bar */}
      <AnimatePresence>
        {selectedEmployees.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-gradient-purple/10 to-gradient-blue/10 rounded-xl border border-gradient-purple/20"
          >
            <span className="text-sm font-medium">
              {selectedEmployees.length} employee{selectedEmployees.length !== 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-3 py-1.5 text-sm rounded-lg bg-card border border-border hover:bg-accent"
              >
                Send Document
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-3 py-1.5 text-sm rounded-lg bg-card border border-border hover:bg-accent"
              >
                Export
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedEmployees([])}
                className="px-3 py-1.5 text-sm rounded-lg hover:bg-destructive/10 hover:text-destructive"
              >
                Clear
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col lg:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search employees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border focus:border-gradient-purple focus:ring-2 focus:ring-gradient-purple/20 outline-none transition-all"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-card border border-border focus:border-gradient-purple outline-none cursor-pointer"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-card border border-border focus:border-gradient-purple outline-none cursor-pointer"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          
          <div className="flex items-center bg-card rounded-xl border border-border p-1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('grid')}
              className={cn(
                "p-2 rounded-lg transition-colors",
                viewMode === 'grid' ? "bg-gradient-purple text-white" : "hover:bg-accent"
              )}
            >
              <Grid className="w-4 h-4" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('list')}
              className={cn(
                "p-2 rounded-lg transition-colors",
                viewMode === 'list' ? "bg-gradient-purple text-white" : "hover:bg-accent"
              )}
            >
              <List className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Employees View */}
      <AnimatePresence mode="wait">
        {viewMode === 'grid' ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filteredEmployees.map((employee, index) => (
              <motion.div
                key={employee.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className={cn(
                  "glass-card rounded-2xl p-5 cursor-pointer transition-all",
                  selectedEmployees.includes(employee.id) && "ring-2 ring-gradient-purple"
                )}
                onClick={() => toggleSelection(employee.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center text-white font-medium",
                      selectedEmployees.includes(employee.id)
                        ? "bg-gradient-purple"
                        : "bg-gradient-to-br from-gradient-purple to-gradient-blue"
                    )}>
                      {selectedEmployees.includes(employee.id) ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        getInitials(employee.name)
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{employee.name}</h3>
                      <p className="text-sm text-muted-foreground">{employee.role}</p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-lg hover:bg-accent"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="w-4 h-4" />
                    {employee.department}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{employee.email}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Compliance</span>
                    <span className="text-sm font-medium">
                      {Math.round((employee.documentsSigned / (employee.documentsSigned + employee.documentsPending)) * 100)}%
                    </span>
                  </div>
                  
                  <div className="h-2 bg-accent rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        getComplianceColor(employee.documentsSigned, employee.documentsPending)
                      )}
                      style={{ 
                        width: `${(employee.documentsSigned / (employee.documentsSigned + employee.documentsPending)) * 100}%` 
                      }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    {getStatusBadge(employee.status)}
                    <span className="text-xs text-muted-foreground">
                      Joined {formatDate(employee.joinDate)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass-card rounded-2xl overflow-hidden"
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedEmployees.length === filteredEmployees.length && filteredEmployees.length > 0}
                      onChange={selectAll}
                      className="rounded border-border"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Employee</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Department</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Compliance</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Joined</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr 
                    key={employee.id}
                    className="border-b border-border hover:bg-accent/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedEmployees.includes(employee.id)}
                        onChange={() => toggleSelection(employee.id)}
                        className="rounded border-border"
                      />
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gradient-purple to-gradient-blue flex items-center justify-center text-white font-medium text-sm">
                          {getInitials(employee.name)}
                        </div>
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-sm text-muted-foreground">{employee.email}</p>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 text-sm">{employee.department}</td>
                    
                    <td className="px-6 py-4">{getStatusBadge(employee.status)}</td>
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-accent rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full rounded-full",
                              getComplianceColor(employee.documentsSigned, employee.documentsPending)
                            )}
                            style={{ 
                              width: `${(employee.documentsSigned / (employee.documentsSigned + employee.documentsPending)) * 100}%` 
                            }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {Math.round((employee.documentsSigned / (employee.documentsSigned + employee.documentsPending)) * 100)}%
                        </span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {formatDate(employee.joinDate)}
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-lg hover:bg-accent"
                        >
                          <Edit2 className="w-4 h-4" />
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-lg hover:bg-accent"
                        >
                          <Download className="w-4 h-4" />
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-lg hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>

      {filteredEmployees.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="w-20 h-20 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
            <Users className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">No employees found</h3>
          <p className="text-muted-foreground mt-1">Try adjusting your search or filters</p>
        </motion.div>
      )}
    </div>
  )
}
