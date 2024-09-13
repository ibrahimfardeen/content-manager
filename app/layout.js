import './globals.css'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Providers from './components/Providers';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Icon admin dashboard',
  description: 'View all event registrations',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body classNameName={inter.classNameName}>
        <Providers>
          {children}
        </Providers>
        
        <Analytics />
        <SpeedInsights />
        </body>
    </html>
  )
}
