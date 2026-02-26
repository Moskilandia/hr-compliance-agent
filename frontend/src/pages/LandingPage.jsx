import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowRight, 
  CheckCircle2, 
  Shield, 
  FileText, 
  Users, 
  Zap,
  Menu,
  X,
  ChevronRight,
  Star,
  Quote,
  Sparkles,
  TrendingUp,
  Clock,
  Lock
} from 'lucide-react'
import { useAuthStore } from '../stores'
import { cn } from '../lib/utils'
import toast from 'react-hot-toast'

const features = [
  {
    icon: FileText,
    title: 'Smart Documents',
    description: 'AI-powered document management with auto-categorization and smart search.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Shield,
    title: 'Secure E-Signatures',
    description: 'Bank-grade encryption with legally binding signatures and audit trails.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Users,
    title: 'Employee Portal',
    description: 'Self-service portal for employees to access documents and track compliance.',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    icon: Zap,
    title: 'Auto Compliance',
    description: 'Automated compliance tracking with real-time alerts and deadline management.',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: TrendingUp,
    title: 'Analytics Dashboard',
    description: 'Powerful insights and reports to track your HR metrics and compliance status.',
    color: 'from-violet-500 to-purple-500'
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    description: 'SOC 2 compliant with SSO, 2FA, and role-based access control.',
    color: 'from-cyan-500 to-blue-500'
  },
]

const stats = [
  { value: '10K+', label: 'Companies' },
  { value: '1M+', label: 'Documents' },
  { value: '99.9%', label: 'Uptime' },
  { value: '24/7', label: 'Support' },
]

const testimonials = [
  {
    quote: "This platform transformed our HR operations. What used to take weeks now takes hours.",
    author: "Sarah Chen",
    role: "VP of People, TechCorp",
    avatar: "SC"
  },
  {
    quote: "The best investment we've made. Our compliance audits are now seamless and stress-free.",
    author: "Marcus Johnson",
    role: "CEO, StartupXYZ",
    avatar: "MJ"
  },
  {
    quote: "Finally, an HR tool that looks as good as it works. Our team loves using it.",
    author: "Emily Rodriguez",
    role: "HR Director, DesignCo",
    avatar: "ER"
  },
]

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { login } = useAuthStore()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleDemoLogin = () => {
    login({
      name: 'Demo User',
      email: 'demo@hrcompliance.com',
      role: 'HR Manager'
    })
    toast.success('Welcome to the demo!')
    window.location.href = '/app'
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl gradient-text">HR Compliance</span>
            </motion.div>

            <div className="hidden md:flex items-center gap-8">
              {['Features', 'Testimonials', 'Pricing'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDemoLogin}
                className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                Sign In
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDemoLogin}
                className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-full font-medium shadow-lg shadow-purple-500/25"
              >
                Get Started
              </motion.button>
            </div>

            <button 
              className="md:hidden p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
            >
              <div className="px-4 py-6 space-y-4">
                {['Features', 'Testimonials', 'Pricing'].map((item) => (
                  <a 
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block py-2 text-lg font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <hr className="border-white/10" />
                <button 
                  onClick={handleDemoLogin}
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-full font-medium"
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-purple-500/10 via-transparent to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-white/80">Trusted by 10,000+ companies worldwide</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
            >
              HR Compliance
              <br />
              <span className="gradient-text">Reimagined</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-white/60 mb-10 max-w-2xl mx-auto"
            >
              Streamline your HR processes with AI-powered document management, 
              secure e-signatures, and automated compliance tracking.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDemoLogin}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-full font-semibold text-lg shadow-xl shadow-purple-500/25 flex items-center justify-center gap-2"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDemoLogin}
                className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 hover:bg-white/5 font-semibold text-lg transition-colors"
              >
                View Demo
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">{stat.value}</div>
                  <div className="text-sm text-white/50">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Everything you need</h2>
            <p className="text-xl text-white/50">
              Powerful features to streamline your HR compliance workflow
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative glass-card rounded-2xl p-8 h-full">
                  <div className={cn(
                    "w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center mb-6",
                    feature.color
                  )}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  
                  <p className="text-white/50 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Loved by teams</h2>
            <p className="text-xl text-white/50">See what our customers have to say</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-8 relative"
              >
                <Quote className="w-10 h-10 text-purple-500/30 mb-6" />
                
                <p className="text-lg text-white/80 mb-8 leading-relaxed">"{testimonial.quote}"</p>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-white/50">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative glass-card rounded-3xl p-12 md:p-16 text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to get started?</h2>
              
              <p className="text-xl text-white/50 mb-10 max-w-2xl mx-auto">
                Join thousands of companies that trust HR Compliance Agent 
                to manage their HR processes.
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDemoLogin}
                className="px-10 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-full font-semibold text-lg shadow-xl shadow-purple-500/25 inline-flex items-center gap-2"
              >
                Start Free Trial
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl gradient-text">HR Compliance</span>
            </div>
            
            <p className="text-sm text-white/40">
              © 2024 HR Compliance Agent. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
