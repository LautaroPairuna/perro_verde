// ./components/ActionsColumn.jsx
import React from 'react'
import { Box, Button } from '@adminjs/design-system'
import { useAction }   from 'adminjs'
import { View, Edit, Trash } from 'lucide-react'

const ActionsColumn = ({ record, resource }) => {
  // Obtiene las acciones disponibles para este registro
  const showAction   = record.recordActions.find(a => a.name === 'show')
  const editAction   = record.recordActions.find(a => a.name === 'edit')
  const deleteAction = record.recordActions.find(a => a.name === 'delete')

  // Construye href y click handlers usando useAction
  const { href: hrefShow,   handleClick: handleShow }   = useAction(showAction,   { resourceId: resource.id, recordId: record.id })
  const { href: hrefEdit,   handleClick: handleEdit }   = useAction(editAction,   { resourceId: resource.id, recordId: record.id })
  const { href: hrefDelete, handleClick: handleDelete } = useAction(deleteAction, { resourceId: resource.id, recordId: record.id })

  return (
    <Box display="flex" alignItems="center" gap="default">
      <Button
        as="a"
        size="icon"
        onClick={handleShow}
        href={hrefShow}
        title="Ver"
      >
        <View />
      </Button>

      <Button
        as="a"
        size="icon"
        onClick={handleEdit}
        href={hrefEdit}
        title="Editar"
      >
        <Edit />
      </Button>

      <Button
        as="a"
        size="icon"
        onClick={handleDelete}
        href={hrefDelete}
        title="Borrar"
      >
        <Trash />
      </Button>
    </Box>
  )
}

export default ActionsColumn
