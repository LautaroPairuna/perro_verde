import React from 'react'
import { Box, Label } from '@adminjs/design-system'

export default function JsonViewer({ record, property }) {
  const raw = record.params[property.name]
  let value = raw
  if (typeof raw === 'string') {
    try { value = JSON.parse(raw) } catch {}
  }
  return (
    <Box padding="default">
      <Label>{property.label}</Label>
      <pre style={{
        whiteSpace:   'pre-wrap',
        wordBreak:    'break-word',
        margin:       0,
        background:   '#f7f7f7',
        padding:      '0.5em',
        borderRadius: '4px',
        maxHeight:    '300px',
        overflow:     'auto',
      }}>
        {JSON.stringify(value, null, 2)}
      </pre>
    </Box>
  )
}
