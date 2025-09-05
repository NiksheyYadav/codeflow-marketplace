'use client'

import { useState } from 'react'
import { GlassCard, GlassButton } from '@/components/ui/glass'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { 
  Search, 
  Filter, 
  X, 
  ChevronDown, 
  ChevronUp,
  SlidersHorizontal,
  Star
} from 'lucide-react'

interface SearchFiltersProps {
  onFiltersChange?: (filters: FilterState) => void
  initialFilters?: Partial<FilterState>
}

export interface FilterState {
  query: string
  categories: string[]
  languages: string[]
  priceRange: [number, number]
  pricingModel: string[]
  difficulty: string[]
  tags: string[]
  minRating: number
  sortBy: string
  sortOrder: 'asc' | 'desc'
  plagiarismStatus: string[]
  isOpenSource?: boolean
  isVerifiedSeller?: boolean
  hasDemoUrl?: boolean
}

const programmingLanguages = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'C++', 'Go', 'Rust',
  'PHP', 'Ruby', 'Swift', 'Kotlin', 'Dart', 'Scala', 'HTML', 'CSS', 'SQL'
]

const categories = [
  'Web Development', 'Mobile Development', 'Desktop Applications', 
  'Games & Entertainment', 'Data Science & AI', 'DevOps & Tools',
  'Blockchain & Crypto', 'APIs & Integrations', 'Educational & Learning',
  'Open Source'
]

const difficultyLevels = ['beginner', 'intermediate', 'advanced', 'expert']
const pricingModels = ['one_time', 'subscription', 'royalty']
const plagiarismStatuses = ['clean', 'pending', 'flagged']

const sortOptions = [
  { value: 'created_at', label: 'Latest' },
  { value: 'price', label: 'Price' },
  { value: 'rating_average', label: 'Rating' },
  { value: 'download_count', label: 'Downloads' },
  { value: 'view_count', label: 'Views' },
  { value: 'title', label: 'Name' }
]

