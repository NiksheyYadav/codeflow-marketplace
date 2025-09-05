'use client'

import { AlertTriangle, ExternalLink, Settings } from 'lucide-react'
import { GlassCard } from '@/components/ui/glass'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

export function DevWarning() {
  const isSupabaseConfigured = 
    process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_supabase_project_url' &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'your_supabase_anon_key'

  if (isSupabaseConfigured) return null

  return (
    <div className="fixed top-20 left-4 right-4 z-40 max-w-2xl mx-auto">
      <GlassCard className="p-6 border-orange-500/20 bg-orange-50/90 dark:bg-orange-900/20">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">
              Development Mode - Supabase Not Configured
            </h3>
            <p className="text-sm text-orange-700 dark:text-orange-300 mb-4">
              The application is running in demo mode. To fully experience CodeFlow Marketplace, 
              you need to set up Supabase. Authentication, database, and real-time features won't work without it.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button size="sm" variant="outline" asChild>
                <a 
                  href="https://supabase.com/dashboard" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <Settings className="w-4 h-4" />
                  Set up Supabase
                  <ExternalLink className="w-3 h-3" />
                </a>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <a 
                  href="/README.md" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  Setup Instructions
                  <ExternalLink className="w-3 h-3" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
