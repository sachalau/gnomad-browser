/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-shadow */
/* eslint-disable comma-dangle */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-case-declarations */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import R from 'ramda'

import RegionViewer from '@broad/region'
import TranscriptTrack from '@broad/track-transcript'
import VariantTrack from '@broad/track-variant'
import Navigator from '@broad/gene-page/src/containers/Navigator'
import { groupExonsByTranscript } from '@broad/utilities/src/transcriptTools'
import { exonPadding } from '@broad/gene-page/src/resources/active'
import { geneData } from '@broad/gene-page/src/resources/genes'
import { searchFilteredVariants as visibleVariants } from '@broad/gene-page/src/resources/table'

import css from './styles.css'

const {
  exonColor,
  paddingColor,
  masterExonThickness,
  masterPaddingThickness,
} = css

const attributeConfig = {
  CDS: {
    color: '#424242',
    thickness: masterExonThickness,
  },
  start_pad: {
    color: paddingColor,
    thickness: masterPaddingThickness,
  },
  end_pad: {
    color: paddingColor,
    thickness: masterPaddingThickness,
  },
  intron: {
    color: paddingColor,
    thickness: masterPaddingThickness,
  },
  default: {
    color: 'grey',
    thickness: masterPaddingThickness,
  },
}

const factor = 50

const GeneRegion = ({
  gene,
  visibleVariants,
  exonPadding,
}) => {
  const geneJS = gene.toJS()
  const geneExons = geneJS.exons
  const canonicalExons = geneJS.transcript.exons
  const transcriptsGrouped = groupExonsByTranscript(geneExons)

  // const variantsArray = visibleVariants.map(v => {
  //   return v.set('-log10p', -Math.log10(v.get('p_value')))
  // }).toArray()
  const variantsArray = visibleVariants.map(v => {
    return v.set('-log10p', -Math.log10(v.get('p_value')))
  }).toJS()

  const markerConfig = {
    markerType: 'circle',
    circleRadius: 3,
    circleStroke: 'black',
    circleStrokeWidth: 1,
    yPositionSetting: 'attribute',
    yPositionAttribute: '-log10p',
    fillColor: '#757575',
  }

  const markerConfigP = { ...markerConfig, yPositionAttribute: '-log10p' }
  const markerConfigOdds = { ...markerConfig, yPositionAttribute: 'odds_ratio' }
  const markerConfigSczAF = { ...markerConfig, yPositionAttribute: 'scz_af' }
  const markerConfigHCAF = { ...markerConfig, yPositionAttribute: 'hc_af' }

  return (
    <div className={css.geneRegion}>
      <RegionViewer
        css={css}
        width={1000}
        padding={exonPadding}
        regions={canonicalExons}
        regionAttributes={attributeConfig}
        leftPanelWidth={100}
      >
        <TranscriptTrack
          css={css}
          transcriptsGrouped={transcriptsGrouped}
          height={10}
        />
        <VariantTrack
          key={'-log10p'}
          title={''}
          height={200}
          color={'#75757'}
          markerConfig={markerConfigP}
          variants={variantsArray}
        />
        {/*<VariantTrack
          key={'odds_ratio'}
          title={''}
          height={100}
          color={'#75757'}
          markerConfig={markerConfigOdds}
          variants={variantsArray}
        />
        <VariantTrack
          key={'scz_af'}
          title={''}
          height={100}
          color={'#75757'}
          markerConfig={markerConfigSczAF}
          variants={variantsArray}
        />
        <VariantTrack
          key={'hc_af'}
          title={''}
          height={100}
          color={'#75757'}
          markerConfig={markerConfigHCAF}
          variants={variantsArray}
        />*/}
        <Navigator noVariants />
      </RegionViewer>
    </div>
  )
}
GeneRegion.propTypes = {
  gene: PropTypes.object.isRequired,
  visibleVariants: PropTypes.any.isRequired,
  exonPadding: PropTypes.number.isRequired,
}
export default connect(state => ({
  gene: geneData(state),
  exonPadding: exonPadding(state),
  visibleVariants: visibleVariants(state),
}))(GeneRegion)
