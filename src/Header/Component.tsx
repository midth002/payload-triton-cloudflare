import Link from 'next/link'
import React from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo'
import { CMSLink } from '@/components/Link'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <header className="container relative z-20 py-8">
      <div className="flex justify-between">
        <Link href="/">
          <Logo />
        </Link>
        <nav className="flex gap-3 items-center">
          {navItems.map(({ link }, i) => {
            return <CMSLink key={i} {...link} appearance="link" />
          })}
        </nav>
      </div>
    </header>
  )
}
