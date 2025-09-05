'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { GlassCard, GlassButton } from '@/components/ui/glass'
import { CodeCard } from '@/components/marketplace/CodeCard'
import { SearchFilters, type FilterState } from '@/components/marketplace/SearchFilters'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Code2, 
  Sparkles, 
  Shield, 
  Zap, 
  TrendingUp,
  Star,
  Users,
  CheckCircle
} from 'lucide-react'

// Sample data for demonstration
const sampleListings = [
  {
    id: '1',
    title: 'React E-commerce Dashboard',
    slug: 'react-ecommerce-dashboard',
    description: 'A complete e-commerce admin dashboard built with React, TypeScript, and Tailwind CSS. Features include order management, product catalog, analytics, and user management.',
    short_description: 'Complete e-commerce admin dashboard with analytics',
    price: 149,
    pricing_model: 'one_time' as const,
    programming_languages: ['React', 'TypeScript', 'Tailwind CSS'],
    tags: ['dashboard', 'ecommerce', 'admin'],
    preview_images: ['/api/placeholder/400/300'],
    difficulty_level: 'intermediate' as const,
    estimated_implementation_time: 8,
    rating_average: 4.8,
    rating_count: 24,
    download_count: 156,
    view_count: 1205,
    like_count: 89,
    plagiarism_status: 'clean' as const,
    is_featured: true,
    is_open_source: false,
    demo_url: 'https://demo.example.com',
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    seller: {
      id: 'seller1',
      full_name: 'Alex Thompson',
      username: 'alexdev',
      avatar_url: '/api/placeholder/32/32',
      is_verified: true,
      reputation_score: 4.9
    }
  },
  {
    id: '2',
    title: 'Node.js API Authentication System',
    slug: 'nodejs-api-auth',
    description: 'Secure authentication system with JWT tokens, role-based access control, and password reset functionality.',
    price: 89,
    pricing_model: 'one_time' as const,
    programming_languages: ['Node.js', 'Express', 'MongoDB'],
    tags: ['authentication', 'api', 'security'],
    preview_images: [],
    difficulty_level: 'advanced' as const,
    estimated_implementation_time: 12,
    rating_average: 4.7,
    rating_count: 18,
    download_count: 89,
    view_count: 567,
    like_count: 45,
    plagiarism_status: 'clean' as const,
    is_featured: false,
    is_open_source: true,
    repository_url: 'https://github.com/example/repo',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    seller: {
      id: 'seller2',
      full_name: 'Sarah Chen',
      username: 'sarahc',
      is_verified: true,
      reputation_score: 4.8
    }
  },
  {
    id: '3',
    title: 'Python Data Visualization Suite',
    slug: 'python-data-viz',
    description: 'Comprehensive data visualization library with interactive charts, graphs, and dashboard components.',
    price: 199,
    pricing_model: 'subscription' as const,
    programming_languages: ['Python', 'Plotly', 'Dash'],
    tags: ['data-science', 'visualization', 'charts'],
    preview_images: ['/api/placeholder/400/300'],
    difficulty_level: 'expert' as const,
    estimated_implementation_time: 20,
    rating_average: 4.9,
    rating_count: 31,
    download_count: 203,
    view_count: 1876,
    like_count: 127,
    plagiarism_status: 'clean' as const,
    is_featured: true,
    is_open_source: false,
    demo_url: 'https://demo-dataviz.example.com',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    seller: {
      id: 'seller3',
      full_name: 'Dr. Michael Rodriguez',
      username: 'datamike',
      avatar_url: '/api/placeholder/32/32',
      is_verified: true,
      reputation_score: 4.95
    }
  }
]

const features = [
  {
    icon: Shield,
    title: 'Plagiarism Detection',
    description: 'AI-powered analysis ensures all code is original and authentic'
  },
  {
    icon: Zap,
    title: 'Instant Download',
    description: 'Get your purchased code immediately with secure delivery'
  },
  {
    icon: CheckCircle,
    title: 'Quality Assured',
    description: 'Every piece of code is reviewed and tested before listing'
  },
  {
    icon: Users,
    title: 'Verified Sellers',
    description: 'All sellers go through our rigorous verification process'
  }
]

const stats = [
  { label: 'Active Developers', value: '10,000+' },
  { label: 'Code Listings', value: '50,000+' },
  { label: 'Total Downloads', value: '1M+' },
  { label: 'Avg Rating', value: '4.8/5' }
]

export default function HomePage() {
  const [filters, setFilters] = useState<FilterState>({
    query: '',
    categories: [],
    languages: [],
    priceRange: [0, 1000],
    pricingModel: [],
    difficulty: [],
    tags: [],
    minRating: 0,
    sortBy: 'created_at',
    sortOrder: 'desc',
    plagiarismStatus: ['clean']
  })

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters)
    // TODO: Implement actual filtering logic
    console.log('Filters updated:', newFilters)
  }

  const handleAddToCart = (listingId: string) => {
    console.log('Add to cart:', listingId)
  }

  const handleToggleFavorite = (listingId: string) => {
    console.log('Toggle favorite:', listingId)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-6xl mx-auto"
        >
          <div className="mb-8">
            <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
              <Sparkles className="w-4 h-4 mr-1" />
              Now with AI Plagiarism Detection
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-gradient-blue">
              Buy & Sell
              <br />
              <span className="text-gradient-purple">Original Code</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              The world's first marketplace for original code with built-in plagiarism detection. 
              Discover, purchase, and sell high-quality code with confidence.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <GlassButton size="lg" gradient="2" glow="blue" className="text-lg px-8 py-4">
              <Code2 className="w-5 h-5 mr-2" />
              Browse Code
            </GlassButton>
            <GlassButton size="lg" gradient="3" glow="purple" className="text-lg px-8 py-4">
              <TrendingUp className="w-5 h-5 mr-2" />
              Start Selling
            </GlassButton>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard className="text-center p-6">
                  <div className="text-2xl font-bold text-gradient-blue mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose CodeFlow?</h2>
            <p className="text-muted-foreground text-lg">
              Built for developers, by developers. Experience the future of code commerce.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard className="text-center p-6 h-full" floating>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketplace Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-gray-900/50 dark:to-purple-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Code Listings</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Discover high-quality, original code from verified developers
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Search & Filters Sidebar */}
            <div className="lg:col-span-1">
              <SearchFilters 
                onFiltersChange={handleFiltersChange}
                initialFilters={filters}
              />
            </div>

            {/* Listings Grid */}
            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sampleListings.map((listing, index) => (
                  <motion.div
                    key={listing.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <CodeCard
                      listing={listing}
                      onAddToCart={handleAddToCart}
                      onToggleFavorite={handleToggleFavorite}
                      isFavorited={false}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <GlassButton size="lg" gradient="1">
                  Load More Listings
                </GlassButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-12" morphBorder>
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of developers buying and selling original code on CodeFlow
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GlassButton size="lg" gradient="2" glow="blue" className="px-8">
                Browse Marketplace
              </GlassButton>
              <GlassButton size="lg" gradient="3" glow="purple" className="px-8">
                Start Selling Today
              </GlassButton>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  )
}
