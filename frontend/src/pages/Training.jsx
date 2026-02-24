import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  GraduationCap, 
  Play, 
  Pause, 
  CheckCircle2, 
  Clock, 
  Trophy,
  BookOpen,
  Lock,
  Star,
  ChevronRight,
  Award,
  FileCheck,
  MoreHorizontal
} from 'lucide-react'
import { cn } from '../lib/utils'
import toast from 'react-hot-toast'

const courses = [
  {
    id: 1,
    title: 'HR Compliance Fundamentals',
    description: 'Learn the basics of HR compliance, including key regulations and best practices.',
    duration: '2h 30m',
    lessons: 12,
    progress: 75,
    thumbnail: 'gradient-purple',
    category: 'Compliance',
    instructor: 'Jane Smith',
    rating: 4.8,
    enrolled: 1240,
  },
  {
    id: 2,
    title: 'Workplace Safety Training',
    description: 'Essential safety protocols and procedures for a safe workplace environment.',
    duration: '1h 45m',
    lessons: 8,
    progress: 30,
    thumbnail: 'gradient-blue',
    category: 'Safety',
    instructor: 'Mike Johnson',
    rating: 4.9,
    enrolled: 890,
  },
  {
    id: 3,
    title: 'Diversity & Inclusion',
    description: 'Building an inclusive workplace culture through understanding and empathy.',
    duration: '3h 15m',
    lessons: 15,
    progress: 0,
    thumbnail: 'gradient-pink',
    category: 'Culture',
    instructor: 'Sarah Williams',
    rating: 4.7,
    enrolled: 650,
  },
  {
    id: 4,
    title: 'Data Privacy & Security',
    description: 'Protecting sensitive information and understanding privacy regulations.',
    duration: '2h 00m',
    lessons: 10,
    progress: 100,
    thumbnail: 'gradient-cyan',
    category: 'Security',
    instructor: 'David Chen',
    rating: 4.9,
    enrolled: 1100,
    completed: true,
  },
]

const certificates = [
  {
    id: 1,
    title: 'HR Compliance Fundamentals',
    issueDate: '2024-01-15',
    expiryDate: '2025-01-15',
    credentialId: 'CERT-2024-001',
  },
  {
    id: 2,
    title: 'Workplace Safety Essentials',
    issueDate: '2023-11-20',
    expiryDate: '2024-11-20',
    credentialId: 'CERT-2023-089',
  },
]

