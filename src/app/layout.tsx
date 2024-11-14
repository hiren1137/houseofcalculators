// src/app/layout.tsx
import './globals.css'
import type { Metadata, Viewport } from 'next/types'  // Change this line

export const metadata: Metadata = {
  metadataBase: new URL('https://www.houseofcalculators.com'),
  icons: {
    icon: '/favicon.png',
  },
  robots: {
    index: true,
    follow: true,
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1f2937'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}