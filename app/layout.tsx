import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ToastProvider } from '@/providers/toast-provider'
import {ThemeProvider} from "@/providers/theme-provider"
import { ModalProvider } from '@/providers/modal-provider'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
 
  return (
    <ClerkProvider>
      <html lang="en">
         <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem  >
          <ToastProvider />
          <ModalProvider>
            
            {children}
          </ModalProvider>
          </ThemeProvider>
         </body>
      </html>   
    </ClerkProvider>
  )
}
