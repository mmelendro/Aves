# AVES Colombia - Enhanced Interactive Birding Explorer

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/mmelendro-9273s-projects/v0-company-landing-page)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/CWjyiEjIYsP)

## 🦅 Project Overview

AVES Colombia is a premium birding tour company offering expert-guided expeditions across Colombia's diverse bioregions. This Next.js 14 application features an enhanced interactive explorer with a refined split-layout design that showcases Colombia's incredible avian diversity through dynamic region information and a compact interactive map.

## ✨ Latest Enhancements

### 🎯 **Refined Split-Layout Design**
- **Dynamic Region Information Panel (Left)**: Updates in real-time when map regions are clicked
- **Compact Interactive Map (Right)**: Reduced to half size with optimized touch interactions
- **Condensed Statistics**: Non-interactive text elements positioned below the map
- **Mobile-First Responsive**: Seamless experience across all device sizes

### 🗺️ **Enhanced Interactive Features**
- **Real-time Content Updates**: Left panel dynamically displays selected region details
- **Compact Map Interface**: Smaller, more focused map with responsive icon sizing
- **Improved Touch Targets**: Optimized for mobile and tablet interactions
- **Contextual Information**: Species counts, habitat details, and conservation status

### 🎨 **Tropical Design System**
- **Emerald & Blue Gradients**: Nature-inspired color palette
- **Responsive Typography**: Optimized for readability across devices
- **Smooth Animations**: Hover effects and transitions for enhanced UX
- **Accessibility First**: WCAG 2.1 AA compliant design

## 🏗️ Architecture & Technology

### **Core Technologies**
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom tropical theme
- **UI Components**: shadcn/ui component library
- **Icons**: Lucide React for consistent iconography
- **Deployment**: Vercel with automatic deployments