export default function Training() {
  const [activeTab, setActiveTab] = useState('courses')
  const [selectedCourse, setSelectedCourse] = useState(null)

  const inProgressCourses = courses.filter(c => c.progress > 0 && c.progress < 100)
  const completedCourses = courses.filter(c => c.progress === 100)
  const notStartedCourses = courses.filter(c => c.progress === 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Training Center</h1>
          <p className="text-muted-foreground mt-1">
            Develop your skills and stay compliant
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="glass-card rounded-xl px-4 py-2 flex items-center gap-3">
            <Trophy className="w-5 h-5 text-amber-500" />
            <div>
              <p className="text-xs text-muted-foreground">Total Points</p>
              <p className="font-bold">2,450</p>
            </div>
          </div>
          
          <div className="glass-card rounded-xl px-4 py-2 flex items-center gap-3">
            <Award className="w-5 h-5 text-gradient-purple" />
            <div>
              <p className="text-xs text-muted-foreground">Certificates</p>
              <p className="font-bold">{certificates.length}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-2 p-1 bg-accent/50 rounded-xl w-fit"
      >
        {[
          { id: 'courses', label: 'My Courses', icon: BookOpen },
          { id: 'catalog', label: 'Catalog', icon: GraduationCap },
          { id: 'certificates', label: 'Certificates', icon: Award },
        ].map((tab) => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors",
              activeTab === tab.id 
                ? "bg-gradient-to-r from-gradient-purple to-gradient-blue text-white shadow-lg"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'courses' && (
          <motion.div
            key="courses"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* In Progress */}
            {inProgressCourses.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Continue Learning</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {inProgressCourses.map((course, index) => (
                    <CourseCard 
                      key={course.id} 
                      course={course} 
                      index={index}
                      onClick={() => setSelectedCourse(course)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Completed */}
            {completedCourses.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Completed</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {completedCourses.map((course, index) => (
                    <CourseCard 
                      key={course.id} 
                      course={course} 
                      index={index}
                      completed
                    />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'catalog' && (
          <motion.div
            key="catalog"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Search courses..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-card border border-border focus:border-gradient-purple outline-none"
              />
              
              <select className="px-4 py-2.5 rounded-xl bg-card border border-border outline-none">
                <option>All Categories</option>
                <option>Compliance</option>
                <option>Safety</option>
                <option>Culture</option>
                <option>Security</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...courses, ...courses].map((course, index) => (
                <CourseCard 
                  key={`${course.id}-${index}`} 
                  course={course} 
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'certificates' && (
          <motion.div
            key="certificates"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="glass-card rounded-2xl p-6 relative overflow-hidden"
              >
                {/* Decorative background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gradient-purple/20 to-gradient-blue/20 rounded-full blur-3xl -mr-16 -mt-16" />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gradient-purple to-gradient-blue flex items-center justify-center">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-lg hover:bg-accent"
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </motion.button>
                  </div>

                  <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Issued</span>
                      <span>{cert.issueDate}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Expires</span>
                      <span>{cert.expiryDate}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Credential ID</span>
                      <span className="font-mono text-xs">{cert.credentialId}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-6 px-4 py-2.5 rounded-xl border border-border hover:bg-accent font-medium text-sm flex items-center justify-center gap-2"
                  >
                    <FileCheck className="w-4 h-4" />
                    View Certificate
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Course Player Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <CoursePlayer 
            course={selectedCourse} 
            onClose={() => setSelectedCourse(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function CourseCard({ course, index, completed = false, onClick }) {
  const gradientClasses = {
    'gradient-purple': 'from-violet-500 to-purple-600',
    'gradient-blue': 'from-blue-500 to-cyan-600',
    'gradient-pink': 'from-pink-500 to-rose-600',
    'gradient-cyan': 'from-cyan-500 to-teal-600',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4, scale: 1.01 }}
      onClick={onClick}
      className="glass-card rounded-2xl overflow-hidden cursor-pointer group"
    >
      <div className={cn(
        "h-32 bg-gradient-to-br relative overflow-hidden",
        gradientClasses[course.thumbnail]
      )}>
        <div className="absolute inset-0 bg-black/10" />
        
        <div className="absolute top-4 left-4">
          <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur text-white text-xs font-medium">
            {course.category}
          </span>
        </div>

        {completed && (
          <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-1 text-white/80 text-xs">
            <Star className="w-3 h-3 fill-current" />
            <span>{course.rating}</span>
            <span className="mx-1">•</span>
            <span>{course.enrolled.toLocaleString()} enrolled</span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-semibold mb-1 group-hover:text-gradient-purple transition-colors">
          {course.title}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {course.description}
        </p>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-3 text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {course.duration}
            </span>
            
            <span className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              {course.lessons} lessons
            </span>
          </div>
        </div>

        {course.progress > 0 && course.progress < 100 && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{course.progress}%</span>
            </div>
            
            <div className="h-2 bg-accent rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${course.progress}%` }}
                className="h-full bg-gradient-to-r from-gradient-purple to-gradient-blue rounded-full"
              />
            </div>
          </div>
        )}

        {course.progress === 0 && !completed && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4 px-4 py-2 rounded-xl bg-gradient-to-r from-gradient-purple to-gradient-blue text-white font-medium text-sm"
          >
            Start Learning
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

function CoursePlayer({ course, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentLesson, setCurrentLesson] = useState(1)

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed inset-4 lg:inset-10 glass-card rounded-3xl z-50 flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            <h2 className="font-semibold">{course.title}</h2>
            <p className="text-sm text-muted-foreground">Lesson {currentLesson} of {course.lessons}</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-accent"
          >
            <ChevronRight className="w-5 h-5 rotate-90" />
          </motion.button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Video Player */}
          <div className="flex-1 bg-black flex items-center justify-center relative">
            <div className="text-center text-white">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8" />
                ) : (
                  <Play className="w-8 h-8 ml-1" />
                )}
              </motion.button>
              
              <p className="mt-4 text-white/60">Video Player Placeholder</p>
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
              <div className="h-full w-1/3 bg-gradient-purple" />
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 border-l border-border overflow-y-auto">
            <div className="p-4">
              <h3 className="font-medium mb-4">Course Content</h3>
              
              <div className="space-y-2">
                {Array.from({ length: course.lessons }).map((_, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setCurrentLesson(i + 1)}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors",
                      currentLesson === i + 1 
                        ? "bg-gradient-purple/10 border border-gradient-purple/30"
                        : "hover:bg-accent"
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium",
                      currentLesson === i + 1
                        ? "bg-gradient-purple text-white"
                        : i < currentLesson
                          ? "bg-emerald-500/10 text-emerald-600"
                          : "bg-accent"
                    )}>
                      {i < currentLesson ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        i + 1
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <p className={cn(
                        "text-sm font-medium",
                        currentLesson === i + 1 && "text-gradient-purple"
                      )}>
                        Lesson {i + 1}: {['Introduction', 'Key Concepts', 'Best Practices', 'Case Studies', 'Assessment'][i % 5]}
                      </p>
                      <p className="text-xs text-muted-foreground">12:34</p>
                    </div>

                    {i >= currentLesson && (
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
