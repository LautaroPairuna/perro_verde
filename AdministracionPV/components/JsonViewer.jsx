import React from 'react'
import {
  Box,
  Label,
  Text,
} from '@adminjs/design-system'

export default function JsonViewer({ record, property }) {
  // Parseamos el JSON
  const raw = record.params[property.name]
  let items = raw
  if (typeof raw === 'string') {
    try { items = JSON.parse(raw) } catch {}
  }

  // Si es array, renderizamos lista compacta
  if (Array.isArray(items) && items.length) {
    return (
      <Box padding="default">
        <Label>{property.label}</Label>

        <Box
          marginTop="default"
          display="flex"
          flexDirection="column"
          gap="default"
          style={{ maxWidth: '300px' }}   // ancho máximo para que no abarque mucho
        >
          {items.map(item => {
            const subtotal = item.price * item.quantity
            return (
              <Box
                key={item.id}
                border="default"
                borderRadius="default"
                padding="sm"              // padding más pequeño
              >
                <Text fontWeight="bold" fontSize="sm" marginBottom="sm">
                  {item.name}
                </Text>
                <Box display="flex" justifyContent="space-between" fontSize="sm">
                  <Text>Precio: {item.price}</Text>
                  <Text>Cant: {item.quantity}</Text>
                  <Text>
                    S/{subtotal.toLocaleString('es-AR')}
                  </Text>
                </Box>
              </Box>
            )
          })}
        </Box>
      </Box>
    )
  }

  // Fallback: JSON crudo si no es array
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
        {JSON.stringify(items, null, 2)}
      </pre>
    </Box>
  )
}
