/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'lodash-es' {
  export * from 'lodash'
  const _: typeof import('lodash')
  export default _
}

declare module 'lodash-es/*' {
  export * from 'lodash'
  const anyModule: any
  export default anyModule
}
