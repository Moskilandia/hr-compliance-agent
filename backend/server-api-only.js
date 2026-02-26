const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for now
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mock data
const documents = [
  { id: '1', name: 'Employee Handbook 2024.pdf', type: 'pdf', size: '2.4 MB', status: 'active', createdAt: '2024-01-15', updatedAt: '2024-02-20', category: 'HR Policy' },
  { id: '2', name: 'Non-Disclosure Agreement.docx', type: 'docx', size: '156 KB', status: 'pending', createdAt: '2024-02-10', updatedAt: '2024-02-10', category: 'Legal' },
  { id: '3', name: 'Benefits Enrollment Form.pdf', type: 'pdf', size: '890 KB', status: 'active', createdAt: '2024-01-20', updatedAt: '2024-01-20', category: 'Benefits' },
];

const employees = [
  { id: '1', name: 'Sarah Chen', email: 'sarah.chen@company.com', role: 'Senior Engineer', department: 'Engineering', status: 'active', joinDate: '2022-03-15', documentsSigned: 5, documentsPending: 1 },
  { id: '2', name: 'Marcus Johnson', email: 'marcus.j@company.com', role: 'Product Manager', department: 'Product', status: 'active', joinDate: '2021-08-22', documentsSigned: 7, documentsPending: 0 },
];

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.get('/api/documents', (req, res) => res.json(documents));
app.get('/api/documents/:id', (req, res) => {
  const doc = documents.find(d => d.id === req.params.id);
  if (!doc) return res.status(404).json({ error: 'Document not found' });
  res.json(doc);
});

app.get('/api/employees', (req, res) => res.json(employees));
app.get('/api/employees/:id', (req, res) => {
  const emp = employees.find(e => e.id === req.params.id);
  if (!emp) return res.status(404).json({ error: 'Employee not found' });
  res.json(emp);
});

app.post('/api/auth/login', (req, res) => {
  res.json({
    token: 'mock-jwt-token',
    user: { id: '1', name: 'Admin User', email: req.body.email, role: 'HR Manager' }
  });
});

app.listen(PORT, () => {
  console.log(`API Server running on port ${PORT}`);
});
