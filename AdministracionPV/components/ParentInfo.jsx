import React from 'react'

const ParentInfo = ({ record }) => {
  // Intentamos obtener el registro padre poblado, si existe
  const parentRecord = record.populated?.producto_id
  // Nombre del producto: campo "producto" del padre o fallback al ID
  const parentName   = parentRecord?.params?.producto || record.params.producto_id
  const parentId     = parentRecord?.params?.id       || record.params.producto_id

  return (
    <span>
      {parentName} (ID: {parentId})
    </span>
  )
}

export default ParentInfo
