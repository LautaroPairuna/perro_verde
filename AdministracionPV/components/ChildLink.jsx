// components/ChildLink.jsx
import React from 'react'
import PropTypes from 'prop-types'
import { Button, Link } from '@adminjs/design-system'

const map = {
  photosCount: {
    singular:   'foto',
    plural:     'fotos',
    resource:   'ProductoFotos',
    foreignKey: 'producto',  // ← tu FK real en Prisma
    buttonProps:{ size:'sm', variant:'primary' },
  },
  versionsCount: {
    singular:   'versión',
    plural:     'versiones',
    resource:   'ProductoVersiones',
    foreignKey: 'producto',
    buttonProps:{ size:'sm', variant:'primary' },
  },
  specsCount: {
    singular:   'especificación',
    plural:     'especificaciones',
    resource:   'ProductoEspecificaciones',
    foreignKey: 'producto',
    buttonProps:{ size:'sm', variant:'primary' },
  },
}

const ChildLink = ({ record, property }) => {
  const cfg = map[property.path]
  if (!cfg) return null

  const count = record.params[property.path] ?? 0
  const label = `${count} ${count === 1 ? cfg.singular : cfg.plural}`

  // Construye manualmente el href correcto:
  const href = `/admin/resources/${cfg.resource}/actions/list?filters.${cfg.foreignKey}=${record.params.id}`

  return (
    <Link
      href={href}
      style={{ textDecoration:'none', margin:'0.2em 0' }}
    >
      <Button {...cfg.buttonProps}>
        {label}
      </Button>
    </Link>
  )
}

ChildLink.propTypes = {
  record:   PropTypes.object.isRequired,
  property: PropTypes.object.isRequired,
}

export default ChildLink
