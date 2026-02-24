import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe,
  Mail,
  Save,
  CheckCircle2,
  Moon,
  Sun,
  Laptop
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { cn } from '../lib/utils'
import toast from 'react-hot-toast'

const settingsTabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'appearance', label: 'Appearance', icon: Palette },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const { theme, setTheme } = useTheme()

  const handleSave = () => {
    toast.success('Settings saved successfully!')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account and application preferences
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:w-64 space-y-2"
        >
          {settingsTabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors",
                activeTab === tab.id 
                  ? "bg-gradient-to-r from-gradient-purple/10 to-gradient-blue/10 text-gradient-purple border border-gradient-purple/20"
                  : "hover:bg-accent text-muted-foreground"
              )}
            >
              <tab.icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-1"
        >
          {activeTab === 'profile' && (
            <div className="glass-card rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gradient-purple to-gradient-blue flex items-center justify-center text-white text-2xl font-bold">
                  JD
                </div>
                
                <div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 rounded-xl border border-border hover:bg-accent font-medium text-sm"
                  >
                    Change Avatar
                  </motion.button>
                  <p className="text-xs text-muted-foreground mt-2">JPG, PNG or GIF. Max size 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <input 
                    type="text" 
                    defaultValue="John"
                    className="w-full px-4 py-2.5 rounded-xl bg-card border border-border focus:border-gradient-purple outline-none"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <input 
                    type="text" 
                    defaultValue="Doe"
                    className="w-full px-4 py-2.5 rounded-xl bg-card border border-border focus:border-gradient-purple outline-none"
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">Email</label>
                  <input 
                    type="email" 
                    defaultValue="john.doe@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-card border border-border focus:border-gradient-purple outline-none"
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">Job Title</label>
                  <input 
                    type="text" 
                    defaultValue="HR Manager"
                    className="w-full px-4 py-2.5 rounded-xl bg-card border border-border focus:border-gradient-purple outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-gradient-to-r from-gradient-purple to-gradient-blue text-white rounded-xl font-medium shadow-lg shadow-gradient-purple/25 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </motion.button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="glass-card rounded-2xl p-6 space-y-6">
              <h3 className="font-semibold">Email Notifications</h3>
              
              <div className="space-y-4">
                {[
                  { label: 'Document signed', desc: 'When an employee signs a document', default: true },
                  { label: 'New employee onboarded', desc: 'When a new employee joins', default: true },
                  { label: 'Compliance reminders', desc: 'Weekly compliance summary', default: false },
                  { label: 'Training completions', desc: 'When employees complete training', default: true },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={item.default} className="sr-only peer" />
                      <div className="w-11 h-6 bg-accent peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-purple"></div>
                    </label>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-gradient-to-r from-gradient-purple to-gradient-blue text-white rounded-xl font-medium shadow-lg shadow-gradient-purple/25 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </motion.button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="glass-card rounded-2xl p-6 space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Change Password</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Current Password</label>
                    <input 
                      type="password" 
                      className="w-full px-4 py-2.5 rounded-xl bg-card border border-border focus:border-gradient-purple outline-none"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">New Password</label>
                    <input 
                      type="password" 
                      className="w-full px-4 py-2.5 rounded-xl bg-card border border-border focus:border-gradient-purple outline-none"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Confirm New Password</label>
                    <input 
                      type="password" 
                      className="w-full px-4 py-2.5 rounded-xl bg-card border border-border focus:border-gradient-purple outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <h3 className="font-semibold mb-4">Two-Factor Authentication</h3>
                
                <div className="flex items-center justify-between p-4 bg-accent/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-emerald-500" />
                    </div>
                    
                    <div>
                      <p className="font-medium">2FA is enabled</p>
                      <p className="text-sm text-muted-foreground">Your account is secured with authenticator app</p>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 rounded-xl border border-border hover:bg-accent font-medium text-sm"
                  >
                    Configure
                  </motion.button>
                </div>
              </div>

              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-gradient-to-r from-gradient-purple to-gradient-blue text-white rounded-xl font-medium shadow-lg shadow-gradient-purple/25 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </motion.button>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="glass-card rounded-2xl p-6 space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Theme</h3>
                
                <div className="grid grid-cols-3 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setTheme('light')}
                    className={cn(
                      "p-4 rounded-xl border-2 transition-all",
                      theme === 'light' 
                        ? "border-gradient-purple bg-gradient-purple/5"
                        : "border-border hover:border-gradient-purple/50"
                    )}
                  >
                    <Sun className="w-8 h-8 mx-auto mb-2 text-amber-500" />
                    <p className="font-medium">Light</p>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setTheme('dark')}
                    className={cn(
                      "p-4 rounded-xl border-2 transition-all",
                      theme === 'dark' 
                        ? "border-gradient-purple bg-gradient-purple/5"
                        : "border-border hover:border-gradient-purple/50"
                    )}
                  >
                    <Moon className="w-8 h-8 mx-auto mb-2 text-gradient-purple" />
                    <p className="font-medium">Dark</p>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setTheme('system')}
                    className={cn(
                      "p-4 rounded-xl border-2 transition-all",
                      theme === 'system' 
                        ? "border-gradient-purple bg-gradient-purple/5"
                        : "border-border hover:border-gradient-purple/50"
                    )}
                  >
                    <Laptop className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                    <p className="font-medium">System</p>
                  </motion.button>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <h3 className="font-semibold mb-4">Accent Color</h3>
                
                <div className="flex items-center gap-3">
                  {['#8B5CF6', '#3B82F6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'].map((color) => (
                    <motion.button
                      key={color}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-full shadow-lg"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-gradient-to-r from-gradient-purple to-gradient-blue text-white rounded-xl font-medium shadow-lg shadow-gradient-purple/25 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
