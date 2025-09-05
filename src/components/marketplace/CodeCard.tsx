'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { GlassCard, GlassButton } from '@/components/ui/glass'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { 
  Heart, 
  Star, 
  Download, 
  Eye, 
  ShoppingCart,
  Clock,
  Shield,
  Code,
  ExternalLink,
  Github
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

interface CodeCardProps {
  listing: {
    id: string
    title: string
    slug: string
    description: string
    short_description?: string
    price: number
    pricing_model: 'one_time' | 'subscription' | 'royalty'
    programming_languages: string[]
    tags: string[]
    preview_images: string[]
    difficulty_level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
    estimated_implementation_time?: number
    rating_average: number
    rating_count: number
    download_count: number
    view_count: number
    like_count: number
    plagiarism_status: 'pending' | 'clean' | 'flagged' | 'blocked'
    is_featured: boolean
    is_open_source: boolean
    demo_url?: string
    repository_url?: string
    created_at: string
    seller: {
      id: string
      full_name?: string
      username?: string
      avatar_url?: string
      is_verified: boolean
      reputation_score: number
    }
  }
  onAddToCart?: (listingId: string) => void
  onToggleFavorite?: (listingId: string) => void
  isFavorited?: boolean
}

const difficultyColors = {
  beginner: 'bg-green-500',
  intermediate: 'bg-yellow-500',
  advanced: 'bg-orange-500',
  expert: 'bg-red-500'
}

const pricingLabels = {
  one_time: 'One-time',
  subscription: 'Subscription',
  royalty: 'Royalty'
}

export function CodeCard({ listing, onAddToCart, onToggleFavorite, isFavorited = false }: CodeCardProps) {
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onAddToCart) {
      onAddToCart(listing.id)
      toast.success('Added to cart!')
    }
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onToggleFavorite) {
      onToggleFavorite(listing.id)
      toast.success(isFavorited ? 'Removed from favorites' : 'Added to favorites')
    }
  }

  const plagiarismStatusColor = {
    pending: 'bg-yellow-500',
    clean: 'bg-green-500',
    flagged: 'bg-red-500',
    blocked: 'bg-red-600'
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/code/${listing.slug}`}>
        <GlassCard 
          className="group relative overflow-hidden cursor-pointer h-full flex flex-col"
          floating={isHovered}
          glow={isHovered ? 'blue' : 'none'}
        >
          {/* Featured Badge */}
          {listing.is_featured && (
            <div className="absolute top-3 left-3 z-10">
              <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900 border-0">
                ⭐ Featured
              </Badge>
            </div>
          )}

          {/* Plagiarism Status */}
          <div className="absolute top-3 right-3 z-10">
            <div className={`w-3 h-3 rounded-full ${plagiarismStatusColor[listing.plagiarism_status]}`} 
                 title={`Plagiarism check: ${listing.plagiarism_status}`} />
          </div>

          {/* Preview Image */}
          <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden rounded-t-2xl">
            {listing.preview_images.length > 0 && !imageError ? (
              <Image
                src={listing.preview_images[0]}
                alt={listing.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Code className="w-12 h-12 text-muted-foreground" />
              </div>
            )}
            
            {/* Overlay with actions on hover */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
              {listing.demo_url && (
                <Button size="sm" variant="secondary" asChild onClick={(e) => e.stopPropagation()}>
                  <a href={listing.demo_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Demo
                  </a>
                </Button>
              )}
              {listing.repository_url && listing.is_open_source && (
                <Button size="sm" variant="secondary" asChild onClick={(e) => e.stopPropagation()}>
                  <a href={listing.repository_url} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-1" />
                    Repo
                  </a>
                </Button>
              )}
            </div>
          </div>

          <div className="flex-1 p-4 flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-blue-400 transition-colors">
                  {listing.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                  {listing.short_description || listing.description}
                </p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className={`ml-2 ${isFavorited ? 'text-red-500' : 'text-muted-foreground'}`}
                onClick={handleToggleFavorite}
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
              </Button>
            </div>

            {/* Programming Languages */}
            <div className="flex flex-wrap gap-1 mb-3">
              {listing.programming_languages.slice(0, 3).map((lang, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {lang}
                </Badge>
              ))}
              {listing.programming_languages.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{listing.programming_languages.length - 3}
                </Badge>
              )}
            </div>

            {/* Difficulty and Time */}
            <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${difficultyColors[listing.difficulty_level]}`} />
                <span className="capitalize">{listing.difficulty_level}</span>
              </div>
              {listing.estimated_implementation_time && (
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{listing.estimated_implementation_time}h</span>
                </div>
              )}
              {listing.is_open_source && (
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  <span>Open Source</span>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current text-yellow-500" />
                  <span>{listing.rating_average.toFixed(1)}</span>
                  <span>({listing.rating_count})</span>
                </div>
                <div className="flex items-center gap-1">
                  <Download className="w-3 h-3" />
                  <span>{listing.download_count}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span>{listing.view_count}</span>
                </div>
              </div>
            </div>

            {/* Seller Info */}
            <div className="flex items-center gap-2 mb-4">
              <Avatar className="w-6 h-6">
                <AvatarImage src={listing.seller.avatar_url || undefined} />
                <AvatarFallback className="text-xs">
                  {listing.seller.full_name?.charAt(0) || listing.seller.username?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium truncate">
                    {listing.seller.full_name || listing.seller.username}
                  </span>
                  {listing.seller.is_verified && (
                    <Shield className="w-3 h-3 text-blue-500 fill-current" />
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  {listing.seller.reputation_score} reputation
                </div>
              </div>
            </div>

            {/* Price and Actions */}
            <div className="flex items-center justify-between mt-auto">
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-xl font-bold">
                    ${listing.price}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {pricingLabels[listing.pricing_model]}
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(listing.created_at), { addSuffix: true })}
                </span>
              </div>
              <GlassButton
                size="sm"
                gradient="2"
                glow="blue"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-4 h-4 mr-1" />
                Add to Cart
              </GlassButton>
            </div>
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  )
}
