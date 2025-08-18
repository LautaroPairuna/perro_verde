// Config y constantes compartidas por el módulo admin

export const READ_ONLY_RESOURCES: string[] = ['Pedidos']

export const relationMap = {
  Productos: ['ProductoFotos', 'ProductoVersiones', 'ProductoEspecificaciones'],
} as const satisfies Record<string, readonly string[]>

export const relationLabels = {
  ProductoFotos:            'Fotos',
  ProductoVersiones:        'Versiones',
  ProductoEspecificaciones: 'Especificaciones',
} as const

export const HIDDEN_COLUMNS = {
  Productos:                ['marca_id', 'rubro_id', 'moneda_id'],
  ProductoFotos:            ['producto_id'],
  ProductoVersiones:        ['producto_id'],
  ProductoEspecificaciones: ['producto_id'],
} as const

export const DEFAULT_COLUMNS = {
  CfgMarcas: [
    'id', 'marca', 'keywords', 'foto', 'activo',
  ],
  CfgRubros: [
    'id', 'rubro', 'condiciones', 'keywords', 'foto', 'activo',
  ],
  CfgFormasPagos: [
    'id', 'forma_pago', 'descripcion', 'permite_cuotas', 'activo',
  ],
  CfgMonedas: [
    'id', 'moneda', 'moneda_des', 'activo',
  ],
  CfgSlider: [
    'id', 'titulo', 'thumbs', 'foto', 'orden', 'activo',
  ],
  Productos: [
    'id', 'marca_id', 'rubro_id', 'moneda_id',
    'producto', 'descripcion', 'foto', 'precio',
    'stock', 'destacado', 'activo', 'visitas',
  ],
  ProductoFotos: [
    'id', 'producto_id', 'epigrafe', 'foto', 'orden', 'activo',
  ],
  ProductoVersiones: [
    'id', 'producto_id', 'version', 'detalle', 'orden', 'activo',
  ],
  ProductoEspecificaciones: [
    'id', 'producto_id', 'categoria', 'especificaciones', 'orden', 'activo',
  ],
  Pedidos: [
    'id', 'datos', 'total', 'estado', 'metodo_pago',
    'comprador_nombre', 'comprador_email', 'comprador_telefono',
    'direccion_envio',
    'mp_payment_id', 'transferencia_ref',
    'tarjeta_last4', 'tarjeta_payment_method',
    'mp_error_code', 'mp_error_message', 'mp_response',
    'createdAt', 'updatedAt',
  ],
} as const

export const fkConfig = {
  marca_id: {
    resource: 'CfgMarcas',
    labelKey: 'marca',
    fieldLabel: 'Marca',
  },
  rubro_id: {
    resource: 'CfgRubros',
    labelKey: 'rubro',
    fieldLabel: 'Rubro',
  },
  forma_pago_id: {
    resource: 'CfgFormasPagos',
    labelKey: 'descripcion',
    fieldLabel: 'Forma de Pago',
  },
  moneda_id: {
    resource: 'CfgMonedas',
    labelKey: 'moneda_des',
    fieldLabel: 'Moneda',
  },
  producto_id: {
    resource: 'Productos',
    labelKey: 'producto',
    fieldLabel: 'Producto',
  },
} as const satisfies Record<string, { resource: string; labelKey: string; fieldLabel: string }>
