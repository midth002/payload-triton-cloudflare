import {
  BoldFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
  UnderlineFeature,
  lexicalEditor,
  HeadingFeature,
  BlockquoteFeature,
  OrderedListFeature,
  UnorderedListFeature,
  HorizontalRuleFeature,
  InlineCodeFeature,
} from '@payloadcms/richtext-lexical'

export const defaultLexical = lexicalEditor({
  features: () => {
    return [
      ParagraphFeature(),
      HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
      BoldFeature(),
      ItalicFeature(),
      UnderlineFeature(),
      InlineCodeFeature(),
      BlockquoteFeature(),
      OrderedListFeature(),
      UnorderedListFeature(),
      HorizontalRuleFeature(),
      LinkFeature({
        enabledCollections: ['pages', 'posts'],
      }),
    ]
  },
})
