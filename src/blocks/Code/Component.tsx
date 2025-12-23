'use client'

import React from 'react'
import { Highlight, themes } from 'prism-react-renderer'

import type { CodeBlock as CodeBlockProps } from '@/payload-types'

import { cn } from '@/utilities/cn'

type Props = CodeBlockProps & {
  className?: string
}

export const CodeBlockComponent: React.FC<Props> = ({ className, code, language }) => {
  return (
    <div className={cn('container', className)}>
      <Highlight code={code || ''} language={language || 'typescript'} theme={themes.vsDark}>
        {({ className: highlightClassName, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={cn(highlightClassName, 'p-4 rounded-lg overflow-x-auto')} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className="inline-block w-8 text-right mr-4 text-gray-500 select-none">
                  {i + 1}
                </span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}
