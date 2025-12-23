import React, { Fragment, JSX } from 'react'
import Link from 'next/link'

import type {
  DefaultNodeTypes,
  SerializedBlockNode,
} from '@payloadcms/richtext-lexical'

import {
  IS_BOLD,
  IS_CODE,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
  IS_UNDERLINE,
} from './nodeFormat'

export type NodeTypes = DefaultNodeTypes | SerializedBlockNode

type Props = {
  nodes: NodeTypes[]
}

export function serializeLexical({ nodes }: Props): JSX.Element {
  return (
    <Fragment>
      {nodes?.map((node, index): JSX.Element | null => {
        if (node == null) {
          return null
        }

        if (node.type === 'text') {
          let text = <Fragment key={index}>{node.text}</Fragment>
          if (node.format & IS_BOLD) {
            text = <strong key={index}>{text}</strong>
          }
          if (node.format & IS_ITALIC) {
            text = <em key={index}>{text}</em>
          }
          if (node.format & IS_STRIKETHROUGH) {
            text = (
              <span key={index} style={{ textDecoration: 'line-through' }}>
                {text}
              </span>
            )
          }
          if (node.format & IS_UNDERLINE) {
            text = (
              <span key={index} style={{ textDecoration: 'underline' }}>
                {text}
              </span>
            )
          }
          if (node.format & IS_CODE) {
            text = <code key={index}>{node.text}</code>
          }
          if (node.format & IS_SUBSCRIPT) {
            text = <sub key={index}>{text}</sub>
          }
          if (node.format & IS_SUPERSCRIPT) {
            text = <sup key={index}>{text}</sup>
          }

          return text
        }

        const serializedChildrenFn = (node: NodeTypes): JSX.Element | null => {
          if ('children' in node && Array.isArray(node.children)) {
            return serializeLexical({ nodes: node.children as NodeTypes[] })
          }
          return null
        }

        const serializedChildren = serializedChildrenFn(node)

        switch (node.type) {
          case 'linebreak': {
            return <br key={index} />
          }
          case 'paragraph': {
            return <p key={index}>{serializedChildren}</p>
          }
          case 'heading': {
            const Tag = node?.tag
            return <Tag key={index}>{serializedChildren}</Tag>
          }
          case 'list': {
            const Tag = node?.tag
            return (
              <Tag className="list" key={index}>
                {serializedChildren}
              </Tag>
            )
          }
          case 'listitem': {
            if (node?.checked != null) {
              return (
                <li
                  aria-checked={node.checked ? 'true' : 'false'}
                  className={`component--list-item-checkbox ${
                    node.checked
                      ? 'component--list-item-checkbox-checked'
                      : 'component--list-item-checked-unchecked'
                  }`}
                  key={index}
                  role="checkbox"
                  tabIndex={-1}
                  value={node?.value}
                >
                  {serializedChildren}
                </li>
              )
            } else {
              return (
                <li key={index} value={node?.value}>
                  {serializedChildren}
                </li>
              )
            }
          }
          case 'quote': {
            return <blockquote key={index}>{serializedChildren}</blockquote>
          }
          case 'link': {
            const fields = node.fields

            return (
              <Link
                href={fields.url || '#'}
                key={index}
                {...(fields?.newTab
                  ? {
                      rel: 'noopener noreferrer',
                      target: '_blank',
                    }
                  : {})}
              >
                {serializedChildren}
              </Link>
            )
          }
          case 'horizontalrule': {
            return <hr key={index} />
          }
          default:
            return null
        }
      })}
    </Fragment>
  )
}
