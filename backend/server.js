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

// Static files - try multiple locations
const staticPaths = [
  path.join(__dirname, 'public'),           // Render: backend/public
  path.join(__dirname, '../frontend/dist'), // Local dev
  path.join(__dirname, '../../frontend/dist'),
];

let staticPath = null;
const fs = require('fs');

for (const testPath of staticPaths) {
  if (fs.existsSync(testPath)) {
    const indexPath = path.join(testPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      staticPath = testPath;
      console.log('✓ Serving static files from:', staticPath);
      break;
    }
  }
}

if (!staticPath) {
  console.error('✗ ERROR: Could not find index.html in any location');
  console.log('Checked paths:', staticPaths);
  console.log('Current directory:', __dirname);
  console.log('Files in __dirname:', fs.readdirSync(__dirname));
}

// Serve static files
if (staticPath) {
  app.use(express.static(staticPath));
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    staticPath: staticPath || 'NOT FOUND'
  });
});

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

app.get('/api/documents', (req, res) => res.json(documents));
app.get('/api/employees', (req, res) => res.json(employees));

app.post('/api/auth/login', (req, res) => {
  res.json({
    token: 'mock-jwt-token',
    user: { id: '1', name: 'Admin User', email: req.body.email, role: 'HR Manager' }
  });
});

// Catch-all: serve React app
app.get('*', (req, res) => {
  if (staticPath) {
    res.sendFile(path.join(staticPath, 'index.html'));
  } else {
    res.status(500).json({ 
      error: 'Frontend not built',
      message: 'Static files not found. Please check build logs.',
      cwd: process.cwd(),
      dirname: __dirname
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
