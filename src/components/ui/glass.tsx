import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

// Base Glass Container
export interface GlassProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'light' | 'dark' | 'card' | 'nav' | 'sidebar' | 'modal' | 'button' | 'input'
  gradient?: 'none' | '1' | '2' | '3'
  glow?: 'none' | 'blue' | 'purple' | 'pink'
  floating?: boolean
  morphBorder?: boolean
}

const Glass = forwardRef<HTMLDivElement, GlassProps>(
  ({ className, variant = 'default', gradient = 'none', glow = 'none', floating = false, morphBorder = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base glass styles
          variant === 'default' && 'glass',
          variant === 'light' && 'glass-light',
          variant === 'dark' && 'glass-dark',
          variant === 'card' && 'glass-card',
          variant === 'nav' && 'glass-nav',
          variant === 'sidebar' && 'glass-sidebar',
          variant === 'modal' && 'glass-modal',
          variant === 'button' && 'glass-button',
          variant === 'input' && 'glass-input',
          // Gradient variants
          gradient === '1' && 'glass-gradient-1',
          gradient === '2' && 'glass-gradient-2',
          gradient === '3' && 'glass-gradient-3',
          // Glow effects
          glow === 'blue' && 'glow-blue',
          glow === 'purple' && 'glow-purple',
          glow === 'pink' && 'glow-pink',
          // Floating animation
          floating && 'float',
          // Morphing border
          morphBorder && 'morph-border',
          // Base styles
          'rounded-2xl transition-all duration-300 gpu-accelerated',
          className
        )}
        {...props}
      />
    )
  }
)
Glass.displayName = 'Glass'

// Glass Card Component
export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradient?: 'none' | '1' | '2' | '3'
  glow?: 'none' | 'blue' | 'purple' | 'pink'
  floating?: boolean
  morphBorder?: boolean
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, gradient = 'none', glow = 'none', floating = false, morphBorder = false, ...props }, ref) => {
    return (
      <Glass
        ref={ref}
        variant="card"
        gradient={gradient}
        glow={glow}
        floating={floating}
        morphBorder={morphBorder}
        className={cn('p-6', className)}
        {...props}
      />
    )
  }
)
GlassCard.displayName = 'GlassCard'

// Glass Button Component
export interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  gradient?: 'none' | '1' | '2' | '3'
  glow?: 'none' | 'blue' | 'purple' | 'pink'
  size?: 'sm' | 'md' | 'lg'
}

const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, gradient = 'none', glow = 'none', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'glass-button inline-flex items-center justify-center rounded-2xl font-medium transition-all duration-300 gpu-accelerated',
          // Gradient variants
          gradient === '1' && 'glass-gradient-1',
          gradient === '2' && 'glass-gradient-2',
          gradient === '3' && 'glass-gradient-3',
          // Glow effects
          glow === 'blue' && 'glow-blue',
          glow === 'purple' && 'glow-purple',
          glow === 'pink' && 'glow-pink',
          // Sizes
          size === 'sm' && 'px-3 py-1.5 text-sm',
          size === 'md' && 'px-4 py-2 text-base',
          size === 'lg' && 'px-6 py-3 text-lg',
          // Hover and focus states
          'hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-2 focus:ring-offset-transparent',
          'active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
GlassButton.displayName = 'GlassButton'

// Glass Input Component
export interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  gradient?: 'none' | '1' | '2' | '3'
}

const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  ({ className, gradient = 'none', type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'glass-input flex h-10 w-full rounded-2xl px-3 py-2 text-sm transition-all duration-300 gpu-accelerated',
          // Gradient variants
          gradient === '1' && 'glass-gradient-1',
          gradient === '2' && 'glass-gradient-2',
          gradient === '3' && 'glass-gradient-3',
          // Focus states
          'placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
GlassInput.displayName = 'GlassInput'

// Glass Navigation Component
export interface GlassNavProps extends React.HTMLAttributes<HTMLDivElement> {
  fixed?: boolean
}

const GlassNav = forwardRef<HTMLDivElement, GlassNavProps>(
  ({ className, fixed = false, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn(
          'glass-nav transition-all duration-300 gpu-accelerated',
          fixed && 'fixed top-0 left-0 right-0 z-50',
          'px-4 py-3',
          className
        )}
        {...props}
      />
    )
  }
)
GlassNav.displayName = 'GlassNav'

// Glass Modal Component
export interface GlassModalProps extends React.HTMLAttributes<HTMLDivElement> {
  overlay?: boolean
}

const GlassModal = forwardRef<HTMLDivElement, GlassModalProps>(
  ({ className, overlay = true, children, ...props }, ref) => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {overlay && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
        )}
        <div
          ref={ref}
          className={cn(
            'glass-modal relative max-w-lg w-full mx-4 transition-all duration-300 gpu-accelerated',
            'transform scale-100 opacity-100',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </div>
    )
  }
)
GlassModal.displayName = 'GlassModal'

export { Glass, GlassCard, GlassButton, GlassInput, GlassNav, GlassModal }
