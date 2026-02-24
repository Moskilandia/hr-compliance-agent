import React, { useState } from 'react'
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
  Quote
} from 'lucide-react'
import { useAuthStore } from '../stores'
import { cn } from '../lib/utils'
import toast from 'react-hot-toast'

const features = [
  {
    icon: FileText,
    title: 'Document Management',
    description: 'Centralize all your HR documents with version control, smart search, and automated workflows.',
  },
  {
    icon: Users,
    title: 'Employee Portal',
    description: 'Give employees self-service access to their documents, training, and compliance status.',
  },
  {
    icon: Shield,
    title: 'E-Signatures',
    description: 'Legally binding electronic signatures with audit trails and tamper-proof certificates.',
  },
  {
    icon: Zap,
    title: 'Automated Compliance',
    description: 'Stay compliant with automated reminders, deadline tracking, and regulatory updates.',
  },
]

const testimonials = [
  {
    quote: "HR Compliance Agent has transformed how we manage employee documents. What used to take days now takes minutes.",
    author: "Sarah Chen",
    role: "HR Director, TechCorp",
    avatar: "SC"
  },
  {
    quote: "The e-signature feature alone has saved us countless hours. Our employees love how easy it is to use.",
    author: "Marcus Johnson",
    role: "CEO, StartupXYZ",
    avatar: "MJ"
  },
  {
    quote: "Finally, a compliance solution that doesn't feel like it was built in the 90s. Beautiful and functional.",
    author: "Emily Rodriguez",
    role: "People Ops, DesignStudio",
    avatar: "ER"
  },
]

const pricingPlans = [
  {
    name: 'Starter',
    price: 29,
    description: 'Perfect for small teams getting started',
    features: [
      'Up to 25 employees',
      '100 documents/month',
      'Basic e-signatures',
      'Email support',
      'Standard templates',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Professional',
    price: 99,
    description: 'For growing teams that need more power',
    features: [
      'Up to 100 employees',
      'Unlimited documents',
      'Advanced e-signatures',
      'Priority support',
      'Custom templates',
      'API access',
      'Analytics dashboard',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 299,
    description: 'For large organizations with complex needs',
    features: [
      'Unlimited employees',
      'Unlimited everything',
      'White-label options',
      'Dedicated support',
      'Custom integrations',
      'SSO & advanced security',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
]

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { login } = useAuthStore()

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
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gradient-purple to-gradient-cyan flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="font-bold text-xl gradient-text">HR Compliance</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
              <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Testimonials</a>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDemoLogin}
                className="px-4 py-2 text-sm font-medium hover:text-foreground transition-colors"
              >
                Sign In
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDemoLogin}
                className="px-4 py-2 bg-gradient-to-r from-gradient-purple to-gradient-blue text-white rounded-xl font-medium shadow-lg shadow-gradient-purple/25"
              >
                Get Started
              </motion.button>
            </div>

            <button 
              className="md:hidden p-2"
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
              className="md:hidden border-t border-border bg-card"
            >
              <div className="px-4 py-4 space-y-3">
                <a href="#features" className="block py-2 text-sm font-medium">Features</a>
                <a href="#pricing" className="block py-2 text-sm font-medium">Pricing</a>
                <a href="#testimonials" className="block py-2 text-sm font-medium">Testimonials</a>
                <hr className="border-border" />
                <button 
                  onClick={handleDemoLogin}
                  className="w-full py-2 text-sm font-medium text-left"
                >
                  Sign In
                </button>
                <button 
                  onClick={handleDemoLogin}
                  className="w-full py-2 bg-gradient-to-r from-gradient-purple to-gradient-blue text-white rounded-xl font-medium"
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gradient-purple/5 via-transparent to-gradient-cyan/5" />
        
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-gradient-purple/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-cyan/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-purple/10 text-gradient-purple text-sm font-medium mb-6">
                <Star className="w-4 h-4" />
                Trusted by 10,000+ companies
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            >
              HR Compliance made{' '}
              <span className="gradient-text">simple</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Streamline your HR processes with intelligent document management, 
              e-signatures, and automated compliance tracking.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDemoLogin}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-gradient-purple to-gradient-blue text-white rounded-xl font-semibold shadow-xl shadow-gradient-purple/25 flex items-center justify-center gap-2"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDemoLogin}
                className="w-full sm:w-auto px-8 py-4 rounded-xl border border-border hover:bg-accent font-semibold"
              >
                View Demo
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-16 relative"
            >
              <div className="glass-card rounded-2xl p-2 shadow-2xl">
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl aspect-[16/9] flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gradient-purple to-gradient-cyan flex items-center justify-center">
                      <Shield className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-white/60">Dashboard Preview</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything you need</h2>
            <p className="text-lg text-muted-foreground">
              Powerful features to help you manage HR compliance with ease
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="glass-card rounded-2xl p-8 group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gradient-purple/20 to-gradient-blue/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-gradient-purple" />
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 lg:py-32 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Loved by HR teams</h2>
            <p className="text-lg text-muted-foreground">
              See what our customers have to say
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-8"
              >
                <Quote className="w-8 h-8 text-gradient-purple/30 mb-4" />
                
                <p className="text-lg mb-6">"{testimonial.quote}"</p>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gradient-purple to-gradient-blue flex items-center justify-center text-white font-medium">
                    {testimonial.avatar}
                  </div>
                  
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-lg text-muted-foreground">
              Choose the plan that's right for your team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={cn(
                  "rounded-2xl p-8 relative",
                  plan.popular 
                    ? "glass-card border-2 border-gradient-purple shadow-xl shadow-gradient-purple/10"
                    : "glass-card"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-gradient-to-r from-gradient-purple to-gradient-blue text-white text-sm font-medium rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  
                  <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                  
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDemoLogin}
                  className={cn(
                    "w-full py-3 rounded-xl font-medium transition-colors",
                    plan.popular
                      ? "bg-gradient-to-r from-gradient-purple to-gradient-blue text-white shadow-lg shadow-gradient-purple/25"
                      : "border border-border hover:bg-accent"
                  )}
                >
                  {plan.cta}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gradient-purple/10 to-gradient-cyan/10" />
            
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to streamline your HR?{/* */}</h2>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of companies that trust HR Compliance Agent 
                to manage their HR processes.
              </p>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDemoLogin}
                className="px-8 py-4 bg-gradient-to-r from-gradient-purple to-gradient-blue text-white rounded-xl font-semibold shadow-xl shadow-gradient-purple/25 inline-flex items-center gap-2"
              >
                Get Started Free
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gradient-purple to-gradient-cyan flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="font-bold gradient-text">HR Compliance</span>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © 2024 HR Compliance Agent. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
