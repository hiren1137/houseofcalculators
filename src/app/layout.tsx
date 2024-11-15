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
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-03LW4S96P8"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-03LW4S96P8');
            `
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}