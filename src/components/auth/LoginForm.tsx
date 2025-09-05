'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Icons } from '@/components/ui/icons'
import { GlassCard, GlassButton, GlassInput } from '@/components/ui/glass'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Github, Mail, Phone, Eye, EyeOff, ArrowRight, Sparkles, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

type AuthMode = 'signin' | 'signup'
type AuthMethod = 'email' | 'phone' | 'social'

export function LoginForm() {
  const [loading, setLoading] = useState(false)
  const [authMode, setAuthMode] = useState<AuthMode>('signin')
  const [authMethod, setAuthMethod] = useState<AuthMethod>('email')
  const [showPassword, setShowPassword] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [verifying, setVerifying] = useState(false)
  
  // Form fields
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [otp, setOtp] = useState('')
  
  const supabase = createClient()

  const handleEmailAuth = async () => {
    if (!email || (authMethod === 'email' && !password) || (authMode === 'signup' && !fullName)) {
      toast.error('Please fill in all required fields')
      return
    }

    setLoading(true)
    
    try {
      if (authMode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        
        if (error) throw error
        toast.success('Signed in successfully!')
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        })
        
        if (error) throw error
        toast.success('Check your email for verification link!')
      }
    } catch (error) {
      console.error('Auth error:', error)
      toast.error(error instanceof Error ? error.message : 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  const handlePhoneAuth = async () => {
    if (!phone) {
      toast.error('Please enter your phone number')
      return
    }

    setLoading(true)
    
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone,
        options: {
          data: authMode === 'signup' && fullName ? {
            full_name: fullName,
          } : undefined,
        },
      })
      
      if (error) throw error
      setOtpSent(true)
      toast.success('OTP sent to your phone!')
    } catch (error) {
      console.error('Phone auth error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to send OTP')
    } finally {
      setLoading(false)
    }
  }

  const handleOtpVerification = async () => {
    if (!otp) {
      toast.error('Please enter the OTP')
      return
    }

    setVerifying(true)
    
    try {
      const { error } = await supabase.auth.verifyOtp({
        phone,
        token: otp,
        type: 'sms',
      })
      
      if (error) throw error
      toast.success('Phone verified successfully!')
    } catch (error) {
      console.error('OTP verification error:', error)
      toast.error(error instanceof Error ? error.message : 'Invalid OTP')
    } finally {
      setVerifying(false)
    }
  }

  const handleOAuthSignIn = async (provider: 'google' | 'github' | 'discord') => {
    setLoading(true)
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      
      if (error) throw error
    } catch (error) {
      console.error('OAuth error:', error)
      toast.error(error instanceof Error ? error.message : 'OAuth authentication failed')
    } finally {
      setLoading(false)
    }
  }

  const handleMagicLink = async () => {
    if (!email) {
      toast.error('Please enter your email address')
      return
    }

    setLoading(true)
    
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      
      if (error) throw error
      toast.success('Check your email for the magic link!')
    } catch (error) {
      console.error('Magic link error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to send magic link')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20" />
      <div className="absolute inset-0 backdrop-blur-3xl" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <GlassCard className="p-8 border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="flex items-center justify-center mb-4"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">CF</span>
              </div>
              <h1 className="text-3xl font-bold text-gradient-blue">
                CodeFlow
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                <Sparkles className="w-3 h-3 mr-1" />
                Secure Authentication
              </Badge>
              <h2 className="text-2xl font-semibold mb-2">
                {authMode === 'signin' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-muted-foreground">
                {authMode === 'signin' 
                  ? 'Sign in to access the marketplace' 
                  : 'Join thousands of developers'
                }
              </p>
            </motion.div>
          </div>
          
          {/* Auth Mode Toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex rounded-xl bg-muted/50 p-1 mb-6"
          >
            <button
              onClick={() => { setAuthMode('signin'); setOtpSent(false); }}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                authMode === 'signin' 
                  ? 'bg-white dark:bg-gray-800 shadow-sm text-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setAuthMode('signup'); setOtpSent(false); }}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                authMode === 'signup' 
                  ? 'bg-white dark:bg-gray-800 shadow-sm text-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Sign Up
            </button>
          </motion.div>

          {/* Auth Method Toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex space-x-2 mb-6"
          >
            <Button
              variant={authMethod === 'email' ? 'default' : 'outline'}
              size="sm"
              onClick={() => { setAuthMethod('email'); setOtpSent(false); }}
              className="flex-1 glass-button"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email
            </Button>
            <Button
              variant={authMethod === 'phone' ? 'default' : 'outline'}
              size="sm"
              onClick={() => { setAuthMethod('phone'); setOtpSent(false); }}
              className="flex-1 glass-button"
            >
              <Phone className="w-4 h-4 mr-2" />
              Phone
            </Button>
          </motion.div>

          {/* Form Fields */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="space-y-4 mb-6"
          >
            {/* Full Name - Only for signup */}
            {authMode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <GlassInput
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={loading || verifying}
                />
              </div>
            )}

            {/* Email or Phone based on method */}
            {authMethod === 'email' ? (
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <GlassInput
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading || verifying}
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <GlassInput
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={loading || verifying || otpSent}
                />
              </div>
            )}

            {/* Password - Only for email signin/signup */}
            {authMethod === 'email' && (
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <GlassInput
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={authMode === 'signin' ? 'Enter your password' : 'Create a strong password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading || verifying}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* OTP Input - Only when OTP is sent */}
            {authMethod === 'phone' && otpSent && (
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <GlassInput
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  disabled={verifying}
                  maxLength={6}
                />
              </div>
            )}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="space-y-4 mb-6"
          >
            {authMethod === 'phone' && otpSent ? (
              // OTP Verification
              <div className="space-y-3">
                <GlassButton
                  size="lg"
                  gradient="2"
                  glow="blue"
                  onClick={handleOtpVerification}
                  disabled={verifying || !otp}
                  className="w-full"
                >
                  {verifying ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Verify OTP
                    </>
                  )}
                </GlassButton>
                <Button
                  variant="ghost"
                  onClick={() => { setOtpSent(false); setOtp(''); }}
                  className="w-full glass-button"
                  disabled={verifying}
                >
                  Back to Phone Entry
                </Button>
              </div>
            ) : (
              // Primary Auth Button
              <GlassButton
                size="lg"
                gradient="2"
                glow="blue"
                onClick={authMethod === 'email' ? handleEmailAuth : handlePhoneAuth}
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {authMethod === 'phone' ? 'Sending OTP...' : 'Processing...'}
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-4 h-4 mr-2" />
                    {authMode === 'signin' 
                      ? `Sign In with ${authMethod === 'email' ? 'Email' : 'Phone'}` 
                      : `Create Account with ${authMethod === 'email' ? 'Email' : 'Phone'}`
                    }
                  </>
                )}
              </GlassButton>
            )}

            {/* Magic Link for Email */}
            {authMethod === 'email' && !otpSent && (
              <Button
                variant="outline"
                onClick={handleMagicLink}
                disabled={loading || !email}
                className="w-full glass-button"
              >
                <Mail className="w-4 h-4 mr-2" />
                Send Magic Link
              </Button>
            )}
          </motion.div>

          {/* OAuth Providers */}
          {!otpSent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-muted" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                <Button
                  variant="outline"
                  onClick={() => handleOAuthSignIn('google')}
                  disabled={loading}
                  className="glass-button"
                >
                  <Icons.google className="mr-2 h-4 w-4" />
                  Google
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleOAuthSignIn('github')}
                  disabled={loading}
                  className="glass-button"
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
              </div>
              
              <Button
                variant="outline"
                onClick={() => handleOAuthSignIn('discord')}
                disabled={loading}
                className="w-full glass-button"
              >
                <Icons.discord className="mr-2 h-4 w-4" />
                Discord
              </Button>
            </motion.div>
          )}

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-center text-xs text-muted-foreground"
          >
            By continuing, you agree to our{' '}
            <a href="/terms" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </a>
          </motion.div>
        </GlassCard>
      </motion.div>
    </div>
  )
}
