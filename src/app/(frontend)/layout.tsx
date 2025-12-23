import React from 'react'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

import { cn } from '@/utilities/cn'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/generateMeta'

import { HeaderClient } from '@/Header/Component'
import { FooterClient } from '@/Footer/Component'
import { HeaderThemeProvider } from '@/providers/HeaderTheme'

import type { Metadata } from 'next'

import './globals.css'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const header = await getCachedGlobal('header', 1)()
  const footer = await getCachedGlobal('footer', 1)()

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className="flex flex-col min-h-screen">
        <HeaderThemeProvider>
          <HeaderClient data={header} />
          <main className="flex-grow">{children}</main>
          <FooterClient data={footer} />
        </HeaderThemeProvider>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  title: {
    default: 'Payload Website Template',
    template: '%s | Payload Website Template',
  },
  description: 'An open-source website built with Payload and Next.js.',
}
