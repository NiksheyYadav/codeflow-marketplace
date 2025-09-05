# 🚀 CodeFlow Marketplace

A modern marketplace for buying and selling original code with built-in plagiarism detection and AI-powered code analysis.

## ✨ Features

### 🎯 Core Features
- **Marketplace for Original Code** - Buy and sell high-quality, original code
- **AI-Powered Plagiarism Detection** - Built-in plagiarism scanning with OpenAI integration
- **Multi-Provider Authentication** - Email, Google, GitHub, Discord, and magic links
- **Glassmorphism Design** - Modern, beautiful UI with glassmorphism effects
- **Advanced Search & Filters** - Powerful filtering by language, category, price, and more
- **Real-time Features** - Live notifications, cart management, and favorites

### 🛠 Tech Stack
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui with custom glassmorphism components
- **Animations**: Framer Motion, Anime.js
- **3D Elements**: Three.js (planned)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with multi-provider support
- **Payments**: Stripe Connect (planned)
- **Code Editor**: Monaco Editor (planned)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd codeflow-marketplace
npm install
```

### 2. Set Up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to Settings → API to get your project URL and anon key
3. Go to SQL Editor and run the database schema from `docs/database-schema.sql`

### 3. Configure Environment Variables

Copy the example environment file and fill in your values:

```bash
cp .env.local.example .env.local
```

Update `.env.local` with your actual values:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# OpenAI (for plagiarism detection)
OPENAI_API_KEY=your-openai-api-key

# Stripe (for payments)
STRIPE_SECRET_KEY=your-stripe-secret-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret

# GitHub (for code analysis)
GITHUB_TOKEN=your-github-token
```

### 4. Set Up Supabase Authentication Providers

In your Supabase dashboard, go to Authentication → Providers and configure:

1. **Google**: Add OAuth credentials
2. **GitHub**: Add OAuth app details
3. **Discord**: Add OAuth application details

Set the redirect URLs to:
- Development: `http://localhost:3000/auth/callback`
- Production: `https://yourdomain.com/auth/callback`

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
src/
├── app/                     # Next.js App Router
│   ├── (auth)/             # Authentication pages
│   ├── (marketplace)/      # Marketplace pages
│   ├── (dashboard)/        # User dashboard
│   ├── api/                # API routes
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── components/
│   ├── auth/               # Authentication components
│   ├── marketplace/        # Marketplace components
│   ├── theme/              # Theme provider
│   ├── three/              # 3D components
│   ├── animations/         # Animation components
│   └── ui/                 # UI components (shadcn/ui + custom)
├── lib/
│   ├── supabase/           # Supabase client configurations
│   ├── stripe/             # Stripe integration
│   ├── plagiarism/         # Plagiarism detection
│   └── utils/              # Utility functions
├── hooks/                  # Custom React hooks
├── stores/                 # State management (Zustand)
├── types/                  # TypeScript type definitions
└── styles/
    └── glassmorphism/      # Custom glassmorphism styles
```

## 🎨 Design System

### Glassmorphism Components
- `Glass` - Base glassmorphism container
- `GlassCard` - Card with glassmorphism effects
- `GlassButton` - Button with glassmorphism styling
- `GlassInput` - Input with glassmorphism effects
- `GlassNav` - Navigation with glassmorphism
- `GlassModal` - Modal with glassmorphism

### Custom CSS Classes
- `.glass` - Basic glassmorphism effect
- `.glass-card` - Enhanced card styling
- `.glass-gradient-{1,2,3}` - Gradient variants
- `.glow-{blue,purple,pink}` - Glow effects
- `.text-gradient-{blue,purple,cyan}` - Gradient text

## 🗄️ Database Schema

The application uses a comprehensive database schema with 8 main tables:

- **profiles** - User profiles and seller information
- **categories** - Code category organization
- **listings** - Code listings and marketplace items
- **transactions** - Purchase and payment records
- **reviews** - Rating and review system
- **plagiarism_reports** - AI plagiarism detection results
- **cart_items** - Shopping cart functionality
- **favorites** - User favorites and wishlist

See `docs/database-schema.sql` for the complete schema.

## 🔐 Authentication

Multi-provider authentication system supporting:
- Email/password with verification
- Google OAuth
- GitHub OAuth
- Discord OAuth
- Magic link authentication
- Phone number authentication (optional)

All authentication is handled by Supabase Auth with custom UI components.

## ⚡ Performance Features

- Server-side rendering with Next.js App Router
- Optimized glassmorphism effects for mobile
- GPU-accelerated animations
- Lazy loading and code splitting
- Optimized images and assets
- Progressive Web App (PWA) support (planned)

## 🧪 Development Status

### ✅ Completed (47% - 7/15 major features)
- ✅ Next.js 14 project setup
- ✅ Core dependencies configuration
- ✅ Supabase integration
- ✅ Database schema design
- ✅ Multi-provider authentication
- ✅ Glassmorphism design system
- ✅ Core UI components (Header, CodeCard, SearchFilters)

### 🔄 In Progress
- Three.js 3D elements
- Framer Motion animations
- Monaco Editor integration
- Marketplace core functionality
- Stripe Connect payments
- Plagiarism detection system
- API endpoints
- PWA configuration

## 🛡️ Security Features

- Row Level Security (RLS) with Supabase
- Environment variable protection
- CSRF protection
- SQL injection prevention
- XSS protection
- Secure authentication flows
- Encrypted data storage
- API rate limiting (planned)

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the fantastic React framework
- [Supabase](https://supabase.com/) for the backend infrastructure
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://framer.com/motion/) for smooth animations
- [Lucide Icons](https://lucide.dev/) for the icon system
