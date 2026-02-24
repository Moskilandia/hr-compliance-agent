# HR Compliance Agent

A premium, modern HR compliance management platform that feels like a $10k/month SaaS product.

![Dashboard Preview](https://via.placeholder.com/800x400/8B5CF6/FFFFFF?text=HR+Compliance+Agent)

## ✨ Features

### 🎨 Modern Design System
- Dark/Light mode toggle with smooth transitions
- Glassmorphism effects throughout
- Gradient accents (purple/blue/cyan)
- Premium typography with Inter font
- Smooth animations powered by Framer Motion

### 📊 Enhanced Dashboard
- Animated charts using Recharts
- Real-time stats cards with hover effects
- Activity timeline with live updates
- Department compliance visualization
- Document activity tracking

### 📄 Document Management
- Drag-and-drop file upload
- Document preview modal
- Progress bars for generation
- Category and status filtering
- Beautiful file type icons

### 👥 Employee Portal
- Grid/List view toggle
- Profile cards with avatars
- Bulk selection and actions
- Compliance progress tracking
- Search and filter capabilities

### ✍️ E-Signature Flow
- Animated signature pad
- Step-by-step progress indicator
- Document preview before signing
- Confirmation and completion screens
- Email notification simulation

### 🎓 Training Center
- Course catalog with categories
- Video player with custom controls
- Progress tracking visualization
- Certificate display and management
- Points and achievements system

### 🌐 Landing Page
- Hero section with gradient background
- Feature showcase with animations
- Pricing section with 3 tiers
- Testimonials carousel
- Contact form

## 🛠 Tech Stack

- **Frontend**: React 18, React Router 6
- **Styling**: Tailwind CSS with custom configuration
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **State Management**: Zustand
- **Notifications**: React Hot Toast
- **File Upload**: React Dropzone
- **Signatures**: React Signature Canvas

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone or navigate to the project
cd /opt/hr-compliance-agent

# Install frontend dependencies
cd frontend
npm install
npm install -D tailwindcss-animate

# Build for production
npm run build

# For backend (optional)
cd ../backend
npm install
cp .env.example .env
npm start
```

### Development

```bash
cd frontend
npm run dev
```

The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
/opt/hr-compliance-agent/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # React contexts (Theme)
│   │   ├── pages/          # Page components
│   │   │   ├── LandingPage.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Documents.jsx
│   │   │   ├── Employees.jsx
│   │   │   ├── ESignature.jsx
│   │   │   ├── Training.jsx
│   │   │   └── Settings.jsx
│   │   ├── stores/         # Zustand state management
│   │   ├── lib/            # Utility functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── dist/               # Production build
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── DEPLOY.md
└── README.md
```

## 🎨 Design System

### Colors
- **Primary**: Purple (#8B5CF6)
- **Secondary**: Blue (#3B82F6)
- **Accent**: Cyan (#06B6D4)
- **Success**: Emerald (#10B981)
- **Warning**: Amber (#F59E0B)
- **Error**: Red (#EF4444)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold weights (600-800)
- **Body**: Regular weight (400)

### Animations
- Page transitions with Framer Motion
- Hover effects on cards and buttons
- Loading states and progress indicators
- Toast notifications

## 🚀 Deployment

See [DEPLOY.md](DEPLOY.md) for detailed deployment instructions for VPS at 45.90.220.152.

### Quick Deploy

```bash
# Build frontend
cd /opt/hr-compliance-agent/frontend
npm run build

# Serve with Nginx or any static server
# Files are in the `dist` directory
```

## 🔑 Demo Access

Click "Get Started" or "View Demo" on the landing page to access the dashboard with pre-populated demo data.

## 📄 License

MIT License - feel free to use this for your own projects!

## 🙏 Credits

- Icons by [Lucide](https://lucide.dev)
- Animations by [Framer Motion](https://www.framer.com/motion)
- Charts by [Recharts](https://recharts.org)
- UI inspired by modern SaaS products like Linear, Vercel, and Notion
