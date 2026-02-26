const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Determine the correct path for static files
// In production (Render), files might be in different locations
const possiblePaths = [
  path.join(__dirname, '../frontend/dist'),  // Local development
  path.join(__dirname, '../../frontend/dist'), // Render build
  path.join(__dirname, 'frontend/dist'),     // Alternative
  path.join(process.cwd(), 'frontend/dist'), // Current working directory
];

let staticPath = null;
for (const testPath of possiblePaths) {
  try {
    const fs = require('fs');
    if (fs.existsSync(testPath)) {
      staticPath = testPath;
      console.log('✓ Found static files at:', staticPath);
      break;
    }
  } catch (e) {
    // Continue to next path
  }
}

if (!staticPath) {
  console.error('✗ Could not find static files in any known location');
  console.log('Current directory:', process.cwd());
  console.log('__dirname:', __dirname);
}

// Serve static files
if (staticPath) {
  app.use(express.static(staticPath));
}

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

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Documents API
app.get('/api/documents', (req, res) => {
  res.json(documents);
});

app.get('/api/documents/:id', (req, res) => {
  const doc = documents.find(d => d.id === req.params.id);
  if (!doc) return res.status(404).json({ error: 'Document not found' });
  res.json(doc);
});

// Employees API
app.get('/api/employees', (req, res) => {
  res.json(employees);
});

app.get('/api/employees/:id', (req, res) => {
  const emp = employees.find(e => e.id === req.params.id);
  if (!emp) return res.status(404).json({ error: 'Employee not found' });
  res.json(emp);
});

// Auth API
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  res.json({
    token: 'mock-jwt-token',
    user: {
      id: '1',
      name: 'Admin User',
      email: email,
      role: 'HR Manager'
    }
  });
});

// Catch-all handler: send back React's index.html file for client-side routing
app.get('*', (req, res) => {
  if (staticPath) {
    res.sendFile(path.join(staticPath, 'index.html'));
  } else {
    res.status(500).json({ 
      error: 'Static files not found',
      cwd: process.cwd(),
      dirname: __dirname
    });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});
