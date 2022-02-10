import * as React from 'react'
import { graphql } from 'gatsby'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import { SliceZone } from '@prismicio/react'

import { Layout } from '../components/Layout'
import { components } from '../slices'

const HomepageTemplate = ({ data }) => {
  if (!data) return null

  const homepage = data.prismicHomepage || {}
  const topMenu = data.prismicTopMenu || {}

  const { lang, type, url } = homepage || {}
  const alternateLanguages = homepage.alternate_languages || []
  const activeDoc = {
    lang,
    type,
    url,
    alternateLanguages,
  }

  let PreviewScript = `
  <script async defer src="https://static.cdn.prismic.io/prismic.js?new=true&repo=gatsby4"></script>
`;

  return (
    <Layout topMenu={topMenu.data} activeDocMeta={activeDoc}>
    <span>TEST</span>
      
      {typeof window !== "undefined" ? (
          <script async defer src="https://static.cdn.prismic.io/prismic.js?new=true&repo=gatsby4"></script>
      ) : null}
      
      <SliceZone slices={homepage.data.body} components={components} />
    </Layout>
  )
}

export const query = graphql`
  query homepageQuery($lang: String) {
    prismicHomepage(lang: { eq: $lang }) {
      _previewable
      alternate_languages {
        uid
        type
        lang
      }
      lang
      url
      type
      data {
        body {
          ... on PrismicSliceType {
            id
            slice_type
            slice_label
          }
          ...HomepageDataBodyEmailSignup
          ...HomepageDataBodyFullWidthImage
          ...HomepageDataBodyHeadlineWithButton
          ...HomepageDataBodyInfoWithImage
          ...HomepageDataBodyTextInfo
        }
      }
    }
    prismicTopMenu(lang: { eq: $lang }) {
      ...TopMenuFragment
    }
  }
`

export default withPrismicPreview(HomepageTemplate)
