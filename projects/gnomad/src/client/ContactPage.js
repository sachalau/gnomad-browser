import React from 'react'

import { ExternalLink, PageHeading } from '@gnomad/ui'

import DocumentTitle from './DocumentTitle'
import InfoPage from './InfoPage'

export default () => (
  <InfoPage>
    <DocumentTitle title="Contact" />
    <PageHeading>Contact</PageHeading>
    <p>
      Errors in the website can be{' '}
      <ExternalLink href="https://github.com/broadinstitute/gnomad-browser/issues">
        reported via GitHub
      </ExternalLink>
      .
    </p>

    <p>
      You can also{' '}
      <ExternalLink href="mailto:exomeconsortium@gmail.com">contact us by email</ExternalLink> to
      report data problems or feature suggestions.
    </p>

    <p>
      Sign up for our low-volume{' '}
      <ExternalLink href="https://groups.google.com/forum/#!forum/exac_data_announcements">
        mailing list
      </ExternalLink>{' '}
      for future release announcements .
    </p>
  </InfoPage>
)
