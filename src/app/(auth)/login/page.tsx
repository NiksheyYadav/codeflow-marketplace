import { LoginForm } from '@/components/auth/LoginForm'

export default function LoginPage() {
  return (
    <div className="fixed inset-0 z-50">
      <LoginForm />
    </div>
  )
}

export const metadata = {
  title: 'Sign In | CodeFlow Marketplace',
  description: 'Sign in to your CodeFlow account with email, phone, or social login',
}
