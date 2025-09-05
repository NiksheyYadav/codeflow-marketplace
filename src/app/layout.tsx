import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/components/auth/AuthProvider'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { Toaster } from '@/components/ui/sonner'
import { Header } from '@/components/marketplace/Header'
import { DevWarning } from '@/components/dev/DevWarning'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodeFlow Marketplace - Buy & Sell Original Code",
  description: "A modern marketplace for buying and selling original code with built-in plagiarism detection and AI-powered analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
              <Header />
              <DevWarning />
              <main className="pt-16">
                {children}
              </main>
            </div>
            <Toaster 
              position="top-right"
              toastOptions={{
                className: 'glass-card border-white/10',
              }}
            />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
