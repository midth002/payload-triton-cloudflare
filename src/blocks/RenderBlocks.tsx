import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlockComponent } from './ArchiveBlock/Component'
import { BannerBlockComponent } from './Banner/Component'
import { CallToActionBlockComponent } from './CallToAction/Component'
import { CodeBlockComponent } from './Code/Component'
import { ContentBlockComponent } from './Content/Component'
import { MediaBlockComponent } from './MediaBlock/Component'

const blockComponents = {
  archive: ArchiveBlockComponent,
  banner: BannerBlockComponent,
  cta: CallToActionBlockComponent,
  code: CodeBlockComponent,
  content: ContentBlockComponent,
  mediaBlock: MediaBlockComponent,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType as keyof typeof blockComponents]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error */}
                  <Block {...block} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
