'use client'

import { useState } from 'react'
import { GlassCard, GlassButton } from '@/components/ui/glass'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  CheckCircle, 
  Database, 
  Settings, 
  ExternalLink, 
  Copy,
  AlertCircle,
  Loader2
} from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

const databaseSchema = `-- Enable RLS (Row Level Security)
-- Create custom types
CREATE TYPE user_role AS ENUM ('buyer', 'seller', 'admin');
CREATE TYPE pricing_model AS ENUM ('one_time', 'subscription', 'royalty');
CREATE TYPE difficulty_level AS ENUM ('beginner', 'intermediate', 'advanced', 'expert');
CREATE TYPE plagiarism_status AS ENUM ('pending', 'clean', 'flagged', 'blocked');
CREATE TYPE transaction_status AS ENUM ('pending', 'processing', 'completed', 'failed', 'cancelled', 'refunded');
CREATE TYPE escrow_status AS ENUM ('held', 'released', 'disputed');
CREATE TYPE report_status AS ENUM ('pending', 'reviewed', 'confirmed', 'false_positive');

-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    username TEXT UNIQUE,
    avatar_url TEXT,
    bio TEXT,
    location TEXT,
    website TEXT,
    github_username TEXT,
    twitter_username TEXT,
    role user_role DEFAULT 'buyer',
    is_verified BOOLEAN DEFAULT FALSE,
    reputation_score INTEGER DEFAULT 0,
    total_sales INTEGER DEFAULT 0,
    total_purchases INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);`

const setupSteps = [
  {
    id: 'access',
    title: 'Access Supabase Dashboard',
    description: 'Open your Supabase project dashboard',
    action: 'Open Dashboard',
    url: 'https://supabase.com/dashboard',
    status: 'pending'
  },
  {
    id: 'navigate',
    title: 'Navigate to SQL Editor',
    description: 'Find the SQL Editor in the left sidebar',
    action: 'Go to SQL Editor',
    status: 'pending'
  },
  {
    id: 'execute',
    title: 'Execute Database Schema',
    description: 'Copy and paste the schema, then click Run',
    action: 'Copy Schema',
    status: 'pending'
  },
  {
    id: 'verify',
    title: 'Verify Installation',
    description: 'Check that all 8 tables were created successfully',
    action: 'Check Tables',
    status: 'pending'
  }
]

export default function SetupPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [showSchema, setShowSchema] = useState(false)

  const copySchema = async () => {
    try {
      await navigator.clipboard.writeText(databaseSchema)
      toast.success('Database schema copied to clipboard!')
      markStepComplete('execute')
    } catch (err) {
      toast.error('Failed to copy schema')
    }
  }

  const markStepComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId])
    }
  }

  const isStepComplete = (stepId: string) => completedSteps.includes(stepId)

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Database className="w-12 h-12 text-blue-500 mr-3" />
            <h1 className="text-4xl font-bold text-gradient-blue">
              Database Setup
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Set up your CodeFlow Marketplace database to enable full functionality including 
            user authentication, listings, transactions, and more.
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium">Setup Progress</span>
            <span className="text-sm text-muted-foreground">
              {completedSteps.length}/{setupSteps.length} completed
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(completedSteps.length / setupSteps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Setup Steps */}
        <div className="grid gap-6 mb-8">
          {setupSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard className={`p-6 ${isStepComplete(step.id) ? 'border-green-500/20 bg-green-50/10' : ''}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isStepComplete(step.id) 
                        ? 'bg-green-500 text-white' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {isStepComplete(step.id) ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <span className="font-semibold">{index + 1}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {step.url && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="glass-button"
                        onClick={() => markStepComplete(step.id)}
                      >
                        <a href={step.url} target="_blank" rel="noopener noreferrer">
                          {step.action}
                          <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                      </Button>
                    )}
                    {step.id === 'execute' && (
                      <GlassButton
                        size="sm"
                        gradient="2"
                        onClick={copySchema}
                      >
                        <Copy className="w-4 h-4 mr-1" />
                        {step.action}
                      </GlassButton>
                    )}
                    {step.id !== 'execute' && !step.url && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => markStepComplete(step.id)}
                        className="glass-button"
                      >
                        Mark Complete
                        <CheckCircle className="w-4 h-4 ml-1" />
                      </Button>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Database Schema Preview */}
        <GlassCard className="p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold flex items-center">
              <Database className="w-5 h-5 mr-2" />
              Database Schema
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSchema(!showSchema)}
              className="glass-button"
            >
              {showSchema ? 'Hide' : 'Show'} Schema
            </Button>
          </div>
          
          {showSchema && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-muted rounded-lg p-4 overflow-auto">
                <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {databaseSchema}
                </pre>
              </div>
              <div className="mt-4 flex justify-end">
                <GlassButton size="sm" gradient="2" onClick={copySchema}>
                  <Copy className="w-4 h-4 mr-1" />
                  Copy Full Schema
                </GlassButton>
              </div>
            </motion.div>
          )}
        </GlassCard>

        {/* Next Steps */}
        {completedSteps.length === setupSteps.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard className="p-8 text-center border-green-500/20 bg-green-50/10">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">
                Setup Complete!
              </h2>
              <p className="text-muted-foreground mb-6">
                Your CodeFlow Marketplace database is now ready. You can start using all the features!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <GlassButton size="lg" gradient="2" asChild>
                  <a href="/">
                    Go to Marketplace
                  </a>
                </GlassButton>
                <Button variant="outline" size="lg" asChild className="glass-button">
                  <a href="/auth/login">
                    Create Account
                  </a>
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Help Section */}
        <GlassCard className="p-6 mt-8">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                If you encounter any issues during setup, check out these resources:
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">
                  <a href="https://supabase.com/docs" target="_blank" rel="noopener noreferrer">
                    Supabase Docs
                  </a>
                </Badge>
                <Badge variant="outline">
                  <a href="/docs/SETUP_DATABASE.md" target="_blank" rel="noopener noreferrer">
                    Detailed Instructions
                  </a>
                </Badge>
                <Badge variant="outline">
                  <a href="https://github.com/supabase/supabase/discussions" target="_blank" rel="noopener noreferrer">
                    Community Support
                  </a>
                </Badge>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
