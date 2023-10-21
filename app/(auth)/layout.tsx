import '../globals.css'
import './index.css'

import { Inter,Roboto  } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] ,display: 'swap',
variable: '--font-inter'})

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="flex justify-center items-center bg-login-regis sans">
    
          {children}
      </body>
    </html>
  )
}
