// components/ChildLink.jsx
import React from 'react'
import { Button } from '@adminjs/design-system'
import { useNavigate } from 'react-router-dom'

const map = {
  photosCount: {
    singular:   'foto',
    plural:     'fotos',
    resource:   'ProductoFotos',
    foreignKey: 'producto',
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
  const navigate = useNavigate()
  if (!cfg) return null

  const count = record.params[property.path] ?? 0
  const text  = `${count} ${count === 1 ? cfg.singular : cfg.plural}`

  const goToChildren = () => {
    const path = `/admin/resources/${cfg.resource}/actions/list`
    const search = `?filters.${cfg.foreignKey}=${record.params.id}`
    navigate(path + search)
  }

  return (
    <Button onClick={goToChildren} {...cfg.buttonProps} style={{ margin: '0.2em 0' }}>
      {text}
    </Button>
  )
}

export default ChildLink
