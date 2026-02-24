# HR Compliance Agent

A premium, modern HR compliance management platform built with React, Tailwind CSS, and Framer Motion.

## Features

- ✨ **Modern Design System** - Dark/Light mode, glassmorphism effects, gradient accents
- 📊 **Interactive Dashboard** - Animated charts, real-time stats, activity timeline
- 📄 **Document Management** - Drag-and-drop upload, preview modal, progress tracking
- 👥 **Employee Portal** - Grid/List views, bulk actions, compliance tracking
- ✍️ **E-Signature Flow** - Animated signature pad, step-by-step process
- 🎓 **Training Center** - Video player, progress tracking, certificates
- 🌐 **Landing Page** - Hero section, pricing, testimonials

## Tech Stack

- React 18
- React Router 6
- Framer Motion
- Recharts
- Tailwind CSS
- Lucide React
- React Hot Toast
- Zustand
- React Dropzone
- React Signature Canvas

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Navigate to frontend directory
cd /opt/hr-compliance-agent/frontend

# Install dependencies
npm install

# Install Tailwind CSS animate plugin
npm install -D tailwindcss-animate

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

### Deploy

To deploy the application:

```bash
# Build the application
npm run build

# The dist folder contains the static files
# Serve with any static file server
npx serve dist
```

## Project Structure

```
frontend/
├── src/
│   ├── components/       # Reusable components
│   ├── contexts/         # React contexts
│   ├── pages/            # Page components
│   ├── stores/           # Zustand stores
│   ├── lib/              # Utility functions
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
├── public/               # Static assets
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Design System

### Colors
- Primary: Purple (#8B5CF6)
- Secondary: Blue (#3B82F6)
- Accent: Cyan (#06B6D4)
- Success: Emerald (#10B981)
- Warning: Amber (#F59E0B)
- Error: Red (#EF4444)

### Typography
- Font Family: Inter
- Headings: Bold weights (600-800)
- Body: Regular weight (400)

## License

MIT
