import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateUser: (updates) => set((state) => ({ 
        user: state.user ? { ...state.user, ...updates } : null 
      })),
    }),
    {
      name: 'auth-storage',
    }
  )
)

export const useUIStore = create((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  
  activeModal: null,
  modalData: null,
  openModal: (modal, data = null) => set({ activeModal: modal, modalData: data }),
  closeModal: () => set({ activeModal: null, modalData: null }),
  
  notifications: [],
  addNotification: (notification) => 
    set((state) => ({ 
      notifications: [{ id: Date.now(), ...notification }, ...state.notifications].slice(0, 50) 
    })),
  removeNotification: (id) => 
    set((state) => ({ 
      notifications: state.notifications.filter((n) => n.id !== id) 
    })),
  markAllRead: () => 
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true }))
    })),
}))

export const useDocumentStore = create((set, get) => ({
  documents: [],
  isLoading: false,
  
  fetchDocuments: async () => {
    set({ isLoading: true })
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))
    set({ 
      documents: mockDocuments,
      isLoading: false 
    })
  },
  
  addDocument: (doc) => 
    set((state) => ({ 
      documents: [doc, ...state.documents] 
    })),
  
  updateDocument: (id, updates) => 
    set((state) => ({
      documents: state.documents.map((d) => 
        d.id === id ? { ...d, ...updates } : d
      )
    })),
  
  deleteDocument: (id) => 
    set((state) => ({
      documents: state.documents.filter((d) => d.id !== id)
    })),
}))

export const useEmployeeStore = create((set) => ({
  employees: mockEmployees,
  viewMode: 'grid',
  searchQuery: '',
  filterStatus: 'all',
  
  setViewMode: (mode) => set({ viewMode: mode }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilterStatus: (status) => set({ filterStatus: status }),
  
  addEmployee: (employee) => 
    set((state) => ({ 
      employees: [employee, ...state.employees] 
    })),
  
  updateEmployee: (id, updates) => 
    set((state) => ({
      employees: state.employees.map((e) => 
        e.id === id ? { ...e, ...updates } : e
      )
    })),
  
  deleteEmployee: (id) => 
    set((state) => ({
      employees: state.employees.filter((e) => e.id !== id)
    })),
}))

// Mock data
const mockDocuments = [
  { id: '1', name: 'Employee Handbook 2024.pdf', type: 'pdf', size: '2.4 MB', status: 'active', createdAt: '2024-01-15', updatedAt: '2024-02-20', category: 'HR Policy' },
  { id: '2', name: 'Non-Disclosure Agreement.docx', type: 'docx', size: '156 KB', status: 'pending', createdAt: '2024-02-10', updatedAt: '2024-02-10', category: 'Legal' },
  { id: '3', name: 'Benefits Enrollment Form.pdf', type: 'pdf', size: '890 KB', status: 'active', createdAt: '2024-01-20', updatedAt: '2024-01-20', category: 'Benefits' },
  { id: '4', name: 'Remote Work Policy.pdf', type: 'pdf', size: '1.2 MB', status: 'draft', createdAt: '2024-02-18', updatedAt: '2024-02-22', category: 'HR Policy' },
  { id: '5', name: 'Performance Review Template.docx', type: 'docx', size: '234 KB', status: 'active', createdAt: '2023-12-01', updatedAt: '2024-01-05', category: 'Performance' },
  { id: '6', name: 'Code of Conduct.pdf', type: 'pdf', size: '3.1 MB', status: 'active', createdAt: '2023-11-15', updatedAt: '2024-02-01', category: 'HR Policy' },
]

const mockEmployees = [
  { id: '1', name: 'Sarah Chen', email: 'sarah.chen@company.com', role: 'Senior Engineer', department: 'Engineering', status: 'active', avatar: null, joinDate: '2022-03-15', documentsSigned: 5, documentsPending: 1 },
  { id: '2', name: 'Marcus Johnson', email: 'marcus.j@company.com', role: 'Product Manager', department: 'Product', status: 'active', avatar: null, joinDate: '2021-08-22', documentsSigned: 7, documentsPending: 0 },
  { id: '3', name: 'Emily Rodriguez', email: 'emily.r@company.com', role: 'HR Specialist', department: 'HR', status: 'active', avatar: null, joinDate: '2023-01-10', documentsSigned: 6, documentsPending: 2 },
  { id: '4', name: 'David Kim', email: 'david.kim@company.com', role: 'Designer', department: 'Design', status: 'onboarding', avatar: null, joinDate: '2024-02-15', documentsSigned: 2, documentsPending: 4 },
  { id: '5', name: 'Lisa Thompson', email: 'lisa.t@company.com', role: 'Marketing Lead', department: 'Marketing', status: 'active', avatar: null, joinDate: '2022-11-05', documentsSigned: 8, documentsPending: 0 },
  { id: '6', name: 'James Wilson', email: 'james.w@company.com', role: 'Sales Director', department: 'Sales', status: 'inactive', avatar: null, joinDate: '2020-06-18', documentsSigned: 10, documentsPending: 0 },
  { id: '7', name: 'Anna Martinez', email: 'anna.m@company.com', role: 'Data Analyst', department: 'Analytics', status: 'active', avatar: null, joinDate: '2023-07-12', documentsSigned: 4, documentsPending: 1 },
  { id: '8', name: 'Robert Taylor', email: 'rob.t@company.com', role: 'DevOps Engineer', department: 'Engineering', status: 'active', avatar: null, joinDate: '2022-09-30', documentsSigned: 6, documentsPending: 0 },
]