### **Project Structure**
\`\`\`
├── app/                           # Next.js App Router
│   ├── aves-explorer/            # Enhanced interactive explorer
│   │   ├── page.tsx              # Main explorer page
│   │   └── loading.tsx           # Loading states
│   ├── tours/                    # Tour catalog
│   ├── about/                    # Company information
│   └── contact/                  # Contact forms
├── components/                   # Reusable components
│   ├── ui/                       # shadcn/ui components
│   ├── colombian-birds-explorer.tsx  # Main explorer component
│   ├── navigation-header.tsx     # Site navigation
│   └── footer.tsx               # Site footer
├── public/                      # Static assets
│   ├── images/                  # Optimized bird photos and maps
│   └── videos/                  # Background videos
├── styles/                      # Global styles
└── lib/                        # Utility functions
\`\`\`

## 🚀 Setup & Development

### **Prerequisites**
- Node.js 18+ (LTS recommended)
- npm, yarn, or pnpm package manager
- Git for version control

### **Quick Start**

1. **Clone & Install**
   \`\`\`bash
   git clone https://github.com/your-username/aves-colombia.git
   cd aves-colombia
   npm install
   \`\`\`

2. **Environment Setup**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Configure required variables:
   \`\`\`env
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
   \`\`\`

3. **Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### **Development Commands**
\`\`\`bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server

# Quality Assurance
npm run lint            # ESLint checking
npm run type-check      # TypeScript validation
npm run test            # Run test suite (if configured)

# Deployment
npm run deploy          # Deploy to Vercel
\`\`\`

## 📱 Responsive Design & Testing

### **Breakpoint Strategy**
- **Mobile**: 320px - 639px (iPhone SE, Galaxy, etc.)
- **Tablet**: 640px - 1023px (iPad, iPad Pro)
- **Desktop**: 1024px+ (Laptop, Desktop, Ultra-wide)

### **Layout Behavior**
- **Mobile**: Single column, map above region info
- **Tablet**: Single column with larger touch targets
- **Desktop**: Split layout with dynamic left panel and compact right map

### **Testing Checklist**
\`\`\`bash
# Device Testing
✅ iPhone SE (375px)
✅ iPhone 12/13/14 (390px)
✅ Samsung Galaxy (360px)
✅ iPad (768px)
✅ iPad Pro (1024px)
✅ MacBook (1366px)
✅ Desktop (1920px)
✅ Ultra-wide (2560px)

# Browser Testing
✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+
✅ Mobile Safari
✅ Chrome Mobile
\`\`\`

## 🎯 Enhanced Features Deep Dive

### **Dynamic Region Information Panel**
- **Real-time Updates**: Content changes instantly when map regions are clicked
- **Comprehensive Details**: Species counts, habitat information, conservation status
- **Interactive Elements**: Direct links to tours and planning tools
- **Default State**: General biodiversity information when no region is selected

### **Compact Interactive Map**
- **50% Size Reduction**: Optimized for split-layout design
- **Responsive Icons**: Dynamically sized based on screen size
- **Touch Optimization**: Enhanced touch targets for mobile devices
- **Visual Feedback**: Hover states and selection indicators

### **Condensed Statistics**
- **Below Map Placement**: Three compact boxes showing key metrics
- **Non-interactive Design**: Clean, informational display
- **Gradient Styling**: Tropical color scheme with emerald, blue, and purple

## 🔧 Deployment & Production

### **Vercel Deployment (Recommended)**

1. **Automatic Setup**
   \`\`\`bash
   # Connect repository to Vercel
   vercel --prod
   
   # Or use Vercel dashboard
   # Import project from GitHub
   # Configure environment variables
   \`\`\`

2. **Environment Variables**
   Configure in Vercel dashboard:
   \`\`\`env
   NEXT_PUBLIC_SITE_URL=https://aves.bio
   NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_key
   BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
   \`\`\`

3. **Custom Domain**
   - Add domain in Vercel dashboard
   - Configure DNS records as instructed
   - SSL certificates automatically provisioned

### **Preview URLs**
- **Production**: [https://aves.bio](https://aves.bio)
- **Staging**: [https://staging-aves.vercel.app](https://staging-aves.vercel.app)
- **Feature Branches**: Automatic preview URLs for pull requests

## 🧪 Testing & Quality Assurance

### **Accessibility Testing**
\`\`\`bash
# Screen Reader Testing
- NVDA (Windows)
- JAWS (Windows)
- VoiceOver (macOS/iOS)
- TalkBack (Android)

# Keyboard Navigation
- Tab order verification
- Focus management
- Escape key handling
- Enter/Space activation

# Color Contrast
- WCAG 2.1 AA compliance
- 4.5:1 minimum ratio for normal text
- 3:1 minimum ratio for large text
\`\`\`

### **Performance Optimization**
- **Image Optimization**: Next.js Image component with WebP format
- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Below-the-fold content optimization
- **CDN Caching**: Vercel Edge Network integration

### **SEO Optimization**
- **Meta Tags**: Comprehensive descriptions and titles
- **Structured Data**: JSON-LD for rich search results
- **Sitemap**: Automatic generation and submission
- **Open Graph**: Social media sharing optimization

## 🌍 Browser Support & Compatibility

### **Modern Browser Support**
- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅

### **Mobile Browser Support**
- iOS Safari 14+ ✅
- Chrome Mobile 90+ ✅
- Samsung Internet 14+ ✅
- Firefox Mobile 88+ ✅

### **Progressive Enhancement**
- Graceful degradation for older browsers
- Core functionality available without JavaScript
- Enhanced features for modern browsers

## 🤝 Contributing

### **Development Workflow**
1. **Fork Repository**
2. **Create Feature Branch**
   \`\`\`bash
   git checkout -b feature/amazing-enhancement
   \`\`\`
3. **Implement Changes**
4. **Test Thoroughly**
   \`\`\`bash
   npm run lint
   npm run type-check
   npm run build
   \`\`\`
5. **Submit Pull Request**

### **Code Standards**
- TypeScript for type safety
- ESLint + Prettier for code formatting
- Conventional commits for clear history
- Component-based architecture

## 📊 Performance Metrics

### **Core Web Vitals Targets**
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### **Optimization Strategies**
- Image optimization with Next.js Image
- Code splitting and lazy loading
- CDN delivery via Vercel Edge Network
- Efficient bundle sizing

## 🆘 Support & Documentation

### **Getting Help**
- **Email**: info@aves.bio
- **Documentation**: [docs.aves.bio](https://docs.aves.bio)
- **Issues**: [GitHub Issues](https://github.com/your-username/aves-colombia/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/aves-colombia/discussions)

### **Resources**
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for Colombia's incredible biodiversity**

*Discover. Explore. Conserve.*