export function SearchFilters({ onFiltersChange, initialFilters }: SearchFiltersProps) {
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
    plagiarismStatus: ['clean'],
    isOpenSource: undefined,
    isVerifiedSeller: undefined,
    hasDemoUrl: undefined,
    ...initialFilters
  })

  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTag, setActiveTag] = useState('')
  const [customTags, setCustomTags] = useState<string[]>([])

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters }
    setFilters(updated)
    onFiltersChange?.(updated)
  }

  const toggleArrayFilter = (key: keyof FilterState, value: string) => {
    const currentArray = filters[key] as string[]
    const updated = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value]
    updateFilters({ [key]: updated })
  }

  const addCustomTag = () => {
    if (activeTag && !customTags.includes(activeTag) && !filters.tags.includes(activeTag)) {
      const newTags = [...customTags, activeTag]
      setCustomTags(newTags)
      updateFilters({ tags: [...filters.tags, activeTag] })
      setActiveTag('')
    }
  }

  const removeTag = (tag: string) => {
    updateFilters({ tags: filters.tags.filter(t => t !== tag) })
    setCustomTags(customTags.filter(t => t !== tag))
  }

  const clearAllFilters = () => {
    const clearedFilters: FilterState = {
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
      plagiarismStatus: ['clean'],
      isOpenSource: undefined,
      isVerifiedSeller: undefined,
      hasDemoUrl: undefined
    }
    setFilters(clearedFilters)
    setCustomTags([])
    onFiltersChange?.(clearedFilters)
  }

  const activeFiltersCount = [
    ...filters.categories,
    ...filters.languages,
    ...filters.difficulty,
    ...filters.pricingModel,
    ...filters.tags,
    ...(filters.isOpenSource !== undefined ? [1] : []),
    ...(filters.isVerifiedSeller !== undefined ? [1] : []),
    ...(filters.hasDemoUrl !== undefined ? [1] : []),
    ...(filters.minRating > 0 ? [1] : []),
    ...(filters.priceRange[0] > 0 || filters.priceRange[1] < 1000 ? [1] : [])
  ].length

  return (
    <GlassCard className="p-4 space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search for code, components, templates..."
          value={filters.query}
          onChange={(e) => updateFilters({ query: e.target.value })}
          className="glass-input pl-10 pr-4"
        />
      </div>

      {/* Sort and Filter Toggle */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-1">
          <Select value={filters.sortBy} onValueChange={(value) => updateFilters({ sortBy: value })}>
            <SelectTrigger className="glass-input w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass-card border-white/10">
              {sortOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateFilters({ sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' })}
            className="glass-button"
          >
            {filters.sortOrder === 'asc' ? '↑' : '↓'}
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="glass">
              {activeFiltersCount} active
            </Badge>
          )}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="glass-button"
          >
            <Filter className="w-4 h-4 mr-1" />
            Filters
            {isExpanded ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
          </Button>
        </div>
      </div>

      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleContent className="space-y-4">
          {/* Price Range */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Price Range</Label>
              <span className="text-xs text-muted-foreground">
                ${filters.priceRange[0]} - ${filters.priceRange[1]}
              </span>
            </div>
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
              max={1000}
              min={0}
              step={10}
              className="glass"
            />
          </div>

          {/* Rating Filter */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Minimum Rating</Label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Button
                  key={rating}
                  variant="ghost"
                  size="sm"
                  onClick={() => updateFilters({ minRating: rating === filters.minRating ? 0 : rating })}
                  className={`glass-button ${filters.minRating >= rating ? 'bg-yellow-500/20' : ''}`}
                >
                  <Star className={`w-4 h-4 ${filters.minRating >= rating ? 'fill-current text-yellow-500' : ''}`} />
                </Button>
              ))}
              {filters.minRating > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => updateFilters({ minRating: 0 })}
                  className="glass-button"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Categories</Label>
            <div className="grid grid-cols-2 gap-1">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={() => toggleArrayFilter('categories', category)}
                    className="glass"
                  />
                  <Label htmlFor={`category-${category}`} className="text-xs cursor-pointer">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Programming Languages */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Programming Languages</Label>
            <div className="flex flex-wrap gap-1">
              {programmingLanguages.map((lang) => (
                <Button
                  key={lang}
                  variant={filters.languages.includes(lang) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleArrayFilter('languages', lang)}
                  className={`glass-button text-xs ${filters.languages.includes(lang) ? 'bg-blue-500/20' : ''}`}
                >
                  {lang}
                </Button>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Difficulty</Label>
            <div className="flex gap-1">
              {difficultyLevels.map((level) => (
                <Button
                  key={level}
                  variant={filters.difficulty.includes(level) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleArrayFilter('difficulty', level)}
                  className={`glass-button text-xs capitalize ${filters.difficulty.includes(level) ? 'bg-green-500/20' : ''}`}
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>

          {/* Pricing Model */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Pricing Model</Label>
            <div className="flex gap-1">
              {pricingModels.map((model) => (
                <Button
                  key={model}
                  variant={filters.pricingModel.includes(model) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleArrayFilter('pricingModel', model)}
                  className={`glass-button text-xs ${filters.pricingModel.includes(model) ? 'bg-purple-500/20' : ''}`}
                >
                  {model.replace('_', ' ')}
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Tags */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Tags</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add tag..."
                value={activeTag}
                onChange={(e) => setActiveTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCustomTag()}
                className="glass-input flex-1"
              />
              <GlassButton size="sm" onClick={addCustomTag}>
                Add
              </GlassButton>
            </div>
            {filters.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {filters.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="glass cursor-pointer"
                    onClick={() => removeTag(tag)}
                  >
                    {tag}
                    <X className="w-3 h-3 ml-1" />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Additional Filters */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Additional Filters</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="open-source"
                  checked={filters.isOpenSource === true}
                  onCheckedChange={(checked) => 
                    updateFilters({ isOpenSource: checked ? true : undefined })
                  }
                  className="glass"
                />
                <Label htmlFor="open-source" className="text-xs cursor-pointer">
                  Open Source Only
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="verified-seller"
                  checked={filters.isVerifiedSeller === true}
                  onCheckedChange={(checked) => 
                    updateFilters({ isVerifiedSeller: checked ? true : undefined })
                  }
                  className="glass"
                />
                <Label htmlFor="verified-seller" className="text-xs cursor-pointer">
                  Verified Sellers Only
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="has-demo"
                  checked={filters.hasDemoUrl === true}
                  onCheckedChange={(checked) => 
                    updateFilters({ hasDemoUrl: checked ? true : undefined })
                  }
                  className="glass"
                />
                <Label htmlFor="has-demo" className="text-xs cursor-pointer">
                  Has Demo URL
                </Label>
              </div>
            </div>
          </div>

          {/* Clear Filters */}
          {activeFiltersCount > 0 && (
            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllFilters}
                className="glass-button w-full"
              >
                <X className="w-4 h-4 mr-1" />
                Clear All Filters
              </Button>
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </GlassCard>
  )
}
