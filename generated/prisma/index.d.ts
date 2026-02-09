
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model CfgMarcas
 * 
 */
export type CfgMarcas = $Result.DefaultSelection<Prisma.$CfgMarcasPayload>
/**
 * Model CfgRubros
 * 
 */
export type CfgRubros = $Result.DefaultSelection<Prisma.$CfgRubrosPayload>
/**
 * Model CfgFormasPagos
 * 
 */
export type CfgFormasPagos = $Result.DefaultSelection<Prisma.$CfgFormasPagosPayload>
/**
 * Model CfgMonedas
 * 
 */
export type CfgMonedas = $Result.DefaultSelection<Prisma.$CfgMonedasPayload>
/**
 * Model CfgSlider
 * 
 */
export type CfgSlider = $Result.DefaultSelection<Prisma.$CfgSliderPayload>
/**
 * Model CfgEstadoPedido
 * 
 */
export type CfgEstadoPedido = $Result.DefaultSelection<Prisma.$CfgEstadoPedidoPayload>
/**
 * Model Productos
 * 
 */
export type Productos = $Result.DefaultSelection<Prisma.$ProductosPayload>
/**
 * Model ProductoFotos
 * 
 */
export type ProductoFotos = $Result.DefaultSelection<Prisma.$ProductoFotosPayload>
/**
 * Model ProductoVersiones
 * 
 */
export type ProductoVersiones = $Result.DefaultSelection<Prisma.$ProductoVersionesPayload>
/**
 * Model ProductoEspecificaciones
 * 
 */
export type ProductoEspecificaciones = $Result.DefaultSelection<Prisma.$ProductoEspecificacionesPayload>
/**
 * Model Pedidos
 * 
 */
export type Pedidos = $Result.DefaultSelection<Prisma.$PedidosPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more CfgMarcas
 * const cfgMarcas = await prisma.cfgMarcas.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more CfgMarcas
   * const cfgMarcas = await prisma.cfgMarcas.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.cfgMarcas`: Exposes CRUD operations for the **CfgMarcas** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CfgMarcas
    * const cfgMarcas = await prisma.cfgMarcas.findMany()
    * ```
    */
  get cfgMarcas(): Prisma.CfgMarcasDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cfgRubros`: Exposes CRUD operations for the **CfgRubros** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CfgRubros
    * const cfgRubros = await prisma.cfgRubros.findMany()
    * ```
    */
  get cfgRubros(): Prisma.CfgRubrosDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cfgFormasPagos`: Exposes CRUD operations for the **CfgFormasPagos** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CfgFormasPagos
    * const cfgFormasPagos = await prisma.cfgFormasPagos.findMany()
    * ```
    */
  get cfgFormasPagos(): Prisma.CfgFormasPagosDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cfgMonedas`: Exposes CRUD operations for the **CfgMonedas** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CfgMonedas
    * const cfgMonedas = await prisma.cfgMonedas.findMany()
    * ```
    */
  get cfgMonedas(): Prisma.CfgMonedasDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cfgSlider`: Exposes CRUD operations for the **CfgSlider** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CfgSliders
    * const cfgSliders = await prisma.cfgSlider.findMany()
    * ```
    */
  get cfgSlider(): Prisma.CfgSliderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cfgEstadoPedido`: Exposes CRUD operations for the **CfgEstadoPedido** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CfgEstadoPedidos
    * const cfgEstadoPedidos = await prisma.cfgEstadoPedido.findMany()
    * ```
    */
  get cfgEstadoPedido(): Prisma.CfgEstadoPedidoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productos`: Exposes CRUD operations for the **Productos** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Productos
    * const productos = await prisma.productos.findMany()
    * ```
    */
  get productos(): Prisma.ProductosDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productoFotos`: Exposes CRUD operations for the **ProductoFotos** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductoFotos
    * const productoFotos = await prisma.productoFotos.findMany()
    * ```
    */
  get productoFotos(): Prisma.ProductoFotosDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productoVersiones`: Exposes CRUD operations for the **ProductoVersiones** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductoVersiones
    * const productoVersiones = await prisma.productoVersiones.findMany()
    * ```
    */
  get productoVersiones(): Prisma.ProductoVersionesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productoEspecificaciones`: Exposes CRUD operations for the **ProductoEspecificaciones** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductoEspecificaciones
    * const productoEspecificaciones = await prisma.productoEspecificaciones.findMany()
    * ```
    */
  get productoEspecificaciones(): Prisma.ProductoEspecificacionesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pedidos`: Exposes CRUD operations for the **Pedidos** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pedidos
    * const pedidos = await prisma.pedidos.findMany()
    * ```
    */
  get pedidos(): Prisma.PedidosDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.3.0
   * Query Engine version: 9d6ad21cbbceab97458517b147a6a09ff43aa735
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    CfgMarcas: 'CfgMarcas',
    CfgRubros: 'CfgRubros',
    CfgFormasPagos: 'CfgFormasPagos',
    CfgMonedas: 'CfgMonedas',
    CfgSlider: 'CfgSlider',
    CfgEstadoPedido: 'CfgEstadoPedido',
    Productos: 'Productos',
    ProductoFotos: 'ProductoFotos',
    ProductoVersiones: 'ProductoVersiones',
    ProductoEspecificaciones: 'ProductoEspecificaciones',
    Pedidos: 'Pedidos',
    AuditLog: 'AuditLog',
    Session: 'Session'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "cfgMarcas" | "cfgRubros" | "cfgFormasPagos" | "cfgMonedas" | "cfgSlider" | "cfgEstadoPedido" | "productos" | "productoFotos" | "productoVersiones" | "productoEspecificaciones" | "pedidos" | "auditLog" | "session"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      CfgMarcas: {
        payload: Prisma.$CfgMarcasPayload<ExtArgs>
        fields: Prisma.CfgMarcasFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CfgMarcasFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgMarcasPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CfgMarcasFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgMarcasPayload>
          }
          findFirst: {
            args: Prisma.CfgMarcasFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgMarcasPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CfgMarcasFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgMarcasPayload>
          }
          findMany: {
            args: Prisma.CfgMarcasFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgMarcasPayload>[]
          }
          create: {
            args: Prisma.CfgMarcasCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgMarcasPayload>
          }
          createMany: {
            args: Prisma.CfgMarcasCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CfgMarcasDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgMarcasPayload>
          }
          update: {
            args: Prisma.CfgMarcasUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgMarcasPayload>
          }
          deleteMany: {
            args: Prisma.CfgMarcasDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CfgMarcasUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CfgMarcasUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgMarcasPayload>
          }
          aggregate: {
            args: Prisma.CfgMarcasAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCfgMarcas>
          }
          groupBy: {
            args: Prisma.CfgMarcasGroupByArgs<ExtArgs>
            result: $Utils.Optional<CfgMarcasGroupByOutputType>[]
          }
          count: {
            args: Prisma.CfgMarcasCountArgs<ExtArgs>
            result: $Utils.Optional<CfgMarcasCountAggregateOutputType> | number
          }
        }
      }
      CfgRubros: {
        payload: Prisma.$CfgRubrosPayload<ExtArgs>
        fields: Prisma.CfgRubrosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CfgRubrosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgRubrosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CfgRubrosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgRubrosPayload>
          }
          findFirst: {
            args: Prisma.CfgRubrosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgRubrosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CfgRubrosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgRubrosPayload>
          }
          findMany: {
            args: Prisma.CfgRubrosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgRubrosPayload>[]
          }
          create: {
            args: Prisma.CfgRubrosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgRubrosPayload>
          }
          createMany: {
            args: Prisma.CfgRubrosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CfgRubrosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgRubrosPayload>
          }
          update: {
            args: Prisma.CfgRubrosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgRubrosPayload>
          }
          deleteMany: {
            args: Prisma.CfgRubrosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CfgRubrosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CfgRubrosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgRubrosPayload>
          }
          aggregate: {
            args: Prisma.CfgRubrosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCfgRubros>
          }
          groupBy: {
            args: Prisma.CfgRubrosGroupByArgs<ExtArgs>
            result: $Utils.Optional<CfgRubrosGroupByOutputType>[]
          }
          count: {
            args: Prisma.CfgRubrosCountArgs<ExtArgs>
            result: $Utils.Optional<CfgRubrosCountAggregateOutputType> | number
          }
        }
      }
      CfgFormasPagos: {
        payload: Prisma.$CfgFormasPagosPayload<ExtArgs>
        fields: Prisma.CfgFormasPagosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CfgFormasPagosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgFormasPagosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CfgFormasPagosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgFormasPagosPayload>
          }
          findFirst: {
            args: Prisma.CfgFormasPagosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgFormasPagosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CfgFormasPagosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgFormasPagosPayload>
          }
          findMany: {
            args: Prisma.CfgFormasPagosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgFormasPagosPayload>[]
          }
          create: {
            args: Prisma.CfgFormasPagosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgFormasPagosPayload>
          }
          createMany: {
            args: Prisma.CfgFormasPagosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CfgFormasPagosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgFormasPagosPayload>
          }
          update: {
            args: Prisma.CfgFormasPagosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgFormasPagosPayload>
          }
          deleteMany: {
            args: Prisma.CfgFormasPagosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CfgFormasPagosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CfgFormasPagosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgFormasPagosPayload>
          }
          aggregate: {
            args: Prisma.CfgFormasPagosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCfgFormasPagos>
          }
          groupBy: {
            args: Prisma.CfgFormasPagosGroupByArgs<ExtArgs>
            result: $Utils.Optional<CfgFormasPagosGroupByOutputType>[]
          }
          count: {
            args: Prisma.CfgFormasPagosCountArgs<ExtArgs>
            result: $Utils.Optional<CfgFormasPagosCountAggregateOutputType> | number
          }
        }
      }
      CfgMonedas: {
        payload: Prisma.$CfgMonedasPayload<ExtArgs>
        fields: Prisma.CfgMonedasFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CfgMonedasFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgMonedasPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CfgMonedasFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgMonedasPayload>
          }
          findFirst: {
            args: Prisma.CfgMonedasFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgMonedasPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CfgMonedasFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgMonedasPayload>
          }
          findMany: {
            args: Prisma.CfgMonedasFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgMonedasPayload>[]
          }
          create: {
            args: Prisma.CfgMonedasCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgMonedasPayload>
          }
          createMany: {
            args: Prisma.CfgMonedasCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CfgMonedasDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgMonedasPayload>
          }
          update: {
            args: Prisma.CfgMonedasUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgMonedasPayload>
          }
          deleteMany: {
            args: Prisma.CfgMonedasDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CfgMonedasUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CfgMonedasUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgMonedasPayload>
          }
          aggregate: {
            args: Prisma.CfgMonedasAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCfgMonedas>
          }
          groupBy: {
            args: Prisma.CfgMonedasGroupByArgs<ExtArgs>
            result: $Utils.Optional<CfgMonedasGroupByOutputType>[]
          }
          count: {
            args: Prisma.CfgMonedasCountArgs<ExtArgs>
            result: $Utils.Optional<CfgMonedasCountAggregateOutputType> | number
          }
        }
      }
      CfgSlider: {
        payload: Prisma.$CfgSliderPayload<ExtArgs>
        fields: Prisma.CfgSliderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CfgSliderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgSliderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CfgSliderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgSliderPayload>
          }
          findFirst: {
            args: Prisma.CfgSliderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgSliderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CfgSliderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgSliderPayload>
          }
          findMany: {
            args: Prisma.CfgSliderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgSliderPayload>[]
          }
          create: {
            args: Prisma.CfgSliderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgSliderPayload>
          }
          createMany: {
            args: Prisma.CfgSliderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CfgSliderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgSliderPayload>
          }
          update: {
            args: Prisma.CfgSliderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgSliderPayload>
          }
          deleteMany: {
            args: Prisma.CfgSliderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CfgSliderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CfgSliderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgSliderPayload>
          }
          aggregate: {
            args: Prisma.CfgSliderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCfgSlider>
          }
          groupBy: {
            args: Prisma.CfgSliderGroupByArgs<ExtArgs>
            result: $Utils.Optional<CfgSliderGroupByOutputType>[]
          }
          count: {
            args: Prisma.CfgSliderCountArgs<ExtArgs>
            result: $Utils.Optional<CfgSliderCountAggregateOutputType> | number
          }
        }
      }
      CfgEstadoPedido: {
        payload: Prisma.$CfgEstadoPedidoPayload<ExtArgs>
        fields: Prisma.CfgEstadoPedidoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CfgEstadoPedidoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgEstadoPedidoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CfgEstadoPedidoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgEstadoPedidoPayload>
          }
          findFirst: {
            args: Prisma.CfgEstadoPedidoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgEstadoPedidoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CfgEstadoPedidoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgEstadoPedidoPayload>
          }
          findMany: {
            args: Prisma.CfgEstadoPedidoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgEstadoPedidoPayload>[]
          }
          create: {
            args: Prisma.CfgEstadoPedidoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgEstadoPedidoPayload>
          }
          createMany: {
            args: Prisma.CfgEstadoPedidoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CfgEstadoPedidoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgEstadoPedidoPayload>
          }
          update: {
            args: Prisma.CfgEstadoPedidoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgEstadoPedidoPayload>
          }
          deleteMany: {
            args: Prisma.CfgEstadoPedidoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CfgEstadoPedidoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CfgEstadoPedidoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CfgEstadoPedidoPayload>
          }
          aggregate: {
            args: Prisma.CfgEstadoPedidoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCfgEstadoPedido>
          }
          groupBy: {
            args: Prisma.CfgEstadoPedidoGroupByArgs<ExtArgs>
            result: $Utils.Optional<CfgEstadoPedidoGroupByOutputType>[]
          }
          count: {
            args: Prisma.CfgEstadoPedidoCountArgs<ExtArgs>
            result: $Utils.Optional<CfgEstadoPedidoCountAggregateOutputType> | number
          }
        }
      }
      Productos: {
        payload: Prisma.$ProductosPayload<ExtArgs>
        fields: Prisma.ProductosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductosPayload>
          }
          findFirst: {
            args: Prisma.ProductosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductosPayload>
          }
          findMany: {
            args: Prisma.ProductosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductosPayload>[]
          }
          create: {
            args: Prisma.ProductosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductosPayload>
          }
          createMany: {
            args: Prisma.ProductosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProductosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductosPayload>
          }
          update: {
            args: Prisma.ProductosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductosPayload>
          }
          deleteMany: {
            args: Prisma.ProductosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductosPayload>
          }
          aggregate: {
            args: Prisma.ProductosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductos>
          }
          groupBy: {
            args: Prisma.ProductosGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductosGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductosCountArgs<ExtArgs>
            result: $Utils.Optional<ProductosCountAggregateOutputType> | number
          }
        }
      }
      ProductoFotos: {
        payload: Prisma.$ProductoFotosPayload<ExtArgs>
        fields: Prisma.ProductoFotosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductoFotosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoFotosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductoFotosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoFotosPayload>
          }
          findFirst: {
            args: Prisma.ProductoFotosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoFotosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductoFotosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoFotosPayload>
          }
          findMany: {
            args: Prisma.ProductoFotosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoFotosPayload>[]
          }
          create: {
            args: Prisma.ProductoFotosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoFotosPayload>
          }
          createMany: {
            args: Prisma.ProductoFotosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProductoFotosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoFotosPayload>
          }
          update: {
            args: Prisma.ProductoFotosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoFotosPayload>
          }
          deleteMany: {
            args: Prisma.ProductoFotosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductoFotosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductoFotosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoFotosPayload>
          }
          aggregate: {
            args: Prisma.ProductoFotosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductoFotos>
          }
          groupBy: {
            args: Prisma.ProductoFotosGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductoFotosGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductoFotosCountArgs<ExtArgs>
            result: $Utils.Optional<ProductoFotosCountAggregateOutputType> | number
          }
        }
      }
      ProductoVersiones: {
        payload: Prisma.$ProductoVersionesPayload<ExtArgs>
        fields: Prisma.ProductoVersionesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductoVersionesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoVersionesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductoVersionesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoVersionesPayload>
          }
          findFirst: {
            args: Prisma.ProductoVersionesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoVersionesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductoVersionesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoVersionesPayload>
          }
          findMany: {
            args: Prisma.ProductoVersionesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoVersionesPayload>[]
          }
          create: {
            args: Prisma.ProductoVersionesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoVersionesPayload>
          }
          createMany: {
            args: Prisma.ProductoVersionesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProductoVersionesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoVersionesPayload>
          }
          update: {
            args: Prisma.ProductoVersionesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoVersionesPayload>
          }
          deleteMany: {
            args: Prisma.ProductoVersionesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductoVersionesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductoVersionesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoVersionesPayload>
          }
          aggregate: {
            args: Prisma.ProductoVersionesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductoVersiones>
          }
          groupBy: {
            args: Prisma.ProductoVersionesGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductoVersionesGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductoVersionesCountArgs<ExtArgs>
            result: $Utils.Optional<ProductoVersionesCountAggregateOutputType> | number
          }
        }
      }
      ProductoEspecificaciones: {
        payload: Prisma.$ProductoEspecificacionesPayload<ExtArgs>
        fields: Prisma.ProductoEspecificacionesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductoEspecificacionesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoEspecificacionesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductoEspecificacionesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoEspecificacionesPayload>
          }
          findFirst: {
            args: Prisma.ProductoEspecificacionesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoEspecificacionesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductoEspecificacionesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoEspecificacionesPayload>
          }
          findMany: {
            args: Prisma.ProductoEspecificacionesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoEspecificacionesPayload>[]
          }
          create: {
            args: Prisma.ProductoEspecificacionesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoEspecificacionesPayload>
          }
          createMany: {
            args: Prisma.ProductoEspecificacionesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProductoEspecificacionesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoEspecificacionesPayload>
          }
          update: {
            args: Prisma.ProductoEspecificacionesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoEspecificacionesPayload>
          }
          deleteMany: {
            args: Prisma.ProductoEspecificacionesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductoEspecificacionesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductoEspecificacionesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoEspecificacionesPayload>
          }
          aggregate: {
            args: Prisma.ProductoEspecificacionesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductoEspecificaciones>
          }
          groupBy: {
            args: Prisma.ProductoEspecificacionesGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductoEspecificacionesGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductoEspecificacionesCountArgs<ExtArgs>
            result: $Utils.Optional<ProductoEspecificacionesCountAggregateOutputType> | number
          }
        }
      }
      Pedidos: {
        payload: Prisma.$PedidosPayload<ExtArgs>
        fields: Prisma.PedidosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PedidosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PedidosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidosPayload>
          }
          findFirst: {
            args: Prisma.PedidosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PedidosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidosPayload>
          }
          findMany: {
            args: Prisma.PedidosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidosPayload>[]
          }
          create: {
            args: Prisma.PedidosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidosPayload>
          }
          createMany: {
            args: Prisma.PedidosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PedidosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidosPayload>
          }
          update: {
            args: Prisma.PedidosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidosPayload>
          }
          deleteMany: {
            args: Prisma.PedidosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PedidosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PedidosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidosPayload>
          }
          aggregate: {
            args: Prisma.PedidosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePedidos>
          }
          groupBy: {
            args: Prisma.PedidosGroupByArgs<ExtArgs>
            result: $Utils.Optional<PedidosGroupByOutputType>[]
          }
          count: {
            args: Prisma.PedidosCountArgs<ExtArgs>
            result: $Utils.Optional<PedidosCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    cfgMarcas?: CfgMarcasOmit
    cfgRubros?: CfgRubrosOmit
    cfgFormasPagos?: CfgFormasPagosOmit
    cfgMonedas?: CfgMonedasOmit
    cfgSlider?: CfgSliderOmit
    cfgEstadoPedido?: CfgEstadoPedidoOmit
    productos?: ProductosOmit
    productoFotos?: ProductoFotosOmit
    productoVersiones?: ProductoVersionesOmit
    productoEspecificaciones?: ProductoEspecificacionesOmit
    pedidos?: PedidosOmit
    auditLog?: AuditLogOmit
    session?: SessionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CfgMarcasCountOutputType
   */

  export type CfgMarcasCountOutputType = {
    Producto: number
  }

  export type CfgMarcasCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Producto?: boolean | CfgMarcasCountOutputTypeCountProductoArgs
  }

  // Custom InputTypes
  /**
   * CfgMarcasCountOutputType without action
   */
  export type CfgMarcasCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgMarcasCountOutputType
     */
    select?: CfgMarcasCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CfgMarcasCountOutputType without action
   */
  export type CfgMarcasCountOutputTypeCountProductoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductosWhereInput
  }


  /**
   * Count Type CfgRubrosCountOutputType
   */

  export type CfgRubrosCountOutputType = {
    Producto: number
  }

  export type CfgRubrosCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Producto?: boolean | CfgRubrosCountOutputTypeCountProductoArgs
  }

  // Custom InputTypes
  /**
   * CfgRubrosCountOutputType without action
   */
  export type CfgRubrosCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgRubrosCountOutputType
     */
    select?: CfgRubrosCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CfgRubrosCountOutputType without action
   */
  export type CfgRubrosCountOutputTypeCountProductoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductosWhereInput
  }


  /**
   * Count Type CfgMonedasCountOutputType
   */

  export type CfgMonedasCountOutputType = {
    Producto: number
  }

  export type CfgMonedasCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Producto?: boolean | CfgMonedasCountOutputTypeCountProductoArgs
  }

  // Custom InputTypes
  /**
   * CfgMonedasCountOutputType without action
   */
  export type CfgMonedasCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgMonedasCountOutputType
     */
    select?: CfgMonedasCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CfgMonedasCountOutputType without action
   */
  export type CfgMonedasCountOutputTypeCountProductoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductosWhereInput
  }


  /**
   * Count Type CfgEstadoPedidoCountOutputType
   */

  export type CfgEstadoPedidoCountOutputType = {
    Pedidos: number
  }

  export type CfgEstadoPedidoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Pedidos?: boolean | CfgEstadoPedidoCountOutputTypeCountPedidosArgs
  }

  // Custom InputTypes
  /**
   * CfgEstadoPedidoCountOutputType without action
   */
  export type CfgEstadoPedidoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgEstadoPedidoCountOutputType
     */
    select?: CfgEstadoPedidoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CfgEstadoPedidoCountOutputType without action
   */
  export type CfgEstadoPedidoCountOutputTypeCountPedidosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PedidosWhereInput
  }


  /**
   * Count Type ProductosCountOutputType
   */

  export type ProductosCountOutputType = {
    fotos: number
    versiones: number
    especificaciones: number
  }

  export type ProductosCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fotos?: boolean | ProductosCountOutputTypeCountFotosArgs
    versiones?: boolean | ProductosCountOutputTypeCountVersionesArgs
    especificaciones?: boolean | ProductosCountOutputTypeCountEspecificacionesArgs
  }

  // Custom InputTypes
  /**
   * ProductosCountOutputType without action
   */
  export type ProductosCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductosCountOutputType
     */
    select?: ProductosCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductosCountOutputType without action
   */
  export type ProductosCountOutputTypeCountFotosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductoFotosWhereInput
  }

  /**
   * ProductosCountOutputType without action
   */
  export type ProductosCountOutputTypeCountVersionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductoVersionesWhereInput
  }

  /**
   * ProductosCountOutputType without action
   */
  export type ProductosCountOutputTypeCountEspecificacionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductoEspecificacionesWhereInput
  }


  /**
   * Models
   */

  /**
   * Model CfgMarcas
   */

  export type AggregateCfgMarcas = {
    _count: CfgMarcasCountAggregateOutputType | null
    _avg: CfgMarcasAvgAggregateOutputType | null
    _sum: CfgMarcasSumAggregateOutputType | null
    _min: CfgMarcasMinAggregateOutputType | null
    _max: CfgMarcasMaxAggregateOutputType | null
  }

  export type CfgMarcasAvgAggregateOutputType = {
    id: number | null
  }

  export type CfgMarcasSumAggregateOutputType = {
    id: number | null
  }

  export type CfgMarcasMinAggregateOutputType = {
    id: number | null
    marca: string | null
    keywords: string | null
    foto: string | null
    activo: boolean | null
  }

  export type CfgMarcasMaxAggregateOutputType = {
    id: number | null
    marca: string | null
    keywords: string | null
    foto: string | null
    activo: boolean | null
  }

  export type CfgMarcasCountAggregateOutputType = {
    id: number
    marca: number
    keywords: number
    foto: number
    activo: number
    _all: number
  }


  export type CfgMarcasAvgAggregateInputType = {
    id?: true
  }

  export type CfgMarcasSumAggregateInputType = {
    id?: true
  }

  export type CfgMarcasMinAggregateInputType = {
    id?: true
    marca?: true
    keywords?: true
    foto?: true
    activo?: true
  }

  export type CfgMarcasMaxAggregateInputType = {
    id?: true
    marca?: true
    keywords?: true
    foto?: true
    activo?: true
  }

  export type CfgMarcasCountAggregateInputType = {
    id?: true
    marca?: true
    keywords?: true
    foto?: true
    activo?: true
    _all?: true
  }

  export type CfgMarcasAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CfgMarcas to aggregate.
     */
    where?: CfgMarcasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CfgMarcas to fetch.
     */
    orderBy?: CfgMarcasOrderByWithRelationInput | CfgMarcasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CfgMarcasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CfgMarcas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CfgMarcas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CfgMarcas
    **/
    _count?: true | CfgMarcasCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CfgMarcasAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CfgMarcasSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CfgMarcasMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CfgMarcasMaxAggregateInputType
  }

  export type GetCfgMarcasAggregateType<T extends CfgMarcasAggregateArgs> = {
        [P in keyof T & keyof AggregateCfgMarcas]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCfgMarcas[P]>
      : GetScalarType<T[P], AggregateCfgMarcas[P]>
  }




  export type CfgMarcasGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CfgMarcasWhereInput
    orderBy?: CfgMarcasOrderByWithAggregationInput | CfgMarcasOrderByWithAggregationInput[]
    by: CfgMarcasScalarFieldEnum[] | CfgMarcasScalarFieldEnum
    having?: CfgMarcasScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CfgMarcasCountAggregateInputType | true
    _avg?: CfgMarcasAvgAggregateInputType
    _sum?: CfgMarcasSumAggregateInputType
    _min?: CfgMarcasMinAggregateInputType
    _max?: CfgMarcasMaxAggregateInputType
  }

  export type CfgMarcasGroupByOutputType = {
    id: number
    marca: string
    keywords: string | null
    foto: string | null
    activo: boolean
    _count: CfgMarcasCountAggregateOutputType | null
    _avg: CfgMarcasAvgAggregateOutputType | null
    _sum: CfgMarcasSumAggregateOutputType | null
    _min: CfgMarcasMinAggregateOutputType | null
    _max: CfgMarcasMaxAggregateOutputType | null
  }

  type GetCfgMarcasGroupByPayload<T extends CfgMarcasGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CfgMarcasGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CfgMarcasGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CfgMarcasGroupByOutputType[P]>
            : GetScalarType<T[P], CfgMarcasGroupByOutputType[P]>
        }
      >
    >


  export type CfgMarcasSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    marca?: boolean
    keywords?: boolean
    foto?: boolean
    activo?: boolean
    Producto?: boolean | CfgMarcas$ProductoArgs<ExtArgs>
    _count?: boolean | CfgMarcasCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cfgMarcas"]>



  export type CfgMarcasSelectScalar = {
    id?: boolean
    marca?: boolean
    keywords?: boolean
    foto?: boolean
    activo?: boolean
  }

  export type CfgMarcasOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "marca" | "keywords" | "foto" | "activo", ExtArgs["result"]["cfgMarcas"]>
  export type CfgMarcasInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Producto?: boolean | CfgMarcas$ProductoArgs<ExtArgs>
    _count?: boolean | CfgMarcasCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $CfgMarcasPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CfgMarcas"
    objects: {
      Producto: Prisma.$ProductosPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      marca: string
      keywords: string | null
      foto: string | null
      activo: boolean
    }, ExtArgs["result"]["cfgMarcas"]>
    composites: {}
  }

  type CfgMarcasGetPayload<S extends boolean | null | undefined | CfgMarcasDefaultArgs> = $Result.GetResult<Prisma.$CfgMarcasPayload, S>

  type CfgMarcasCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CfgMarcasFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CfgMarcasCountAggregateInputType | true
    }

  export interface CfgMarcasDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CfgMarcas'], meta: { name: 'CfgMarcas' } }
    /**
     * Find zero or one CfgMarcas that matches the filter.
     * @param {CfgMarcasFindUniqueArgs} args - Arguments to find a CfgMarcas
     * @example
     * // Get one CfgMarcas
     * const cfgMarcas = await prisma.cfgMarcas.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CfgMarcasFindUniqueArgs>(args: SelectSubset<T, CfgMarcasFindUniqueArgs<ExtArgs>>): Prisma__CfgMarcasClient<$Result.GetResult<Prisma.$CfgMarcasPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CfgMarcas that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CfgMarcasFindUniqueOrThrowArgs} args - Arguments to find a CfgMarcas
     * @example
     * // Get one CfgMarcas
     * const cfgMarcas = await prisma.cfgMarcas.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CfgMarcasFindUniqueOrThrowArgs>(args: SelectSubset<T, CfgMarcasFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CfgMarcasClient<$Result.GetResult<Prisma.$CfgMarcasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CfgMarcas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgMarcasFindFirstArgs} args - Arguments to find a CfgMarcas
     * @example
     * // Get one CfgMarcas
     * const cfgMarcas = await prisma.cfgMarcas.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CfgMarcasFindFirstArgs>(args?: SelectSubset<T, CfgMarcasFindFirstArgs<ExtArgs>>): Prisma__CfgMarcasClient<$Result.GetResult<Prisma.$CfgMarcasPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CfgMarcas that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgMarcasFindFirstOrThrowArgs} args - Arguments to find a CfgMarcas
     * @example
     * // Get one CfgMarcas
     * const cfgMarcas = await prisma.cfgMarcas.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CfgMarcasFindFirstOrThrowArgs>(args?: SelectSubset<T, CfgMarcasFindFirstOrThrowArgs<ExtArgs>>): Prisma__CfgMarcasClient<$Result.GetResult<Prisma.$CfgMarcasPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CfgMarcas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgMarcasFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CfgMarcas
     * const cfgMarcas = await prisma.cfgMarcas.findMany()
     * 
     * // Get first 10 CfgMarcas
     * const cfgMarcas = await prisma.cfgMarcas.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cfgMarcasWithIdOnly = await prisma.cfgMarcas.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CfgMarcasFindManyArgs>(args?: SelectSubset<T, CfgMarcasFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CfgMarcasPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CfgMarcas.
     * @param {CfgMarcasCreateArgs} args - Arguments to create a CfgMarcas.
     * @example
     * // Create one CfgMarcas
     * const CfgMarcas = await prisma.cfgMarcas.create({
     *   data: {
     *     // ... data to create a CfgMarcas
     *   }
     * })
     * 
     */
    create<T extends CfgMarcasCreateArgs>(args: SelectSubset<T, CfgMarcasCreateArgs<ExtArgs>>): Prisma__CfgMarcasClient<$Result.GetResult<Prisma.$CfgMarcasPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CfgMarcas.
     * @param {CfgMarcasCreateManyArgs} args - Arguments to create many CfgMarcas.
     * @example
     * // Create many CfgMarcas
     * const cfgMarcas = await prisma.cfgMarcas.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CfgMarcasCreateManyArgs>(args?: SelectSubset<T, CfgMarcasCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a CfgMarcas.
     * @param {CfgMarcasDeleteArgs} args - Arguments to delete one CfgMarcas.
     * @example
     * // Delete one CfgMarcas
     * const CfgMarcas = await prisma.cfgMarcas.delete({
     *   where: {
     *     // ... filter to delete one CfgMarcas
     *   }
     * })
     * 
     */
    delete<T extends CfgMarcasDeleteArgs>(args: SelectSubset<T, CfgMarcasDeleteArgs<ExtArgs>>): Prisma__CfgMarcasClient<$Result.GetResult<Prisma.$CfgMarcasPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CfgMarcas.
     * @param {CfgMarcasUpdateArgs} args - Arguments to update one CfgMarcas.
     * @example
     * // Update one CfgMarcas
     * const cfgMarcas = await prisma.cfgMarcas.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CfgMarcasUpdateArgs>(args: SelectSubset<T, CfgMarcasUpdateArgs<ExtArgs>>): Prisma__CfgMarcasClient<$Result.GetResult<Prisma.$CfgMarcasPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CfgMarcas.
     * @param {CfgMarcasDeleteManyArgs} args - Arguments to filter CfgMarcas to delete.
     * @example
     * // Delete a few CfgMarcas
     * const { count } = await prisma.cfgMarcas.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CfgMarcasDeleteManyArgs>(args?: SelectSubset<T, CfgMarcasDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CfgMarcas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgMarcasUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CfgMarcas
     * const cfgMarcas = await prisma.cfgMarcas.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CfgMarcasUpdateManyArgs>(args: SelectSubset<T, CfgMarcasUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CfgMarcas.
     * @param {CfgMarcasUpsertArgs} args - Arguments to update or create a CfgMarcas.
     * @example
     * // Update or create a CfgMarcas
     * const cfgMarcas = await prisma.cfgMarcas.upsert({
     *   create: {
     *     // ... data to create a CfgMarcas
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CfgMarcas we want to update
     *   }
     * })
     */
    upsert<T extends CfgMarcasUpsertArgs>(args: SelectSubset<T, CfgMarcasUpsertArgs<ExtArgs>>): Prisma__CfgMarcasClient<$Result.GetResult<Prisma.$CfgMarcasPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CfgMarcas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgMarcasCountArgs} args - Arguments to filter CfgMarcas to count.
     * @example
     * // Count the number of CfgMarcas
     * const count = await prisma.cfgMarcas.count({
     *   where: {
     *     // ... the filter for the CfgMarcas we want to count
     *   }
     * })
    **/
    count<T extends CfgMarcasCountArgs>(
      args?: Subset<T, CfgMarcasCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CfgMarcasCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CfgMarcas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgMarcasAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CfgMarcasAggregateArgs>(args: Subset<T, CfgMarcasAggregateArgs>): Prisma.PrismaPromise<GetCfgMarcasAggregateType<T>>

    /**
     * Group by CfgMarcas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgMarcasGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CfgMarcasGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CfgMarcasGroupByArgs['orderBy'] }
        : { orderBy?: CfgMarcasGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CfgMarcasGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCfgMarcasGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CfgMarcas model
   */
  readonly fields: CfgMarcasFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CfgMarcas.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CfgMarcasClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Producto<T extends CfgMarcas$ProductoArgs<ExtArgs> = {}>(args?: Subset<T, CfgMarcas$ProductoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CfgMarcas model
   */
  interface CfgMarcasFieldRefs {
    readonly id: FieldRef<"CfgMarcas", 'Int'>
    readonly marca: FieldRef<"CfgMarcas", 'String'>
    readonly keywords: FieldRef<"CfgMarcas", 'String'>
    readonly foto: FieldRef<"CfgMarcas", 'String'>
    readonly activo: FieldRef<"CfgMarcas", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * CfgMarcas findUnique
   */
  export type CfgMarcasFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgMarcas
     */
    select?: CfgMarcasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgMarcas
     */
    omit?: CfgMarcasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CfgMarcasInclude<ExtArgs> | null
    /**
     * Filter, which CfgMarcas to fetch.
     */
    where: CfgMarcasWhereUniqueInput
  }

  /**
   * CfgMarcas findUniqueOrThrow
   */
  export type CfgMarcasFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgMarcas
     */
    select?: CfgMarcasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgMarcas
     */
    omit?: CfgMarcasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CfgMarcasInclude<ExtArgs> | null
    /**
     * Filter, which CfgMarcas to fetch.
     */
    where: CfgMarcasWhereUniqueInput
  }

  /**
   * CfgMarcas findFirst
   */
  export type CfgMarcasFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgMarcas
     */
    select?: CfgMarcasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgMarcas
     */
    omit?: CfgMarcasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CfgMarcasInclude<ExtArgs> | null
    /**
     * Filter, which CfgMarcas to fetch.
     */
    where?: CfgMarcasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CfgMarcas to fetch.
     */
    orderBy?: CfgMarcasOrderByWithRelationInput | CfgMarcasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CfgMarcas.
     */
    cursor?: CfgMarcasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CfgMarcas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CfgMarcas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CfgMarcas.
     */
    distinct?: CfgMarcasScalarFieldEnum | CfgMarcasScalarFieldEnum[]
  }

  /**
   * CfgMarcas findFirstOrThrow
   */
  export type CfgMarcasFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgMarcas
     */
    select?: CfgMarcasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgMarcas
     */
    omit?: CfgMarcasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CfgMarcasInclude<ExtArgs> | null
    /**
     * Filter, which CfgMarcas to fetch.
     */
    where?: CfgMarcasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CfgMarcas to fetch.
     */
    orderBy?: CfgMarcasOrderByWithRelationInput | CfgMarcasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CfgMarcas.
     */
    cursor?: CfgMarcasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CfgMarcas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CfgMarcas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CfgMarcas.
     */
    distinct?: CfgMarcasScalarFieldEnum | CfgMarcasScalarFieldEnum[]
  }

  /**
   * CfgMarcas findMany
   */
  export type CfgMarcasFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgMarcas
     */
    select?: CfgMarcasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgMarcas
     */
    omit?: CfgMarcasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CfgMarcasInclude<ExtArgs> | null
    /**
     * Filter, which CfgMarcas to fetch.
     */
    where?: CfgMarcasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CfgMarcas to fetch.
     */
    orderBy?: CfgMarcasOrderByWithRelationInput | CfgMarcasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CfgMarcas.
     */
    cursor?: CfgMarcasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CfgMarcas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CfgMarcas.
     */
    skip?: number
    distinct?: CfgMarcasScalarFieldEnum | CfgMarcasScalarFieldEnum[]
  }

  /**
   * CfgMarcas create
   */
  export type CfgMarcasCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgMarcas
     */
    select?: CfgMarcasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgMarcas
     */
    omit?: CfgMarcasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CfgMarcasInclude<ExtArgs> | null
    /**
     * The data needed to create a CfgMarcas.
     */
    data: XOR<CfgMarcasCreateInput, CfgMarcasUncheckedCreateInput>
  }

  /**
   * CfgMarcas createMany
   */
  export type CfgMarcasCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CfgMarcas.
     */
    data: CfgMarcasCreateManyInput | CfgMarcasCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CfgMarcas update
   */
  export type CfgMarcasUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgMarcas
     */
    select?: CfgMarcasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgMarcas
     */
    omit?: CfgMarcasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CfgMarcasInclude<ExtArgs> | null
    /**
     * The data needed to update a CfgMarcas.
     */
    data: XOR<CfgMarcasUpdateInput, CfgMarcasUncheckedUpdateInput>
    /**
     * Choose, which CfgMarcas to update.
     */
    where: CfgMarcasWhereUniqueInput
  }

  /**
   * CfgMarcas updateMany
   */
  export type CfgMarcasUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CfgMarcas.
     */
    data: XOR<CfgMarcasUpdateManyMutationInput, CfgMarcasUncheckedUpdateManyInput>
    /**
     * Filter which CfgMarcas to update
     */
    where?: CfgMarcasWhereInput
    /**
     * Limit how many CfgMarcas to update.
     */
    limit?: number
  }

  /**
   * CfgMarcas upsert
   */
  export type CfgMarcasUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgMarcas
     */
    select?: CfgMarcasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgMarcas
     */
    omit?: CfgMarcasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CfgMarcasInclude<ExtArgs> | null
    /**
     * The filter to search for the CfgMarcas to update in case it exists.
     */
    where: CfgMarcasWhereUniqueInput
    /**
     * In case the CfgMarcas found by the `where` argument doesn't exist, create a new CfgMarcas with this data.
     */
    create: XOR<CfgMarcasCreateInput, CfgMarcasUncheckedCreateInput>
    /**
     * In case the CfgMarcas was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CfgMarcasUpdateInput, CfgMarcasUncheckedUpdateInput>
  }

  /**
   * CfgMarcas delete
   */
  export type CfgMarcasDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgMarcas
     */
    select?: CfgMarcasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgMarcas
     */
    omit?: CfgMarcasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CfgMarcasInclude<ExtArgs> | null
    /**
     * Filter which CfgMarcas to delete.
     */
    where: CfgMarcasWhereUniqueInput
  }

  /**
   * CfgMarcas deleteMany
   */
  export type CfgMarcasDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CfgMarcas to delete
     */
    where?: CfgMarcasWhereInput
    /**
     * Limit how many CfgMarcas to delete.
     */
    limit?: number
  }

  /**
   * CfgMarcas.Producto
   */
  export type CfgMarcas$ProductoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Productos
     */
    select?: ProductosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Productos
     */
    omit?: ProductosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductosInclude<ExtArgs> | null
    where?: ProductosWhereInput
    orderBy?: ProductosOrderByWithRelationInput | ProductosOrderByWithRelationInput[]
    cursor?: ProductosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductosScalarFieldEnum | ProductosScalarFieldEnum[]
  }

  /**
   * CfgMarcas without action
   */
  export type CfgMarcasDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgMarcas
     */
    select?: CfgMarcasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgMarcas
     */
    omit?: CfgMarcasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CfgMarcasInclude<ExtArgs> | null
  }


  /**
   * Model CfgRubros
   */

  export type AggregateCfgRubros = {
    _count: CfgRubrosCountAggregateOutputType | null
    _avg: CfgRubrosAvgAggregateOutputType | null
    _sum: CfgRubrosSumAggregateOutputType | null
    _min: CfgRubrosMinAggregateOutputType | null
    _max: CfgRubrosMaxAggregateOutputType | null
  }

  export type CfgRubrosAvgAggregateOutputType = {
    id: number | null
  }

  export type CfgRubrosSumAggregateOutputType = {
    id: number | null
  }

  export type CfgRubrosMinAggregateOutputType = {
    id: number | null
    rubro: string | null
    condiciones: string | null
    keywords: string | null
    foto: string | null
    activo: boolean | null
  }

  export type CfgRubrosMaxAggregateOutputType = {
    id: number | null
    rubro: string | null
    condiciones: string | null
    keywords: string | null
    foto: string | null
    activo: boolean | null
  }

  export type CfgRubrosCountAggregateOutputType = {
    id: number
    rubro: number
    condiciones: number
    keywords: number
    foto: number
    activo: number
    _all: number
  }


  export type CfgRubrosAvgAggregateInputType = {
    id?: true
  }

  export type CfgRubrosSumAggregateInputType = {
    id?: true
  }

  export type CfgRubrosMinAggregateInputType = {
    id?: true
    rubro?: true
    condiciones?: true
    keywords?: true
    foto?: true
    activo?: true
  }

  export type CfgRubrosMaxAggregateInputType = {
    id?: true
    rubro?: true
    condiciones?: true
    keywords?: true
    foto?: true
    activo?: true
  }

  export type CfgRubrosCountAggregateInputType = {
    id?: true
    rubro?: true
    condiciones?: true
    keywords?: true
    foto?: true
    activo?: true
    _all?: true
  }

  export type CfgRubrosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CfgRubros to aggregate.
     */
    where?: CfgRubrosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CfgRubros to fetch.
     */
    orderBy?: CfgRubrosOrderByWithRelationInput | CfgRubrosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CfgRubrosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CfgRubros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CfgRubros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CfgRubros
    **/
    _count?: true | CfgRubrosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CfgRubrosAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CfgRubrosSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CfgRubrosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CfgRubrosMaxAggregateInputType
  }

  export type GetCfgRubrosAggregateType<T extends CfgRubrosAggregateArgs> = {
        [P in keyof T & keyof AggregateCfgRubros]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCfgRubros[P]>
      : GetScalarType<T[P], AggregateCfgRubros[P]>
  }




  export type CfgRubrosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CfgRubrosWhereInput
    orderBy?: CfgRubrosOrderByWithAggregationInput | CfgRubrosOrderByWithAggregationInput[]
    by: CfgRubrosScalarFieldEnum[] | CfgRubrosScalarFieldEnum
    having?: CfgRubrosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CfgRubrosCountAggregateInputType | true
    _avg?: CfgRubrosAvgAggregateInputType
    _sum?: CfgRubrosSumAggregateInputType
    _min?: CfgRubrosMinAggregateInputType
    _max?: CfgRubrosMaxAggregateInputType
  }

  export type CfgRubrosGroupByOutputType = {
    id: number
    rubro: string
    condiciones: string | null
    keywords: string | null
    foto: string | null
    activo: boolean
    _count: CfgRubrosCountAggregateOutputType | null
    _avg: CfgRubrosAvgAggregateOutputType | null
    _sum: CfgRubrosSumAggregateOutputType | null
    _min: CfgRubrosMinAggregateOutputType | null
    _max: CfgRubrosMaxAggregateOutputType | null
  }

  type GetCfgRubrosGroupByPayload<T extends CfgRubrosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CfgRubrosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CfgRubrosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CfgRubrosGroupByOutputType[P]>
            : GetScalarType<T[P], CfgRubrosGroupByOutputType[P]>
        }
      >
    >


  export type CfgRubrosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rubro?: boolean
    condiciones?: boolean
    keywords?: boolean
    foto?: boolean
    activo?: boolean
    Producto?: boolean | CfgRubros$ProductoArgs<ExtArgs>
    _count?: boolean | CfgRubrosCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cfgRubros"]>



  export type CfgRubrosSelectScalar = {
    id?: boolean
    rubro?: boolean
    condiciones?: boolean
    keywords?: boolean
    foto?: boolean
    activo?: boolean
  }

  export type CfgRubrosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "rubro" | "condiciones" | "keywords" | "foto" | "activo", ExtArgs["result"]["cfgRubros"]>
  export type CfgRubrosInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Producto?: boolean | CfgRubros$ProductoArgs<ExtArgs>
    _count?: boolean | CfgRubrosCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $CfgRubrosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CfgRubros"
    objects: {
      Producto: Prisma.$ProductosPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      rubro: string
      condiciones: string | null
      keywords: string | null
      foto: string | null
      activo: boolean
    }, ExtArgs["result"]["cfgRubros"]>
    composites: {}
  }

  type CfgRubrosGetPayload<S extends boolean | null | undefined | CfgRubrosDefaultArgs> = $Result.GetResult<Prisma.$CfgRubrosPayload, S>

  type CfgRubrosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CfgRubrosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CfgRubrosCountAggregateInputType | true
    }

  export interface CfgRubrosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CfgRubros'], meta: { name: 'CfgRubros' } }
    /**
     * Find zero or one CfgRubros that matches the filter.
     * @param {CfgRubrosFindUniqueArgs} args - Arguments to find a CfgRubros
     * @example
     * // Get one CfgRubros
     * const cfgRubros = await prisma.cfgRubros.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CfgRubrosFindUniqueArgs>(args: SelectSubset<T, CfgRubrosFindUniqueArgs<ExtArgs>>): Prisma__CfgRubrosClient<$Result.GetResult<Prisma.$CfgRubrosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CfgRubros that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CfgRubrosFindUniqueOrThrowArgs} args - Arguments to find a CfgRubros
     * @example
     * // Get one CfgRubros
     * const cfgRubros = await prisma.cfgRubros.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CfgRubrosFindUniqueOrThrowArgs>(args: SelectSubset<T, CfgRubrosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CfgRubrosClient<$Result.GetResult<Prisma.$CfgRubrosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CfgRubros that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgRubrosFindFirstArgs} args - Arguments to find a CfgRubros
     * @example
     * // Get one CfgRubros
     * const cfgRubros = await prisma.cfgRubros.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CfgRubrosFindFirstArgs>(args?: SelectSubset<T, CfgRubrosFindFirstArgs<ExtArgs>>): Prisma__CfgRubrosClient<$Result.GetResult<Prisma.$CfgRubrosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CfgRubros that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgRubrosFindFirstOrThrowArgs} args - Arguments to find a CfgRubros
     * @example
     * // Get one CfgRubros
     * const cfgRubros = await prisma.cfgRubros.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CfgRubrosFindFirstOrThrowArgs>(args?: SelectSubset<T, CfgRubrosFindFirstOrThrowArgs<ExtArgs>>): Prisma__CfgRubrosClient<$Result.GetResult<Prisma.$CfgRubrosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CfgRubros that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgRubrosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CfgRubros
     * const cfgRubros = await prisma.cfgRubros.findMany()
     * 
     * // Get first 10 CfgRubros
     * const cfgRubros = await prisma.cfgRubros.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cfgRubrosWithIdOnly = await prisma.cfgRubros.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CfgRubrosFindManyArgs>(args?: SelectSubset<T, CfgRubrosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CfgRubrosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CfgRubros.
     * @param {CfgRubrosCreateArgs} args - Arguments to create a CfgRubros.
     * @example
     * // Create one CfgRubros
     * const CfgRubros = await prisma.cfgRubros.create({
     *   data: {
     *     // ... data to create a CfgRubros
     *   }
     * })
     * 
     */
    create<T extends CfgRubrosCreateArgs>(args: SelectSubset<T, CfgRubrosCreateArgs<ExtArgs>>): Prisma__CfgRubrosClient<$Result.GetResult<Prisma.$CfgRubrosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CfgRubros.
     * @param {CfgRubrosCreateManyArgs} args - Arguments to create many CfgRubros.
     * @example
     * // Create many CfgRubros
     * const cfgRubros = await prisma.cfgRubros.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CfgRubrosCreateManyArgs>(args?: SelectSubset<T, CfgRubrosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a CfgRubros.
     * @param {CfgRubrosDeleteArgs} args - Arguments to delete one CfgRubros.
     * @example
     * // Delete one CfgRubros
     * const CfgRubros = await prisma.cfgRubros.delete({
     *   where: {
     *     // ... filter to delete one CfgRubros
     *   }
     * })
     * 
     */
    delete<T extends CfgRubrosDeleteArgs>(args: SelectSubset<T, CfgRubrosDeleteArgs<ExtArgs>>): Prisma__CfgRubrosClient<$Result.GetResult<Prisma.$CfgRubrosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CfgRubros.
     * @param {CfgRubrosUpdateArgs} args - Arguments to update one CfgRubros.
     * @example
     * // Update one CfgRubros
     * const cfgRubros = await prisma.cfgRubros.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CfgRubrosUpdateArgs>(args: SelectSubset<T, CfgRubrosUpdateArgs<ExtArgs>>): Prisma__CfgRubrosClient<$Result.GetResult<Prisma.$CfgRubrosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CfgRubros.
     * @param {CfgRubrosDeleteManyArgs} args - Arguments to filter CfgRubros to delete.
     * @example
     * // Delete a few CfgRubros
     * const { count } = await prisma.cfgRubros.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CfgRubrosDeleteManyArgs>(args?: SelectSubset<T, CfgRubrosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CfgRubros.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgRubrosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CfgRubros
     * const cfgRubros = await prisma.cfgRubros.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CfgRubrosUpdateManyArgs>(args: SelectSubset<T, CfgRubrosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CfgRubros.
     * @param {CfgRubrosUpsertArgs} args - Arguments to update or create a CfgRubros.
     * @example
     * // Update or create a CfgRubros
     * const cfgRubros = await prisma.cfgRubros.upsert({
     *   create: {
     *     // ... data to create a CfgRubros
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CfgRubros we want to update
     *   }
     * })
     */
    upsert<T extends CfgRubrosUpsertArgs>(args: SelectSubset<T, CfgRubrosUpsertArgs<ExtArgs>>): Prisma__CfgRubrosClient<$Result.GetResult<Prisma.$CfgRubrosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CfgRubros.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgRubrosCountArgs} args - Arguments to filter CfgRubros to count.
     * @example
     * // Count the number of CfgRubros
     * const count = await prisma.cfgRubros.count({
     *   where: {
     *     // ... the filter for the CfgRubros we want to count
     *   }
     * })
    **/
    count<T extends CfgRubrosCountArgs>(
      args?: Subset<T, CfgRubrosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CfgRubrosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CfgRubros.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgRubrosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CfgRubrosAggregateArgs>(args: Subset<T, CfgRubrosAggregateArgs>): Prisma.PrismaPromise<GetCfgRubrosAggregateType<T>>

    /**
     * Group by CfgRubros.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgRubrosGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CfgRubrosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CfgRubrosGroupByArgs['orderBy'] }
        : { orderBy?: CfgRubrosGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CfgRubrosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCfgRubrosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CfgRubros model
   */
  readonly fields: CfgRubrosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CfgRubros.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CfgRubrosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Producto<T extends CfgRubros$ProductoArgs<ExtArgs> = {}>(args?: Subset<T, CfgRubros$ProductoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CfgRubros model
   */
  interface CfgRubrosFieldRefs {
    readonly id: FieldRef<"CfgRubros", 'Int'>
    readonly rubro: FieldRef<"CfgRubros", 'String'>
    readonly condiciones: FieldRef<"CfgRubros", 'String'>
    readonly keywords: FieldRef<"CfgRubros", 'String'>
    readonly foto: FieldRef<"CfgRubros", 'String'>
    readonly activo: FieldRef<"CfgRubros", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * CfgRubros findUnique
   */
  export type CfgRubrosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgRubros
     */
    select?: CfgRubrosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgRubros
     */
    omit?: CfgRubrosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CfgRubrosInclude<ExtArgs> | null
    /**
     * Filter, which CfgRubros to fetch.
     */
    where: CfgRubrosWhereUniqueInput
  }

  /**
   * CfgRubros findUniqueOrThrow
   */
  export type CfgRubrosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgRubros
     */
    select?: CfgRubrosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgRubros
     */
    omit?: CfgRubrosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CfgRubrosInclude<ExtArgs> | null
    /**
     * Filter, which CfgRubros to fetch.
     */
    where: CfgRubrosWhereUniqueInput
  }

  /**
   * CfgRubros findFirst
   */
  export type CfgRubrosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgRubros
     */
    select?: CfgRubrosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgRubros
     */
    omit?: CfgRubrosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CfgRubrosInclude<ExtArgs> | null
    /**
     * Filter, which CfgRubros to fetch.
     */
    where?: CfgRubrosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CfgRubros to fetch.
     */
    orderBy?: CfgRubrosOrderByWithRelationInput | CfgRubrosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CfgRubros.
     */
    cursor?: CfgRubrosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CfgRubros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CfgRubros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CfgRubros.
     */
    distinct?: CfgRubrosScalarFieldEnum | CfgRubrosScalarFieldEnum[]
  }

  /**
   * CfgRubros findFirstOrThrow
   */
  export type CfgRubrosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgRubros
     */
    select?: CfgRubrosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgRubros
     */
    omit?: CfgRubrosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CfgRubrosInclude<ExtArgs> | null
    /**
     * Filter, which CfgRubros to fetch.
     */
    where?: CfgRubrosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CfgRubros to fetch.
     */
    orderBy?: CfgRubrosOrderByWithRelationInput | CfgRubrosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CfgRubros.
     */
    cursor?: CfgRubrosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CfgRubros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CfgRubros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CfgRubros.
     */
    distinct?: CfgRubrosScalarFieldEnum | CfgRubrosScalarFieldEnum[]
  }

  /**
   * CfgRubros findMany
   */
  export type CfgRubrosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgRubros
     */
    select?: CfgRubrosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgRubros
     */
    omit?: CfgRubrosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CfgRubrosInclude<ExtArgs> | null
    /**
     * Filter, which CfgRubros to fetch.
     */
    where?: CfgRubrosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CfgRubros to fetch.
     */
    orderBy?: CfgRubrosOrderByWithRelationInput | CfgRubrosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CfgRubros.
     */
    cursor?: CfgRubrosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CfgRubros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CfgRubros.
     */
    skip?: number
    distinct?: CfgRubrosScalarFieldEnum | CfgRubrosScalarFieldEnum[]
  }

  /**
   * CfgRubros create
   */
  export type CfgRubrosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgRubros
     */
    select?: CfgRubrosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgRubros
     */
    omit?: CfgRubrosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CfgRubrosInclude<ExtArgs> | null
    /**
     * The data needed to create a CfgRubros.
     */
    data: XOR<CfgRubrosCreateInput, CfgRubrosUncheckedCreateInput>
  }

  /**
   * CfgRubros createMany
   */
  export type CfgRubrosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CfgRubros.
     */
    data: CfgRubrosCreateManyInput | CfgRubrosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CfgRubros update
   */
  export type CfgRubrosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgRubros
     */
    select?: CfgRubrosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgRubros
     */
    omit?: CfgRubrosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CfgRubrosInclude<ExtArgs> | null
    /**
     * The data needed to update a CfgRubros.
     */
    data: XOR<CfgRubrosUpdateInput, CfgRubrosUncheckedUpdateInput>
    /**
     * Choose, which CfgRubros to update.
     */
    where: CfgRubrosWhereUniqueInput
  }

  /**
   * CfgRubros updateMany
   */
  export type CfgRubrosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CfgRubros.
     */
    data: XOR<CfgRubrosUpdateManyMutationInput, CfgRubrosUncheckedUpdateManyInput>
    /**
     * Filter which CfgRubros to update
     */
    where?: CfgRubrosWhereInput
    /**
     * Limit how many CfgRubros to update.
     */
    limit?: number
  }

  /**
   * CfgRubros upsert
   */
  export type CfgRubrosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgRubros
     */
    select?: CfgRubrosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgRubros
     */
    omit?: CfgRubrosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CfgRubrosInclude<ExtArgs> | null
    /**
     * The filter to search for the CfgRubros to update in case it exists.
     */
    where: CfgRubrosWhereUniqueInput
    /**
     * In case the CfgRubros found by the `where` argument doesn't exist, create a new CfgRubros with this data.
     */
    create: XOR<CfgRubrosCreateInput, CfgRubrosUncheckedCreateInput>
    /**
     * In case the CfgRubros was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CfgRubrosUpdateInput, CfgRubrosUncheckedUpdateInput>
  }

  /**
   * CfgRubros delete
   */
  export type CfgRubrosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgRubros
     */
    select?: CfgRubrosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgRubros
     */
    omit?: CfgRubrosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CfgRubrosInclude<ExtArgs> | null
    /**
     * Filter which CfgRubros to delete.
     */
    where: CfgRubrosWhereUniqueInput
  }

  /**
   * CfgRubros deleteMany
   */
  export type CfgRubrosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CfgRubros to delete
     */
    where?: CfgRubrosWhereInput
    /**
     * Limit how many CfgRubros to delete.
     */
    limit?: number
  }

  /**
   * CfgRubros.Producto
   */
  export type CfgRubros$ProductoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Productos
     */
    select?: ProductosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Productos
     */
    omit?: ProductosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductosInclude<ExtArgs> | null
    where?: ProductosWhereInput
    orderBy?: ProductosOrderByWithRelationInput | ProductosOrderByWithRelationInput[]
    cursor?: ProductosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductosScalarFieldEnum | ProductosScalarFieldEnum[]
  }

  /**
   * CfgRubros without action
   */
  export type CfgRubrosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgRubros
     */
    select?: CfgRubrosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgRubros
     */
    omit?: CfgRubrosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CfgRubrosInclude<ExtArgs> | null
  }


  /**
   * Model CfgFormasPagos
   */

  export type AggregateCfgFormasPagos = {
    _count: CfgFormasPagosCountAggregateOutputType | null
    _avg: CfgFormasPagosAvgAggregateOutputType | null
    _sum: CfgFormasPagosSumAggregateOutputType | null
    _min: CfgFormasPagosMinAggregateOutputType | null
    _max: CfgFormasPagosMaxAggregateOutputType | null
  }

  export type CfgFormasPagosAvgAggregateOutputType = {
    id: number | null
  }

  export type CfgFormasPagosSumAggregateOutputType = {
    id: number | null
  }

  export type CfgFormasPagosMinAggregateOutputType = {
    id: number | null
    forma_pago: string | null
    descripcion: string | null
    permite_cuotas: boolean | null
    activo: boolean | null
  }

  export type CfgFormasPagosMaxAggregateOutputType = {
    id: number | null
    forma_pago: string | null
    descripcion: string | null
    permite_cuotas: boolean | null
    activo: boolean | null
  }

  export type CfgFormasPagosCountAggregateOutputType = {
    id: number
    forma_pago: number
    descripcion: number
    permite_cuotas: number
    activo: number
    _all: number
  }


  export type CfgFormasPagosAvgAggregateInputType = {
    id?: true
  }

  export type CfgFormasPagosSumAggregateInputType = {
    id?: true
  }

  export type CfgFormasPagosMinAggregateInputType = {
    id?: true
    forma_pago?: true
    descripcion?: true
    permite_cuotas?: true
    activo?: true
  }

  export type CfgFormasPagosMaxAggregateInputType = {
    id?: true
    forma_pago?: true
    descripcion?: true
    permite_cuotas?: true
    activo?: true
  }

  export type CfgFormasPagosCountAggregateInputType = {
    id?: true
    forma_pago?: true
    descripcion?: true
    permite_cuotas?: true
    activo?: true
    _all?: true
  }

  export type CfgFormasPagosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CfgFormasPagos to aggregate.
     */
    where?: CfgFormasPagosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CfgFormasPagos to fetch.
     */
    orderBy?: CfgFormasPagosOrderByWithRelationInput | CfgFormasPagosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CfgFormasPagosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CfgFormasPagos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CfgFormasPagos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CfgFormasPagos
    **/
    _count?: true | CfgFormasPagosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CfgFormasPagosAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CfgFormasPagosSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CfgFormasPagosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CfgFormasPagosMaxAggregateInputType
  }

  export type GetCfgFormasPagosAggregateType<T extends CfgFormasPagosAggregateArgs> = {
        [P in keyof T & keyof AggregateCfgFormasPagos]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCfgFormasPagos[P]>
      : GetScalarType<T[P], AggregateCfgFormasPagos[P]>
  }




  export type CfgFormasPagosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CfgFormasPagosWhereInput
    orderBy?: CfgFormasPagosOrderByWithAggregationInput | CfgFormasPagosOrderByWithAggregationInput[]
    by: CfgFormasPagosScalarFieldEnum[] | CfgFormasPagosScalarFieldEnum
    having?: CfgFormasPagosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CfgFormasPagosCountAggregateInputType | true
    _avg?: CfgFormasPagosAvgAggregateInputType
    _sum?: CfgFormasPagosSumAggregateInputType
    _min?: CfgFormasPagosMinAggregateInputType
    _max?: CfgFormasPagosMaxAggregateInputType
  }

  export type CfgFormasPagosGroupByOutputType = {
    id: number
    forma_pago: string
    descripcion: string
    permite_cuotas: boolean
    activo: boolean
    _count: CfgFormasPagosCountAggregateOutputType | null
    _avg: CfgFormasPagosAvgAggregateOutputType | null
    _sum: CfgFormasPagosSumAggregateOutputType | null
    _min: CfgFormasPagosMinAggregateOutputType | null
    _max: CfgFormasPagosMaxAggregateOutputType | null
  }

  type GetCfgFormasPagosGroupByPayload<T extends CfgFormasPagosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CfgFormasPagosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CfgFormasPagosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CfgFormasPagosGroupByOutputType[P]>
            : GetScalarType<T[P], CfgFormasPagosGroupByOutputType[P]>
        }
      >
    >


  export type CfgFormasPagosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    forma_pago?: boolean
    descripcion?: boolean
    permite_cuotas?: boolean
    activo?: boolean
  }, ExtArgs["result"]["cfgFormasPagos"]>



  export type CfgFormasPagosSelectScalar = {
    id?: boolean
    forma_pago?: boolean
    descripcion?: boolean
    permite_cuotas?: boolean
    activo?: boolean
  }

  export type CfgFormasPagosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "forma_pago" | "descripcion" | "permite_cuotas" | "activo", ExtArgs["result"]["cfgFormasPagos"]>

  export type $CfgFormasPagosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CfgFormasPagos"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      forma_pago: string
      descripcion: string
      permite_cuotas: boolean
      activo: boolean
    }, ExtArgs["result"]["cfgFormasPagos"]>
    composites: {}
  }

  type CfgFormasPagosGetPayload<S extends boolean | null | undefined | CfgFormasPagosDefaultArgs> = $Result.GetResult<Prisma.$CfgFormasPagosPayload, S>

  type CfgFormasPagosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CfgFormasPagosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CfgFormasPagosCountAggregateInputType | true
    }

  export interface CfgFormasPagosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CfgFormasPagos'], meta: { name: 'CfgFormasPagos' } }
    /**
     * Find zero or one CfgFormasPagos that matches the filter.
     * @param {CfgFormasPagosFindUniqueArgs} args - Arguments to find a CfgFormasPagos
     * @example
     * // Get one CfgFormasPagos
     * const cfgFormasPagos = await prisma.cfgFormasPagos.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CfgFormasPagosFindUniqueArgs>(args: SelectSubset<T, CfgFormasPagosFindUniqueArgs<ExtArgs>>): Prisma__CfgFormasPagosClient<$Result.GetResult<Prisma.$CfgFormasPagosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CfgFormasPagos that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CfgFormasPagosFindUniqueOrThrowArgs} args - Arguments to find a CfgFormasPagos
     * @example
     * // Get one CfgFormasPagos
     * const cfgFormasPagos = await prisma.cfgFormasPagos.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CfgFormasPagosFindUniqueOrThrowArgs>(args: SelectSubset<T, CfgFormasPagosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CfgFormasPagosClient<$Result.GetResult<Prisma.$CfgFormasPagosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CfgFormasPagos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgFormasPagosFindFirstArgs} args - Arguments to find a CfgFormasPagos
     * @example
     * // Get one CfgFormasPagos
     * const cfgFormasPagos = await prisma.cfgFormasPagos.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CfgFormasPagosFindFirstArgs>(args?: SelectSubset<T, CfgFormasPagosFindFirstArgs<ExtArgs>>): Prisma__CfgFormasPagosClient<$Result.GetResult<Prisma.$CfgFormasPagosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CfgFormasPagos that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgFormasPagosFindFirstOrThrowArgs} args - Arguments to find a CfgFormasPagos
     * @example
     * // Get one CfgFormasPagos
     * const cfgFormasPagos = await prisma.cfgFormasPagos.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CfgFormasPagosFindFirstOrThrowArgs>(args?: SelectSubset<T, CfgFormasPagosFindFirstOrThrowArgs<ExtArgs>>): Prisma__CfgFormasPagosClient<$Result.GetResult<Prisma.$CfgFormasPagosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CfgFormasPagos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgFormasPagosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CfgFormasPagos
     * const cfgFormasPagos = await prisma.cfgFormasPagos.findMany()
     * 
     * // Get first 10 CfgFormasPagos
     * const cfgFormasPagos = await prisma.cfgFormasPagos.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cfgFormasPagosWithIdOnly = await prisma.cfgFormasPagos.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CfgFormasPagosFindManyArgs>(args?: SelectSubset<T, CfgFormasPagosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CfgFormasPagosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CfgFormasPagos.
     * @param {CfgFormasPagosCreateArgs} args - Arguments to create a CfgFormasPagos.
     * @example
     * // Create one CfgFormasPagos
     * const CfgFormasPagos = await prisma.cfgFormasPagos.create({
     *   data: {
     *     // ... data to create a CfgFormasPagos
     *   }
     * })
     * 
     */
    create<T extends CfgFormasPagosCreateArgs>(args: SelectSubset<T, CfgFormasPagosCreateArgs<ExtArgs>>): Prisma__CfgFormasPagosClient<$Result.GetResult<Prisma.$CfgFormasPagosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CfgFormasPagos.
     * @param {CfgFormasPagosCreateManyArgs} args - Arguments to create many CfgFormasPagos.
     * @example
     * // Create many CfgFormasPagos
     * const cfgFormasPagos = await prisma.cfgFormasPagos.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CfgFormasPagosCreateManyArgs>(args?: SelectSubset<T, CfgFormasPagosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a CfgFormasPagos.
     * @param {CfgFormasPagosDeleteArgs} args - Arguments to delete one CfgFormasPagos.
     * @example
     * // Delete one CfgFormasPagos
     * const CfgFormasPagos = await prisma.cfgFormasPagos.delete({
     *   where: {
     *     // ... filter to delete one CfgFormasPagos
     *   }
     * })
     * 
     */
    delete<T extends CfgFormasPagosDeleteArgs>(args: SelectSubset<T, CfgFormasPagosDeleteArgs<ExtArgs>>): Prisma__CfgFormasPagosClient<$Result.GetResult<Prisma.$CfgFormasPagosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CfgFormasPagos.
     * @param {CfgFormasPagosUpdateArgs} args - Arguments to update one CfgFormasPagos.
     * @example
     * // Update one CfgFormasPagos
     * const cfgFormasPagos = await prisma.cfgFormasPagos.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CfgFormasPagosUpdateArgs>(args: SelectSubset<T, CfgFormasPagosUpdateArgs<ExtArgs>>): Prisma__CfgFormasPagosClient<$Result.GetResult<Prisma.$CfgFormasPagosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CfgFormasPagos.
     * @param {CfgFormasPagosDeleteManyArgs} args - Arguments to filter CfgFormasPagos to delete.
     * @example
     * // Delete a few CfgFormasPagos
     * const { count } = await prisma.cfgFormasPagos.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CfgFormasPagosDeleteManyArgs>(args?: SelectSubset<T, CfgFormasPagosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CfgFormasPagos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgFormasPagosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CfgFormasPagos
     * const cfgFormasPagos = await prisma.cfgFormasPagos.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CfgFormasPagosUpdateManyArgs>(args: SelectSubset<T, CfgFormasPagosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CfgFormasPagos.
     * @param {CfgFormasPagosUpsertArgs} args - Arguments to update or create a CfgFormasPagos.
     * @example
     * // Update or create a CfgFormasPagos
     * const cfgFormasPagos = await prisma.cfgFormasPagos.upsert({
     *   create: {
     *     // ... data to create a CfgFormasPagos
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CfgFormasPagos we want to update
     *   }
     * })
     */
    upsert<T extends CfgFormasPagosUpsertArgs>(args: SelectSubset<T, CfgFormasPagosUpsertArgs<ExtArgs>>): Prisma__CfgFormasPagosClient<$Result.GetResult<Prisma.$CfgFormasPagosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CfgFormasPagos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgFormasPagosCountArgs} args - Arguments to filter CfgFormasPagos to count.
     * @example
     * // Count the number of CfgFormasPagos
     * const count = await prisma.cfgFormasPagos.count({
     *   where: {
     *     // ... the filter for the CfgFormasPagos we want to count
     *   }
     * })
    **/
    count<T extends CfgFormasPagosCountArgs>(
      args?: Subset<T, CfgFormasPagosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CfgFormasPagosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CfgFormasPagos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgFormasPagosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CfgFormasPagosAggregateArgs>(args: Subset<T, CfgFormasPagosAggregateArgs>): Prisma.PrismaPromise<GetCfgFormasPagosAggregateType<T>>

    /**
     * Group by CfgFormasPagos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgFormasPagosGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CfgFormasPagosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CfgFormasPagosGroupByArgs['orderBy'] }
        : { orderBy?: CfgFormasPagosGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CfgFormasPagosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCfgFormasPagosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CfgFormasPagos model
   */
  readonly fields: CfgFormasPagosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CfgFormasPagos.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CfgFormasPagosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CfgFormasPagos model
   */
  interface CfgFormasPagosFieldRefs {
    readonly id: FieldRef<"CfgFormasPagos", 'Int'>
    readonly forma_pago: FieldRef<"CfgFormasPagos", 'String'>
    readonly descripcion: FieldRef<"CfgFormasPagos", 'String'>
    readonly permite_cuotas: FieldRef<"CfgFormasPagos", 'Boolean'>
    readonly activo: FieldRef<"CfgFormasPagos", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * CfgFormasPagos findUnique
   */
  export type CfgFormasPagosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgFormasPagos
     */
    select?: CfgFormasPagosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgFormasPagos
     */
    omit?: CfgFormasPagosOmit<ExtArgs> | null
    /**
     * Filter, which CfgFormasPagos to fetch.
     */
    where: CfgFormasPagosWhereUniqueInput
  }

  /**
   * CfgFormasPagos findUniqueOrThrow
   */
  export type CfgFormasPagosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgFormasPagos
     */
    select?: CfgFormasPagosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgFormasPagos
     */
    omit?: CfgFormasPagosOmit<ExtArgs> | null
    /**
     * Filter, which CfgFormasPagos to fetch.
     */
    where: CfgFormasPagosWhereUniqueInput
  }

  /**
   * CfgFormasPagos findFirst
   */
  export type CfgFormasPagosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgFormasPagos
     */
    select?: CfgFormasPagosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgFormasPagos
     */
    omit?: CfgFormasPagosOmit<ExtArgs> | null
    /**
     * Filter, which CfgFormasPagos to fetch.
     */
    where?: CfgFormasPagosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CfgFormasPagos to fetch.
     */
    orderBy?: CfgFormasPagosOrderByWithRelationInput | CfgFormasPagosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CfgFormasPagos.
     */
    cursor?: CfgFormasPagosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CfgFormasPagos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CfgFormasPagos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CfgFormasPagos.
     */
    distinct?: CfgFormasPagosScalarFieldEnum | CfgFormasPagosScalarFieldEnum[]
  }

  /**
   * CfgFormasPagos findFirstOrThrow
   */
  export type CfgFormasPagosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgFormasPagos
     */
    select?: CfgFormasPagosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgFormasPagos
     */
    omit?: CfgFormasPagosOmit<ExtArgs> | null
    /**
     * Filter, which CfgFormasPagos to fetch.
     */
    where?: CfgFormasPagosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CfgFormasPagos to fetch.
     */
    orderBy?: CfgFormasPagosOrderByWithRelationInput | CfgFormasPagosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CfgFormasPagos.
     */
    cursor?: CfgFormasPagosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CfgFormasPagos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CfgFormasPagos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CfgFormasPagos.
     */
    distinct?: CfgFormasPagosScalarFieldEnum | CfgFormasPagosScalarFieldEnum[]
  }

  /**
   * CfgFormasPagos findMany
   */
  export type CfgFormasPagosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgFormasPagos
     */
    select?: CfgFormasPagosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgFormasPagos
     */
    omit?: CfgFormasPagosOmit<ExtArgs> | null
    /**
     * Filter, which CfgFormasPagos to fetch.
     */
    where?: CfgFormasPagosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CfgFormasPagos to fetch.
     */
    orderBy?: CfgFormasPagosOrderByWithRelationInput | CfgFormasPagosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CfgFormasPagos.
     */
    cursor?: CfgFormasPagosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CfgFormasPagos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CfgFormasPagos.
     */
    skip?: number
    distinct?: CfgFormasPagosScalarFieldEnum | CfgFormasPagosScalarFieldEnum[]
  }

  /**
   * CfgFormasPagos create
   */
  export type CfgFormasPagosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgFormasPagos
     */
    select?: CfgFormasPagosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgFormasPagos
     */
    omit?: CfgFormasPagosOmit<ExtArgs> | null
    /**
     * The data needed to create a CfgFormasPagos.
     */
    data: XOR<CfgFormasPagosCreateInput, CfgFormasPagosUncheckedCreateInput>
  }

  /**
   * CfgFormasPagos createMany
   */
  export type CfgFormasPagosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CfgFormasPagos.
     */
    data: CfgFormasPagosCreateManyInput | CfgFormasPagosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CfgFormasPagos update
   */
  export type CfgFormasPagosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgFormasPagos
     */
    select?: CfgFormasPagosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgFormasPagos
     */
    omit?: CfgFormasPagosOmit<ExtArgs> | null
    /**
     * The data needed to update a CfgFormasPagos.
     */
    data: XOR<CfgFormasPagosUpdateInput, CfgFormasPagosUncheckedUpdateInput>
    /**
     * Choose, which CfgFormasPagos to update.
     */
    where: CfgFormasPagosWhereUniqueInput
  }

  /**
   * CfgFormasPagos updateMany
   */
  export type CfgFormasPagosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CfgFormasPagos.
     */
    data: XOR<CfgFormasPagosUpdateManyMutationInput, CfgFormasPagosUncheckedUpdateManyInput>
    /**
     * Filter which CfgFormasPagos to update
     */
    where?: CfgFormasPagosWhereInput
    /**
     * Limit how many CfgFormasPagos to update.
     */
    limit?: number
  }

  /**
   * CfgFormasPagos upsert
   */
  export type CfgFormasPagosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgFormasPagos
     */
    select?: CfgFormasPagosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgFormasPagos
     */
    omit?: CfgFormasPagosOmit<ExtArgs> | null
    /**
     * The filter to search for the CfgFormasPagos to update in case it exists.
     */
    where: CfgFormasPagosWhereUniqueInput
    /**
     * In case the CfgFormasPagos found by the `where` argument doesn't exist, create a new CfgFormasPagos with this data.
     */
    create: XOR<CfgFormasPagosCreateInput, CfgFormasPagosUncheckedCreateInput>
    /**
     * In case the CfgFormasPagos was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CfgFormasPagosUpdateInput, CfgFormasPagosUncheckedUpdateInput>
  }

  /**
   * CfgFormasPagos delete
   */
  export type CfgFormasPagosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgFormasPagos
     */
    select?: CfgFormasPagosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgFormasPagos
     */
    omit?: CfgFormasPagosOmit<ExtArgs> | null
    /**
     * Filter which CfgFormasPagos to delete.
     */
    where: CfgFormasPagosWhereUniqueInput
  }

  /**
   * CfgFormasPagos deleteMany
   */
  export type CfgFormasPagosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CfgFormasPagos to delete
     */
    where?: CfgFormasPagosWhereInput
    /**
     * Limit how many CfgFormasPagos to delete.
     */
    limit?: number
  }

  /**
   * CfgFormasPagos without action
   */
  export type CfgFormasPagosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgFormasPagos
     */
    select?: CfgFormasPagosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgFormasPagos
     */
    omit?: CfgFormasPagosOmit<ExtArgs> | null
  }


  /**
   * Model CfgMonedas
   */

  export type AggregateCfgMonedas = {
    _count: CfgMonedasCountAggregateOutputType | null
    _avg: CfgMonedasAvgAggregateOutputType | null
    _sum: CfgMonedasSumAggregateOutputType | null
    _min: CfgMonedasMinAggregateOutputType | null
    _max: CfgMonedasMaxAggregateOutputType | null
  }

  export type CfgMonedasAvgAggregateOutputType = {
    id: number | null
  }

  export type CfgMonedasSumAggregateOutputType = {
    id: number | null
  }

  export type CfgMonedasMinAggregateOutputType = {
    id: number | null
    moneda: string | null
    moneda_des: string | null
    activo: boolean | null
  }

  export type CfgMonedasMaxAggregateOutputType = {
    id: number | null
    moneda: string | null
    moneda_des: string | null
    activo: boolean | null
  }

  export type CfgMonedasCountAggregateOutputType = {
    id: number
    moneda: number
    moneda_des: number
    activo: number
    _all: number
  }


  export type CfgMonedasAvgAggregateInputType = {
    id?: true
  }

  export type CfgMonedasSumAggregateInputType = {
    id?: true
  }

  export type CfgMonedasMinAggregateInputType = {
    id?: true
    moneda?: true
    moneda_des?: true
    activo?: true
  }

  export type CfgMonedasMaxAggregateInputType = {
    id?: true
    moneda?: true
    moneda_des?: true
    activo?: true
  }

  export type CfgMonedasCountAggregateInputType = {
    id?: true
    moneda?: true
    moneda_des?: true
    activo?: true
    _all?: true
  }

  export type CfgMonedasAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CfgMonedas to aggregate.
     */
    where?: CfgMonedasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CfgMonedas to fetch.
     */
    orderBy?: CfgMonedasOrderByWithRelationInput | CfgMonedasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CfgMonedasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CfgMonedas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CfgMonedas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CfgMonedas
    **/
    _count?: true | CfgMonedasCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CfgMonedasAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CfgMonedasSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CfgMonedasMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CfgMonedasMaxAggregateInputType
  }

  export type GetCfgMonedasAggregateType<T extends CfgMonedasAggregateArgs> = {
        [P in keyof T & keyof AggregateCfgMonedas]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCfgMonedas[P]>
      : GetScalarType<T[P], AggregateCfgMonedas[P]>
  }




  export type CfgMonedasGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CfgMonedasWhereInput
    orderBy?: CfgMonedasOrderByWithAggregationInput | CfgMonedasOrderByWithAggregationInput[]
    by: CfgMonedasScalarFieldEnum[] | CfgMonedasScalarFieldEnum
    having?: CfgMonedasScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CfgMonedasCountAggregateInputType | true
    _avg?: CfgMonedasAvgAggregateInputType
    _sum?: CfgMonedasSumAggregateInputType
    _min?: CfgMonedasMinAggregateInputType
    _max?: CfgMonedasMaxAggregateInputType
  }

  export type CfgMonedasGroupByOutputType = {
    id: number
    moneda: string
    moneda_des: string
    activo: boolean
    _count: CfgMonedasCountAggregateOutputType | null
    _avg: CfgMonedasAvgAggregateOutputType | null
    _sum: CfgMonedasSumAggregateOutputType | null
    _min: CfgMonedasMinAggregateOutputType | null
    _max: CfgMonedasMaxAggregateOutputType | null
  }

  type GetCfgMonedasGroupByPayload<T extends CfgMonedasGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CfgMonedasGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CfgMonedasGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CfgMonedasGroupByOutputType[P]>
            : GetScalarType<T[P], CfgMonedasGroupByOutputType[P]>
        }
      >
    >


  export type CfgMonedasSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    moneda?: boolean
    moneda_des?: boolean
    activo?: boolean
    Producto?: boolean | CfgMonedas$ProductoArgs<ExtArgs>
    _count?: boolean | CfgMonedasCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cfgMonedas"]>



  export type CfgMonedasSelectScalar = {
    id?: boolean
    moneda?: boolean
    moneda_des?: boolean
    activo?: boolean
  }

  export type CfgMonedasOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "moneda" | "moneda_des" | "activo", ExtArgs["result"]["cfgMonedas"]>
  export type CfgMonedasInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Producto?: boolean | CfgMonedas$ProductoArgs<ExtArgs>
    _count?: boolean | CfgMonedasCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $CfgMonedasPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CfgMonedas"
    objects: {
      Producto: Prisma.$ProductosPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      moneda: string
      moneda_des: string
      activo: boolean
    }, ExtArgs["result"]["cfgMonedas"]>
    composites: {}
  }

  type CfgMonedasGetPayload<S extends boolean | null | undefined | CfgMonedasDefaultArgs> = $Result.GetResult<Prisma.$CfgMonedasPayload, S>

  type CfgMonedasCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CfgMonedasFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CfgMonedasCountAggregateInputType | true
    }

  export interface CfgMonedasDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CfgMonedas'], meta: { name: 'CfgMonedas' } }
    /**
     * Find zero or one CfgMonedas that matches the filter.
     * @param {CfgMonedasFindUniqueArgs} args - Arguments to find a CfgMonedas
     * @example
     * // Get one CfgMonedas
     * const cfgMonedas = await prisma.cfgMonedas.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CfgMonedasFindUniqueArgs>(args: SelectSubset<T, CfgMonedasFindUniqueArgs<ExtArgs>>): Prisma__CfgMonedasClient<$Result.GetResult<Prisma.$CfgMonedasPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CfgMonedas that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CfgMonedasFindUniqueOrThrowArgs} args - Arguments to find a CfgMonedas
     * @example
     * // Get one CfgMonedas
     * const cfgMonedas = await prisma.cfgMonedas.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CfgMonedasFindUniqueOrThrowArgs>(args: SelectSubset<T, CfgMonedasFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CfgMonedasClient<$Result.GetResult<Prisma.$CfgMonedasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CfgMonedas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgMonedasFindFirstArgs} args - Arguments to find a CfgMonedas
     * @example
     * // Get one CfgMonedas
     * const cfgMonedas = await prisma.cfgMonedas.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CfgMonedasFindFirstArgs>(args?: SelectSubset<T, CfgMonedasFindFirstArgs<ExtArgs>>): Prisma__CfgMonedasClient<$Result.GetResult<Prisma.$CfgMonedasPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CfgMonedas that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgMonedasFindFirstOrThrowArgs} args - Arguments to find a CfgMonedas
     * @example
     * // Get one CfgMonedas
     * const cfgMonedas = await prisma.cfgMonedas.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CfgMonedasFindFirstOrThrowArgs>(args?: SelectSubset<T, CfgMonedasFindFirstOrThrowArgs<ExtArgs>>): Prisma__CfgMonedasClient<$Result.GetResult<Prisma.$CfgMonedasPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CfgMonedas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgMonedasFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CfgMonedas
     * const cfgMonedas = await prisma.cfgMonedas.findMany()
     * 
     * // Get first 10 CfgMonedas
     * const cfgMonedas = await prisma.cfgMonedas.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cfgMonedasWithIdOnly = await prisma.cfgMonedas.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CfgMonedasFindManyArgs>(args?: SelectSubset<T, CfgMonedasFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CfgMonedasPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CfgMonedas.
     * @param {CfgMonedasCreateArgs} args - Arguments to create a CfgMonedas.
     * @example
     * // Create one CfgMonedas
     * const CfgMonedas = await prisma.cfgMonedas.create({
     *   data: {
     *     // ... data to create a CfgMonedas
     *   }
     * })
     * 
     */
    create<T extends CfgMonedasCreateArgs>(args: SelectSubset<T, CfgMonedasCreateArgs<ExtArgs>>): Prisma__CfgMonedasClient<$Result.GetResult<Prisma.$CfgMonedasPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CfgMonedas.
     * @param {CfgMonedasCreateManyArgs} args - Arguments to create many CfgMonedas.
     * @example
     * // Create many CfgMonedas
     * const cfgMonedas = await prisma.cfgMonedas.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CfgMonedasCreateManyArgs>(args?: SelectSubset<T, CfgMonedasCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a CfgMonedas.
     * @param {CfgMonedasDeleteArgs} args - Arguments to delete one CfgMonedas.
     * @example
     * // Delete one CfgMonedas
     * const CfgMonedas = await prisma.cfgMonedas.delete({
     *   where: {
     *     // ... filter to delete one CfgMonedas
     *   }
     * })
     * 
     */
    delete<T extends CfgMonedasDeleteArgs>(args: SelectSubset<T, CfgMonedasDeleteArgs<ExtArgs>>): Prisma__CfgMonedasClient<$Result.GetResult<Prisma.$CfgMonedasPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CfgMonedas.
     * @param {CfgMonedasUpdateArgs} args - Arguments to update one CfgMonedas.
     * @example
     * // Update one CfgMonedas
     * const cfgMonedas = await prisma.cfgMonedas.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CfgMonedasUpdateArgs>(args: SelectSubset<T, CfgMonedasUpdateArgs<ExtArgs>>): Prisma__CfgMonedasClient<$Result.GetResult<Prisma.$CfgMonedasPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CfgMonedas.
     * @param {CfgMonedasDeleteManyArgs} args - Arguments to filter CfgMonedas to delete.
     * @example
     * // Delete a few CfgMonedas
     * const { count } = await prisma.cfgMonedas.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CfgMonedasDeleteManyArgs>(args?: SelectSubset<T, CfgMonedasDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CfgMonedas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgMonedasUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CfgMonedas
     * const cfgMonedas = await prisma.cfgMonedas.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CfgMonedasUpdateManyArgs>(args: SelectSubset<T, CfgMonedasUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CfgMonedas.
     * @param {CfgMonedasUpsertArgs} args - Arguments to update or create a CfgMonedas.
     * @example
     * // Update or create a CfgMonedas
     * const cfgMonedas = await prisma.cfgMonedas.upsert({
     *   create: {
     *     // ... data to create a CfgMonedas
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CfgMonedas we want to update
     *   }
     * })
     */
    upsert<T extends CfgMonedasUpsertArgs>(args: SelectSubset<T, CfgMonedasUpsertArgs<ExtArgs>>): Prisma__CfgMonedasClient<$Result.GetResult<Prisma.$CfgMonedasPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CfgMonedas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgMonedasCountArgs} args - Arguments to filter CfgMonedas to count.
     * @example
     * // Count the number of CfgMonedas
     * const count = await prisma.cfgMonedas.count({
     *   where: {
     *     // ... the filter for the CfgMonedas we want to count
     *   }
     * })
    **/
    count<T extends CfgMonedasCountArgs>(
      args?: Subset<T, CfgMonedasCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CfgMonedasCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CfgMonedas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgMonedasAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CfgMonedasAggregateArgs>(args: Subset<T, CfgMonedasAggregateArgs>): Prisma.PrismaPromise<GetCfgMonedasAggregateType<T>>

    /**
     * Group by CfgMonedas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgMonedasGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CfgMonedasGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CfgMonedasGroupByArgs['orderBy'] }
        : { orderBy?: CfgMonedasGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CfgMonedasGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCfgMonedasGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CfgMonedas model
   */
  readonly fields: CfgMonedasFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CfgMonedas.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CfgMonedasClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Producto<T extends CfgMonedas$ProductoArgs<ExtArgs> = {}>(args?: Subset<T, CfgMonedas$ProductoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CfgMonedas model
   */
  interface CfgMonedasFieldRefs {
    readonly id: FieldRef<"CfgMonedas", 'Int'>
    readonly moneda: FieldRef<"CfgMonedas", 'String'>
    readonly moneda_des: FieldRef<"CfgMonedas", 'String'>
    readonly activo: FieldRef<"CfgMonedas", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * CfgMonedas findUnique
   */
  export type CfgMonedasFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgMonedas
     */
    select?: CfgMonedasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgMonedas
     */
    omit?: CfgMonedasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CfgMonedasInclude<ExtArgs> | null
    /**
     * Filter, which CfgMonedas to fetch.
     */
    where: CfgMonedasWhereUniqueInput
  }

  /**
   * CfgMonedas findUniqueOrThrow
   */
  export type CfgMonedasFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgMonedas
     */
    select?: CfgMonedasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgMonedas
     */
    omit?: CfgMonedasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CfgMonedasInclude<ExtArgs> | null
    /**
     * Filter, which CfgMonedas to fetch.
     */
    where: CfgMonedasWhereUniqueInput
  }

  /**
   * CfgMonedas findFirst
   */
  export type CfgMonedasFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgMonedas
     */
    select?: CfgMonedasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgMonedas
     */
    omit?: CfgMonedasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CfgMonedasInclude<ExtArgs> | null
    /**
     * Filter, which CfgMonedas to fetch.
     */
    where?: CfgMonedasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CfgMonedas to fetch.
     */
    orderBy?: CfgMonedasOrderByWithRelationInput | CfgMonedasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CfgMonedas.
     */
    cursor?: CfgMonedasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CfgMonedas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CfgMonedas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CfgMonedas.
     */
    distinct?: CfgMonedasScalarFieldEnum | CfgMonedasScalarFieldEnum[]
  }

  /**
   * CfgMonedas findFirstOrThrow
   */
  export type CfgMonedasFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgMonedas
     */
    select?: CfgMonedasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgMonedas
     */
    omit?: CfgMonedasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CfgMonedasInclude<ExtArgs> | null
    /**
     * Filter, which CfgMonedas to fetch.
     */
    where?: CfgMonedasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CfgMonedas to fetch.
     */
    orderBy?: CfgMonedasOrderByWithRelationInput | CfgMonedasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CfgMonedas.
     */
    cursor?: CfgMonedasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CfgMonedas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CfgMonedas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CfgMonedas.
     */
    distinct?: CfgMonedasScalarFieldEnum | CfgMonedasScalarFieldEnum[]
  }

  /**
   * CfgMonedas findMany
   */
  export type CfgMonedasFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgMonedas
     */
    select?: CfgMonedasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgMonedas
     */
    omit?: CfgMonedasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CfgMonedasInclude<ExtArgs> | null
    /**
     * Filter, which CfgMonedas to fetch.
     */
    where?: CfgMonedasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CfgMonedas to fetch.
     */
    orderBy?: CfgMonedasOrderByWithRelationInput | CfgMonedasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CfgMonedas.
     */
    cursor?: CfgMonedasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CfgMonedas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CfgMonedas.
     */
    skip?: number
    distinct?: CfgMonedasScalarFieldEnum | CfgMonedasScalarFieldEnum[]
  }

  /**
   * CfgMonedas create
   */
  export type CfgMonedasCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgMonedas
     */
    select?: CfgMonedasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgMonedas
     */
    omit?: CfgMonedasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CfgMonedasInclude<ExtArgs> | null
    /**
     * The data needed to create a CfgMonedas.
     */
    data: XOR<CfgMonedasCreateInput, CfgMonedasUncheckedCreateInput>
  }

  /**
   * CfgMonedas createMany
   */
  export type CfgMonedasCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CfgMonedas.
     */
    data: CfgMonedasCreateManyInput | CfgMonedasCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CfgMonedas update
   */
  export type CfgMonedasUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgMonedas
     */
    select?: CfgMonedasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgMonedas
     */
    omit?: CfgMonedasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CfgMonedasInclude<ExtArgs> | null
    /**
     * The data needed to update a CfgMonedas.
     */
    data: XOR<CfgMonedasUpdateInput, CfgMonedasUncheckedUpdateInput>
    /**
     * Choose, which CfgMonedas to update.
     */
    where: CfgMonedasWhereUniqueInput
  }

  /**
   * CfgMonedas updateMany
   */
  export type CfgMonedasUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CfgMonedas.
     */
    data: XOR<CfgMonedasUpdateManyMutationInput, CfgMonedasUncheckedUpdateManyInput>
    /**
     * Filter which CfgMonedas to update
     */
    where?: CfgMonedasWhereInput
    /**
     * Limit how many CfgMonedas to update.
     */
    limit?: number
  }

  /**
   * CfgMonedas upsert
   */
  export type CfgMonedasUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgMonedas
     */
    select?: CfgMonedasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgMonedas
     */
    omit?: CfgMonedasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CfgMonedasInclude<ExtArgs> | null
    /**
     * The filter to search for the CfgMonedas to update in case it exists.
     */
    where: CfgMonedasWhereUniqueInput
    /**
     * In case the CfgMonedas found by the `where` argument doesn't exist, create a new CfgMonedas with this data.
     */
    create: XOR<CfgMonedasCreateInput, CfgMonedasUncheckedCreateInput>
    /**
     * In case the CfgMonedas was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CfgMonedasUpdateInput, CfgMonedasUncheckedUpdateInput>
  }

  /**
   * CfgMonedas delete
   */
  export type CfgMonedasDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgMonedas
     */
    select?: CfgMonedasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgMonedas
     */
    omit?: CfgMonedasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CfgMonedasInclude<ExtArgs> | null
    /**
     * Filter which CfgMonedas to delete.
     */
    where: CfgMonedasWhereUniqueInput
  }

  /**
   * CfgMonedas deleteMany
   */
  export type CfgMonedasDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CfgMonedas to delete
     */
    where?: CfgMonedasWhereInput
    /**
     * Limit how many CfgMonedas to delete.
     */
    limit?: number
  }

  /**
   * CfgMonedas.Producto
   */
  export type CfgMonedas$ProductoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Productos
     */
    select?: ProductosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Productos
     */
    omit?: ProductosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductosInclude<ExtArgs> | null
    where?: ProductosWhereInput
    orderBy?: ProductosOrderByWithRelationInput | ProductosOrderByWithRelationInput[]
    cursor?: ProductosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductosScalarFieldEnum | ProductosScalarFieldEnum[]
  }

  /**
   * CfgMonedas without action
   */
  export type CfgMonedasDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgMonedas
     */
    select?: CfgMonedasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgMonedas
     */
    omit?: CfgMonedasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CfgMonedasInclude<ExtArgs> | null
  }


  /**
   * Model CfgSlider
   */

  export type AggregateCfgSlider = {
    _count: CfgSliderCountAggregateOutputType | null
    _avg: CfgSliderAvgAggregateOutputType | null
    _sum: CfgSliderSumAggregateOutputType | null
    _min: CfgSliderMinAggregateOutputType | null
    _max: CfgSliderMaxAggregateOutputType | null
  }

  export type CfgSliderAvgAggregateOutputType = {
    id: number | null
    orden: number | null
  }

  export type CfgSliderSumAggregateOutputType = {
    id: number | null
    orden: number | null
  }

  export type CfgSliderMinAggregateOutputType = {
    id: number | null
    titulo: string | null
    thumbs: string | null
    foto: string | null
    orden: number | null
    activo: boolean | null
  }

  export type CfgSliderMaxAggregateOutputType = {
    id: number | null
    titulo: string | null
    thumbs: string | null
    foto: string | null
    orden: number | null
    activo: boolean | null
  }

  export type CfgSliderCountAggregateOutputType = {
    id: number
    titulo: number
    thumbs: number
    foto: number
    orden: number
    activo: number
    _all: number
  }


  export type CfgSliderAvgAggregateInputType = {
    id?: true
    orden?: true
  }

  export type CfgSliderSumAggregateInputType = {
    id?: true
    orden?: true
  }

  export type CfgSliderMinAggregateInputType = {
    id?: true
    titulo?: true
    thumbs?: true
    foto?: true
    orden?: true
    activo?: true
  }

  export type CfgSliderMaxAggregateInputType = {
    id?: true
    titulo?: true
    thumbs?: true
    foto?: true
    orden?: true
    activo?: true
  }

  export type CfgSliderCountAggregateInputType = {
    id?: true
    titulo?: true
    thumbs?: true
    foto?: true
    orden?: true
    activo?: true
    _all?: true
  }

  export type CfgSliderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CfgSlider to aggregate.
     */
    where?: CfgSliderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CfgSliders to fetch.
     */
    orderBy?: CfgSliderOrderByWithRelationInput | CfgSliderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CfgSliderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CfgSliders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CfgSliders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CfgSliders
    **/
    _count?: true | CfgSliderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CfgSliderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CfgSliderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CfgSliderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CfgSliderMaxAggregateInputType
  }

  export type GetCfgSliderAggregateType<T extends CfgSliderAggregateArgs> = {
        [P in keyof T & keyof AggregateCfgSlider]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCfgSlider[P]>
      : GetScalarType<T[P], AggregateCfgSlider[P]>
  }




  export type CfgSliderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CfgSliderWhereInput
    orderBy?: CfgSliderOrderByWithAggregationInput | CfgSliderOrderByWithAggregationInput[]
    by: CfgSliderScalarFieldEnum[] | CfgSliderScalarFieldEnum
    having?: CfgSliderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CfgSliderCountAggregateInputType | true
    _avg?: CfgSliderAvgAggregateInputType
    _sum?: CfgSliderSumAggregateInputType
    _min?: CfgSliderMinAggregateInputType
    _max?: CfgSliderMaxAggregateInputType
  }

  export type CfgSliderGroupByOutputType = {
    id: number
    titulo: string
    thumbs: string | null
    foto: string | null
    orden: number
    activo: boolean
    _count: CfgSliderCountAggregateOutputType | null
    _avg: CfgSliderAvgAggregateOutputType | null
    _sum: CfgSliderSumAggregateOutputType | null
    _min: CfgSliderMinAggregateOutputType | null
    _max: CfgSliderMaxAggregateOutputType | null
  }

  type GetCfgSliderGroupByPayload<T extends CfgSliderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CfgSliderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CfgSliderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CfgSliderGroupByOutputType[P]>
            : GetScalarType<T[P], CfgSliderGroupByOutputType[P]>
        }
      >
    >


  export type CfgSliderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
    thumbs?: boolean
    foto?: boolean
    orden?: boolean
    activo?: boolean
  }, ExtArgs["result"]["cfgSlider"]>



  export type CfgSliderSelectScalar = {
    id?: boolean
    titulo?: boolean
    thumbs?: boolean
    foto?: boolean
    orden?: boolean
    activo?: boolean
  }

  export type CfgSliderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "titulo" | "thumbs" | "foto" | "orden" | "activo", ExtArgs["result"]["cfgSlider"]>

  export type $CfgSliderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CfgSlider"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      titulo: string
      thumbs: string | null
      foto: string | null
      orden: number
      activo: boolean
    }, ExtArgs["result"]["cfgSlider"]>
    composites: {}
  }

  type CfgSliderGetPayload<S extends boolean | null | undefined | CfgSliderDefaultArgs> = $Result.GetResult<Prisma.$CfgSliderPayload, S>

  type CfgSliderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CfgSliderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CfgSliderCountAggregateInputType | true
    }

  export interface CfgSliderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CfgSlider'], meta: { name: 'CfgSlider' } }
    /**
     * Find zero or one CfgSlider that matches the filter.
     * @param {CfgSliderFindUniqueArgs} args - Arguments to find a CfgSlider
     * @example
     * // Get one CfgSlider
     * const cfgSlider = await prisma.cfgSlider.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CfgSliderFindUniqueArgs>(args: SelectSubset<T, CfgSliderFindUniqueArgs<ExtArgs>>): Prisma__CfgSliderClient<$Result.GetResult<Prisma.$CfgSliderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CfgSlider that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CfgSliderFindUniqueOrThrowArgs} args - Arguments to find a CfgSlider
     * @example
     * // Get one CfgSlider
     * const cfgSlider = await prisma.cfgSlider.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CfgSliderFindUniqueOrThrowArgs>(args: SelectSubset<T, CfgSliderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CfgSliderClient<$Result.GetResult<Prisma.$CfgSliderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CfgSlider that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgSliderFindFirstArgs} args - Arguments to find a CfgSlider
     * @example
     * // Get one CfgSlider
     * const cfgSlider = await prisma.cfgSlider.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CfgSliderFindFirstArgs>(args?: SelectSubset<T, CfgSliderFindFirstArgs<ExtArgs>>): Prisma__CfgSliderClient<$Result.GetResult<Prisma.$CfgSliderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CfgSlider that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgSliderFindFirstOrThrowArgs} args - Arguments to find a CfgSlider
     * @example
     * // Get one CfgSlider
     * const cfgSlider = await prisma.cfgSlider.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CfgSliderFindFirstOrThrowArgs>(args?: SelectSubset<T, CfgSliderFindFirstOrThrowArgs<ExtArgs>>): Prisma__CfgSliderClient<$Result.GetResult<Prisma.$CfgSliderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CfgSliders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgSliderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CfgSliders
     * const cfgSliders = await prisma.cfgSlider.findMany()
     * 
     * // Get first 10 CfgSliders
     * const cfgSliders = await prisma.cfgSlider.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cfgSliderWithIdOnly = await prisma.cfgSlider.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CfgSliderFindManyArgs>(args?: SelectSubset<T, CfgSliderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CfgSliderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CfgSlider.
     * @param {CfgSliderCreateArgs} args - Arguments to create a CfgSlider.
     * @example
     * // Create one CfgSlider
     * const CfgSlider = await prisma.cfgSlider.create({
     *   data: {
     *     // ... data to create a CfgSlider
     *   }
     * })
     * 
     */
    create<T extends CfgSliderCreateArgs>(args: SelectSubset<T, CfgSliderCreateArgs<ExtArgs>>): Prisma__CfgSliderClient<$Result.GetResult<Prisma.$CfgSliderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CfgSliders.
     * @param {CfgSliderCreateManyArgs} args - Arguments to create many CfgSliders.
     * @example
     * // Create many CfgSliders
     * const cfgSlider = await prisma.cfgSlider.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CfgSliderCreateManyArgs>(args?: SelectSubset<T, CfgSliderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a CfgSlider.
     * @param {CfgSliderDeleteArgs} args - Arguments to delete one CfgSlider.
     * @example
     * // Delete one CfgSlider
     * const CfgSlider = await prisma.cfgSlider.delete({
     *   where: {
     *     // ... filter to delete one CfgSlider
     *   }
     * })
     * 
     */
    delete<T extends CfgSliderDeleteArgs>(args: SelectSubset<T, CfgSliderDeleteArgs<ExtArgs>>): Prisma__CfgSliderClient<$Result.GetResult<Prisma.$CfgSliderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CfgSlider.
     * @param {CfgSliderUpdateArgs} args - Arguments to update one CfgSlider.
     * @example
     * // Update one CfgSlider
     * const cfgSlider = await prisma.cfgSlider.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CfgSliderUpdateArgs>(args: SelectSubset<T, CfgSliderUpdateArgs<ExtArgs>>): Prisma__CfgSliderClient<$Result.GetResult<Prisma.$CfgSliderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CfgSliders.
     * @param {CfgSliderDeleteManyArgs} args - Arguments to filter CfgSliders to delete.
     * @example
     * // Delete a few CfgSliders
     * const { count } = await prisma.cfgSlider.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CfgSliderDeleteManyArgs>(args?: SelectSubset<T, CfgSliderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CfgSliders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgSliderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CfgSliders
     * const cfgSlider = await prisma.cfgSlider.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CfgSliderUpdateManyArgs>(args: SelectSubset<T, CfgSliderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CfgSlider.
     * @param {CfgSliderUpsertArgs} args - Arguments to update or create a CfgSlider.
     * @example
     * // Update or create a CfgSlider
     * const cfgSlider = await prisma.cfgSlider.upsert({
     *   create: {
     *     // ... data to create a CfgSlider
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CfgSlider we want to update
     *   }
     * })
     */
    upsert<T extends CfgSliderUpsertArgs>(args: SelectSubset<T, CfgSliderUpsertArgs<ExtArgs>>): Prisma__CfgSliderClient<$Result.GetResult<Prisma.$CfgSliderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CfgSliders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgSliderCountArgs} args - Arguments to filter CfgSliders to count.
     * @example
     * // Count the number of CfgSliders
     * const count = await prisma.cfgSlider.count({
     *   where: {
     *     // ... the filter for the CfgSliders we want to count
     *   }
     * })
    **/
    count<T extends CfgSliderCountArgs>(
      args?: Subset<T, CfgSliderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CfgSliderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CfgSlider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgSliderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CfgSliderAggregateArgs>(args: Subset<T, CfgSliderAggregateArgs>): Prisma.PrismaPromise<GetCfgSliderAggregateType<T>>

    /**
     * Group by CfgSlider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgSliderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CfgSliderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CfgSliderGroupByArgs['orderBy'] }
        : { orderBy?: CfgSliderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CfgSliderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCfgSliderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CfgSlider model
   */
  readonly fields: CfgSliderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CfgSlider.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CfgSliderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CfgSlider model
   */
  interface CfgSliderFieldRefs {
    readonly id: FieldRef<"CfgSlider", 'Int'>
    readonly titulo: FieldRef<"CfgSlider", 'String'>
    readonly thumbs: FieldRef<"CfgSlider", 'String'>
    readonly foto: FieldRef<"CfgSlider", 'String'>
    readonly orden: FieldRef<"CfgSlider", 'Int'>
    readonly activo: FieldRef<"CfgSlider", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * CfgSlider findUnique
   */
  export type CfgSliderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgSlider
     */
    select?: CfgSliderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgSlider
     */
    omit?: CfgSliderOmit<ExtArgs> | null
    /**
     * Filter, which CfgSlider to fetch.
     */
    where: CfgSliderWhereUniqueInput
  }

  /**
   * CfgSlider findUniqueOrThrow
   */
  export type CfgSliderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgSlider
     */
    select?: CfgSliderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgSlider
     */
    omit?: CfgSliderOmit<ExtArgs> | null
    /**
     * Filter, which CfgSlider to fetch.
     */
    where: CfgSliderWhereUniqueInput
  }

  /**
   * CfgSlider findFirst
   */
  export type CfgSliderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgSlider
     */
    select?: CfgSliderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgSlider
     */
    omit?: CfgSliderOmit<ExtArgs> | null
    /**
     * Filter, which CfgSlider to fetch.
     */
    where?: CfgSliderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CfgSliders to fetch.
     */
    orderBy?: CfgSliderOrderByWithRelationInput | CfgSliderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CfgSliders.
     */
    cursor?: CfgSliderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CfgSliders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CfgSliders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CfgSliders.
     */
    distinct?: CfgSliderScalarFieldEnum | CfgSliderScalarFieldEnum[]
  }

  /**
   * CfgSlider findFirstOrThrow
   */
  export type CfgSliderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgSlider
     */
    select?: CfgSliderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgSlider
     */
    omit?: CfgSliderOmit<ExtArgs> | null
    /**
     * Filter, which CfgSlider to fetch.
     */
    where?: CfgSliderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CfgSliders to fetch.
     */
    orderBy?: CfgSliderOrderByWithRelationInput | CfgSliderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CfgSliders.
     */
    cursor?: CfgSliderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CfgSliders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CfgSliders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CfgSliders.
     */
    distinct?: CfgSliderScalarFieldEnum | CfgSliderScalarFieldEnum[]
  }

  /**
   * CfgSlider findMany
   */
  export type CfgSliderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgSlider
     */
    select?: CfgSliderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgSlider
     */
    omit?: CfgSliderOmit<ExtArgs> | null
    /**
     * Filter, which CfgSliders to fetch.
     */
    where?: CfgSliderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CfgSliders to fetch.
     */
    orderBy?: CfgSliderOrderByWithRelationInput | CfgSliderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CfgSliders.
     */
    cursor?: CfgSliderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CfgSliders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CfgSliders.
     */
    skip?: number
    distinct?: CfgSliderScalarFieldEnum | CfgSliderScalarFieldEnum[]
  }

  /**
   * CfgSlider create
   */
  export type CfgSliderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgSlider
     */
    select?: CfgSliderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgSlider
     */
    omit?: CfgSliderOmit<ExtArgs> | null
    /**
     * The data needed to create a CfgSlider.
     */
    data: XOR<CfgSliderCreateInput, CfgSliderUncheckedCreateInput>
  }

  /**
   * CfgSlider createMany
   */
  export type CfgSliderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CfgSliders.
     */
    data: CfgSliderCreateManyInput | CfgSliderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CfgSlider update
   */
  export type CfgSliderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgSlider
     */
    select?: CfgSliderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgSlider
     */
    omit?: CfgSliderOmit<ExtArgs> | null
    /**
     * The data needed to update a CfgSlider.
     */
    data: XOR<CfgSliderUpdateInput, CfgSliderUncheckedUpdateInput>
    /**
     * Choose, which CfgSlider to update.
     */
    where: CfgSliderWhereUniqueInput
  }

  /**
   * CfgSlider updateMany
   */
  export type CfgSliderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CfgSliders.
     */
    data: XOR<CfgSliderUpdateManyMutationInput, CfgSliderUncheckedUpdateManyInput>
    /**
     * Filter which CfgSliders to update
     */
    where?: CfgSliderWhereInput
    /**
     * Limit how many CfgSliders to update.
     */
    limit?: number
  }

  /**
   * CfgSlider upsert
   */
  export type CfgSliderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgSlider
     */
    select?: CfgSliderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgSlider
     */
    omit?: CfgSliderOmit<ExtArgs> | null
    /**
     * The filter to search for the CfgSlider to update in case it exists.
     */
    where: CfgSliderWhereUniqueInput
    /**
     * In case the CfgSlider found by the `where` argument doesn't exist, create a new CfgSlider with this data.
     */
    create: XOR<CfgSliderCreateInput, CfgSliderUncheckedCreateInput>
    /**
     * In case the CfgSlider was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CfgSliderUpdateInput, CfgSliderUncheckedUpdateInput>
  }

  /**
   * CfgSlider delete
   */
  export type CfgSliderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgSlider
     */
    select?: CfgSliderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgSlider
     */
    omit?: CfgSliderOmit<ExtArgs> | null
    /**
     * Filter which CfgSlider to delete.
     */
    where: CfgSliderWhereUniqueInput
  }

  /**
   * CfgSlider deleteMany
   */
  export type CfgSliderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CfgSliders to delete
     */
    where?: CfgSliderWhereInput
    /**
     * Limit how many CfgSliders to delete.
     */
    limit?: number
  }

  /**
   * CfgSlider without action
   */
  export type CfgSliderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgSlider
     */
    select?: CfgSliderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgSlider
     */
    omit?: CfgSliderOmit<ExtArgs> | null
  }


  /**
   * Model CfgEstadoPedido
   */

  export type AggregateCfgEstadoPedido = {
    _count: CfgEstadoPedidoCountAggregateOutputType | null
    _avg: CfgEstadoPedidoAvgAggregateOutputType | null
    _sum: CfgEstadoPedidoSumAggregateOutputType | null
    _min: CfgEstadoPedidoMinAggregateOutputType | null
    _max: CfgEstadoPedidoMaxAggregateOutputType | null
  }

  export type CfgEstadoPedidoAvgAggregateOutputType = {
    orden: number | null
  }

  export type CfgEstadoPedidoSumAggregateOutputType = {
    orden: number | null
  }

  export type CfgEstadoPedidoMinAggregateOutputType = {
    id: string | null
    descripcion: string | null
    color: string | null
    orden: number | null
    es_final: boolean | null
    es_cancel: boolean | null
    activo: boolean | null
  }

  export type CfgEstadoPedidoMaxAggregateOutputType = {
    id: string | null
    descripcion: string | null
    color: string | null
    orden: number | null
    es_final: boolean | null
    es_cancel: boolean | null
    activo: boolean | null
  }

  export type CfgEstadoPedidoCountAggregateOutputType = {
    id: number
    descripcion: number
    color: number
    orden: number
    es_final: number
    es_cancel: number
    activo: number
    _all: number
  }


  export type CfgEstadoPedidoAvgAggregateInputType = {
    orden?: true
  }

  export type CfgEstadoPedidoSumAggregateInputType = {
    orden?: true
  }

  export type CfgEstadoPedidoMinAggregateInputType = {
    id?: true
    descripcion?: true
    color?: true
    orden?: true
    es_final?: true
    es_cancel?: true
    activo?: true
  }

  export type CfgEstadoPedidoMaxAggregateInputType = {
    id?: true
    descripcion?: true
    color?: true
    orden?: true
    es_final?: true
    es_cancel?: true
    activo?: true
  }

  export type CfgEstadoPedidoCountAggregateInputType = {
    id?: true
    descripcion?: true
    color?: true
    orden?: true
    es_final?: true
    es_cancel?: true
    activo?: true
    _all?: true
  }

  export type CfgEstadoPedidoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CfgEstadoPedido to aggregate.
     */
    where?: CfgEstadoPedidoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CfgEstadoPedidos to fetch.
     */
    orderBy?: CfgEstadoPedidoOrderByWithRelationInput | CfgEstadoPedidoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CfgEstadoPedidoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CfgEstadoPedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CfgEstadoPedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CfgEstadoPedidos
    **/
    _count?: true | CfgEstadoPedidoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CfgEstadoPedidoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CfgEstadoPedidoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CfgEstadoPedidoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CfgEstadoPedidoMaxAggregateInputType
  }

  export type GetCfgEstadoPedidoAggregateType<T extends CfgEstadoPedidoAggregateArgs> = {
        [P in keyof T & keyof AggregateCfgEstadoPedido]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCfgEstadoPedido[P]>
      : GetScalarType<T[P], AggregateCfgEstadoPedido[P]>
  }




  export type CfgEstadoPedidoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CfgEstadoPedidoWhereInput
    orderBy?: CfgEstadoPedidoOrderByWithAggregationInput | CfgEstadoPedidoOrderByWithAggregationInput[]
    by: CfgEstadoPedidoScalarFieldEnum[] | CfgEstadoPedidoScalarFieldEnum
    having?: CfgEstadoPedidoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CfgEstadoPedidoCountAggregateInputType | true
    _avg?: CfgEstadoPedidoAvgAggregateInputType
    _sum?: CfgEstadoPedidoSumAggregateInputType
    _min?: CfgEstadoPedidoMinAggregateInputType
    _max?: CfgEstadoPedidoMaxAggregateInputType
  }

  export type CfgEstadoPedidoGroupByOutputType = {
    id: string
    descripcion: string
    color: string | null
    orden: number
    es_final: boolean
    es_cancel: boolean
    activo: boolean
    _count: CfgEstadoPedidoCountAggregateOutputType | null
    _avg: CfgEstadoPedidoAvgAggregateOutputType | null
    _sum: CfgEstadoPedidoSumAggregateOutputType | null
    _min: CfgEstadoPedidoMinAggregateOutputType | null
    _max: CfgEstadoPedidoMaxAggregateOutputType | null
  }

  type GetCfgEstadoPedidoGroupByPayload<T extends CfgEstadoPedidoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CfgEstadoPedidoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CfgEstadoPedidoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CfgEstadoPedidoGroupByOutputType[P]>
            : GetScalarType<T[P], CfgEstadoPedidoGroupByOutputType[P]>
        }
      >
    >


  export type CfgEstadoPedidoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    descripcion?: boolean
    color?: boolean
    orden?: boolean
    es_final?: boolean
    es_cancel?: boolean
    activo?: boolean
    Pedidos?: boolean | CfgEstadoPedido$PedidosArgs<ExtArgs>
    _count?: boolean | CfgEstadoPedidoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cfgEstadoPedido"]>



  export type CfgEstadoPedidoSelectScalar = {
    id?: boolean
    descripcion?: boolean
    color?: boolean
    orden?: boolean
    es_final?: boolean
    es_cancel?: boolean
    activo?: boolean
  }

  export type CfgEstadoPedidoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "descripcion" | "color" | "orden" | "es_final" | "es_cancel" | "activo", ExtArgs["result"]["cfgEstadoPedido"]>
  export type CfgEstadoPedidoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Pedidos?: boolean | CfgEstadoPedido$PedidosArgs<ExtArgs>
    _count?: boolean | CfgEstadoPedidoCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $CfgEstadoPedidoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CfgEstadoPedido"
    objects: {
      Pedidos: Prisma.$PedidosPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      descripcion: string
      color: string | null
      orden: number
      es_final: boolean
      es_cancel: boolean
      activo: boolean
    }, ExtArgs["result"]["cfgEstadoPedido"]>
    composites: {}
  }

  type CfgEstadoPedidoGetPayload<S extends boolean | null | undefined | CfgEstadoPedidoDefaultArgs> = $Result.GetResult<Prisma.$CfgEstadoPedidoPayload, S>

  type CfgEstadoPedidoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CfgEstadoPedidoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CfgEstadoPedidoCountAggregateInputType | true
    }

  export interface CfgEstadoPedidoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CfgEstadoPedido'], meta: { name: 'CfgEstadoPedido' } }
    /**
     * Find zero or one CfgEstadoPedido that matches the filter.
     * @param {CfgEstadoPedidoFindUniqueArgs} args - Arguments to find a CfgEstadoPedido
     * @example
     * // Get one CfgEstadoPedido
     * const cfgEstadoPedido = await prisma.cfgEstadoPedido.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CfgEstadoPedidoFindUniqueArgs>(args: SelectSubset<T, CfgEstadoPedidoFindUniqueArgs<ExtArgs>>): Prisma__CfgEstadoPedidoClient<$Result.GetResult<Prisma.$CfgEstadoPedidoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CfgEstadoPedido that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CfgEstadoPedidoFindUniqueOrThrowArgs} args - Arguments to find a CfgEstadoPedido
     * @example
     * // Get one CfgEstadoPedido
     * const cfgEstadoPedido = await prisma.cfgEstadoPedido.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CfgEstadoPedidoFindUniqueOrThrowArgs>(args: SelectSubset<T, CfgEstadoPedidoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CfgEstadoPedidoClient<$Result.GetResult<Prisma.$CfgEstadoPedidoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CfgEstadoPedido that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgEstadoPedidoFindFirstArgs} args - Arguments to find a CfgEstadoPedido
     * @example
     * // Get one CfgEstadoPedido
     * const cfgEstadoPedido = await prisma.cfgEstadoPedido.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CfgEstadoPedidoFindFirstArgs>(args?: SelectSubset<T, CfgEstadoPedidoFindFirstArgs<ExtArgs>>): Prisma__CfgEstadoPedidoClient<$Result.GetResult<Prisma.$CfgEstadoPedidoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CfgEstadoPedido that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgEstadoPedidoFindFirstOrThrowArgs} args - Arguments to find a CfgEstadoPedido
     * @example
     * // Get one CfgEstadoPedido
     * const cfgEstadoPedido = await prisma.cfgEstadoPedido.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CfgEstadoPedidoFindFirstOrThrowArgs>(args?: SelectSubset<T, CfgEstadoPedidoFindFirstOrThrowArgs<ExtArgs>>): Prisma__CfgEstadoPedidoClient<$Result.GetResult<Prisma.$CfgEstadoPedidoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CfgEstadoPedidos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgEstadoPedidoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CfgEstadoPedidos
     * const cfgEstadoPedidos = await prisma.cfgEstadoPedido.findMany()
     * 
     * // Get first 10 CfgEstadoPedidos
     * const cfgEstadoPedidos = await prisma.cfgEstadoPedido.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cfgEstadoPedidoWithIdOnly = await prisma.cfgEstadoPedido.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CfgEstadoPedidoFindManyArgs>(args?: SelectSubset<T, CfgEstadoPedidoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CfgEstadoPedidoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CfgEstadoPedido.
     * @param {CfgEstadoPedidoCreateArgs} args - Arguments to create a CfgEstadoPedido.
     * @example
     * // Create one CfgEstadoPedido
     * const CfgEstadoPedido = await prisma.cfgEstadoPedido.create({
     *   data: {
     *     // ... data to create a CfgEstadoPedido
     *   }
     * })
     * 
     */
    create<T extends CfgEstadoPedidoCreateArgs>(args: SelectSubset<T, CfgEstadoPedidoCreateArgs<ExtArgs>>): Prisma__CfgEstadoPedidoClient<$Result.GetResult<Prisma.$CfgEstadoPedidoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CfgEstadoPedidos.
     * @param {CfgEstadoPedidoCreateManyArgs} args - Arguments to create many CfgEstadoPedidos.
     * @example
     * // Create many CfgEstadoPedidos
     * const cfgEstadoPedido = await prisma.cfgEstadoPedido.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CfgEstadoPedidoCreateManyArgs>(args?: SelectSubset<T, CfgEstadoPedidoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a CfgEstadoPedido.
     * @param {CfgEstadoPedidoDeleteArgs} args - Arguments to delete one CfgEstadoPedido.
     * @example
     * // Delete one CfgEstadoPedido
     * const CfgEstadoPedido = await prisma.cfgEstadoPedido.delete({
     *   where: {
     *     // ... filter to delete one CfgEstadoPedido
     *   }
     * })
     * 
     */
    delete<T extends CfgEstadoPedidoDeleteArgs>(args: SelectSubset<T, CfgEstadoPedidoDeleteArgs<ExtArgs>>): Prisma__CfgEstadoPedidoClient<$Result.GetResult<Prisma.$CfgEstadoPedidoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CfgEstadoPedido.
     * @param {CfgEstadoPedidoUpdateArgs} args - Arguments to update one CfgEstadoPedido.
     * @example
     * // Update one CfgEstadoPedido
     * const cfgEstadoPedido = await prisma.cfgEstadoPedido.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CfgEstadoPedidoUpdateArgs>(args: SelectSubset<T, CfgEstadoPedidoUpdateArgs<ExtArgs>>): Prisma__CfgEstadoPedidoClient<$Result.GetResult<Prisma.$CfgEstadoPedidoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CfgEstadoPedidos.
     * @param {CfgEstadoPedidoDeleteManyArgs} args - Arguments to filter CfgEstadoPedidos to delete.
     * @example
     * // Delete a few CfgEstadoPedidos
     * const { count } = await prisma.cfgEstadoPedido.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CfgEstadoPedidoDeleteManyArgs>(args?: SelectSubset<T, CfgEstadoPedidoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CfgEstadoPedidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgEstadoPedidoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CfgEstadoPedidos
     * const cfgEstadoPedido = await prisma.cfgEstadoPedido.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CfgEstadoPedidoUpdateManyArgs>(args: SelectSubset<T, CfgEstadoPedidoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CfgEstadoPedido.
     * @param {CfgEstadoPedidoUpsertArgs} args - Arguments to update or create a CfgEstadoPedido.
     * @example
     * // Update or create a CfgEstadoPedido
     * const cfgEstadoPedido = await prisma.cfgEstadoPedido.upsert({
     *   create: {
     *     // ... data to create a CfgEstadoPedido
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CfgEstadoPedido we want to update
     *   }
     * })
     */
    upsert<T extends CfgEstadoPedidoUpsertArgs>(args: SelectSubset<T, CfgEstadoPedidoUpsertArgs<ExtArgs>>): Prisma__CfgEstadoPedidoClient<$Result.GetResult<Prisma.$CfgEstadoPedidoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CfgEstadoPedidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgEstadoPedidoCountArgs} args - Arguments to filter CfgEstadoPedidos to count.
     * @example
     * // Count the number of CfgEstadoPedidos
     * const count = await prisma.cfgEstadoPedido.count({
     *   where: {
     *     // ... the filter for the CfgEstadoPedidos we want to count
     *   }
     * })
    **/
    count<T extends CfgEstadoPedidoCountArgs>(
      args?: Subset<T, CfgEstadoPedidoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CfgEstadoPedidoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CfgEstadoPedido.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgEstadoPedidoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CfgEstadoPedidoAggregateArgs>(args: Subset<T, CfgEstadoPedidoAggregateArgs>): Prisma.PrismaPromise<GetCfgEstadoPedidoAggregateType<T>>

    /**
     * Group by CfgEstadoPedido.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CfgEstadoPedidoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CfgEstadoPedidoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CfgEstadoPedidoGroupByArgs['orderBy'] }
        : { orderBy?: CfgEstadoPedidoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CfgEstadoPedidoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCfgEstadoPedidoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CfgEstadoPedido model
   */
  readonly fields: CfgEstadoPedidoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CfgEstadoPedido.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CfgEstadoPedidoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Pedidos<T extends CfgEstadoPedido$PedidosArgs<ExtArgs> = {}>(args?: Subset<T, CfgEstadoPedido$PedidosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CfgEstadoPedido model
   */
  interface CfgEstadoPedidoFieldRefs {
    readonly id: FieldRef<"CfgEstadoPedido", 'String'>
    readonly descripcion: FieldRef<"CfgEstadoPedido", 'String'>
    readonly color: FieldRef<"CfgEstadoPedido", 'String'>
    readonly orden: FieldRef<"CfgEstadoPedido", 'Int'>
    readonly es_final: FieldRef<"CfgEstadoPedido", 'Boolean'>
    readonly es_cancel: FieldRef<"CfgEstadoPedido", 'Boolean'>
    readonly activo: FieldRef<"CfgEstadoPedido", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * CfgEstadoPedido findUnique
   */
  export type CfgEstadoPedidoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgEstadoPedido
     */
    select?: CfgEstadoPedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgEstadoPedido
     */
    omit?: CfgEstadoPedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CfgEstadoPedidoInclude<ExtArgs> | null
    /**
     * Filter, which CfgEstadoPedido to fetch.
     */
    where: CfgEstadoPedidoWhereUniqueInput
  }

  /**
   * CfgEstadoPedido findUniqueOrThrow
   */
  export type CfgEstadoPedidoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgEstadoPedido
     */
    select?: CfgEstadoPedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgEstadoPedido
     */
    omit?: CfgEstadoPedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CfgEstadoPedidoInclude<ExtArgs> | null
    /**
     * Filter, which CfgEstadoPedido to fetch.
     */
    where: CfgEstadoPedidoWhereUniqueInput
  }

  /**
   * CfgEstadoPedido findFirst
   */
  export type CfgEstadoPedidoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgEstadoPedido
     */
    select?: CfgEstadoPedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgEstadoPedido
     */
    omit?: CfgEstadoPedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CfgEstadoPedidoInclude<ExtArgs> | null
    /**
     * Filter, which CfgEstadoPedido to fetch.
     */
    where?: CfgEstadoPedidoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CfgEstadoPedidos to fetch.
     */
    orderBy?: CfgEstadoPedidoOrderByWithRelationInput | CfgEstadoPedidoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CfgEstadoPedidos.
     */
    cursor?: CfgEstadoPedidoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CfgEstadoPedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CfgEstadoPedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CfgEstadoPedidos.
     */
    distinct?: CfgEstadoPedidoScalarFieldEnum | CfgEstadoPedidoScalarFieldEnum[]
  }

  /**
   * CfgEstadoPedido findFirstOrThrow
   */
  export type CfgEstadoPedidoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgEstadoPedido
     */
    select?: CfgEstadoPedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgEstadoPedido
     */
    omit?: CfgEstadoPedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CfgEstadoPedidoInclude<ExtArgs> | null
    /**
     * Filter, which CfgEstadoPedido to fetch.
     */
    where?: CfgEstadoPedidoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CfgEstadoPedidos to fetch.
     */
    orderBy?: CfgEstadoPedidoOrderByWithRelationInput | CfgEstadoPedidoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CfgEstadoPedidos.
     */
    cursor?: CfgEstadoPedidoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CfgEstadoPedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CfgEstadoPedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CfgEstadoPedidos.
     */
    distinct?: CfgEstadoPedidoScalarFieldEnum | CfgEstadoPedidoScalarFieldEnum[]
  }

  /**
   * CfgEstadoPedido findMany
   */
  export type CfgEstadoPedidoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgEstadoPedido
     */
    select?: CfgEstadoPedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgEstadoPedido
     */
    omit?: CfgEstadoPedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CfgEstadoPedidoInclude<ExtArgs> | null
    /**
     * Filter, which CfgEstadoPedidos to fetch.
     */
    where?: CfgEstadoPedidoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CfgEstadoPedidos to fetch.
     */
    orderBy?: CfgEstadoPedidoOrderByWithRelationInput | CfgEstadoPedidoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CfgEstadoPedidos.
     */
    cursor?: CfgEstadoPedidoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CfgEstadoPedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CfgEstadoPedidos.
     */
    skip?: number
    distinct?: CfgEstadoPedidoScalarFieldEnum | CfgEstadoPedidoScalarFieldEnum[]
  }

  /**
   * CfgEstadoPedido create
   */
  export type CfgEstadoPedidoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgEstadoPedido
     */
    select?: CfgEstadoPedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgEstadoPedido
     */
    omit?: CfgEstadoPedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CfgEstadoPedidoInclude<ExtArgs> | null
    /**
     * The data needed to create a CfgEstadoPedido.
     */
    data: XOR<CfgEstadoPedidoCreateInput, CfgEstadoPedidoUncheckedCreateInput>
  }

  /**
   * CfgEstadoPedido createMany
   */
  export type CfgEstadoPedidoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CfgEstadoPedidos.
     */
    data: CfgEstadoPedidoCreateManyInput | CfgEstadoPedidoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CfgEstadoPedido update
   */
  export type CfgEstadoPedidoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgEstadoPedido
     */
    select?: CfgEstadoPedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgEstadoPedido
     */
    omit?: CfgEstadoPedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CfgEstadoPedidoInclude<ExtArgs> | null
    /**
     * The data needed to update a CfgEstadoPedido.
     */
    data: XOR<CfgEstadoPedidoUpdateInput, CfgEstadoPedidoUncheckedUpdateInput>
    /**
     * Choose, which CfgEstadoPedido to update.
     */
    where: CfgEstadoPedidoWhereUniqueInput
  }

  /**
   * CfgEstadoPedido updateMany
   */
  export type CfgEstadoPedidoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CfgEstadoPedidos.
     */
    data: XOR<CfgEstadoPedidoUpdateManyMutationInput, CfgEstadoPedidoUncheckedUpdateManyInput>
    /**
     * Filter which CfgEstadoPedidos to update
     */
    where?: CfgEstadoPedidoWhereInput
    /**
     * Limit how many CfgEstadoPedidos to update.
     */
    limit?: number
  }

  /**
   * CfgEstadoPedido upsert
   */
  export type CfgEstadoPedidoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgEstadoPedido
     */
    select?: CfgEstadoPedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgEstadoPedido
     */
    omit?: CfgEstadoPedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CfgEstadoPedidoInclude<ExtArgs> | null
    /**
     * The filter to search for the CfgEstadoPedido to update in case it exists.
     */
    where: CfgEstadoPedidoWhereUniqueInput
    /**
     * In case the CfgEstadoPedido found by the `where` argument doesn't exist, create a new CfgEstadoPedido with this data.
     */
    create: XOR<CfgEstadoPedidoCreateInput, CfgEstadoPedidoUncheckedCreateInput>
    /**
     * In case the CfgEstadoPedido was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CfgEstadoPedidoUpdateInput, CfgEstadoPedidoUncheckedUpdateInput>
  }

  /**
   * CfgEstadoPedido delete
   */
  export type CfgEstadoPedidoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgEstadoPedido
     */
    select?: CfgEstadoPedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgEstadoPedido
     */
    omit?: CfgEstadoPedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CfgEstadoPedidoInclude<ExtArgs> | null
    /**
     * Filter which CfgEstadoPedido to delete.
     */
    where: CfgEstadoPedidoWhereUniqueInput
  }

  /**
   * CfgEstadoPedido deleteMany
   */
  export type CfgEstadoPedidoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CfgEstadoPedidos to delete
     */
    where?: CfgEstadoPedidoWhereInput
    /**
     * Limit how many CfgEstadoPedidos to delete.
     */
    limit?: number
  }

  /**
   * CfgEstadoPedido.Pedidos
   */
  export type CfgEstadoPedido$PedidosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedidos
     */
    select?: PedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedidos
     */
    omit?: PedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidosInclude<ExtArgs> | null
    where?: PedidosWhereInput
    orderBy?: PedidosOrderByWithRelationInput | PedidosOrderByWithRelationInput[]
    cursor?: PedidosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PedidosScalarFieldEnum | PedidosScalarFieldEnum[]
  }

  /**
   * CfgEstadoPedido without action
   */
  export type CfgEstadoPedidoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgEstadoPedido
     */
    select?: CfgEstadoPedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgEstadoPedido
     */
    omit?: CfgEstadoPedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CfgEstadoPedidoInclude<ExtArgs> | null
  }


  /**
   * Model Productos
   */

  export type AggregateProductos = {
    _count: ProductosCountAggregateOutputType | null
    _avg: ProductosAvgAggregateOutputType | null
    _sum: ProductosSumAggregateOutputType | null
    _min: ProductosMinAggregateOutputType | null
    _max: ProductosMaxAggregateOutputType | null
  }

  export type ProductosAvgAggregateOutputType = {
    id: number | null
    marca_id: number | null
    rubro_id: number | null
    moneda_id: number | null
    precio: Decimal | null
    stock: number | null
    visitas: number | null
  }

  export type ProductosSumAggregateOutputType = {
    id: number | null
    marca_id: number | null
    rubro_id: number | null
    moneda_id: number | null
    precio: Decimal | null
    stock: number | null
    visitas: number | null
  }

  export type ProductosMinAggregateOutputType = {
    id: number | null
    marca_id: number | null
    rubro_id: number | null
    moneda_id: number | null
    producto: string | null
    descripcion: string | null
    foto: string | null
    precio: Decimal | null
    stock: number | null
    destacado: boolean | null
    activo: boolean | null
    visitas: number | null
  }

  export type ProductosMaxAggregateOutputType = {
    id: number | null
    marca_id: number | null
    rubro_id: number | null
    moneda_id: number | null
    producto: string | null
    descripcion: string | null
    foto: string | null
    precio: Decimal | null
    stock: number | null
    destacado: boolean | null
    activo: boolean | null
    visitas: number | null
  }

  export type ProductosCountAggregateOutputType = {
    id: number
    marca_id: number
    rubro_id: number
    moneda_id: number
    producto: number
    descripcion: number
    foto: number
    precio: number
    stock: number
    destacado: number
    activo: number
    visitas: number
    _all: number
  }


  export type ProductosAvgAggregateInputType = {
    id?: true
    marca_id?: true
    rubro_id?: true
    moneda_id?: true
    precio?: true
    stock?: true
    visitas?: true
  }

  export type ProductosSumAggregateInputType = {
    id?: true
    marca_id?: true
    rubro_id?: true
    moneda_id?: true
    precio?: true
    stock?: true
    visitas?: true
  }

  export type ProductosMinAggregateInputType = {
    id?: true
    marca_id?: true
    rubro_id?: true
    moneda_id?: true
    producto?: true
    descripcion?: true
    foto?: true
    precio?: true
    stock?: true
    destacado?: true
    activo?: true
    visitas?: true
  }

  export type ProductosMaxAggregateInputType = {
    id?: true
    marca_id?: true
    rubro_id?: true
    moneda_id?: true
    producto?: true
    descripcion?: true
    foto?: true
    precio?: true
    stock?: true
    destacado?: true
    activo?: true
    visitas?: true
  }

  export type ProductosCountAggregateInputType = {
    id?: true
    marca_id?: true
    rubro_id?: true
    moneda_id?: true
    producto?: true
    descripcion?: true
    foto?: true
    precio?: true
    stock?: true
    destacado?: true
    activo?: true
    visitas?: true
    _all?: true
  }

  export type ProductosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Productos to aggregate.
     */
    where?: ProductosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Productos to fetch.
     */
    orderBy?: ProductosOrderByWithRelationInput | ProductosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Productos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Productos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Productos
    **/
    _count?: true | ProductosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductosAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductosSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductosMaxAggregateInputType
  }

  export type GetProductosAggregateType<T extends ProductosAggregateArgs> = {
        [P in keyof T & keyof AggregateProductos]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductos[P]>
      : GetScalarType<T[P], AggregateProductos[P]>
  }




  export type ProductosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductosWhereInput
    orderBy?: ProductosOrderByWithAggregationInput | ProductosOrderByWithAggregationInput[]
    by: ProductosScalarFieldEnum[] | ProductosScalarFieldEnum
    having?: ProductosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductosCountAggregateInputType | true
    _avg?: ProductosAvgAggregateInputType
    _sum?: ProductosSumAggregateInputType
    _min?: ProductosMinAggregateInputType
    _max?: ProductosMaxAggregateInputType
  }

  export type ProductosGroupByOutputType = {
    id: number
    marca_id: number
    rubro_id: number
    moneda_id: number
    producto: string
    descripcion: string | null
    foto: string | null
    precio: Decimal
    stock: number
    destacado: boolean
    activo: boolean
    visitas: number
    _count: ProductosCountAggregateOutputType | null
    _avg: ProductosAvgAggregateOutputType | null
    _sum: ProductosSumAggregateOutputType | null
    _min: ProductosMinAggregateOutputType | null
    _max: ProductosMaxAggregateOutputType | null
  }

  type GetProductosGroupByPayload<T extends ProductosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductosGroupByOutputType[P]>
            : GetScalarType<T[P], ProductosGroupByOutputType[P]>
        }
      >
    >


  export type ProductosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    marca_id?: boolean
    rubro_id?: boolean
    moneda_id?: boolean
    producto?: boolean
    descripcion?: boolean
    foto?: boolean
    precio?: boolean
    stock?: boolean
    destacado?: boolean
    activo?: boolean
    visitas?: boolean
    marca?: boolean | CfgMarcasDefaultArgs<ExtArgs>
    rubro?: boolean | CfgRubrosDefaultArgs<ExtArgs>
    moneda?: boolean | CfgMonedasDefaultArgs<ExtArgs>
    fotos?: boolean | Productos$fotosArgs<ExtArgs>
    versiones?: boolean | Productos$versionesArgs<ExtArgs>
    especificaciones?: boolean | Productos$especificacionesArgs<ExtArgs>
    _count?: boolean | ProductosCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productos"]>



  export type ProductosSelectScalar = {
    id?: boolean
    marca_id?: boolean
    rubro_id?: boolean
    moneda_id?: boolean
    producto?: boolean
    descripcion?: boolean
    foto?: boolean
    precio?: boolean
    stock?: boolean
    destacado?: boolean
    activo?: boolean
    visitas?: boolean
  }

  export type ProductosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "marca_id" | "rubro_id" | "moneda_id" | "producto" | "descripcion" | "foto" | "precio" | "stock" | "destacado" | "activo" | "visitas", ExtArgs["result"]["productos"]>
  export type ProductosInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    marca?: boolean | CfgMarcasDefaultArgs<ExtArgs>
    rubro?: boolean | CfgRubrosDefaultArgs<ExtArgs>
    moneda?: boolean | CfgMonedasDefaultArgs<ExtArgs>
    fotos?: boolean | Productos$fotosArgs<ExtArgs>
    versiones?: boolean | Productos$versionesArgs<ExtArgs>
    especificaciones?: boolean | Productos$especificacionesArgs<ExtArgs>
    _count?: boolean | ProductosCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ProductosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Productos"
    objects: {
      marca: Prisma.$CfgMarcasPayload<ExtArgs>
      rubro: Prisma.$CfgRubrosPayload<ExtArgs>
      moneda: Prisma.$CfgMonedasPayload<ExtArgs>
      fotos: Prisma.$ProductoFotosPayload<ExtArgs>[]
      versiones: Prisma.$ProductoVersionesPayload<ExtArgs>[]
      especificaciones: Prisma.$ProductoEspecificacionesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      marca_id: number
      rubro_id: number
      moneda_id: number
      producto: string
      descripcion: string | null
      foto: string | null
      precio: Prisma.Decimal
      stock: number
      destacado: boolean
      activo: boolean
      visitas: number
    }, ExtArgs["result"]["productos"]>
    composites: {}
  }

  type ProductosGetPayload<S extends boolean | null | undefined | ProductosDefaultArgs> = $Result.GetResult<Prisma.$ProductosPayload, S>

  type ProductosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductosCountAggregateInputType | true
    }

  export interface ProductosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Productos'], meta: { name: 'Productos' } }
    /**
     * Find zero or one Productos that matches the filter.
     * @param {ProductosFindUniqueArgs} args - Arguments to find a Productos
     * @example
     * // Get one Productos
     * const productos = await prisma.productos.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductosFindUniqueArgs>(args: SelectSubset<T, ProductosFindUniqueArgs<ExtArgs>>): Prisma__ProductosClient<$Result.GetResult<Prisma.$ProductosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Productos that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductosFindUniqueOrThrowArgs} args - Arguments to find a Productos
     * @example
     * // Get one Productos
     * const productos = await prisma.productos.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductosFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductosClient<$Result.GetResult<Prisma.$ProductosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Productos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductosFindFirstArgs} args - Arguments to find a Productos
     * @example
     * // Get one Productos
     * const productos = await prisma.productos.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductosFindFirstArgs>(args?: SelectSubset<T, ProductosFindFirstArgs<ExtArgs>>): Prisma__ProductosClient<$Result.GetResult<Prisma.$ProductosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Productos that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductosFindFirstOrThrowArgs} args - Arguments to find a Productos
     * @example
     * // Get one Productos
     * const productos = await prisma.productos.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductosFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductosFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductosClient<$Result.GetResult<Prisma.$ProductosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Productos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Productos
     * const productos = await prisma.productos.findMany()
     * 
     * // Get first 10 Productos
     * const productos = await prisma.productos.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productosWithIdOnly = await prisma.productos.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductosFindManyArgs>(args?: SelectSubset<T, ProductosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Productos.
     * @param {ProductosCreateArgs} args - Arguments to create a Productos.
     * @example
     * // Create one Productos
     * const Productos = await prisma.productos.create({
     *   data: {
     *     // ... data to create a Productos
     *   }
     * })
     * 
     */
    create<T extends ProductosCreateArgs>(args: SelectSubset<T, ProductosCreateArgs<ExtArgs>>): Prisma__ProductosClient<$Result.GetResult<Prisma.$ProductosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Productos.
     * @param {ProductosCreateManyArgs} args - Arguments to create many Productos.
     * @example
     * // Create many Productos
     * const productos = await prisma.productos.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductosCreateManyArgs>(args?: SelectSubset<T, ProductosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Productos.
     * @param {ProductosDeleteArgs} args - Arguments to delete one Productos.
     * @example
     * // Delete one Productos
     * const Productos = await prisma.productos.delete({
     *   where: {
     *     // ... filter to delete one Productos
     *   }
     * })
     * 
     */
    delete<T extends ProductosDeleteArgs>(args: SelectSubset<T, ProductosDeleteArgs<ExtArgs>>): Prisma__ProductosClient<$Result.GetResult<Prisma.$ProductosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Productos.
     * @param {ProductosUpdateArgs} args - Arguments to update one Productos.
     * @example
     * // Update one Productos
     * const productos = await prisma.productos.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductosUpdateArgs>(args: SelectSubset<T, ProductosUpdateArgs<ExtArgs>>): Prisma__ProductosClient<$Result.GetResult<Prisma.$ProductosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Productos.
     * @param {ProductosDeleteManyArgs} args - Arguments to filter Productos to delete.
     * @example
     * // Delete a few Productos
     * const { count } = await prisma.productos.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductosDeleteManyArgs>(args?: SelectSubset<T, ProductosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Productos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Productos
     * const productos = await prisma.productos.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductosUpdateManyArgs>(args: SelectSubset<T, ProductosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Productos.
     * @param {ProductosUpsertArgs} args - Arguments to update or create a Productos.
     * @example
     * // Update or create a Productos
     * const productos = await prisma.productos.upsert({
     *   create: {
     *     // ... data to create a Productos
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Productos we want to update
     *   }
     * })
     */
    upsert<T extends ProductosUpsertArgs>(args: SelectSubset<T, ProductosUpsertArgs<ExtArgs>>): Prisma__ProductosClient<$Result.GetResult<Prisma.$ProductosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Productos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductosCountArgs} args - Arguments to filter Productos to count.
     * @example
     * // Count the number of Productos
     * const count = await prisma.productos.count({
     *   where: {
     *     // ... the filter for the Productos we want to count
     *   }
     * })
    **/
    count<T extends ProductosCountArgs>(
      args?: Subset<T, ProductosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Productos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductosAggregateArgs>(args: Subset<T, ProductosAggregateArgs>): Prisma.PrismaPromise<GetProductosAggregateType<T>>

    /**
     * Group by Productos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductosGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductosGroupByArgs['orderBy'] }
        : { orderBy?: ProductosGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Productos model
   */
  readonly fields: ProductosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Productos.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    marca<T extends CfgMarcasDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CfgMarcasDefaultArgs<ExtArgs>>): Prisma__CfgMarcasClient<$Result.GetResult<Prisma.$CfgMarcasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    rubro<T extends CfgRubrosDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CfgRubrosDefaultArgs<ExtArgs>>): Prisma__CfgRubrosClient<$Result.GetResult<Prisma.$CfgRubrosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    moneda<T extends CfgMonedasDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CfgMonedasDefaultArgs<ExtArgs>>): Prisma__CfgMonedasClient<$Result.GetResult<Prisma.$CfgMonedasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    fotos<T extends Productos$fotosArgs<ExtArgs> = {}>(args?: Subset<T, Productos$fotosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductoFotosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    versiones<T extends Productos$versionesArgs<ExtArgs> = {}>(args?: Subset<T, Productos$versionesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductoVersionesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    especificaciones<T extends Productos$especificacionesArgs<ExtArgs> = {}>(args?: Subset<T, Productos$especificacionesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductoEspecificacionesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Productos model
   */
  interface ProductosFieldRefs {
    readonly id: FieldRef<"Productos", 'Int'>
    readonly marca_id: FieldRef<"Productos", 'Int'>
    readonly rubro_id: FieldRef<"Productos", 'Int'>
    readonly moneda_id: FieldRef<"Productos", 'Int'>
    readonly producto: FieldRef<"Productos", 'String'>
    readonly descripcion: FieldRef<"Productos", 'String'>
    readonly foto: FieldRef<"Productos", 'String'>
    readonly precio: FieldRef<"Productos", 'Decimal'>
    readonly stock: FieldRef<"Productos", 'Int'>
    readonly destacado: FieldRef<"Productos", 'Boolean'>
    readonly activo: FieldRef<"Productos", 'Boolean'>
    readonly visitas: FieldRef<"Productos", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Productos findUnique
   */
  export type ProductosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Productos
     */
    select?: ProductosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Productos
     */
    omit?: ProductosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductosInclude<ExtArgs> | null
    /**
     * Filter, which Productos to fetch.
     */
    where: ProductosWhereUniqueInput
  }

  /**
   * Productos findUniqueOrThrow
   */
  export type ProductosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Productos
     */
    select?: ProductosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Productos
     */
    omit?: ProductosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductosInclude<ExtArgs> | null
    /**
     * Filter, which Productos to fetch.
     */
    where: ProductosWhereUniqueInput
  }

  /**
   * Productos findFirst
   */
  export type ProductosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Productos
     */
    select?: ProductosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Productos
     */
    omit?: ProductosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductosInclude<ExtArgs> | null
    /**
     * Filter, which Productos to fetch.
     */
    where?: ProductosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Productos to fetch.
     */
    orderBy?: ProductosOrderByWithRelationInput | ProductosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Productos.
     */
    cursor?: ProductosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Productos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Productos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Productos.
     */
    distinct?: ProductosScalarFieldEnum | ProductosScalarFieldEnum[]
  }

  /**
   * Productos findFirstOrThrow
   */
  export type ProductosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Productos
     */
    select?: ProductosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Productos
     */
    omit?: ProductosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductosInclude<ExtArgs> | null
    /**
     * Filter, which Productos to fetch.
     */
    where?: ProductosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Productos to fetch.
     */
    orderBy?: ProductosOrderByWithRelationInput | ProductosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Productos.
     */
    cursor?: ProductosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Productos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Productos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Productos.
     */
    distinct?: ProductosScalarFieldEnum | ProductosScalarFieldEnum[]
  }

  /**
   * Productos findMany
   */
  export type ProductosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Productos
     */
    select?: ProductosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Productos
     */
    omit?: ProductosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductosInclude<ExtArgs> | null
    /**
     * Filter, which Productos to fetch.
     */
    where?: ProductosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Productos to fetch.
     */
    orderBy?: ProductosOrderByWithRelationInput | ProductosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Productos.
     */
    cursor?: ProductosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Productos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Productos.
     */
    skip?: number
    distinct?: ProductosScalarFieldEnum | ProductosScalarFieldEnum[]
  }

  /**
   * Productos create
   */
  export type ProductosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Productos
     */
    select?: ProductosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Productos
     */
    omit?: ProductosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductosInclude<ExtArgs> | null
    /**
     * The data needed to create a Productos.
     */
    data: XOR<ProductosCreateInput, ProductosUncheckedCreateInput>
  }

  /**
   * Productos createMany
   */
  export type ProductosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Productos.
     */
    data: ProductosCreateManyInput | ProductosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Productos update
   */
  export type ProductosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Productos
     */
    select?: ProductosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Productos
     */
    omit?: ProductosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductosInclude<ExtArgs> | null
    /**
     * The data needed to update a Productos.
     */
    data: XOR<ProductosUpdateInput, ProductosUncheckedUpdateInput>
    /**
     * Choose, which Productos to update.
     */
    where: ProductosWhereUniqueInput
  }

  /**
   * Productos updateMany
   */
  export type ProductosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Productos.
     */
    data: XOR<ProductosUpdateManyMutationInput, ProductosUncheckedUpdateManyInput>
    /**
     * Filter which Productos to update
     */
    where?: ProductosWhereInput
    /**
     * Limit how many Productos to update.
     */
    limit?: number
  }

  /**
   * Productos upsert
   */
  export type ProductosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Productos
     */
    select?: ProductosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Productos
     */
    omit?: ProductosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductosInclude<ExtArgs> | null
    /**
     * The filter to search for the Productos to update in case it exists.
     */
    where: ProductosWhereUniqueInput
    /**
     * In case the Productos found by the `where` argument doesn't exist, create a new Productos with this data.
     */
    create: XOR<ProductosCreateInput, ProductosUncheckedCreateInput>
    /**
     * In case the Productos was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductosUpdateInput, ProductosUncheckedUpdateInput>
  }

  /**
   * Productos delete
   */
  export type ProductosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Productos
     */
    select?: ProductosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Productos
     */
    omit?: ProductosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductosInclude<ExtArgs> | null
    /**
     * Filter which Productos to delete.
     */
    where: ProductosWhereUniqueInput
  }

  /**
   * Productos deleteMany
   */
  export type ProductosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Productos to delete
     */
    where?: ProductosWhereInput
    /**
     * Limit how many Productos to delete.
     */
    limit?: number
  }

  /**
   * Productos.fotos
   */
  export type Productos$fotosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoFotos
     */
    select?: ProductoFotosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoFotos
     */
    omit?: ProductoFotosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoFotosInclude<ExtArgs> | null
    where?: ProductoFotosWhereInput
    orderBy?: ProductoFotosOrderByWithRelationInput | ProductoFotosOrderByWithRelationInput[]
    cursor?: ProductoFotosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductoFotosScalarFieldEnum | ProductoFotosScalarFieldEnum[]
  }

  /**
   * Productos.versiones
   */
  export type Productos$versionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoVersiones
     */
    select?: ProductoVersionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoVersiones
     */
    omit?: ProductoVersionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoVersionesInclude<ExtArgs> | null
    where?: ProductoVersionesWhereInput
    orderBy?: ProductoVersionesOrderByWithRelationInput | ProductoVersionesOrderByWithRelationInput[]
    cursor?: ProductoVersionesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductoVersionesScalarFieldEnum | ProductoVersionesScalarFieldEnum[]
  }

  /**
   * Productos.especificaciones
   */
  export type Productos$especificacionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoEspecificaciones
     */
    select?: ProductoEspecificacionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoEspecificaciones
     */
    omit?: ProductoEspecificacionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoEspecificacionesInclude<ExtArgs> | null
    where?: ProductoEspecificacionesWhereInput
    orderBy?: ProductoEspecificacionesOrderByWithRelationInput | ProductoEspecificacionesOrderByWithRelationInput[]
    cursor?: ProductoEspecificacionesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductoEspecificacionesScalarFieldEnum | ProductoEspecificacionesScalarFieldEnum[]
  }

  /**
   * Productos without action
   */
  export type ProductosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Productos
     */
    select?: ProductosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Productos
     */
    omit?: ProductosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductosInclude<ExtArgs> | null
  }


  /**
   * Model ProductoFotos
   */

  export type AggregateProductoFotos = {
    _count: ProductoFotosCountAggregateOutputType | null
    _avg: ProductoFotosAvgAggregateOutputType | null
    _sum: ProductoFotosSumAggregateOutputType | null
    _min: ProductoFotosMinAggregateOutputType | null
    _max: ProductoFotosMaxAggregateOutputType | null
  }

  export type ProductoFotosAvgAggregateOutputType = {
    id: number | null
    producto_id: number | null
    orden: number | null
  }

  export type ProductoFotosSumAggregateOutputType = {
    id: number | null
    producto_id: number | null
    orden: number | null
  }

  export type ProductoFotosMinAggregateOutputType = {
    id: number | null
    producto_id: number | null
    epigrafe: string | null
    foto: string | null
    orden: number | null
    activo: boolean | null
  }

  export type ProductoFotosMaxAggregateOutputType = {
    id: number | null
    producto_id: number | null
    epigrafe: string | null
    foto: string | null
    orden: number | null
    activo: boolean | null
  }

  export type ProductoFotosCountAggregateOutputType = {
    id: number
    producto_id: number
    epigrafe: number
    foto: number
    orden: number
    activo: number
    _all: number
  }


  export type ProductoFotosAvgAggregateInputType = {
    id?: true
    producto_id?: true
    orden?: true
  }

  export type ProductoFotosSumAggregateInputType = {
    id?: true
    producto_id?: true
    orden?: true
  }

  export type ProductoFotosMinAggregateInputType = {
    id?: true
    producto_id?: true
    epigrafe?: true
    foto?: true
    orden?: true
    activo?: true
  }

  export type ProductoFotosMaxAggregateInputType = {
    id?: true
    producto_id?: true
    epigrafe?: true
    foto?: true
    orden?: true
    activo?: true
  }

  export type ProductoFotosCountAggregateInputType = {
    id?: true
    producto_id?: true
    epigrafe?: true
    foto?: true
    orden?: true
    activo?: true
    _all?: true
  }

  export type ProductoFotosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductoFotos to aggregate.
     */
    where?: ProductoFotosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductoFotos to fetch.
     */
    orderBy?: ProductoFotosOrderByWithRelationInput | ProductoFotosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductoFotosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductoFotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductoFotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductoFotos
    **/
    _count?: true | ProductoFotosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductoFotosAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductoFotosSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductoFotosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductoFotosMaxAggregateInputType
  }

  export type GetProductoFotosAggregateType<T extends ProductoFotosAggregateArgs> = {
        [P in keyof T & keyof AggregateProductoFotos]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductoFotos[P]>
      : GetScalarType<T[P], AggregateProductoFotos[P]>
  }




  export type ProductoFotosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductoFotosWhereInput
    orderBy?: ProductoFotosOrderByWithAggregationInput | ProductoFotosOrderByWithAggregationInput[]
    by: ProductoFotosScalarFieldEnum[] | ProductoFotosScalarFieldEnum
    having?: ProductoFotosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductoFotosCountAggregateInputType | true
    _avg?: ProductoFotosAvgAggregateInputType
    _sum?: ProductoFotosSumAggregateInputType
    _min?: ProductoFotosMinAggregateInputType
    _max?: ProductoFotosMaxAggregateInputType
  }

  export type ProductoFotosGroupByOutputType = {
    id: number
    producto_id: number
    epigrafe: string
    foto: string | null
    orden: number
    activo: boolean
    _count: ProductoFotosCountAggregateOutputType | null
    _avg: ProductoFotosAvgAggregateOutputType | null
    _sum: ProductoFotosSumAggregateOutputType | null
    _min: ProductoFotosMinAggregateOutputType | null
    _max: ProductoFotosMaxAggregateOutputType | null
  }

  type GetProductoFotosGroupByPayload<T extends ProductoFotosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductoFotosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductoFotosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductoFotosGroupByOutputType[P]>
            : GetScalarType<T[P], ProductoFotosGroupByOutputType[P]>
        }
      >
    >


  export type ProductoFotosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    producto_id?: boolean
    epigrafe?: boolean
    foto?: boolean
    orden?: boolean
    activo?: boolean
    producto?: boolean | ProductosDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productoFotos"]>



  export type ProductoFotosSelectScalar = {
    id?: boolean
    producto_id?: boolean
    epigrafe?: boolean
    foto?: boolean
    orden?: boolean
    activo?: boolean
  }

  export type ProductoFotosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "producto_id" | "epigrafe" | "foto" | "orden" | "activo", ExtArgs["result"]["productoFotos"]>
  export type ProductoFotosInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    producto?: boolean | ProductosDefaultArgs<ExtArgs>
  }

  export type $ProductoFotosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductoFotos"
    objects: {
      producto: Prisma.$ProductosPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      producto_id: number
      epigrafe: string
      foto: string | null
      orden: number
      activo: boolean
    }, ExtArgs["result"]["productoFotos"]>
    composites: {}
  }

  type ProductoFotosGetPayload<S extends boolean | null | undefined | ProductoFotosDefaultArgs> = $Result.GetResult<Prisma.$ProductoFotosPayload, S>

  type ProductoFotosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductoFotosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductoFotosCountAggregateInputType | true
    }

  export interface ProductoFotosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductoFotos'], meta: { name: 'ProductoFotos' } }
    /**
     * Find zero or one ProductoFotos that matches the filter.
     * @param {ProductoFotosFindUniqueArgs} args - Arguments to find a ProductoFotos
     * @example
     * // Get one ProductoFotos
     * const productoFotos = await prisma.productoFotos.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductoFotosFindUniqueArgs>(args: SelectSubset<T, ProductoFotosFindUniqueArgs<ExtArgs>>): Prisma__ProductoFotosClient<$Result.GetResult<Prisma.$ProductoFotosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProductoFotos that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductoFotosFindUniqueOrThrowArgs} args - Arguments to find a ProductoFotos
     * @example
     * // Get one ProductoFotos
     * const productoFotos = await prisma.productoFotos.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductoFotosFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductoFotosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductoFotosClient<$Result.GetResult<Prisma.$ProductoFotosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductoFotos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoFotosFindFirstArgs} args - Arguments to find a ProductoFotos
     * @example
     * // Get one ProductoFotos
     * const productoFotos = await prisma.productoFotos.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductoFotosFindFirstArgs>(args?: SelectSubset<T, ProductoFotosFindFirstArgs<ExtArgs>>): Prisma__ProductoFotosClient<$Result.GetResult<Prisma.$ProductoFotosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductoFotos that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoFotosFindFirstOrThrowArgs} args - Arguments to find a ProductoFotos
     * @example
     * // Get one ProductoFotos
     * const productoFotos = await prisma.productoFotos.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductoFotosFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductoFotosFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductoFotosClient<$Result.GetResult<Prisma.$ProductoFotosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProductoFotos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoFotosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductoFotos
     * const productoFotos = await prisma.productoFotos.findMany()
     * 
     * // Get first 10 ProductoFotos
     * const productoFotos = await prisma.productoFotos.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productoFotosWithIdOnly = await prisma.productoFotos.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductoFotosFindManyArgs>(args?: SelectSubset<T, ProductoFotosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductoFotosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProductoFotos.
     * @param {ProductoFotosCreateArgs} args - Arguments to create a ProductoFotos.
     * @example
     * // Create one ProductoFotos
     * const ProductoFotos = await prisma.productoFotos.create({
     *   data: {
     *     // ... data to create a ProductoFotos
     *   }
     * })
     * 
     */
    create<T extends ProductoFotosCreateArgs>(args: SelectSubset<T, ProductoFotosCreateArgs<ExtArgs>>): Prisma__ProductoFotosClient<$Result.GetResult<Prisma.$ProductoFotosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProductoFotos.
     * @param {ProductoFotosCreateManyArgs} args - Arguments to create many ProductoFotos.
     * @example
     * // Create many ProductoFotos
     * const productoFotos = await prisma.productoFotos.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductoFotosCreateManyArgs>(args?: SelectSubset<T, ProductoFotosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ProductoFotos.
     * @param {ProductoFotosDeleteArgs} args - Arguments to delete one ProductoFotos.
     * @example
     * // Delete one ProductoFotos
     * const ProductoFotos = await prisma.productoFotos.delete({
     *   where: {
     *     // ... filter to delete one ProductoFotos
     *   }
     * })
     * 
     */
    delete<T extends ProductoFotosDeleteArgs>(args: SelectSubset<T, ProductoFotosDeleteArgs<ExtArgs>>): Prisma__ProductoFotosClient<$Result.GetResult<Prisma.$ProductoFotosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProductoFotos.
     * @param {ProductoFotosUpdateArgs} args - Arguments to update one ProductoFotos.
     * @example
     * // Update one ProductoFotos
     * const productoFotos = await prisma.productoFotos.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductoFotosUpdateArgs>(args: SelectSubset<T, ProductoFotosUpdateArgs<ExtArgs>>): Prisma__ProductoFotosClient<$Result.GetResult<Prisma.$ProductoFotosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProductoFotos.
     * @param {ProductoFotosDeleteManyArgs} args - Arguments to filter ProductoFotos to delete.
     * @example
     * // Delete a few ProductoFotos
     * const { count } = await prisma.productoFotos.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductoFotosDeleteManyArgs>(args?: SelectSubset<T, ProductoFotosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductoFotos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoFotosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductoFotos
     * const productoFotos = await prisma.productoFotos.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductoFotosUpdateManyArgs>(args: SelectSubset<T, ProductoFotosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProductoFotos.
     * @param {ProductoFotosUpsertArgs} args - Arguments to update or create a ProductoFotos.
     * @example
     * // Update or create a ProductoFotos
     * const productoFotos = await prisma.productoFotos.upsert({
     *   create: {
     *     // ... data to create a ProductoFotos
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductoFotos we want to update
     *   }
     * })
     */
    upsert<T extends ProductoFotosUpsertArgs>(args: SelectSubset<T, ProductoFotosUpsertArgs<ExtArgs>>): Prisma__ProductoFotosClient<$Result.GetResult<Prisma.$ProductoFotosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProductoFotos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoFotosCountArgs} args - Arguments to filter ProductoFotos to count.
     * @example
     * // Count the number of ProductoFotos
     * const count = await prisma.productoFotos.count({
     *   where: {
     *     // ... the filter for the ProductoFotos we want to count
     *   }
     * })
    **/
    count<T extends ProductoFotosCountArgs>(
      args?: Subset<T, ProductoFotosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductoFotosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductoFotos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoFotosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductoFotosAggregateArgs>(args: Subset<T, ProductoFotosAggregateArgs>): Prisma.PrismaPromise<GetProductoFotosAggregateType<T>>

    /**
     * Group by ProductoFotos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoFotosGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductoFotosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductoFotosGroupByArgs['orderBy'] }
        : { orderBy?: ProductoFotosGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductoFotosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductoFotosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductoFotos model
   */
  readonly fields: ProductoFotosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductoFotos.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductoFotosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    producto<T extends ProductosDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductosDefaultArgs<ExtArgs>>): Prisma__ProductosClient<$Result.GetResult<Prisma.$ProductosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProductoFotos model
   */
  interface ProductoFotosFieldRefs {
    readonly id: FieldRef<"ProductoFotos", 'Int'>
    readonly producto_id: FieldRef<"ProductoFotos", 'Int'>
    readonly epigrafe: FieldRef<"ProductoFotos", 'String'>
    readonly foto: FieldRef<"ProductoFotos", 'String'>
    readonly orden: FieldRef<"ProductoFotos", 'Int'>
    readonly activo: FieldRef<"ProductoFotos", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * ProductoFotos findUnique
   */
  export type ProductoFotosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoFotos
     */
    select?: ProductoFotosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoFotos
     */
    omit?: ProductoFotosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoFotosInclude<ExtArgs> | null
    /**
     * Filter, which ProductoFotos to fetch.
     */
    where: ProductoFotosWhereUniqueInput
  }

  /**
   * ProductoFotos findUniqueOrThrow
   */
  export type ProductoFotosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoFotos
     */
    select?: ProductoFotosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoFotos
     */
    omit?: ProductoFotosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoFotosInclude<ExtArgs> | null
    /**
     * Filter, which ProductoFotos to fetch.
     */
    where: ProductoFotosWhereUniqueInput
  }

  /**
   * ProductoFotos findFirst
   */
  export type ProductoFotosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoFotos
     */
    select?: ProductoFotosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoFotos
     */
    omit?: ProductoFotosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoFotosInclude<ExtArgs> | null
    /**
     * Filter, which ProductoFotos to fetch.
     */
    where?: ProductoFotosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductoFotos to fetch.
     */
    orderBy?: ProductoFotosOrderByWithRelationInput | ProductoFotosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductoFotos.
     */
    cursor?: ProductoFotosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductoFotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductoFotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductoFotos.
     */
    distinct?: ProductoFotosScalarFieldEnum | ProductoFotosScalarFieldEnum[]
  }

  /**
   * ProductoFotos findFirstOrThrow
   */
  export type ProductoFotosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoFotos
     */
    select?: ProductoFotosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoFotos
     */
    omit?: ProductoFotosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoFotosInclude<ExtArgs> | null
    /**
     * Filter, which ProductoFotos to fetch.
     */
    where?: ProductoFotosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductoFotos to fetch.
     */
    orderBy?: ProductoFotosOrderByWithRelationInput | ProductoFotosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductoFotos.
     */
    cursor?: ProductoFotosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductoFotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductoFotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductoFotos.
     */
    distinct?: ProductoFotosScalarFieldEnum | ProductoFotosScalarFieldEnum[]
  }

  /**
   * ProductoFotos findMany
   */
  export type ProductoFotosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoFotos
     */
    select?: ProductoFotosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoFotos
     */
    omit?: ProductoFotosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoFotosInclude<ExtArgs> | null
    /**
     * Filter, which ProductoFotos to fetch.
     */
    where?: ProductoFotosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductoFotos to fetch.
     */
    orderBy?: ProductoFotosOrderByWithRelationInput | ProductoFotosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductoFotos.
     */
    cursor?: ProductoFotosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductoFotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductoFotos.
     */
    skip?: number
    distinct?: ProductoFotosScalarFieldEnum | ProductoFotosScalarFieldEnum[]
  }

  /**
   * ProductoFotos create
   */
  export type ProductoFotosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoFotos
     */
    select?: ProductoFotosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoFotos
     */
    omit?: ProductoFotosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoFotosInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductoFotos.
     */
    data: XOR<ProductoFotosCreateInput, ProductoFotosUncheckedCreateInput>
  }

  /**
   * ProductoFotos createMany
   */
  export type ProductoFotosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductoFotos.
     */
    data: ProductoFotosCreateManyInput | ProductoFotosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductoFotos update
   */
  export type ProductoFotosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoFotos
     */
    select?: ProductoFotosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoFotos
     */
    omit?: ProductoFotosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoFotosInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductoFotos.
     */
    data: XOR<ProductoFotosUpdateInput, ProductoFotosUncheckedUpdateInput>
    /**
     * Choose, which ProductoFotos to update.
     */
    where: ProductoFotosWhereUniqueInput
  }

  /**
   * ProductoFotos updateMany
   */
  export type ProductoFotosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductoFotos.
     */
    data: XOR<ProductoFotosUpdateManyMutationInput, ProductoFotosUncheckedUpdateManyInput>
    /**
     * Filter which ProductoFotos to update
     */
    where?: ProductoFotosWhereInput
    /**
     * Limit how many ProductoFotos to update.
     */
    limit?: number
  }

  /**
   * ProductoFotos upsert
   */
  export type ProductoFotosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoFotos
     */
    select?: ProductoFotosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoFotos
     */
    omit?: ProductoFotosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoFotosInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductoFotos to update in case it exists.
     */
    where: ProductoFotosWhereUniqueInput
    /**
     * In case the ProductoFotos found by the `where` argument doesn't exist, create a new ProductoFotos with this data.
     */
    create: XOR<ProductoFotosCreateInput, ProductoFotosUncheckedCreateInput>
    /**
     * In case the ProductoFotos was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductoFotosUpdateInput, ProductoFotosUncheckedUpdateInput>
  }

  /**
   * ProductoFotos delete
   */
  export type ProductoFotosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoFotos
     */
    select?: ProductoFotosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoFotos
     */
    omit?: ProductoFotosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoFotosInclude<ExtArgs> | null
    /**
     * Filter which ProductoFotos to delete.
     */
    where: ProductoFotosWhereUniqueInput
  }

  /**
   * ProductoFotos deleteMany
   */
  export type ProductoFotosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductoFotos to delete
     */
    where?: ProductoFotosWhereInput
    /**
     * Limit how many ProductoFotos to delete.
     */
    limit?: number
  }

  /**
   * ProductoFotos without action
   */
  export type ProductoFotosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoFotos
     */
    select?: ProductoFotosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoFotos
     */
    omit?: ProductoFotosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoFotosInclude<ExtArgs> | null
  }


  /**
   * Model ProductoVersiones
   */

  export type AggregateProductoVersiones = {
    _count: ProductoVersionesCountAggregateOutputType | null
    _avg: ProductoVersionesAvgAggregateOutputType | null
    _sum: ProductoVersionesSumAggregateOutputType | null
    _min: ProductoVersionesMinAggregateOutputType | null
    _max: ProductoVersionesMaxAggregateOutputType | null
  }

  export type ProductoVersionesAvgAggregateOutputType = {
    id: number | null
    producto_id: number | null
    orden: number | null
  }

  export type ProductoVersionesSumAggregateOutputType = {
    id: number | null
    producto_id: number | null
    orden: number | null
  }

  export type ProductoVersionesMinAggregateOutputType = {
    id: number | null
    producto_id: number | null
    version: string | null
    detalle: string | null
    orden: number | null
    activo: boolean | null
  }

  export type ProductoVersionesMaxAggregateOutputType = {
    id: number | null
    producto_id: number | null
    version: string | null
    detalle: string | null
    orden: number | null
    activo: boolean | null
  }

  export type ProductoVersionesCountAggregateOutputType = {
    id: number
    producto_id: number
    version: number
    detalle: number
    orden: number
    activo: number
    _all: number
  }


  export type ProductoVersionesAvgAggregateInputType = {
    id?: true
    producto_id?: true
    orden?: true
  }

  export type ProductoVersionesSumAggregateInputType = {
    id?: true
    producto_id?: true
    orden?: true
  }

  export type ProductoVersionesMinAggregateInputType = {
    id?: true
    producto_id?: true
    version?: true
    detalle?: true
    orden?: true
    activo?: true
  }

  export type ProductoVersionesMaxAggregateInputType = {
    id?: true
    producto_id?: true
    version?: true
    detalle?: true
    orden?: true
    activo?: true
  }

  export type ProductoVersionesCountAggregateInputType = {
    id?: true
    producto_id?: true
    version?: true
    detalle?: true
    orden?: true
    activo?: true
    _all?: true
  }

  export type ProductoVersionesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductoVersiones to aggregate.
     */
    where?: ProductoVersionesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductoVersiones to fetch.
     */
    orderBy?: ProductoVersionesOrderByWithRelationInput | ProductoVersionesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductoVersionesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductoVersiones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductoVersiones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductoVersiones
    **/
    _count?: true | ProductoVersionesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductoVersionesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductoVersionesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductoVersionesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductoVersionesMaxAggregateInputType
  }

  export type GetProductoVersionesAggregateType<T extends ProductoVersionesAggregateArgs> = {
        [P in keyof T & keyof AggregateProductoVersiones]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductoVersiones[P]>
      : GetScalarType<T[P], AggregateProductoVersiones[P]>
  }




  export type ProductoVersionesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductoVersionesWhereInput
    orderBy?: ProductoVersionesOrderByWithAggregationInput | ProductoVersionesOrderByWithAggregationInput[]
    by: ProductoVersionesScalarFieldEnum[] | ProductoVersionesScalarFieldEnum
    having?: ProductoVersionesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductoVersionesCountAggregateInputType | true
    _avg?: ProductoVersionesAvgAggregateInputType
    _sum?: ProductoVersionesSumAggregateInputType
    _min?: ProductoVersionesMinAggregateInputType
    _max?: ProductoVersionesMaxAggregateInputType
  }

  export type ProductoVersionesGroupByOutputType = {
    id: number
    producto_id: number
    version: string
    detalle: string | null
    orden: number
    activo: boolean
    _count: ProductoVersionesCountAggregateOutputType | null
    _avg: ProductoVersionesAvgAggregateOutputType | null
    _sum: ProductoVersionesSumAggregateOutputType | null
    _min: ProductoVersionesMinAggregateOutputType | null
    _max: ProductoVersionesMaxAggregateOutputType | null
  }

  type GetProductoVersionesGroupByPayload<T extends ProductoVersionesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductoVersionesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductoVersionesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductoVersionesGroupByOutputType[P]>
            : GetScalarType<T[P], ProductoVersionesGroupByOutputType[P]>
        }
      >
    >


  export type ProductoVersionesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    producto_id?: boolean
    version?: boolean
    detalle?: boolean
    orden?: boolean
    activo?: boolean
    producto?: boolean | ProductosDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productoVersiones"]>



  export type ProductoVersionesSelectScalar = {
    id?: boolean
    producto_id?: boolean
    version?: boolean
    detalle?: boolean
    orden?: boolean
    activo?: boolean
  }

  export type ProductoVersionesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "producto_id" | "version" | "detalle" | "orden" | "activo", ExtArgs["result"]["productoVersiones"]>
  export type ProductoVersionesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    producto?: boolean | ProductosDefaultArgs<ExtArgs>
  }

  export type $ProductoVersionesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductoVersiones"
    objects: {
      producto: Prisma.$ProductosPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      producto_id: number
      version: string
      detalle: string | null
      orden: number
      activo: boolean
    }, ExtArgs["result"]["productoVersiones"]>
    composites: {}
  }

  type ProductoVersionesGetPayload<S extends boolean | null | undefined | ProductoVersionesDefaultArgs> = $Result.GetResult<Prisma.$ProductoVersionesPayload, S>

  type ProductoVersionesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductoVersionesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductoVersionesCountAggregateInputType | true
    }

  export interface ProductoVersionesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductoVersiones'], meta: { name: 'ProductoVersiones' } }
    /**
     * Find zero or one ProductoVersiones that matches the filter.
     * @param {ProductoVersionesFindUniqueArgs} args - Arguments to find a ProductoVersiones
     * @example
     * // Get one ProductoVersiones
     * const productoVersiones = await prisma.productoVersiones.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductoVersionesFindUniqueArgs>(args: SelectSubset<T, ProductoVersionesFindUniqueArgs<ExtArgs>>): Prisma__ProductoVersionesClient<$Result.GetResult<Prisma.$ProductoVersionesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProductoVersiones that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductoVersionesFindUniqueOrThrowArgs} args - Arguments to find a ProductoVersiones
     * @example
     * // Get one ProductoVersiones
     * const productoVersiones = await prisma.productoVersiones.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductoVersionesFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductoVersionesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductoVersionesClient<$Result.GetResult<Prisma.$ProductoVersionesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductoVersiones that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoVersionesFindFirstArgs} args - Arguments to find a ProductoVersiones
     * @example
     * // Get one ProductoVersiones
     * const productoVersiones = await prisma.productoVersiones.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductoVersionesFindFirstArgs>(args?: SelectSubset<T, ProductoVersionesFindFirstArgs<ExtArgs>>): Prisma__ProductoVersionesClient<$Result.GetResult<Prisma.$ProductoVersionesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductoVersiones that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoVersionesFindFirstOrThrowArgs} args - Arguments to find a ProductoVersiones
     * @example
     * // Get one ProductoVersiones
     * const productoVersiones = await prisma.productoVersiones.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductoVersionesFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductoVersionesFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductoVersionesClient<$Result.GetResult<Prisma.$ProductoVersionesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProductoVersiones that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoVersionesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductoVersiones
     * const productoVersiones = await prisma.productoVersiones.findMany()
     * 
     * // Get first 10 ProductoVersiones
     * const productoVersiones = await prisma.productoVersiones.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productoVersionesWithIdOnly = await prisma.productoVersiones.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductoVersionesFindManyArgs>(args?: SelectSubset<T, ProductoVersionesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductoVersionesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProductoVersiones.
     * @param {ProductoVersionesCreateArgs} args - Arguments to create a ProductoVersiones.
     * @example
     * // Create one ProductoVersiones
     * const ProductoVersiones = await prisma.productoVersiones.create({
     *   data: {
     *     // ... data to create a ProductoVersiones
     *   }
     * })
     * 
     */
    create<T extends ProductoVersionesCreateArgs>(args: SelectSubset<T, ProductoVersionesCreateArgs<ExtArgs>>): Prisma__ProductoVersionesClient<$Result.GetResult<Prisma.$ProductoVersionesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProductoVersiones.
     * @param {ProductoVersionesCreateManyArgs} args - Arguments to create many ProductoVersiones.
     * @example
     * // Create many ProductoVersiones
     * const productoVersiones = await prisma.productoVersiones.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductoVersionesCreateManyArgs>(args?: SelectSubset<T, ProductoVersionesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ProductoVersiones.
     * @param {ProductoVersionesDeleteArgs} args - Arguments to delete one ProductoVersiones.
     * @example
     * // Delete one ProductoVersiones
     * const ProductoVersiones = await prisma.productoVersiones.delete({
     *   where: {
     *     // ... filter to delete one ProductoVersiones
     *   }
     * })
     * 
     */
    delete<T extends ProductoVersionesDeleteArgs>(args: SelectSubset<T, ProductoVersionesDeleteArgs<ExtArgs>>): Prisma__ProductoVersionesClient<$Result.GetResult<Prisma.$ProductoVersionesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProductoVersiones.
     * @param {ProductoVersionesUpdateArgs} args - Arguments to update one ProductoVersiones.
     * @example
     * // Update one ProductoVersiones
     * const productoVersiones = await prisma.productoVersiones.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductoVersionesUpdateArgs>(args: SelectSubset<T, ProductoVersionesUpdateArgs<ExtArgs>>): Prisma__ProductoVersionesClient<$Result.GetResult<Prisma.$ProductoVersionesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProductoVersiones.
     * @param {ProductoVersionesDeleteManyArgs} args - Arguments to filter ProductoVersiones to delete.
     * @example
     * // Delete a few ProductoVersiones
     * const { count } = await prisma.productoVersiones.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductoVersionesDeleteManyArgs>(args?: SelectSubset<T, ProductoVersionesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductoVersiones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoVersionesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductoVersiones
     * const productoVersiones = await prisma.productoVersiones.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductoVersionesUpdateManyArgs>(args: SelectSubset<T, ProductoVersionesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProductoVersiones.
     * @param {ProductoVersionesUpsertArgs} args - Arguments to update or create a ProductoVersiones.
     * @example
     * // Update or create a ProductoVersiones
     * const productoVersiones = await prisma.productoVersiones.upsert({
     *   create: {
     *     // ... data to create a ProductoVersiones
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductoVersiones we want to update
     *   }
     * })
     */
    upsert<T extends ProductoVersionesUpsertArgs>(args: SelectSubset<T, ProductoVersionesUpsertArgs<ExtArgs>>): Prisma__ProductoVersionesClient<$Result.GetResult<Prisma.$ProductoVersionesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProductoVersiones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoVersionesCountArgs} args - Arguments to filter ProductoVersiones to count.
     * @example
     * // Count the number of ProductoVersiones
     * const count = await prisma.productoVersiones.count({
     *   where: {
     *     // ... the filter for the ProductoVersiones we want to count
     *   }
     * })
    **/
    count<T extends ProductoVersionesCountArgs>(
      args?: Subset<T, ProductoVersionesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductoVersionesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductoVersiones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoVersionesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductoVersionesAggregateArgs>(args: Subset<T, ProductoVersionesAggregateArgs>): Prisma.PrismaPromise<GetProductoVersionesAggregateType<T>>

    /**
     * Group by ProductoVersiones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoVersionesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductoVersionesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductoVersionesGroupByArgs['orderBy'] }
        : { orderBy?: ProductoVersionesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductoVersionesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductoVersionesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductoVersiones model
   */
  readonly fields: ProductoVersionesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductoVersiones.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductoVersionesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    producto<T extends ProductosDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductosDefaultArgs<ExtArgs>>): Prisma__ProductosClient<$Result.GetResult<Prisma.$ProductosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProductoVersiones model
   */
  interface ProductoVersionesFieldRefs {
    readonly id: FieldRef<"ProductoVersiones", 'Int'>
    readonly producto_id: FieldRef<"ProductoVersiones", 'Int'>
    readonly version: FieldRef<"ProductoVersiones", 'String'>
    readonly detalle: FieldRef<"ProductoVersiones", 'String'>
    readonly orden: FieldRef<"ProductoVersiones", 'Int'>
    readonly activo: FieldRef<"ProductoVersiones", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * ProductoVersiones findUnique
   */
  export type ProductoVersionesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoVersiones
     */
    select?: ProductoVersionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoVersiones
     */
    omit?: ProductoVersionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoVersionesInclude<ExtArgs> | null
    /**
     * Filter, which ProductoVersiones to fetch.
     */
    where: ProductoVersionesWhereUniqueInput
  }

  /**
   * ProductoVersiones findUniqueOrThrow
   */
  export type ProductoVersionesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoVersiones
     */
    select?: ProductoVersionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoVersiones
     */
    omit?: ProductoVersionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoVersionesInclude<ExtArgs> | null
    /**
     * Filter, which ProductoVersiones to fetch.
     */
    where: ProductoVersionesWhereUniqueInput
  }

  /**
   * ProductoVersiones findFirst
   */
  export type ProductoVersionesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoVersiones
     */
    select?: ProductoVersionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoVersiones
     */
    omit?: ProductoVersionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoVersionesInclude<ExtArgs> | null
    /**
     * Filter, which ProductoVersiones to fetch.
     */
    where?: ProductoVersionesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductoVersiones to fetch.
     */
    orderBy?: ProductoVersionesOrderByWithRelationInput | ProductoVersionesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductoVersiones.
     */
    cursor?: ProductoVersionesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductoVersiones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductoVersiones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductoVersiones.
     */
    distinct?: ProductoVersionesScalarFieldEnum | ProductoVersionesScalarFieldEnum[]
  }

  /**
   * ProductoVersiones findFirstOrThrow
   */
  export type ProductoVersionesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoVersiones
     */
    select?: ProductoVersionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoVersiones
     */
    omit?: ProductoVersionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoVersionesInclude<ExtArgs> | null
    /**
     * Filter, which ProductoVersiones to fetch.
     */
    where?: ProductoVersionesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductoVersiones to fetch.
     */
    orderBy?: ProductoVersionesOrderByWithRelationInput | ProductoVersionesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductoVersiones.
     */
    cursor?: ProductoVersionesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductoVersiones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductoVersiones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductoVersiones.
     */
    distinct?: ProductoVersionesScalarFieldEnum | ProductoVersionesScalarFieldEnum[]
  }

  /**
   * ProductoVersiones findMany
   */
  export type ProductoVersionesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoVersiones
     */
    select?: ProductoVersionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoVersiones
     */
    omit?: ProductoVersionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoVersionesInclude<ExtArgs> | null
    /**
     * Filter, which ProductoVersiones to fetch.
     */
    where?: ProductoVersionesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductoVersiones to fetch.
     */
    orderBy?: ProductoVersionesOrderByWithRelationInput | ProductoVersionesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductoVersiones.
     */
    cursor?: ProductoVersionesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductoVersiones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductoVersiones.
     */
    skip?: number
    distinct?: ProductoVersionesScalarFieldEnum | ProductoVersionesScalarFieldEnum[]
  }

  /**
   * ProductoVersiones create
   */
  export type ProductoVersionesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoVersiones
     */
    select?: ProductoVersionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoVersiones
     */
    omit?: ProductoVersionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoVersionesInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductoVersiones.
     */
    data: XOR<ProductoVersionesCreateInput, ProductoVersionesUncheckedCreateInput>
  }

  /**
   * ProductoVersiones createMany
   */
  export type ProductoVersionesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductoVersiones.
     */
    data: ProductoVersionesCreateManyInput | ProductoVersionesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductoVersiones update
   */
  export type ProductoVersionesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoVersiones
     */
    select?: ProductoVersionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoVersiones
     */
    omit?: ProductoVersionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoVersionesInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductoVersiones.
     */
    data: XOR<ProductoVersionesUpdateInput, ProductoVersionesUncheckedUpdateInput>
    /**
     * Choose, which ProductoVersiones to update.
     */
    where: ProductoVersionesWhereUniqueInput
  }

  /**
   * ProductoVersiones updateMany
   */
  export type ProductoVersionesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductoVersiones.
     */
    data: XOR<ProductoVersionesUpdateManyMutationInput, ProductoVersionesUncheckedUpdateManyInput>
    /**
     * Filter which ProductoVersiones to update
     */
    where?: ProductoVersionesWhereInput
    /**
     * Limit how many ProductoVersiones to update.
     */
    limit?: number
  }

  /**
   * ProductoVersiones upsert
   */
  export type ProductoVersionesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoVersiones
     */
    select?: ProductoVersionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoVersiones
     */
    omit?: ProductoVersionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoVersionesInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductoVersiones to update in case it exists.
     */
    where: ProductoVersionesWhereUniqueInput
    /**
     * In case the ProductoVersiones found by the `where` argument doesn't exist, create a new ProductoVersiones with this data.
     */
    create: XOR<ProductoVersionesCreateInput, ProductoVersionesUncheckedCreateInput>
    /**
     * In case the ProductoVersiones was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductoVersionesUpdateInput, ProductoVersionesUncheckedUpdateInput>
  }

  /**
   * ProductoVersiones delete
   */
  export type ProductoVersionesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoVersiones
     */
    select?: ProductoVersionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoVersiones
     */
    omit?: ProductoVersionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoVersionesInclude<ExtArgs> | null
    /**
     * Filter which ProductoVersiones to delete.
     */
    where: ProductoVersionesWhereUniqueInput
  }

  /**
   * ProductoVersiones deleteMany
   */
  export type ProductoVersionesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductoVersiones to delete
     */
    where?: ProductoVersionesWhereInput
    /**
     * Limit how many ProductoVersiones to delete.
     */
    limit?: number
  }

  /**
   * ProductoVersiones without action
   */
  export type ProductoVersionesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoVersiones
     */
    select?: ProductoVersionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoVersiones
     */
    omit?: ProductoVersionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoVersionesInclude<ExtArgs> | null
  }


  /**
   * Model ProductoEspecificaciones
   */

  export type AggregateProductoEspecificaciones = {
    _count: ProductoEspecificacionesCountAggregateOutputType | null
    _avg: ProductoEspecificacionesAvgAggregateOutputType | null
    _sum: ProductoEspecificacionesSumAggregateOutputType | null
    _min: ProductoEspecificacionesMinAggregateOutputType | null
    _max: ProductoEspecificacionesMaxAggregateOutputType | null
  }

  export type ProductoEspecificacionesAvgAggregateOutputType = {
    id: number | null
    producto_id: number | null
    orden: number | null
  }

  export type ProductoEspecificacionesSumAggregateOutputType = {
    id: number | null
    producto_id: number | null
    orden: number | null
  }

  export type ProductoEspecificacionesMinAggregateOutputType = {
    id: number | null
    producto_id: number | null
    categoria: string | null
    especificaciones: string | null
    orden: number | null
    activo: boolean | null
  }

  export type ProductoEspecificacionesMaxAggregateOutputType = {
    id: number | null
    producto_id: number | null
    categoria: string | null
    especificaciones: string | null
    orden: number | null
    activo: boolean | null
  }

  export type ProductoEspecificacionesCountAggregateOutputType = {
    id: number
    producto_id: number
    categoria: number
    especificaciones: number
    orden: number
    activo: number
    _all: number
  }


  export type ProductoEspecificacionesAvgAggregateInputType = {
    id?: true
    producto_id?: true
    orden?: true
  }

  export type ProductoEspecificacionesSumAggregateInputType = {
    id?: true
    producto_id?: true
    orden?: true
  }

  export type ProductoEspecificacionesMinAggregateInputType = {
    id?: true
    producto_id?: true
    categoria?: true
    especificaciones?: true
    orden?: true
    activo?: true
  }

  export type ProductoEspecificacionesMaxAggregateInputType = {
    id?: true
    producto_id?: true
    categoria?: true
    especificaciones?: true
    orden?: true
    activo?: true
  }

  export type ProductoEspecificacionesCountAggregateInputType = {
    id?: true
    producto_id?: true
    categoria?: true
    especificaciones?: true
    orden?: true
    activo?: true
    _all?: true
  }

  export type ProductoEspecificacionesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductoEspecificaciones to aggregate.
     */
    where?: ProductoEspecificacionesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductoEspecificaciones to fetch.
     */
    orderBy?: ProductoEspecificacionesOrderByWithRelationInput | ProductoEspecificacionesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductoEspecificacionesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductoEspecificaciones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductoEspecificaciones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductoEspecificaciones
    **/
    _count?: true | ProductoEspecificacionesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductoEspecificacionesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductoEspecificacionesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductoEspecificacionesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductoEspecificacionesMaxAggregateInputType
  }

  export type GetProductoEspecificacionesAggregateType<T extends ProductoEspecificacionesAggregateArgs> = {
        [P in keyof T & keyof AggregateProductoEspecificaciones]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductoEspecificaciones[P]>
      : GetScalarType<T[P], AggregateProductoEspecificaciones[P]>
  }




  export type ProductoEspecificacionesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductoEspecificacionesWhereInput
    orderBy?: ProductoEspecificacionesOrderByWithAggregationInput | ProductoEspecificacionesOrderByWithAggregationInput[]
    by: ProductoEspecificacionesScalarFieldEnum[] | ProductoEspecificacionesScalarFieldEnum
    having?: ProductoEspecificacionesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductoEspecificacionesCountAggregateInputType | true
    _avg?: ProductoEspecificacionesAvgAggregateInputType
    _sum?: ProductoEspecificacionesSumAggregateInputType
    _min?: ProductoEspecificacionesMinAggregateInputType
    _max?: ProductoEspecificacionesMaxAggregateInputType
  }

  export type ProductoEspecificacionesGroupByOutputType = {
    id: number
    producto_id: number
    categoria: string
    especificaciones: string
    orden: number
    activo: boolean
    _count: ProductoEspecificacionesCountAggregateOutputType | null
    _avg: ProductoEspecificacionesAvgAggregateOutputType | null
    _sum: ProductoEspecificacionesSumAggregateOutputType | null
    _min: ProductoEspecificacionesMinAggregateOutputType | null
    _max: ProductoEspecificacionesMaxAggregateOutputType | null
  }

  type GetProductoEspecificacionesGroupByPayload<T extends ProductoEspecificacionesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductoEspecificacionesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductoEspecificacionesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductoEspecificacionesGroupByOutputType[P]>
            : GetScalarType<T[P], ProductoEspecificacionesGroupByOutputType[P]>
        }
      >
    >


  export type ProductoEspecificacionesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    producto_id?: boolean
    categoria?: boolean
    especificaciones?: boolean
    orden?: boolean
    activo?: boolean
    producto?: boolean | ProductosDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productoEspecificaciones"]>



  export type ProductoEspecificacionesSelectScalar = {
    id?: boolean
    producto_id?: boolean
    categoria?: boolean
    especificaciones?: boolean
    orden?: boolean
    activo?: boolean
  }

  export type ProductoEspecificacionesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "producto_id" | "categoria" | "especificaciones" | "orden" | "activo", ExtArgs["result"]["productoEspecificaciones"]>
  export type ProductoEspecificacionesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    producto?: boolean | ProductosDefaultArgs<ExtArgs>
  }

  export type $ProductoEspecificacionesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductoEspecificaciones"
    objects: {
      producto: Prisma.$ProductosPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      producto_id: number
      categoria: string
      especificaciones: string
      orden: number
      activo: boolean
    }, ExtArgs["result"]["productoEspecificaciones"]>
    composites: {}
  }

  type ProductoEspecificacionesGetPayload<S extends boolean | null | undefined | ProductoEspecificacionesDefaultArgs> = $Result.GetResult<Prisma.$ProductoEspecificacionesPayload, S>

  type ProductoEspecificacionesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductoEspecificacionesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductoEspecificacionesCountAggregateInputType | true
    }

  export interface ProductoEspecificacionesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductoEspecificaciones'], meta: { name: 'ProductoEspecificaciones' } }
    /**
     * Find zero or one ProductoEspecificaciones that matches the filter.
     * @param {ProductoEspecificacionesFindUniqueArgs} args - Arguments to find a ProductoEspecificaciones
     * @example
     * // Get one ProductoEspecificaciones
     * const productoEspecificaciones = await prisma.productoEspecificaciones.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductoEspecificacionesFindUniqueArgs>(args: SelectSubset<T, ProductoEspecificacionesFindUniqueArgs<ExtArgs>>): Prisma__ProductoEspecificacionesClient<$Result.GetResult<Prisma.$ProductoEspecificacionesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProductoEspecificaciones that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductoEspecificacionesFindUniqueOrThrowArgs} args - Arguments to find a ProductoEspecificaciones
     * @example
     * // Get one ProductoEspecificaciones
     * const productoEspecificaciones = await prisma.productoEspecificaciones.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductoEspecificacionesFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductoEspecificacionesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductoEspecificacionesClient<$Result.GetResult<Prisma.$ProductoEspecificacionesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductoEspecificaciones that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoEspecificacionesFindFirstArgs} args - Arguments to find a ProductoEspecificaciones
     * @example
     * // Get one ProductoEspecificaciones
     * const productoEspecificaciones = await prisma.productoEspecificaciones.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductoEspecificacionesFindFirstArgs>(args?: SelectSubset<T, ProductoEspecificacionesFindFirstArgs<ExtArgs>>): Prisma__ProductoEspecificacionesClient<$Result.GetResult<Prisma.$ProductoEspecificacionesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductoEspecificaciones that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoEspecificacionesFindFirstOrThrowArgs} args - Arguments to find a ProductoEspecificaciones
     * @example
     * // Get one ProductoEspecificaciones
     * const productoEspecificaciones = await prisma.productoEspecificaciones.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductoEspecificacionesFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductoEspecificacionesFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductoEspecificacionesClient<$Result.GetResult<Prisma.$ProductoEspecificacionesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProductoEspecificaciones that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoEspecificacionesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductoEspecificaciones
     * const productoEspecificaciones = await prisma.productoEspecificaciones.findMany()
     * 
     * // Get first 10 ProductoEspecificaciones
     * const productoEspecificaciones = await prisma.productoEspecificaciones.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productoEspecificacionesWithIdOnly = await prisma.productoEspecificaciones.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductoEspecificacionesFindManyArgs>(args?: SelectSubset<T, ProductoEspecificacionesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductoEspecificacionesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProductoEspecificaciones.
     * @param {ProductoEspecificacionesCreateArgs} args - Arguments to create a ProductoEspecificaciones.
     * @example
     * // Create one ProductoEspecificaciones
     * const ProductoEspecificaciones = await prisma.productoEspecificaciones.create({
     *   data: {
     *     // ... data to create a ProductoEspecificaciones
     *   }
     * })
     * 
     */
    create<T extends ProductoEspecificacionesCreateArgs>(args: SelectSubset<T, ProductoEspecificacionesCreateArgs<ExtArgs>>): Prisma__ProductoEspecificacionesClient<$Result.GetResult<Prisma.$ProductoEspecificacionesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProductoEspecificaciones.
     * @param {ProductoEspecificacionesCreateManyArgs} args - Arguments to create many ProductoEspecificaciones.
     * @example
     * // Create many ProductoEspecificaciones
     * const productoEspecificaciones = await prisma.productoEspecificaciones.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductoEspecificacionesCreateManyArgs>(args?: SelectSubset<T, ProductoEspecificacionesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ProductoEspecificaciones.
     * @param {ProductoEspecificacionesDeleteArgs} args - Arguments to delete one ProductoEspecificaciones.
     * @example
     * // Delete one ProductoEspecificaciones
     * const ProductoEspecificaciones = await prisma.productoEspecificaciones.delete({
     *   where: {
     *     // ... filter to delete one ProductoEspecificaciones
     *   }
     * })
     * 
     */
    delete<T extends ProductoEspecificacionesDeleteArgs>(args: SelectSubset<T, ProductoEspecificacionesDeleteArgs<ExtArgs>>): Prisma__ProductoEspecificacionesClient<$Result.GetResult<Prisma.$ProductoEspecificacionesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProductoEspecificaciones.
     * @param {ProductoEspecificacionesUpdateArgs} args - Arguments to update one ProductoEspecificaciones.
     * @example
     * // Update one ProductoEspecificaciones
     * const productoEspecificaciones = await prisma.productoEspecificaciones.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductoEspecificacionesUpdateArgs>(args: SelectSubset<T, ProductoEspecificacionesUpdateArgs<ExtArgs>>): Prisma__ProductoEspecificacionesClient<$Result.GetResult<Prisma.$ProductoEspecificacionesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProductoEspecificaciones.
     * @param {ProductoEspecificacionesDeleteManyArgs} args - Arguments to filter ProductoEspecificaciones to delete.
     * @example
     * // Delete a few ProductoEspecificaciones
     * const { count } = await prisma.productoEspecificaciones.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductoEspecificacionesDeleteManyArgs>(args?: SelectSubset<T, ProductoEspecificacionesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductoEspecificaciones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoEspecificacionesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductoEspecificaciones
     * const productoEspecificaciones = await prisma.productoEspecificaciones.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductoEspecificacionesUpdateManyArgs>(args: SelectSubset<T, ProductoEspecificacionesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProductoEspecificaciones.
     * @param {ProductoEspecificacionesUpsertArgs} args - Arguments to update or create a ProductoEspecificaciones.
     * @example
     * // Update or create a ProductoEspecificaciones
     * const productoEspecificaciones = await prisma.productoEspecificaciones.upsert({
     *   create: {
     *     // ... data to create a ProductoEspecificaciones
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductoEspecificaciones we want to update
     *   }
     * })
     */
    upsert<T extends ProductoEspecificacionesUpsertArgs>(args: SelectSubset<T, ProductoEspecificacionesUpsertArgs<ExtArgs>>): Prisma__ProductoEspecificacionesClient<$Result.GetResult<Prisma.$ProductoEspecificacionesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProductoEspecificaciones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoEspecificacionesCountArgs} args - Arguments to filter ProductoEspecificaciones to count.
     * @example
     * // Count the number of ProductoEspecificaciones
     * const count = await prisma.productoEspecificaciones.count({
     *   where: {
     *     // ... the filter for the ProductoEspecificaciones we want to count
     *   }
     * })
    **/
    count<T extends ProductoEspecificacionesCountArgs>(
      args?: Subset<T, ProductoEspecificacionesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductoEspecificacionesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductoEspecificaciones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoEspecificacionesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductoEspecificacionesAggregateArgs>(args: Subset<T, ProductoEspecificacionesAggregateArgs>): Prisma.PrismaPromise<GetProductoEspecificacionesAggregateType<T>>

    /**
     * Group by ProductoEspecificaciones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoEspecificacionesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductoEspecificacionesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductoEspecificacionesGroupByArgs['orderBy'] }
        : { orderBy?: ProductoEspecificacionesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductoEspecificacionesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductoEspecificacionesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductoEspecificaciones model
   */
  readonly fields: ProductoEspecificacionesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductoEspecificaciones.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductoEspecificacionesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    producto<T extends ProductosDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductosDefaultArgs<ExtArgs>>): Prisma__ProductosClient<$Result.GetResult<Prisma.$ProductosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProductoEspecificaciones model
   */
  interface ProductoEspecificacionesFieldRefs {
    readonly id: FieldRef<"ProductoEspecificaciones", 'Int'>
    readonly producto_id: FieldRef<"ProductoEspecificaciones", 'Int'>
    readonly categoria: FieldRef<"ProductoEspecificaciones", 'String'>
    readonly especificaciones: FieldRef<"ProductoEspecificaciones", 'String'>
    readonly orden: FieldRef<"ProductoEspecificaciones", 'Int'>
    readonly activo: FieldRef<"ProductoEspecificaciones", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * ProductoEspecificaciones findUnique
   */
  export type ProductoEspecificacionesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoEspecificaciones
     */
    select?: ProductoEspecificacionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoEspecificaciones
     */
    omit?: ProductoEspecificacionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoEspecificacionesInclude<ExtArgs> | null
    /**
     * Filter, which ProductoEspecificaciones to fetch.
     */
    where: ProductoEspecificacionesWhereUniqueInput
  }

  /**
   * ProductoEspecificaciones findUniqueOrThrow
   */
  export type ProductoEspecificacionesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoEspecificaciones
     */
    select?: ProductoEspecificacionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoEspecificaciones
     */
    omit?: ProductoEspecificacionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoEspecificacionesInclude<ExtArgs> | null
    /**
     * Filter, which ProductoEspecificaciones to fetch.
     */
    where: ProductoEspecificacionesWhereUniqueInput
  }

  /**
   * ProductoEspecificaciones findFirst
   */
  export type ProductoEspecificacionesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoEspecificaciones
     */
    select?: ProductoEspecificacionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoEspecificaciones
     */
    omit?: ProductoEspecificacionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoEspecificacionesInclude<ExtArgs> | null
    /**
     * Filter, which ProductoEspecificaciones to fetch.
     */
    where?: ProductoEspecificacionesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductoEspecificaciones to fetch.
     */
    orderBy?: ProductoEspecificacionesOrderByWithRelationInput | ProductoEspecificacionesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductoEspecificaciones.
     */
    cursor?: ProductoEspecificacionesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductoEspecificaciones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductoEspecificaciones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductoEspecificaciones.
     */
    distinct?: ProductoEspecificacionesScalarFieldEnum | ProductoEspecificacionesScalarFieldEnum[]
  }

  /**
   * ProductoEspecificaciones findFirstOrThrow
   */
  export type ProductoEspecificacionesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoEspecificaciones
     */
    select?: ProductoEspecificacionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoEspecificaciones
     */
    omit?: ProductoEspecificacionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoEspecificacionesInclude<ExtArgs> | null
    /**
     * Filter, which ProductoEspecificaciones to fetch.
     */
    where?: ProductoEspecificacionesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductoEspecificaciones to fetch.
     */
    orderBy?: ProductoEspecificacionesOrderByWithRelationInput | ProductoEspecificacionesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductoEspecificaciones.
     */
    cursor?: ProductoEspecificacionesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductoEspecificaciones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductoEspecificaciones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductoEspecificaciones.
     */
    distinct?: ProductoEspecificacionesScalarFieldEnum | ProductoEspecificacionesScalarFieldEnum[]
  }

  /**
   * ProductoEspecificaciones findMany
   */
  export type ProductoEspecificacionesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoEspecificaciones
     */
    select?: ProductoEspecificacionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoEspecificaciones
     */
    omit?: ProductoEspecificacionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoEspecificacionesInclude<ExtArgs> | null
    /**
     * Filter, which ProductoEspecificaciones to fetch.
     */
    where?: ProductoEspecificacionesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductoEspecificaciones to fetch.
     */
    orderBy?: ProductoEspecificacionesOrderByWithRelationInput | ProductoEspecificacionesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductoEspecificaciones.
     */
    cursor?: ProductoEspecificacionesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductoEspecificaciones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductoEspecificaciones.
     */
    skip?: number
    distinct?: ProductoEspecificacionesScalarFieldEnum | ProductoEspecificacionesScalarFieldEnum[]
  }

  /**
   * ProductoEspecificaciones create
   */
  export type ProductoEspecificacionesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoEspecificaciones
     */
    select?: ProductoEspecificacionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoEspecificaciones
     */
    omit?: ProductoEspecificacionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoEspecificacionesInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductoEspecificaciones.
     */
    data: XOR<ProductoEspecificacionesCreateInput, ProductoEspecificacionesUncheckedCreateInput>
  }

  /**
   * ProductoEspecificaciones createMany
   */
  export type ProductoEspecificacionesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductoEspecificaciones.
     */
    data: ProductoEspecificacionesCreateManyInput | ProductoEspecificacionesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductoEspecificaciones update
   */
  export type ProductoEspecificacionesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoEspecificaciones
     */
    select?: ProductoEspecificacionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoEspecificaciones
     */
    omit?: ProductoEspecificacionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoEspecificacionesInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductoEspecificaciones.
     */
    data: XOR<ProductoEspecificacionesUpdateInput, ProductoEspecificacionesUncheckedUpdateInput>
    /**
     * Choose, which ProductoEspecificaciones to update.
     */
    where: ProductoEspecificacionesWhereUniqueInput
  }

  /**
   * ProductoEspecificaciones updateMany
   */
  export type ProductoEspecificacionesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductoEspecificaciones.
     */
    data: XOR<ProductoEspecificacionesUpdateManyMutationInput, ProductoEspecificacionesUncheckedUpdateManyInput>
    /**
     * Filter which ProductoEspecificaciones to update
     */
    where?: ProductoEspecificacionesWhereInput
    /**
     * Limit how many ProductoEspecificaciones to update.
     */
    limit?: number
  }

  /**
   * ProductoEspecificaciones upsert
   */
  export type ProductoEspecificacionesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoEspecificaciones
     */
    select?: ProductoEspecificacionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoEspecificaciones
     */
    omit?: ProductoEspecificacionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoEspecificacionesInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductoEspecificaciones to update in case it exists.
     */
    where: ProductoEspecificacionesWhereUniqueInput
    /**
     * In case the ProductoEspecificaciones found by the `where` argument doesn't exist, create a new ProductoEspecificaciones with this data.
     */
    create: XOR<ProductoEspecificacionesCreateInput, ProductoEspecificacionesUncheckedCreateInput>
    /**
     * In case the ProductoEspecificaciones was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductoEspecificacionesUpdateInput, ProductoEspecificacionesUncheckedUpdateInput>
  }

  /**
   * ProductoEspecificaciones delete
   */
  export type ProductoEspecificacionesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoEspecificaciones
     */
    select?: ProductoEspecificacionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoEspecificaciones
     */
    omit?: ProductoEspecificacionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoEspecificacionesInclude<ExtArgs> | null
    /**
     * Filter which ProductoEspecificaciones to delete.
     */
    where: ProductoEspecificacionesWhereUniqueInput
  }

  /**
   * ProductoEspecificaciones deleteMany
   */
  export type ProductoEspecificacionesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductoEspecificaciones to delete
     */
    where?: ProductoEspecificacionesWhereInput
    /**
     * Limit how many ProductoEspecificaciones to delete.
     */
    limit?: number
  }

  /**
   * ProductoEspecificaciones without action
   */
  export type ProductoEspecificacionesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoEspecificaciones
     */
    select?: ProductoEspecificacionesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoEspecificaciones
     */
    omit?: ProductoEspecificacionesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoEspecificacionesInclude<ExtArgs> | null
  }


  /**
   * Model Pedidos
   */

  export type AggregatePedidos = {
    _count: PedidosCountAggregateOutputType | null
    _avg: PedidosAvgAggregateOutputType | null
    _sum: PedidosSumAggregateOutputType | null
    _min: PedidosMinAggregateOutputType | null
    _max: PedidosMaxAggregateOutputType | null
  }

  export type PedidosAvgAggregateOutputType = {
    id: number | null
    total: Decimal | null
  }

  export type PedidosSumAggregateOutputType = {
    id: number | null
    total: Decimal | null
  }

  export type PedidosMinAggregateOutputType = {
    id: number | null
    total: Decimal | null
    estado: string | null
    metodo_pago: string | null
    comprador_nombre: string | null
    comprador_email: string | null
    comprador_telefono: string | null
    direccion_envio: string | null
    mp_payment_id: string | null
    transferencia_ref: string | null
    tarjeta_last4: string | null
    tarjeta_payment_method: string | null
    mp_error_code: string | null
    mp_error_message: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PedidosMaxAggregateOutputType = {
    id: number | null
    total: Decimal | null
    estado: string | null
    metodo_pago: string | null
    comprador_nombre: string | null
    comprador_email: string | null
    comprador_telefono: string | null
    direccion_envio: string | null
    mp_payment_id: string | null
    transferencia_ref: string | null
    tarjeta_last4: string | null
    tarjeta_payment_method: string | null
    mp_error_code: string | null
    mp_error_message: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PedidosCountAggregateOutputType = {
    id: number
    datos: number
    total: number
    estado: number
    metodo_pago: number
    comprador_nombre: number
    comprador_email: number
    comprador_telefono: number
    direccion_envio: number
    mp_payment_id: number
    transferencia_ref: number
    tarjeta_last4: number
    tarjeta_payment_method: number
    mp_error_code: number
    mp_error_message: number
    mp_response: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PedidosAvgAggregateInputType = {
    id?: true
    total?: true
  }

  export type PedidosSumAggregateInputType = {
    id?: true
    total?: true
  }

  export type PedidosMinAggregateInputType = {
    id?: true
    total?: true
    estado?: true
    metodo_pago?: true
    comprador_nombre?: true
    comprador_email?: true
    comprador_telefono?: true
    direccion_envio?: true
    mp_payment_id?: true
    transferencia_ref?: true
    tarjeta_last4?: true
    tarjeta_payment_method?: true
    mp_error_code?: true
    mp_error_message?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PedidosMaxAggregateInputType = {
    id?: true
    total?: true
    estado?: true
    metodo_pago?: true
    comprador_nombre?: true
    comprador_email?: true
    comprador_telefono?: true
    direccion_envio?: true
    mp_payment_id?: true
    transferencia_ref?: true
    tarjeta_last4?: true
    tarjeta_payment_method?: true
    mp_error_code?: true
    mp_error_message?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PedidosCountAggregateInputType = {
    id?: true
    datos?: true
    total?: true
    estado?: true
    metodo_pago?: true
    comprador_nombre?: true
    comprador_email?: true
    comprador_telefono?: true
    direccion_envio?: true
    mp_payment_id?: true
    transferencia_ref?: true
    tarjeta_last4?: true
    tarjeta_payment_method?: true
    mp_error_code?: true
    mp_error_message?: true
    mp_response?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PedidosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pedidos to aggregate.
     */
    where?: PedidosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pedidos to fetch.
     */
    orderBy?: PedidosOrderByWithRelationInput | PedidosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PedidosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pedidos
    **/
    _count?: true | PedidosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PedidosAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PedidosSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PedidosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PedidosMaxAggregateInputType
  }

  export type GetPedidosAggregateType<T extends PedidosAggregateArgs> = {
        [P in keyof T & keyof AggregatePedidos]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePedidos[P]>
      : GetScalarType<T[P], AggregatePedidos[P]>
  }




  export type PedidosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PedidosWhereInput
    orderBy?: PedidosOrderByWithAggregationInput | PedidosOrderByWithAggregationInput[]
    by: PedidosScalarFieldEnum[] | PedidosScalarFieldEnum
    having?: PedidosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PedidosCountAggregateInputType | true
    _avg?: PedidosAvgAggregateInputType
    _sum?: PedidosSumAggregateInputType
    _min?: PedidosMinAggregateInputType
    _max?: PedidosMaxAggregateInputType
  }

  export type PedidosGroupByOutputType = {
    id: number
    datos: JsonValue
    total: Decimal
    estado: string
    metodo_pago: string
    comprador_nombre: string
    comprador_email: string
    comprador_telefono: string | null
    direccion_envio: string | null
    mp_payment_id: string | null
    transferencia_ref: string | null
    tarjeta_last4: string | null
    tarjeta_payment_method: string | null
    mp_error_code: string | null
    mp_error_message: string | null
    mp_response: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: PedidosCountAggregateOutputType | null
    _avg: PedidosAvgAggregateOutputType | null
    _sum: PedidosSumAggregateOutputType | null
    _min: PedidosMinAggregateOutputType | null
    _max: PedidosMaxAggregateOutputType | null
  }

  type GetPedidosGroupByPayload<T extends PedidosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PedidosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PedidosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PedidosGroupByOutputType[P]>
            : GetScalarType<T[P], PedidosGroupByOutputType[P]>
        }
      >
    >


  export type PedidosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    datos?: boolean
    total?: boolean
    estado?: boolean
    metodo_pago?: boolean
    comprador_nombre?: boolean
    comprador_email?: boolean
    comprador_telefono?: boolean
    direccion_envio?: boolean
    mp_payment_id?: boolean
    transferencia_ref?: boolean
    tarjeta_last4?: boolean
    tarjeta_payment_method?: boolean
    mp_error_code?: boolean
    mp_error_message?: boolean
    mp_response?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    estadoRel?: boolean | Pedidos$estadoRelArgs<ExtArgs>
  }, ExtArgs["result"]["pedidos"]>



  export type PedidosSelectScalar = {
    id?: boolean
    datos?: boolean
    total?: boolean
    estado?: boolean
    metodo_pago?: boolean
    comprador_nombre?: boolean
    comprador_email?: boolean
    comprador_telefono?: boolean
    direccion_envio?: boolean
    mp_payment_id?: boolean
    transferencia_ref?: boolean
    tarjeta_last4?: boolean
    tarjeta_payment_method?: boolean
    mp_error_code?: boolean
    mp_error_message?: boolean
    mp_response?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PedidosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "datos" | "total" | "estado" | "metodo_pago" | "comprador_nombre" | "comprador_email" | "comprador_telefono" | "direccion_envio" | "mp_payment_id" | "transferencia_ref" | "tarjeta_last4" | "tarjeta_payment_method" | "mp_error_code" | "mp_error_message" | "mp_response" | "createdAt" | "updatedAt", ExtArgs["result"]["pedidos"]>
  export type PedidosInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    estadoRel?: boolean | Pedidos$estadoRelArgs<ExtArgs>
  }

  export type $PedidosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pedidos"
    objects: {
      estadoRel: Prisma.$CfgEstadoPedidoPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      datos: Prisma.JsonValue
      total: Prisma.Decimal
      estado: string
      metodo_pago: string
      comprador_nombre: string
      comprador_email: string
      comprador_telefono: string | null
      direccion_envio: string | null
      mp_payment_id: string | null
      transferencia_ref: string | null
      tarjeta_last4: string | null
      tarjeta_payment_method: string | null
      mp_error_code: string | null
      mp_error_message: string | null
      mp_response: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["pedidos"]>
    composites: {}
  }

  type PedidosGetPayload<S extends boolean | null | undefined | PedidosDefaultArgs> = $Result.GetResult<Prisma.$PedidosPayload, S>

  type PedidosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PedidosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PedidosCountAggregateInputType | true
    }

  export interface PedidosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pedidos'], meta: { name: 'Pedidos' } }
    /**
     * Find zero or one Pedidos that matches the filter.
     * @param {PedidosFindUniqueArgs} args - Arguments to find a Pedidos
     * @example
     * // Get one Pedidos
     * const pedidos = await prisma.pedidos.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PedidosFindUniqueArgs>(args: SelectSubset<T, PedidosFindUniqueArgs<ExtArgs>>): Prisma__PedidosClient<$Result.GetResult<Prisma.$PedidosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pedidos that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PedidosFindUniqueOrThrowArgs} args - Arguments to find a Pedidos
     * @example
     * // Get one Pedidos
     * const pedidos = await prisma.pedidos.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PedidosFindUniqueOrThrowArgs>(args: SelectSubset<T, PedidosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PedidosClient<$Result.GetResult<Prisma.$PedidosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pedidos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidosFindFirstArgs} args - Arguments to find a Pedidos
     * @example
     * // Get one Pedidos
     * const pedidos = await prisma.pedidos.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PedidosFindFirstArgs>(args?: SelectSubset<T, PedidosFindFirstArgs<ExtArgs>>): Prisma__PedidosClient<$Result.GetResult<Prisma.$PedidosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pedidos that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidosFindFirstOrThrowArgs} args - Arguments to find a Pedidos
     * @example
     * // Get one Pedidos
     * const pedidos = await prisma.pedidos.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PedidosFindFirstOrThrowArgs>(args?: SelectSubset<T, PedidosFindFirstOrThrowArgs<ExtArgs>>): Prisma__PedidosClient<$Result.GetResult<Prisma.$PedidosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pedidos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pedidos
     * const pedidos = await prisma.pedidos.findMany()
     * 
     * // Get first 10 Pedidos
     * const pedidos = await prisma.pedidos.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pedidosWithIdOnly = await prisma.pedidos.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PedidosFindManyArgs>(args?: SelectSubset<T, PedidosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pedidos.
     * @param {PedidosCreateArgs} args - Arguments to create a Pedidos.
     * @example
     * // Create one Pedidos
     * const Pedidos = await prisma.pedidos.create({
     *   data: {
     *     // ... data to create a Pedidos
     *   }
     * })
     * 
     */
    create<T extends PedidosCreateArgs>(args: SelectSubset<T, PedidosCreateArgs<ExtArgs>>): Prisma__PedidosClient<$Result.GetResult<Prisma.$PedidosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pedidos.
     * @param {PedidosCreateManyArgs} args - Arguments to create many Pedidos.
     * @example
     * // Create many Pedidos
     * const pedidos = await prisma.pedidos.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PedidosCreateManyArgs>(args?: SelectSubset<T, PedidosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Pedidos.
     * @param {PedidosDeleteArgs} args - Arguments to delete one Pedidos.
     * @example
     * // Delete one Pedidos
     * const Pedidos = await prisma.pedidos.delete({
     *   where: {
     *     // ... filter to delete one Pedidos
     *   }
     * })
     * 
     */
    delete<T extends PedidosDeleteArgs>(args: SelectSubset<T, PedidosDeleteArgs<ExtArgs>>): Prisma__PedidosClient<$Result.GetResult<Prisma.$PedidosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pedidos.
     * @param {PedidosUpdateArgs} args - Arguments to update one Pedidos.
     * @example
     * // Update one Pedidos
     * const pedidos = await prisma.pedidos.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PedidosUpdateArgs>(args: SelectSubset<T, PedidosUpdateArgs<ExtArgs>>): Prisma__PedidosClient<$Result.GetResult<Prisma.$PedidosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pedidos.
     * @param {PedidosDeleteManyArgs} args - Arguments to filter Pedidos to delete.
     * @example
     * // Delete a few Pedidos
     * const { count } = await prisma.pedidos.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PedidosDeleteManyArgs>(args?: SelectSubset<T, PedidosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pedidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pedidos
     * const pedidos = await prisma.pedidos.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PedidosUpdateManyArgs>(args: SelectSubset<T, PedidosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Pedidos.
     * @param {PedidosUpsertArgs} args - Arguments to update or create a Pedidos.
     * @example
     * // Update or create a Pedidos
     * const pedidos = await prisma.pedidos.upsert({
     *   create: {
     *     // ... data to create a Pedidos
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pedidos we want to update
     *   }
     * })
     */
    upsert<T extends PedidosUpsertArgs>(args: SelectSubset<T, PedidosUpsertArgs<ExtArgs>>): Prisma__PedidosClient<$Result.GetResult<Prisma.$PedidosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pedidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidosCountArgs} args - Arguments to filter Pedidos to count.
     * @example
     * // Count the number of Pedidos
     * const count = await prisma.pedidos.count({
     *   where: {
     *     // ... the filter for the Pedidos we want to count
     *   }
     * })
    **/
    count<T extends PedidosCountArgs>(
      args?: Subset<T, PedidosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PedidosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pedidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PedidosAggregateArgs>(args: Subset<T, PedidosAggregateArgs>): Prisma.PrismaPromise<GetPedidosAggregateType<T>>

    /**
     * Group by Pedidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidosGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PedidosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PedidosGroupByArgs['orderBy'] }
        : { orderBy?: PedidosGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PedidosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPedidosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pedidos model
   */
  readonly fields: PedidosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pedidos.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PedidosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    estadoRel<T extends Pedidos$estadoRelArgs<ExtArgs> = {}>(args?: Subset<T, Pedidos$estadoRelArgs<ExtArgs>>): Prisma__CfgEstadoPedidoClient<$Result.GetResult<Prisma.$CfgEstadoPedidoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Pedidos model
   */
  interface PedidosFieldRefs {
    readonly id: FieldRef<"Pedidos", 'Int'>
    readonly datos: FieldRef<"Pedidos", 'Json'>
    readonly total: FieldRef<"Pedidos", 'Decimal'>
    readonly estado: FieldRef<"Pedidos", 'String'>
    readonly metodo_pago: FieldRef<"Pedidos", 'String'>
    readonly comprador_nombre: FieldRef<"Pedidos", 'String'>
    readonly comprador_email: FieldRef<"Pedidos", 'String'>
    readonly comprador_telefono: FieldRef<"Pedidos", 'String'>
    readonly direccion_envio: FieldRef<"Pedidos", 'String'>
    readonly mp_payment_id: FieldRef<"Pedidos", 'String'>
    readonly transferencia_ref: FieldRef<"Pedidos", 'String'>
    readonly tarjeta_last4: FieldRef<"Pedidos", 'String'>
    readonly tarjeta_payment_method: FieldRef<"Pedidos", 'String'>
    readonly mp_error_code: FieldRef<"Pedidos", 'String'>
    readonly mp_error_message: FieldRef<"Pedidos", 'String'>
    readonly mp_response: FieldRef<"Pedidos", 'Json'>
    readonly createdAt: FieldRef<"Pedidos", 'DateTime'>
    readonly updatedAt: FieldRef<"Pedidos", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Pedidos findUnique
   */
  export type PedidosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedidos
     */
    select?: PedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedidos
     */
    omit?: PedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidosInclude<ExtArgs> | null
    /**
     * Filter, which Pedidos to fetch.
     */
    where: PedidosWhereUniqueInput
  }

  /**
   * Pedidos findUniqueOrThrow
   */
  export type PedidosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedidos
     */
    select?: PedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedidos
     */
    omit?: PedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidosInclude<ExtArgs> | null
    /**
     * Filter, which Pedidos to fetch.
     */
    where: PedidosWhereUniqueInput
  }

  /**
   * Pedidos findFirst
   */
  export type PedidosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedidos
     */
    select?: PedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedidos
     */
    omit?: PedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidosInclude<ExtArgs> | null
    /**
     * Filter, which Pedidos to fetch.
     */
    where?: PedidosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pedidos to fetch.
     */
    orderBy?: PedidosOrderByWithRelationInput | PedidosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pedidos.
     */
    cursor?: PedidosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pedidos.
     */
    distinct?: PedidosScalarFieldEnum | PedidosScalarFieldEnum[]
  }

  /**
   * Pedidos findFirstOrThrow
   */
  export type PedidosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedidos
     */
    select?: PedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedidos
     */
    omit?: PedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidosInclude<ExtArgs> | null
    /**
     * Filter, which Pedidos to fetch.
     */
    where?: PedidosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pedidos to fetch.
     */
    orderBy?: PedidosOrderByWithRelationInput | PedidosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pedidos.
     */
    cursor?: PedidosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pedidos.
     */
    distinct?: PedidosScalarFieldEnum | PedidosScalarFieldEnum[]
  }

  /**
   * Pedidos findMany
   */
  export type PedidosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedidos
     */
    select?: PedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedidos
     */
    omit?: PedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidosInclude<ExtArgs> | null
    /**
     * Filter, which Pedidos to fetch.
     */
    where?: PedidosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pedidos to fetch.
     */
    orderBy?: PedidosOrderByWithRelationInput | PedidosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pedidos.
     */
    cursor?: PedidosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pedidos.
     */
    skip?: number
    distinct?: PedidosScalarFieldEnum | PedidosScalarFieldEnum[]
  }

  /**
   * Pedidos create
   */
  export type PedidosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedidos
     */
    select?: PedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedidos
     */
    omit?: PedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidosInclude<ExtArgs> | null
    /**
     * The data needed to create a Pedidos.
     */
    data: XOR<PedidosCreateInput, PedidosUncheckedCreateInput>
  }

  /**
   * Pedidos createMany
   */
  export type PedidosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pedidos.
     */
    data: PedidosCreateManyInput | PedidosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pedidos update
   */
  export type PedidosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedidos
     */
    select?: PedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedidos
     */
    omit?: PedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidosInclude<ExtArgs> | null
    /**
     * The data needed to update a Pedidos.
     */
    data: XOR<PedidosUpdateInput, PedidosUncheckedUpdateInput>
    /**
     * Choose, which Pedidos to update.
     */
    where: PedidosWhereUniqueInput
  }

  /**
   * Pedidos updateMany
   */
  export type PedidosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pedidos.
     */
    data: XOR<PedidosUpdateManyMutationInput, PedidosUncheckedUpdateManyInput>
    /**
     * Filter which Pedidos to update
     */
    where?: PedidosWhereInput
    /**
     * Limit how many Pedidos to update.
     */
    limit?: number
  }

  /**
   * Pedidos upsert
   */
  export type PedidosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedidos
     */
    select?: PedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedidos
     */
    omit?: PedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidosInclude<ExtArgs> | null
    /**
     * The filter to search for the Pedidos to update in case it exists.
     */
    where: PedidosWhereUniqueInput
    /**
     * In case the Pedidos found by the `where` argument doesn't exist, create a new Pedidos with this data.
     */
    create: XOR<PedidosCreateInput, PedidosUncheckedCreateInput>
    /**
     * In case the Pedidos was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PedidosUpdateInput, PedidosUncheckedUpdateInput>
  }

  /**
   * Pedidos delete
   */
  export type PedidosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedidos
     */
    select?: PedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedidos
     */
    omit?: PedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidosInclude<ExtArgs> | null
    /**
     * Filter which Pedidos to delete.
     */
    where: PedidosWhereUniqueInput
  }

  /**
   * Pedidos deleteMany
   */
  export type PedidosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pedidos to delete
     */
    where?: PedidosWhereInput
    /**
     * Limit how many Pedidos to delete.
     */
    limit?: number
  }

  /**
   * Pedidos.estadoRel
   */
  export type Pedidos$estadoRelArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CfgEstadoPedido
     */
    select?: CfgEstadoPedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CfgEstadoPedido
     */
    omit?: CfgEstadoPedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CfgEstadoPedidoInclude<ExtArgs> | null
    where?: CfgEstadoPedidoWhereInput
  }

  /**
   * Pedidos without action
   */
  export type PedidosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedidos
     */
    select?: PedidosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedidos
     */
    omit?: PedidosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidosInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _avg: AuditLogAvgAggregateOutputType | null
    _sum: AuditLogSumAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogAvgAggregateOutputType = {
    id: number | null
  }

  export type AuditLogSumAggregateOutputType = {
    id: number | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: number | null
    entity: string | null
    entityId: string | null
    action: string | null
    field: string | null
    oldValue: string | null
    newValue: string | null
    user: string | null
    ip: string | null
    createdAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: number | null
    entity: string | null
    entityId: string | null
    action: string | null
    field: string | null
    oldValue: string | null
    newValue: string | null
    user: string | null
    ip: string | null
    createdAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    entity: number
    entityId: number
    action: number
    field: number
    oldValue: number
    newValue: number
    user: number
    ip: number
    createdAt: number
    _all: number
  }


  export type AuditLogAvgAggregateInputType = {
    id?: true
  }

  export type AuditLogSumAggregateInputType = {
    id?: true
  }

  export type AuditLogMinAggregateInputType = {
    id?: true
    entity?: true
    entityId?: true
    action?: true
    field?: true
    oldValue?: true
    newValue?: true
    user?: true
    ip?: true
    createdAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    entity?: true
    entityId?: true
    action?: true
    field?: true
    oldValue?: true
    newValue?: true
    user?: true
    ip?: true
    createdAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    entity?: true
    entityId?: true
    action?: true
    field?: true
    oldValue?: true
    newValue?: true
    user?: true
    ip?: true
    createdAt?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AuditLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AuditLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _avg?: AuditLogAvgAggregateInputType
    _sum?: AuditLogSumAggregateInputType
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: number
    entity: string
    entityId: string
    action: string
    field: string | null
    oldValue: string | null
    newValue: string | null
    user: string | null
    ip: string | null
    createdAt: Date
    _count: AuditLogCountAggregateOutputType | null
    _avg: AuditLogAvgAggregateOutputType | null
    _sum: AuditLogSumAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    entity?: boolean
    entityId?: boolean
    action?: boolean
    field?: boolean
    oldValue?: boolean
    newValue?: boolean
    user?: boolean
    ip?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditLog"]>



  export type AuditLogSelectScalar = {
    id?: boolean
    entity?: boolean
    entityId?: boolean
    action?: boolean
    field?: boolean
    oldValue?: boolean
    newValue?: boolean
    user?: boolean
    ip?: boolean
    createdAt?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "entity" | "entityId" | "action" | "field" | "oldValue" | "newValue" | "user" | "ip" | "createdAt", ExtArgs["result"]["auditLog"]>

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      entity: string
      entityId: string
      action: string
      field: string | null
      oldValue: string | null
      newValue: string | null
      user: string | null
      ip: string | null
      createdAt: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'Int'>
    readonly entity: FieldRef<"AuditLog", 'String'>
    readonly entityId: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly field: FieldRef<"AuditLog", 'String'>
    readonly oldValue: FieldRef<"AuditLog", 'String'>
    readonly newValue: FieldRef<"AuditLog", 'String'>
    readonly user: FieldRef<"AuditLog", 'String'>
    readonly ip: FieldRef<"AuditLog", 'String'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    sid: string | null
    data: string | null
    expiresAt: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    sid: string | null
    data: string | null
    expiresAt: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    sid: number
    data: number
    expiresAt: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    sid?: true
    data?: true
    expiresAt?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    sid?: true
    data?: true
    expiresAt?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    sid?: true
    data?: true
    expiresAt?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    sid: string
    data: string
    expiresAt: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sid?: boolean
    data?: boolean
    expiresAt?: boolean
  }, ExtArgs["result"]["session"]>



  export type SessionSelectScalar = {
    id?: boolean
    sid?: boolean
    data?: boolean
    expiresAt?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sid" | "data" | "expiresAt", ExtArgs["result"]["session"]>

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sid: string
      data: string
      expiresAt: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly sid: FieldRef<"Session", 'String'>
    readonly data: FieldRef<"Session", 'String'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CfgMarcasScalarFieldEnum: {
    id: 'id',
    marca: 'marca',
    keywords: 'keywords',
    foto: 'foto',
    activo: 'activo'
  };

  export type CfgMarcasScalarFieldEnum = (typeof CfgMarcasScalarFieldEnum)[keyof typeof CfgMarcasScalarFieldEnum]


  export const CfgRubrosScalarFieldEnum: {
    id: 'id',
    rubro: 'rubro',
    condiciones: 'condiciones',
    keywords: 'keywords',
    foto: 'foto',
    activo: 'activo'
  };

  export type CfgRubrosScalarFieldEnum = (typeof CfgRubrosScalarFieldEnum)[keyof typeof CfgRubrosScalarFieldEnum]


  export const CfgFormasPagosScalarFieldEnum: {
    id: 'id',
    forma_pago: 'forma_pago',
    descripcion: 'descripcion',
    permite_cuotas: 'permite_cuotas',
    activo: 'activo'
  };

  export type CfgFormasPagosScalarFieldEnum = (typeof CfgFormasPagosScalarFieldEnum)[keyof typeof CfgFormasPagosScalarFieldEnum]


  export const CfgMonedasScalarFieldEnum: {
    id: 'id',
    moneda: 'moneda',
    moneda_des: 'moneda_des',
    activo: 'activo'
  };

  export type CfgMonedasScalarFieldEnum = (typeof CfgMonedasScalarFieldEnum)[keyof typeof CfgMonedasScalarFieldEnum]


  export const CfgSliderScalarFieldEnum: {
    id: 'id',
    titulo: 'titulo',
    thumbs: 'thumbs',
    foto: 'foto',
    orden: 'orden',
    activo: 'activo'
  };

  export type CfgSliderScalarFieldEnum = (typeof CfgSliderScalarFieldEnum)[keyof typeof CfgSliderScalarFieldEnum]


  export const CfgEstadoPedidoScalarFieldEnum: {
    id: 'id',
    descripcion: 'descripcion',
    color: 'color',
    orden: 'orden',
    es_final: 'es_final',
    es_cancel: 'es_cancel',
    activo: 'activo'
  };

  export type CfgEstadoPedidoScalarFieldEnum = (typeof CfgEstadoPedidoScalarFieldEnum)[keyof typeof CfgEstadoPedidoScalarFieldEnum]


  export const ProductosScalarFieldEnum: {
    id: 'id',
    marca_id: 'marca_id',
    rubro_id: 'rubro_id',
    moneda_id: 'moneda_id',
    producto: 'producto',
    descripcion: 'descripcion',
    foto: 'foto',
    precio: 'precio',
    stock: 'stock',
    destacado: 'destacado',
    activo: 'activo',
    visitas: 'visitas'
  };

  export type ProductosScalarFieldEnum = (typeof ProductosScalarFieldEnum)[keyof typeof ProductosScalarFieldEnum]


  export const ProductoFotosScalarFieldEnum: {
    id: 'id',
    producto_id: 'producto_id',
    epigrafe: 'epigrafe',
    foto: 'foto',
    orden: 'orden',
    activo: 'activo'
  };

  export type ProductoFotosScalarFieldEnum = (typeof ProductoFotosScalarFieldEnum)[keyof typeof ProductoFotosScalarFieldEnum]


  export const ProductoVersionesScalarFieldEnum: {
    id: 'id',
    producto_id: 'producto_id',
    version: 'version',
    detalle: 'detalle',
    orden: 'orden',
    activo: 'activo'
  };

  export type ProductoVersionesScalarFieldEnum = (typeof ProductoVersionesScalarFieldEnum)[keyof typeof ProductoVersionesScalarFieldEnum]


  export const ProductoEspecificacionesScalarFieldEnum: {
    id: 'id',
    producto_id: 'producto_id',
    categoria: 'categoria',
    especificaciones: 'especificaciones',
    orden: 'orden',
    activo: 'activo'
  };

  export type ProductoEspecificacionesScalarFieldEnum = (typeof ProductoEspecificacionesScalarFieldEnum)[keyof typeof ProductoEspecificacionesScalarFieldEnum]


  export const PedidosScalarFieldEnum: {
    id: 'id',
    datos: 'datos',
    total: 'total',
    estado: 'estado',
    metodo_pago: 'metodo_pago',
    comprador_nombre: 'comprador_nombre',
    comprador_email: 'comprador_email',
    comprador_telefono: 'comprador_telefono',
    direccion_envio: 'direccion_envio',
    mp_payment_id: 'mp_payment_id',
    transferencia_ref: 'transferencia_ref',
    tarjeta_last4: 'tarjeta_last4',
    tarjeta_payment_method: 'tarjeta_payment_method',
    mp_error_code: 'mp_error_code',
    mp_error_message: 'mp_error_message',
    mp_response: 'mp_response',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PedidosScalarFieldEnum = (typeof PedidosScalarFieldEnum)[keyof typeof PedidosScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    entity: 'entity',
    entityId: 'entityId',
    action: 'action',
    field: 'field',
    oldValue: 'oldValue',
    newValue: 'newValue',
    user: 'user',
    ip: 'ip',
    createdAt: 'createdAt'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    sid: 'sid',
    data: 'data',
    expiresAt: 'expiresAt'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const CfgMarcasOrderByRelevanceFieldEnum: {
    marca: 'marca',
    keywords: 'keywords',
    foto: 'foto'
  };

  export type CfgMarcasOrderByRelevanceFieldEnum = (typeof CfgMarcasOrderByRelevanceFieldEnum)[keyof typeof CfgMarcasOrderByRelevanceFieldEnum]


  export const CfgRubrosOrderByRelevanceFieldEnum: {
    rubro: 'rubro',
    condiciones: 'condiciones',
    keywords: 'keywords',
    foto: 'foto'
  };

  export type CfgRubrosOrderByRelevanceFieldEnum = (typeof CfgRubrosOrderByRelevanceFieldEnum)[keyof typeof CfgRubrosOrderByRelevanceFieldEnum]


  export const CfgFormasPagosOrderByRelevanceFieldEnum: {
    forma_pago: 'forma_pago',
    descripcion: 'descripcion'
  };

  export type CfgFormasPagosOrderByRelevanceFieldEnum = (typeof CfgFormasPagosOrderByRelevanceFieldEnum)[keyof typeof CfgFormasPagosOrderByRelevanceFieldEnum]


  export const CfgMonedasOrderByRelevanceFieldEnum: {
    moneda: 'moneda',
    moneda_des: 'moneda_des'
  };

  export type CfgMonedasOrderByRelevanceFieldEnum = (typeof CfgMonedasOrderByRelevanceFieldEnum)[keyof typeof CfgMonedasOrderByRelevanceFieldEnum]


  export const CfgSliderOrderByRelevanceFieldEnum: {
    titulo: 'titulo',
    thumbs: 'thumbs',
    foto: 'foto'
  };

  export type CfgSliderOrderByRelevanceFieldEnum = (typeof CfgSliderOrderByRelevanceFieldEnum)[keyof typeof CfgSliderOrderByRelevanceFieldEnum]


  export const CfgEstadoPedidoOrderByRelevanceFieldEnum: {
    id: 'id',
    descripcion: 'descripcion',
    color: 'color'
  };

  export type CfgEstadoPedidoOrderByRelevanceFieldEnum = (typeof CfgEstadoPedidoOrderByRelevanceFieldEnum)[keyof typeof CfgEstadoPedidoOrderByRelevanceFieldEnum]


  export const ProductosOrderByRelevanceFieldEnum: {
    producto: 'producto',
    descripcion: 'descripcion',
    foto: 'foto'
  };

  export type ProductosOrderByRelevanceFieldEnum = (typeof ProductosOrderByRelevanceFieldEnum)[keyof typeof ProductosOrderByRelevanceFieldEnum]


  export const ProductoFotosOrderByRelevanceFieldEnum: {
    epigrafe: 'epigrafe',
    foto: 'foto'
  };

  export type ProductoFotosOrderByRelevanceFieldEnum = (typeof ProductoFotosOrderByRelevanceFieldEnum)[keyof typeof ProductoFotosOrderByRelevanceFieldEnum]


  export const ProductoVersionesOrderByRelevanceFieldEnum: {
    version: 'version',
    detalle: 'detalle'
  };

  export type ProductoVersionesOrderByRelevanceFieldEnum = (typeof ProductoVersionesOrderByRelevanceFieldEnum)[keyof typeof ProductoVersionesOrderByRelevanceFieldEnum]


  export const ProductoEspecificacionesOrderByRelevanceFieldEnum: {
    categoria: 'categoria',
    especificaciones: 'especificaciones'
  };

  export type ProductoEspecificacionesOrderByRelevanceFieldEnum = (typeof ProductoEspecificacionesOrderByRelevanceFieldEnum)[keyof typeof ProductoEspecificacionesOrderByRelevanceFieldEnum]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const PedidosOrderByRelevanceFieldEnum: {
    estado: 'estado',
    metodo_pago: 'metodo_pago',
    comprador_nombre: 'comprador_nombre',
    comprador_email: 'comprador_email',
    comprador_telefono: 'comprador_telefono',
    direccion_envio: 'direccion_envio',
    mp_payment_id: 'mp_payment_id',
    transferencia_ref: 'transferencia_ref',
    tarjeta_last4: 'tarjeta_last4',
    tarjeta_payment_method: 'tarjeta_payment_method',
    mp_error_code: 'mp_error_code',
    mp_error_message: 'mp_error_message'
  };

  export type PedidosOrderByRelevanceFieldEnum = (typeof PedidosOrderByRelevanceFieldEnum)[keyof typeof PedidosOrderByRelevanceFieldEnum]


  export const AuditLogOrderByRelevanceFieldEnum: {
    entity: 'entity',
    entityId: 'entityId',
    action: 'action',
    field: 'field',
    oldValue: 'oldValue',
    newValue: 'newValue',
    user: 'user',
    ip: 'ip'
  };

  export type AuditLogOrderByRelevanceFieldEnum = (typeof AuditLogOrderByRelevanceFieldEnum)[keyof typeof AuditLogOrderByRelevanceFieldEnum]


  export const SessionOrderByRelevanceFieldEnum: {
    id: 'id',
    sid: 'sid',
    data: 'data'
  };

  export type SessionOrderByRelevanceFieldEnum = (typeof SessionOrderByRelevanceFieldEnum)[keyof typeof SessionOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type CfgMarcasWhereInput = {
    AND?: CfgMarcasWhereInput | CfgMarcasWhereInput[]
    OR?: CfgMarcasWhereInput[]
    NOT?: CfgMarcasWhereInput | CfgMarcasWhereInput[]
    id?: IntFilter<"CfgMarcas"> | number
    marca?: StringFilter<"CfgMarcas"> | string
    keywords?: StringNullableFilter<"CfgMarcas"> | string | null
    foto?: StringNullableFilter<"CfgMarcas"> | string | null
    activo?: BoolFilter<"CfgMarcas"> | boolean
    Producto?: ProductosListRelationFilter
  }

  export type CfgMarcasOrderByWithRelationInput = {
    id?: SortOrder
    marca?: SortOrder
    keywords?: SortOrderInput | SortOrder
    foto?: SortOrderInput | SortOrder
    activo?: SortOrder
    Producto?: ProductosOrderByRelationAggregateInput
    _relevance?: CfgMarcasOrderByRelevanceInput
  }

  export type CfgMarcasWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CfgMarcasWhereInput | CfgMarcasWhereInput[]
    OR?: CfgMarcasWhereInput[]
    NOT?: CfgMarcasWhereInput | CfgMarcasWhereInput[]
    marca?: StringFilter<"CfgMarcas"> | string
    keywords?: StringNullableFilter<"CfgMarcas"> | string | null
    foto?: StringNullableFilter<"CfgMarcas"> | string | null
    activo?: BoolFilter<"CfgMarcas"> | boolean
    Producto?: ProductosListRelationFilter
  }, "id">

  export type CfgMarcasOrderByWithAggregationInput = {
    id?: SortOrder
    marca?: SortOrder
    keywords?: SortOrderInput | SortOrder
    foto?: SortOrderInput | SortOrder
    activo?: SortOrder
    _count?: CfgMarcasCountOrderByAggregateInput
    _avg?: CfgMarcasAvgOrderByAggregateInput
    _max?: CfgMarcasMaxOrderByAggregateInput
    _min?: CfgMarcasMinOrderByAggregateInput
    _sum?: CfgMarcasSumOrderByAggregateInput
  }

  export type CfgMarcasScalarWhereWithAggregatesInput = {
    AND?: CfgMarcasScalarWhereWithAggregatesInput | CfgMarcasScalarWhereWithAggregatesInput[]
    OR?: CfgMarcasScalarWhereWithAggregatesInput[]
    NOT?: CfgMarcasScalarWhereWithAggregatesInput | CfgMarcasScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CfgMarcas"> | number
    marca?: StringWithAggregatesFilter<"CfgMarcas"> | string
    keywords?: StringNullableWithAggregatesFilter<"CfgMarcas"> | string | null
    foto?: StringNullableWithAggregatesFilter<"CfgMarcas"> | string | null
    activo?: BoolWithAggregatesFilter<"CfgMarcas"> | boolean
  }

  export type CfgRubrosWhereInput = {
    AND?: CfgRubrosWhereInput | CfgRubrosWhereInput[]
    OR?: CfgRubrosWhereInput[]
    NOT?: CfgRubrosWhereInput | CfgRubrosWhereInput[]
    id?: IntFilter<"CfgRubros"> | number
    rubro?: StringFilter<"CfgRubros"> | string
    condiciones?: StringNullableFilter<"CfgRubros"> | string | null
    keywords?: StringNullableFilter<"CfgRubros"> | string | null
    foto?: StringNullableFilter<"CfgRubros"> | string | null
    activo?: BoolFilter<"CfgRubros"> | boolean
    Producto?: ProductosListRelationFilter
  }

  export type CfgRubrosOrderByWithRelationInput = {
    id?: SortOrder
    rubro?: SortOrder
    condiciones?: SortOrderInput | SortOrder
    keywords?: SortOrderInput | SortOrder
    foto?: SortOrderInput | SortOrder
    activo?: SortOrder
    Producto?: ProductosOrderByRelationAggregateInput
    _relevance?: CfgRubrosOrderByRelevanceInput
  }

  export type CfgRubrosWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CfgRubrosWhereInput | CfgRubrosWhereInput[]
    OR?: CfgRubrosWhereInput[]
    NOT?: CfgRubrosWhereInput | CfgRubrosWhereInput[]
    rubro?: StringFilter<"CfgRubros"> | string
    condiciones?: StringNullableFilter<"CfgRubros"> | string | null
    keywords?: StringNullableFilter<"CfgRubros"> | string | null
    foto?: StringNullableFilter<"CfgRubros"> | string | null
    activo?: BoolFilter<"CfgRubros"> | boolean
    Producto?: ProductosListRelationFilter
  }, "id">

  export type CfgRubrosOrderByWithAggregationInput = {
    id?: SortOrder
    rubro?: SortOrder
    condiciones?: SortOrderInput | SortOrder
    keywords?: SortOrderInput | SortOrder
    foto?: SortOrderInput | SortOrder
    activo?: SortOrder
    _count?: CfgRubrosCountOrderByAggregateInput
    _avg?: CfgRubrosAvgOrderByAggregateInput
    _max?: CfgRubrosMaxOrderByAggregateInput
    _min?: CfgRubrosMinOrderByAggregateInput
    _sum?: CfgRubrosSumOrderByAggregateInput
  }

  export type CfgRubrosScalarWhereWithAggregatesInput = {
    AND?: CfgRubrosScalarWhereWithAggregatesInput | CfgRubrosScalarWhereWithAggregatesInput[]
    OR?: CfgRubrosScalarWhereWithAggregatesInput[]
    NOT?: CfgRubrosScalarWhereWithAggregatesInput | CfgRubrosScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CfgRubros"> | number
    rubro?: StringWithAggregatesFilter<"CfgRubros"> | string
    condiciones?: StringNullableWithAggregatesFilter<"CfgRubros"> | string | null
    keywords?: StringNullableWithAggregatesFilter<"CfgRubros"> | string | null
    foto?: StringNullableWithAggregatesFilter<"CfgRubros"> | string | null
    activo?: BoolWithAggregatesFilter<"CfgRubros"> | boolean
  }

  export type CfgFormasPagosWhereInput = {
    AND?: CfgFormasPagosWhereInput | CfgFormasPagosWhereInput[]
    OR?: CfgFormasPagosWhereInput[]
    NOT?: CfgFormasPagosWhereInput | CfgFormasPagosWhereInput[]
    id?: IntFilter<"CfgFormasPagos"> | number
    forma_pago?: StringFilter<"CfgFormasPagos"> | string
    descripcion?: StringFilter<"CfgFormasPagos"> | string
    permite_cuotas?: BoolFilter<"CfgFormasPagos"> | boolean
    activo?: BoolFilter<"CfgFormasPagos"> | boolean
  }

  export type CfgFormasPagosOrderByWithRelationInput = {
    id?: SortOrder
    forma_pago?: SortOrder
    descripcion?: SortOrder
    permite_cuotas?: SortOrder
    activo?: SortOrder
    _relevance?: CfgFormasPagosOrderByRelevanceInput
  }

  export type CfgFormasPagosWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CfgFormasPagosWhereInput | CfgFormasPagosWhereInput[]
    OR?: CfgFormasPagosWhereInput[]
    NOT?: CfgFormasPagosWhereInput | CfgFormasPagosWhereInput[]
    forma_pago?: StringFilter<"CfgFormasPagos"> | string
    descripcion?: StringFilter<"CfgFormasPagos"> | string
    permite_cuotas?: BoolFilter<"CfgFormasPagos"> | boolean
    activo?: BoolFilter<"CfgFormasPagos"> | boolean
  }, "id">

  export type CfgFormasPagosOrderByWithAggregationInput = {
    id?: SortOrder
    forma_pago?: SortOrder
    descripcion?: SortOrder
    permite_cuotas?: SortOrder
    activo?: SortOrder
    _count?: CfgFormasPagosCountOrderByAggregateInput
    _avg?: CfgFormasPagosAvgOrderByAggregateInput
    _max?: CfgFormasPagosMaxOrderByAggregateInput
    _min?: CfgFormasPagosMinOrderByAggregateInput
    _sum?: CfgFormasPagosSumOrderByAggregateInput
  }

  export type CfgFormasPagosScalarWhereWithAggregatesInput = {
    AND?: CfgFormasPagosScalarWhereWithAggregatesInput | CfgFormasPagosScalarWhereWithAggregatesInput[]
    OR?: CfgFormasPagosScalarWhereWithAggregatesInput[]
    NOT?: CfgFormasPagosScalarWhereWithAggregatesInput | CfgFormasPagosScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CfgFormasPagos"> | number
    forma_pago?: StringWithAggregatesFilter<"CfgFormasPagos"> | string
    descripcion?: StringWithAggregatesFilter<"CfgFormasPagos"> | string
    permite_cuotas?: BoolWithAggregatesFilter<"CfgFormasPagos"> | boolean
    activo?: BoolWithAggregatesFilter<"CfgFormasPagos"> | boolean
  }

  export type CfgMonedasWhereInput = {
    AND?: CfgMonedasWhereInput | CfgMonedasWhereInput[]
    OR?: CfgMonedasWhereInput[]
    NOT?: CfgMonedasWhereInput | CfgMonedasWhereInput[]
    id?: IntFilter<"CfgMonedas"> | number
    moneda?: StringFilter<"CfgMonedas"> | string
    moneda_des?: StringFilter<"CfgMonedas"> | string
    activo?: BoolFilter<"CfgMonedas"> | boolean
    Producto?: ProductosListRelationFilter
  }

  export type CfgMonedasOrderByWithRelationInput = {
    id?: SortOrder
    moneda?: SortOrder
    moneda_des?: SortOrder
    activo?: SortOrder
    Producto?: ProductosOrderByRelationAggregateInput
    _relevance?: CfgMonedasOrderByRelevanceInput
  }

  export type CfgMonedasWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CfgMonedasWhereInput | CfgMonedasWhereInput[]
    OR?: CfgMonedasWhereInput[]
    NOT?: CfgMonedasWhereInput | CfgMonedasWhereInput[]
    moneda?: StringFilter<"CfgMonedas"> | string
    moneda_des?: StringFilter<"CfgMonedas"> | string
    activo?: BoolFilter<"CfgMonedas"> | boolean
    Producto?: ProductosListRelationFilter
  }, "id">

  export type CfgMonedasOrderByWithAggregationInput = {
    id?: SortOrder
    moneda?: SortOrder
    moneda_des?: SortOrder
    activo?: SortOrder
    _count?: CfgMonedasCountOrderByAggregateInput
    _avg?: CfgMonedasAvgOrderByAggregateInput
    _max?: CfgMonedasMaxOrderByAggregateInput
    _min?: CfgMonedasMinOrderByAggregateInput
    _sum?: CfgMonedasSumOrderByAggregateInput
  }

  export type CfgMonedasScalarWhereWithAggregatesInput = {
    AND?: CfgMonedasScalarWhereWithAggregatesInput | CfgMonedasScalarWhereWithAggregatesInput[]
    OR?: CfgMonedasScalarWhereWithAggregatesInput[]
    NOT?: CfgMonedasScalarWhereWithAggregatesInput | CfgMonedasScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CfgMonedas"> | number
    moneda?: StringWithAggregatesFilter<"CfgMonedas"> | string
    moneda_des?: StringWithAggregatesFilter<"CfgMonedas"> | string
    activo?: BoolWithAggregatesFilter<"CfgMonedas"> | boolean
  }

  export type CfgSliderWhereInput = {
    AND?: CfgSliderWhereInput | CfgSliderWhereInput[]
    OR?: CfgSliderWhereInput[]
    NOT?: CfgSliderWhereInput | CfgSliderWhereInput[]
    id?: IntFilter<"CfgSlider"> | number
    titulo?: StringFilter<"CfgSlider"> | string
    thumbs?: StringNullableFilter<"CfgSlider"> | string | null
    foto?: StringNullableFilter<"CfgSlider"> | string | null
    orden?: IntFilter<"CfgSlider"> | number
    activo?: BoolFilter<"CfgSlider"> | boolean
  }

  export type CfgSliderOrderByWithRelationInput = {
    id?: SortOrder
    titulo?: SortOrder
    thumbs?: SortOrderInput | SortOrder
    foto?: SortOrderInput | SortOrder
    orden?: SortOrder
    activo?: SortOrder
    _relevance?: CfgSliderOrderByRelevanceInput
  }

  export type CfgSliderWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CfgSliderWhereInput | CfgSliderWhereInput[]
    OR?: CfgSliderWhereInput[]
    NOT?: CfgSliderWhereInput | CfgSliderWhereInput[]
    titulo?: StringFilter<"CfgSlider"> | string
    thumbs?: StringNullableFilter<"CfgSlider"> | string | null
    foto?: StringNullableFilter<"CfgSlider"> | string | null
    orden?: IntFilter<"CfgSlider"> | number
    activo?: BoolFilter<"CfgSlider"> | boolean
  }, "id">

  export type CfgSliderOrderByWithAggregationInput = {
    id?: SortOrder
    titulo?: SortOrder
    thumbs?: SortOrderInput | SortOrder
    foto?: SortOrderInput | SortOrder
    orden?: SortOrder
    activo?: SortOrder
    _count?: CfgSliderCountOrderByAggregateInput
    _avg?: CfgSliderAvgOrderByAggregateInput
    _max?: CfgSliderMaxOrderByAggregateInput
    _min?: CfgSliderMinOrderByAggregateInput
    _sum?: CfgSliderSumOrderByAggregateInput
  }

  export type CfgSliderScalarWhereWithAggregatesInput = {
    AND?: CfgSliderScalarWhereWithAggregatesInput | CfgSliderScalarWhereWithAggregatesInput[]
    OR?: CfgSliderScalarWhereWithAggregatesInput[]
    NOT?: CfgSliderScalarWhereWithAggregatesInput | CfgSliderScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CfgSlider"> | number
    titulo?: StringWithAggregatesFilter<"CfgSlider"> | string
    thumbs?: StringNullableWithAggregatesFilter<"CfgSlider"> | string | null
    foto?: StringNullableWithAggregatesFilter<"CfgSlider"> | string | null
    orden?: IntWithAggregatesFilter<"CfgSlider"> | number
    activo?: BoolWithAggregatesFilter<"CfgSlider"> | boolean
  }

  export type CfgEstadoPedidoWhereInput = {
    AND?: CfgEstadoPedidoWhereInput | CfgEstadoPedidoWhereInput[]
    OR?: CfgEstadoPedidoWhereInput[]
    NOT?: CfgEstadoPedidoWhereInput | CfgEstadoPedidoWhereInput[]
    id?: StringFilter<"CfgEstadoPedido"> | string
    descripcion?: StringFilter<"CfgEstadoPedido"> | string
    color?: StringNullableFilter<"CfgEstadoPedido"> | string | null
    orden?: IntFilter<"CfgEstadoPedido"> | number
    es_final?: BoolFilter<"CfgEstadoPedido"> | boolean
    es_cancel?: BoolFilter<"CfgEstadoPedido"> | boolean
    activo?: BoolFilter<"CfgEstadoPedido"> | boolean
    Pedidos?: PedidosListRelationFilter
  }

  export type CfgEstadoPedidoOrderByWithRelationInput = {
    id?: SortOrder
    descripcion?: SortOrder
    color?: SortOrderInput | SortOrder
    orden?: SortOrder
    es_final?: SortOrder
    es_cancel?: SortOrder
    activo?: SortOrder
    Pedidos?: PedidosOrderByRelationAggregateInput
    _relevance?: CfgEstadoPedidoOrderByRelevanceInput
  }

  export type CfgEstadoPedidoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CfgEstadoPedidoWhereInput | CfgEstadoPedidoWhereInput[]
    OR?: CfgEstadoPedidoWhereInput[]
    NOT?: CfgEstadoPedidoWhereInput | CfgEstadoPedidoWhereInput[]
    descripcion?: StringFilter<"CfgEstadoPedido"> | string
    color?: StringNullableFilter<"CfgEstadoPedido"> | string | null
    orden?: IntFilter<"CfgEstadoPedido"> | number
    es_final?: BoolFilter<"CfgEstadoPedido"> | boolean
    es_cancel?: BoolFilter<"CfgEstadoPedido"> | boolean
    activo?: BoolFilter<"CfgEstadoPedido"> | boolean
    Pedidos?: PedidosListRelationFilter
  }, "id">

  export type CfgEstadoPedidoOrderByWithAggregationInput = {
    id?: SortOrder
    descripcion?: SortOrder
    color?: SortOrderInput | SortOrder
    orden?: SortOrder
    es_final?: SortOrder
    es_cancel?: SortOrder
    activo?: SortOrder
    _count?: CfgEstadoPedidoCountOrderByAggregateInput
    _avg?: CfgEstadoPedidoAvgOrderByAggregateInput
    _max?: CfgEstadoPedidoMaxOrderByAggregateInput
    _min?: CfgEstadoPedidoMinOrderByAggregateInput
    _sum?: CfgEstadoPedidoSumOrderByAggregateInput
  }

  export type CfgEstadoPedidoScalarWhereWithAggregatesInput = {
    AND?: CfgEstadoPedidoScalarWhereWithAggregatesInput | CfgEstadoPedidoScalarWhereWithAggregatesInput[]
    OR?: CfgEstadoPedidoScalarWhereWithAggregatesInput[]
    NOT?: CfgEstadoPedidoScalarWhereWithAggregatesInput | CfgEstadoPedidoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CfgEstadoPedido"> | string
    descripcion?: StringWithAggregatesFilter<"CfgEstadoPedido"> | string
    color?: StringNullableWithAggregatesFilter<"CfgEstadoPedido"> | string | null
    orden?: IntWithAggregatesFilter<"CfgEstadoPedido"> | number
    es_final?: BoolWithAggregatesFilter<"CfgEstadoPedido"> | boolean
    es_cancel?: BoolWithAggregatesFilter<"CfgEstadoPedido"> | boolean
    activo?: BoolWithAggregatesFilter<"CfgEstadoPedido"> | boolean
  }

  export type ProductosWhereInput = {
    AND?: ProductosWhereInput | ProductosWhereInput[]
    OR?: ProductosWhereInput[]
    NOT?: ProductosWhereInput | ProductosWhereInput[]
    id?: IntFilter<"Productos"> | number
    marca_id?: IntFilter<"Productos"> | number
    rubro_id?: IntFilter<"Productos"> | number
    moneda_id?: IntFilter<"Productos"> | number
    producto?: StringFilter<"Productos"> | string
    descripcion?: StringNullableFilter<"Productos"> | string | null
    foto?: StringNullableFilter<"Productos"> | string | null
    precio?: DecimalFilter<"Productos"> | Decimal | DecimalJsLike | number | string
    stock?: IntFilter<"Productos"> | number
    destacado?: BoolFilter<"Productos"> | boolean
    activo?: BoolFilter<"Productos"> | boolean
    visitas?: IntFilter<"Productos"> | number
    marca?: XOR<CfgMarcasScalarRelationFilter, CfgMarcasWhereInput>
    rubro?: XOR<CfgRubrosScalarRelationFilter, CfgRubrosWhereInput>
    moneda?: XOR<CfgMonedasScalarRelationFilter, CfgMonedasWhereInput>
    fotos?: ProductoFotosListRelationFilter
    versiones?: ProductoVersionesListRelationFilter
    especificaciones?: ProductoEspecificacionesListRelationFilter
  }

  export type ProductosOrderByWithRelationInput = {
    id?: SortOrder
    marca_id?: SortOrder
    rubro_id?: SortOrder
    moneda_id?: SortOrder
    producto?: SortOrder
    descripcion?: SortOrderInput | SortOrder
    foto?: SortOrderInput | SortOrder
    precio?: SortOrder
    stock?: SortOrder
    destacado?: SortOrder
    activo?: SortOrder
    visitas?: SortOrder
    marca?: CfgMarcasOrderByWithRelationInput
    rubro?: CfgRubrosOrderByWithRelationInput
    moneda?: CfgMonedasOrderByWithRelationInput
    fotos?: ProductoFotosOrderByRelationAggregateInput
    versiones?: ProductoVersionesOrderByRelationAggregateInput
    especificaciones?: ProductoEspecificacionesOrderByRelationAggregateInput
    _relevance?: ProductosOrderByRelevanceInput
  }

  export type ProductosWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProductosWhereInput | ProductosWhereInput[]
    OR?: ProductosWhereInput[]
    NOT?: ProductosWhereInput | ProductosWhereInput[]
    marca_id?: IntFilter<"Productos"> | number
    rubro_id?: IntFilter<"Productos"> | number
    moneda_id?: IntFilter<"Productos"> | number
    producto?: StringFilter<"Productos"> | string
    descripcion?: StringNullableFilter<"Productos"> | string | null
    foto?: StringNullableFilter<"Productos"> | string | null
    precio?: DecimalFilter<"Productos"> | Decimal | DecimalJsLike | number | string
    stock?: IntFilter<"Productos"> | number
    destacado?: BoolFilter<"Productos"> | boolean
    activo?: BoolFilter<"Productos"> | boolean
    visitas?: IntFilter<"Productos"> | number
    marca?: XOR<CfgMarcasScalarRelationFilter, CfgMarcasWhereInput>
    rubro?: XOR<CfgRubrosScalarRelationFilter, CfgRubrosWhereInput>
    moneda?: XOR<CfgMonedasScalarRelationFilter, CfgMonedasWhereInput>
    fotos?: ProductoFotosListRelationFilter
    versiones?: ProductoVersionesListRelationFilter
    especificaciones?: ProductoEspecificacionesListRelationFilter
  }, "id">

  export type ProductosOrderByWithAggregationInput = {
    id?: SortOrder
    marca_id?: SortOrder
    rubro_id?: SortOrder
    moneda_id?: SortOrder
    producto?: SortOrder
    descripcion?: SortOrderInput | SortOrder
    foto?: SortOrderInput | SortOrder
    precio?: SortOrder
    stock?: SortOrder
    destacado?: SortOrder
    activo?: SortOrder
    visitas?: SortOrder
    _count?: ProductosCountOrderByAggregateInput
    _avg?: ProductosAvgOrderByAggregateInput
    _max?: ProductosMaxOrderByAggregateInput
    _min?: ProductosMinOrderByAggregateInput
    _sum?: ProductosSumOrderByAggregateInput
  }

  export type ProductosScalarWhereWithAggregatesInput = {
    AND?: ProductosScalarWhereWithAggregatesInput | ProductosScalarWhereWithAggregatesInput[]
    OR?: ProductosScalarWhereWithAggregatesInput[]
    NOT?: ProductosScalarWhereWithAggregatesInput | ProductosScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Productos"> | number
    marca_id?: IntWithAggregatesFilter<"Productos"> | number
    rubro_id?: IntWithAggregatesFilter<"Productos"> | number
    moneda_id?: IntWithAggregatesFilter<"Productos"> | number
    producto?: StringWithAggregatesFilter<"Productos"> | string
    descripcion?: StringNullableWithAggregatesFilter<"Productos"> | string | null
    foto?: StringNullableWithAggregatesFilter<"Productos"> | string | null
    precio?: DecimalWithAggregatesFilter<"Productos"> | Decimal | DecimalJsLike | number | string
    stock?: IntWithAggregatesFilter<"Productos"> | number
    destacado?: BoolWithAggregatesFilter<"Productos"> | boolean
    activo?: BoolWithAggregatesFilter<"Productos"> | boolean
    visitas?: IntWithAggregatesFilter<"Productos"> | number
  }

  export type ProductoFotosWhereInput = {
    AND?: ProductoFotosWhereInput | ProductoFotosWhereInput[]
    OR?: ProductoFotosWhereInput[]
    NOT?: ProductoFotosWhereInput | ProductoFotosWhereInput[]
    id?: IntFilter<"ProductoFotos"> | number
    producto_id?: IntFilter<"ProductoFotos"> | number
    epigrafe?: StringFilter<"ProductoFotos"> | string
    foto?: StringNullableFilter<"ProductoFotos"> | string | null
    orden?: IntFilter<"ProductoFotos"> | number
    activo?: BoolFilter<"ProductoFotos"> | boolean
    producto?: XOR<ProductosScalarRelationFilter, ProductosWhereInput>
  }

  export type ProductoFotosOrderByWithRelationInput = {
    id?: SortOrder
    producto_id?: SortOrder
    epigrafe?: SortOrder
    foto?: SortOrderInput | SortOrder
    orden?: SortOrder
    activo?: SortOrder
    producto?: ProductosOrderByWithRelationInput
    _relevance?: ProductoFotosOrderByRelevanceInput
  }

  export type ProductoFotosWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProductoFotosWhereInput | ProductoFotosWhereInput[]
    OR?: ProductoFotosWhereInput[]
    NOT?: ProductoFotosWhereInput | ProductoFotosWhereInput[]
    producto_id?: IntFilter<"ProductoFotos"> | number
    epigrafe?: StringFilter<"ProductoFotos"> | string
    foto?: StringNullableFilter<"ProductoFotos"> | string | null
    orden?: IntFilter<"ProductoFotos"> | number
    activo?: BoolFilter<"ProductoFotos"> | boolean
    producto?: XOR<ProductosScalarRelationFilter, ProductosWhereInput>
  }, "id">

  export type ProductoFotosOrderByWithAggregationInput = {
    id?: SortOrder
    producto_id?: SortOrder
    epigrafe?: SortOrder
    foto?: SortOrderInput | SortOrder
    orden?: SortOrder
    activo?: SortOrder
    _count?: ProductoFotosCountOrderByAggregateInput
    _avg?: ProductoFotosAvgOrderByAggregateInput
    _max?: ProductoFotosMaxOrderByAggregateInput
    _min?: ProductoFotosMinOrderByAggregateInput
    _sum?: ProductoFotosSumOrderByAggregateInput
  }

  export type ProductoFotosScalarWhereWithAggregatesInput = {
    AND?: ProductoFotosScalarWhereWithAggregatesInput | ProductoFotosScalarWhereWithAggregatesInput[]
    OR?: ProductoFotosScalarWhereWithAggregatesInput[]
    NOT?: ProductoFotosScalarWhereWithAggregatesInput | ProductoFotosScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ProductoFotos"> | number
    producto_id?: IntWithAggregatesFilter<"ProductoFotos"> | number
    epigrafe?: StringWithAggregatesFilter<"ProductoFotos"> | string
    foto?: StringNullableWithAggregatesFilter<"ProductoFotos"> | string | null
    orden?: IntWithAggregatesFilter<"ProductoFotos"> | number
    activo?: BoolWithAggregatesFilter<"ProductoFotos"> | boolean
  }

  export type ProductoVersionesWhereInput = {
    AND?: ProductoVersionesWhereInput | ProductoVersionesWhereInput[]
    OR?: ProductoVersionesWhereInput[]
    NOT?: ProductoVersionesWhereInput | ProductoVersionesWhereInput[]
    id?: IntFilter<"ProductoVersiones"> | number
    producto_id?: IntFilter<"ProductoVersiones"> | number
    version?: StringFilter<"ProductoVersiones"> | string
    detalle?: StringNullableFilter<"ProductoVersiones"> | string | null
    orden?: IntFilter<"ProductoVersiones"> | number
    activo?: BoolFilter<"ProductoVersiones"> | boolean
    producto?: XOR<ProductosScalarRelationFilter, ProductosWhereInput>
  }

  export type ProductoVersionesOrderByWithRelationInput = {
    id?: SortOrder
    producto_id?: SortOrder
    version?: SortOrder
    detalle?: SortOrderInput | SortOrder
    orden?: SortOrder
    activo?: SortOrder
    producto?: ProductosOrderByWithRelationInput
    _relevance?: ProductoVersionesOrderByRelevanceInput
  }

  export type ProductoVersionesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProductoVersionesWhereInput | ProductoVersionesWhereInput[]
    OR?: ProductoVersionesWhereInput[]
    NOT?: ProductoVersionesWhereInput | ProductoVersionesWhereInput[]
    producto_id?: IntFilter<"ProductoVersiones"> | number
    version?: StringFilter<"ProductoVersiones"> | string
    detalle?: StringNullableFilter<"ProductoVersiones"> | string | null
    orden?: IntFilter<"ProductoVersiones"> | number
    activo?: BoolFilter<"ProductoVersiones"> | boolean
    producto?: XOR<ProductosScalarRelationFilter, ProductosWhereInput>
  }, "id">

  export type ProductoVersionesOrderByWithAggregationInput = {
    id?: SortOrder
    producto_id?: SortOrder
    version?: SortOrder
    detalle?: SortOrderInput | SortOrder
    orden?: SortOrder
    activo?: SortOrder
    _count?: ProductoVersionesCountOrderByAggregateInput
    _avg?: ProductoVersionesAvgOrderByAggregateInput
    _max?: ProductoVersionesMaxOrderByAggregateInput
    _min?: ProductoVersionesMinOrderByAggregateInput
    _sum?: ProductoVersionesSumOrderByAggregateInput
  }

  export type ProductoVersionesScalarWhereWithAggregatesInput = {
    AND?: ProductoVersionesScalarWhereWithAggregatesInput | ProductoVersionesScalarWhereWithAggregatesInput[]
    OR?: ProductoVersionesScalarWhereWithAggregatesInput[]
    NOT?: ProductoVersionesScalarWhereWithAggregatesInput | ProductoVersionesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ProductoVersiones"> | number
    producto_id?: IntWithAggregatesFilter<"ProductoVersiones"> | number
    version?: StringWithAggregatesFilter<"ProductoVersiones"> | string
    detalle?: StringNullableWithAggregatesFilter<"ProductoVersiones"> | string | null
    orden?: IntWithAggregatesFilter<"ProductoVersiones"> | number
    activo?: BoolWithAggregatesFilter<"ProductoVersiones"> | boolean
  }

  export type ProductoEspecificacionesWhereInput = {
    AND?: ProductoEspecificacionesWhereInput | ProductoEspecificacionesWhereInput[]
    OR?: ProductoEspecificacionesWhereInput[]
    NOT?: ProductoEspecificacionesWhereInput | ProductoEspecificacionesWhereInput[]
    id?: IntFilter<"ProductoEspecificaciones"> | number
    producto_id?: IntFilter<"ProductoEspecificaciones"> | number
    categoria?: StringFilter<"ProductoEspecificaciones"> | string
    especificaciones?: StringFilter<"ProductoEspecificaciones"> | string
    orden?: IntFilter<"ProductoEspecificaciones"> | number
    activo?: BoolFilter<"ProductoEspecificaciones"> | boolean
    producto?: XOR<ProductosScalarRelationFilter, ProductosWhereInput>
  }

  export type ProductoEspecificacionesOrderByWithRelationInput = {
    id?: SortOrder
    producto_id?: SortOrder
    categoria?: SortOrder
    especificaciones?: SortOrder
    orden?: SortOrder
    activo?: SortOrder
    producto?: ProductosOrderByWithRelationInput
    _relevance?: ProductoEspecificacionesOrderByRelevanceInput
  }

  export type ProductoEspecificacionesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProductoEspecificacionesWhereInput | ProductoEspecificacionesWhereInput[]
    OR?: ProductoEspecificacionesWhereInput[]
    NOT?: ProductoEspecificacionesWhereInput | ProductoEspecificacionesWhereInput[]
    producto_id?: IntFilter<"ProductoEspecificaciones"> | number
    categoria?: StringFilter<"ProductoEspecificaciones"> | string
    especificaciones?: StringFilter<"ProductoEspecificaciones"> | string
    orden?: IntFilter<"ProductoEspecificaciones"> | number
    activo?: BoolFilter<"ProductoEspecificaciones"> | boolean
    producto?: XOR<ProductosScalarRelationFilter, ProductosWhereInput>
  }, "id">

  export type ProductoEspecificacionesOrderByWithAggregationInput = {
    id?: SortOrder
    producto_id?: SortOrder
    categoria?: SortOrder
    especificaciones?: SortOrder
    orden?: SortOrder
    activo?: SortOrder
    _count?: ProductoEspecificacionesCountOrderByAggregateInput
    _avg?: ProductoEspecificacionesAvgOrderByAggregateInput
    _max?: ProductoEspecificacionesMaxOrderByAggregateInput
    _min?: ProductoEspecificacionesMinOrderByAggregateInput
    _sum?: ProductoEspecificacionesSumOrderByAggregateInput
  }

  export type ProductoEspecificacionesScalarWhereWithAggregatesInput = {
    AND?: ProductoEspecificacionesScalarWhereWithAggregatesInput | ProductoEspecificacionesScalarWhereWithAggregatesInput[]
    OR?: ProductoEspecificacionesScalarWhereWithAggregatesInput[]
    NOT?: ProductoEspecificacionesScalarWhereWithAggregatesInput | ProductoEspecificacionesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ProductoEspecificaciones"> | number
    producto_id?: IntWithAggregatesFilter<"ProductoEspecificaciones"> | number
    categoria?: StringWithAggregatesFilter<"ProductoEspecificaciones"> | string
    especificaciones?: StringWithAggregatesFilter<"ProductoEspecificaciones"> | string
    orden?: IntWithAggregatesFilter<"ProductoEspecificaciones"> | number
    activo?: BoolWithAggregatesFilter<"ProductoEspecificaciones"> | boolean
  }

  export type PedidosWhereInput = {
    AND?: PedidosWhereInput | PedidosWhereInput[]
    OR?: PedidosWhereInput[]
    NOT?: PedidosWhereInput | PedidosWhereInput[]
    id?: IntFilter<"Pedidos"> | number
    datos?: JsonFilter<"Pedidos">
    total?: DecimalFilter<"Pedidos"> | Decimal | DecimalJsLike | number | string
    estado?: StringFilter<"Pedidos"> | string
    metodo_pago?: StringFilter<"Pedidos"> | string
    comprador_nombre?: StringFilter<"Pedidos"> | string
    comprador_email?: StringFilter<"Pedidos"> | string
    comprador_telefono?: StringNullableFilter<"Pedidos"> | string | null
    direccion_envio?: StringNullableFilter<"Pedidos"> | string | null
    mp_payment_id?: StringNullableFilter<"Pedidos"> | string | null
    transferencia_ref?: StringNullableFilter<"Pedidos"> | string | null
    tarjeta_last4?: StringNullableFilter<"Pedidos"> | string | null
    tarjeta_payment_method?: StringNullableFilter<"Pedidos"> | string | null
    mp_error_code?: StringNullableFilter<"Pedidos"> | string | null
    mp_error_message?: StringNullableFilter<"Pedidos"> | string | null
    mp_response?: JsonNullableFilter<"Pedidos">
    createdAt?: DateTimeFilter<"Pedidos"> | Date | string
    updatedAt?: DateTimeFilter<"Pedidos"> | Date | string
    estadoRel?: XOR<CfgEstadoPedidoNullableScalarRelationFilter, CfgEstadoPedidoWhereInput> | null
  }

  export type PedidosOrderByWithRelationInput = {
    id?: SortOrder
    datos?: SortOrder
    total?: SortOrder
    estado?: SortOrder
    metodo_pago?: SortOrder
    comprador_nombre?: SortOrder
    comprador_email?: SortOrder
    comprador_telefono?: SortOrderInput | SortOrder
    direccion_envio?: SortOrderInput | SortOrder
    mp_payment_id?: SortOrderInput | SortOrder
    transferencia_ref?: SortOrderInput | SortOrder
    tarjeta_last4?: SortOrderInput | SortOrder
    tarjeta_payment_method?: SortOrderInput | SortOrder
    mp_error_code?: SortOrderInput | SortOrder
    mp_error_message?: SortOrderInput | SortOrder
    mp_response?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    estadoRel?: CfgEstadoPedidoOrderByWithRelationInput
    _relevance?: PedidosOrderByRelevanceInput
  }

  export type PedidosWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PedidosWhereInput | PedidosWhereInput[]
    OR?: PedidosWhereInput[]
    NOT?: PedidosWhereInput | PedidosWhereInput[]
    datos?: JsonFilter<"Pedidos">
    total?: DecimalFilter<"Pedidos"> | Decimal | DecimalJsLike | number | string
    estado?: StringFilter<"Pedidos"> | string
    metodo_pago?: StringFilter<"Pedidos"> | string
    comprador_nombre?: StringFilter<"Pedidos"> | string
    comprador_email?: StringFilter<"Pedidos"> | string
    comprador_telefono?: StringNullableFilter<"Pedidos"> | string | null
    direccion_envio?: StringNullableFilter<"Pedidos"> | string | null
    mp_payment_id?: StringNullableFilter<"Pedidos"> | string | null
    transferencia_ref?: StringNullableFilter<"Pedidos"> | string | null
    tarjeta_last4?: StringNullableFilter<"Pedidos"> | string | null
    tarjeta_payment_method?: StringNullableFilter<"Pedidos"> | string | null
    mp_error_code?: StringNullableFilter<"Pedidos"> | string | null
    mp_error_message?: StringNullableFilter<"Pedidos"> | string | null
    mp_response?: JsonNullableFilter<"Pedidos">
    createdAt?: DateTimeFilter<"Pedidos"> | Date | string
    updatedAt?: DateTimeFilter<"Pedidos"> | Date | string
    estadoRel?: XOR<CfgEstadoPedidoNullableScalarRelationFilter, CfgEstadoPedidoWhereInput> | null
  }, "id">

  export type PedidosOrderByWithAggregationInput = {
    id?: SortOrder
    datos?: SortOrder
    total?: SortOrder
    estado?: SortOrder
    metodo_pago?: SortOrder
    comprador_nombre?: SortOrder
    comprador_email?: SortOrder
    comprador_telefono?: SortOrderInput | SortOrder
    direccion_envio?: SortOrderInput | SortOrder
    mp_payment_id?: SortOrderInput | SortOrder
    transferencia_ref?: SortOrderInput | SortOrder
    tarjeta_last4?: SortOrderInput | SortOrder
    tarjeta_payment_method?: SortOrderInput | SortOrder
    mp_error_code?: SortOrderInput | SortOrder
    mp_error_message?: SortOrderInput | SortOrder
    mp_response?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PedidosCountOrderByAggregateInput
    _avg?: PedidosAvgOrderByAggregateInput
    _max?: PedidosMaxOrderByAggregateInput
    _min?: PedidosMinOrderByAggregateInput
    _sum?: PedidosSumOrderByAggregateInput
  }

  export type PedidosScalarWhereWithAggregatesInput = {
    AND?: PedidosScalarWhereWithAggregatesInput | PedidosScalarWhereWithAggregatesInput[]
    OR?: PedidosScalarWhereWithAggregatesInput[]
    NOT?: PedidosScalarWhereWithAggregatesInput | PedidosScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Pedidos"> | number
    datos?: JsonWithAggregatesFilter<"Pedidos">
    total?: DecimalWithAggregatesFilter<"Pedidos"> | Decimal | DecimalJsLike | number | string
    estado?: StringWithAggregatesFilter<"Pedidos"> | string
    metodo_pago?: StringWithAggregatesFilter<"Pedidos"> | string
    comprador_nombre?: StringWithAggregatesFilter<"Pedidos"> | string
    comprador_email?: StringWithAggregatesFilter<"Pedidos"> | string
    comprador_telefono?: StringNullableWithAggregatesFilter<"Pedidos"> | string | null
    direccion_envio?: StringNullableWithAggregatesFilter<"Pedidos"> | string | null
    mp_payment_id?: StringNullableWithAggregatesFilter<"Pedidos"> | string | null
    transferencia_ref?: StringNullableWithAggregatesFilter<"Pedidos"> | string | null
    tarjeta_last4?: StringNullableWithAggregatesFilter<"Pedidos"> | string | null
    tarjeta_payment_method?: StringNullableWithAggregatesFilter<"Pedidos"> | string | null
    mp_error_code?: StringNullableWithAggregatesFilter<"Pedidos"> | string | null
    mp_error_message?: StringNullableWithAggregatesFilter<"Pedidos"> | string | null
    mp_response?: JsonNullableWithAggregatesFilter<"Pedidos">
    createdAt?: DateTimeWithAggregatesFilter<"Pedidos"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Pedidos"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: IntFilter<"AuditLog"> | number
    entity?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    field?: StringNullableFilter<"AuditLog"> | string | null
    oldValue?: StringNullableFilter<"AuditLog"> | string | null
    newValue?: StringNullableFilter<"AuditLog"> | string | null
    user?: StringNullableFilter<"AuditLog"> | string | null
    ip?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    action?: SortOrder
    field?: SortOrderInput | SortOrder
    oldValue?: SortOrderInput | SortOrder
    newValue?: SortOrderInput | SortOrder
    user?: SortOrderInput | SortOrder
    ip?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _relevance?: AuditLogOrderByRelevanceInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    entity?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    field?: StringNullableFilter<"AuditLog"> | string | null
    oldValue?: StringNullableFilter<"AuditLog"> | string | null
    newValue?: StringNullableFilter<"AuditLog"> | string | null
    user?: StringNullableFilter<"AuditLog"> | string | null
    ip?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    action?: SortOrder
    field?: SortOrderInput | SortOrder
    oldValue?: SortOrderInput | SortOrder
    newValue?: SortOrderInput | SortOrder
    user?: SortOrderInput | SortOrder
    ip?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _avg?: AuditLogAvgOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
    _sum?: AuditLogSumOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AuditLog"> | number
    entity?: StringWithAggregatesFilter<"AuditLog"> | string
    entityId?: StringWithAggregatesFilter<"AuditLog"> | string
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    field?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    oldValue?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    newValue?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    user?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    ip?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    sid?: StringFilter<"Session"> | string
    data?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    sid?: SortOrder
    data?: SortOrder
    expiresAt?: SortOrder
    _relevance?: SessionOrderByRelevanceInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sid?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    data?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
  }, "id" | "sid">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    sid?: SortOrder
    data?: SortOrder
    expiresAt?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    sid?: StringWithAggregatesFilter<"Session"> | string
    data?: StringWithAggregatesFilter<"Session"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type CfgMarcasCreateInput = {
    marca: string
    keywords?: string | null
    foto?: string | null
    activo?: boolean
    Producto?: ProductosCreateNestedManyWithoutMarcaInput
  }

  export type CfgMarcasUncheckedCreateInput = {
    id?: number
    marca: string
    keywords?: string | null
    foto?: string | null
    activo?: boolean
    Producto?: ProductosUncheckedCreateNestedManyWithoutMarcaInput
  }

  export type CfgMarcasUpdateInput = {
    marca?: StringFieldUpdateOperationsInput | string
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    Producto?: ProductosUpdateManyWithoutMarcaNestedInput
  }

  export type CfgMarcasUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    marca?: StringFieldUpdateOperationsInput | string
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    Producto?: ProductosUncheckedUpdateManyWithoutMarcaNestedInput
  }

  export type CfgMarcasCreateManyInput = {
    id?: number
    marca: string
    keywords?: string | null
    foto?: string | null
    activo?: boolean
  }

  export type CfgMarcasUpdateManyMutationInput = {
    marca?: StringFieldUpdateOperationsInput | string
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CfgMarcasUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    marca?: StringFieldUpdateOperationsInput | string
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CfgRubrosCreateInput = {
    rubro: string
    condiciones?: string | null
    keywords?: string | null
    foto?: string | null
    activo?: boolean
    Producto?: ProductosCreateNestedManyWithoutRubroInput
  }

  export type CfgRubrosUncheckedCreateInput = {
    id?: number
    rubro: string
    condiciones?: string | null
    keywords?: string | null
    foto?: string | null
    activo?: boolean
    Producto?: ProductosUncheckedCreateNestedManyWithoutRubroInput
  }

  export type CfgRubrosUpdateInput = {
    rubro?: StringFieldUpdateOperationsInput | string
    condiciones?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    Producto?: ProductosUpdateManyWithoutRubroNestedInput
  }

  export type CfgRubrosUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    rubro?: StringFieldUpdateOperationsInput | string
    condiciones?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    Producto?: ProductosUncheckedUpdateManyWithoutRubroNestedInput
  }

  export type CfgRubrosCreateManyInput = {
    id?: number
    rubro: string
    condiciones?: string | null
    keywords?: string | null
    foto?: string | null
    activo?: boolean
  }

  export type CfgRubrosUpdateManyMutationInput = {
    rubro?: StringFieldUpdateOperationsInput | string
    condiciones?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CfgRubrosUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    rubro?: StringFieldUpdateOperationsInput | string
    condiciones?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CfgFormasPagosCreateInput = {
    forma_pago: string
    descripcion: string
    permite_cuotas?: boolean
    activo?: boolean
  }

  export type CfgFormasPagosUncheckedCreateInput = {
    id?: number
    forma_pago: string
    descripcion: string
    permite_cuotas?: boolean
    activo?: boolean
  }

  export type CfgFormasPagosUpdateInput = {
    forma_pago?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    permite_cuotas?: BoolFieldUpdateOperationsInput | boolean
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CfgFormasPagosUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    forma_pago?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    permite_cuotas?: BoolFieldUpdateOperationsInput | boolean
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CfgFormasPagosCreateManyInput = {
    id?: number
    forma_pago: string
    descripcion: string
    permite_cuotas?: boolean
    activo?: boolean
  }

  export type CfgFormasPagosUpdateManyMutationInput = {
    forma_pago?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    permite_cuotas?: BoolFieldUpdateOperationsInput | boolean
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CfgFormasPagosUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    forma_pago?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    permite_cuotas?: BoolFieldUpdateOperationsInput | boolean
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CfgMonedasCreateInput = {
    moneda: string
    moneda_des: string
    activo?: boolean
    Producto?: ProductosCreateNestedManyWithoutMonedaInput
  }

  export type CfgMonedasUncheckedCreateInput = {
    id?: number
    moneda: string
    moneda_des: string
    activo?: boolean
    Producto?: ProductosUncheckedCreateNestedManyWithoutMonedaInput
  }

  export type CfgMonedasUpdateInput = {
    moneda?: StringFieldUpdateOperationsInput | string
    moneda_des?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    Producto?: ProductosUpdateManyWithoutMonedaNestedInput
  }

  export type CfgMonedasUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    moneda?: StringFieldUpdateOperationsInput | string
    moneda_des?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    Producto?: ProductosUncheckedUpdateManyWithoutMonedaNestedInput
  }

  export type CfgMonedasCreateManyInput = {
    id?: number
    moneda: string
    moneda_des: string
    activo?: boolean
  }

  export type CfgMonedasUpdateManyMutationInput = {
    moneda?: StringFieldUpdateOperationsInput | string
    moneda_des?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CfgMonedasUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    moneda?: StringFieldUpdateOperationsInput | string
    moneda_des?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CfgSliderCreateInput = {
    titulo: string
    thumbs?: string | null
    foto?: string | null
    orden?: number
    activo?: boolean
  }

  export type CfgSliderUncheckedCreateInput = {
    id?: number
    titulo: string
    thumbs?: string | null
    foto?: string | null
    orden?: number
    activo?: boolean
  }

  export type CfgSliderUpdateInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    thumbs?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    orden?: IntFieldUpdateOperationsInput | number
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CfgSliderUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    thumbs?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    orden?: IntFieldUpdateOperationsInput | number
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CfgSliderCreateManyInput = {
    id?: number
    titulo: string
    thumbs?: string | null
    foto?: string | null
    orden?: number
    activo?: boolean
  }

  export type CfgSliderUpdateManyMutationInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    thumbs?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    orden?: IntFieldUpdateOperationsInput | number
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CfgSliderUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    thumbs?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    orden?: IntFieldUpdateOperationsInput | number
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CfgEstadoPedidoCreateInput = {
    id: string
    descripcion: string
    color?: string | null
    orden?: number
    es_final?: boolean
    es_cancel?: boolean
    activo?: boolean
    Pedidos?: PedidosCreateNestedManyWithoutEstadoRelInput
  }

  export type CfgEstadoPedidoUncheckedCreateInput = {
    id: string
    descripcion: string
    color?: string | null
    orden?: number
    es_final?: boolean
    es_cancel?: boolean
    activo?: boolean
    Pedidos?: PedidosUncheckedCreateNestedManyWithoutEstadoRelInput
  }

  export type CfgEstadoPedidoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    orden?: IntFieldUpdateOperationsInput | number
    es_final?: BoolFieldUpdateOperationsInput | boolean
    es_cancel?: BoolFieldUpdateOperationsInput | boolean
    activo?: BoolFieldUpdateOperationsInput | boolean
    Pedidos?: PedidosUpdateManyWithoutEstadoRelNestedInput
  }

  export type CfgEstadoPedidoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    orden?: IntFieldUpdateOperationsInput | number
    es_final?: BoolFieldUpdateOperationsInput | boolean
    es_cancel?: BoolFieldUpdateOperationsInput | boolean
    activo?: BoolFieldUpdateOperationsInput | boolean
    Pedidos?: PedidosUncheckedUpdateManyWithoutEstadoRelNestedInput
  }

  export type CfgEstadoPedidoCreateManyInput = {
    id: string
    descripcion: string
    color?: string | null
    orden?: number
    es_final?: boolean
    es_cancel?: boolean
    activo?: boolean
  }

  export type CfgEstadoPedidoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    orden?: IntFieldUpdateOperationsInput | number
    es_final?: BoolFieldUpdateOperationsInput | boolean
    es_cancel?: BoolFieldUpdateOperationsInput | boolean
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CfgEstadoPedidoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    orden?: IntFieldUpdateOperationsInput | number
    es_final?: BoolFieldUpdateOperationsInput | boolean
    es_cancel?: BoolFieldUpdateOperationsInput | boolean
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductosCreateInput = {
    producto: string
    descripcion?: string | null
    foto?: string | null
    precio: Decimal | DecimalJsLike | number | string
    stock?: number
    destacado?: boolean
    activo?: boolean
    visitas?: number
    marca: CfgMarcasCreateNestedOneWithoutProductoInput
    rubro: CfgRubrosCreateNestedOneWithoutProductoInput
    moneda: CfgMonedasCreateNestedOneWithoutProductoInput
    fotos?: ProductoFotosCreateNestedManyWithoutProductoInput
    versiones?: ProductoVersionesCreateNestedManyWithoutProductoInput
    especificaciones?: ProductoEspecificacionesCreateNestedManyWithoutProductoInput
  }

  export type ProductosUncheckedCreateInput = {
    id?: number
    marca_id: number
    rubro_id: number
    moneda_id: number
    producto: string
    descripcion?: string | null
    foto?: string | null
    precio: Decimal | DecimalJsLike | number | string
    stock?: number
    destacado?: boolean
    activo?: boolean
    visitas?: number
    fotos?: ProductoFotosUncheckedCreateNestedManyWithoutProductoInput
    versiones?: ProductoVersionesUncheckedCreateNestedManyWithoutProductoInput
    especificaciones?: ProductoEspecificacionesUncheckedCreateNestedManyWithoutProductoInput
  }

  export type ProductosUpdateInput = {
    producto?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    destacado?: BoolFieldUpdateOperationsInput | boolean
    activo?: BoolFieldUpdateOperationsInput | boolean
    visitas?: IntFieldUpdateOperationsInput | number
    marca?: CfgMarcasUpdateOneRequiredWithoutProductoNestedInput
    rubro?: CfgRubrosUpdateOneRequiredWithoutProductoNestedInput
    moneda?: CfgMonedasUpdateOneRequiredWithoutProductoNestedInput
    fotos?: ProductoFotosUpdateManyWithoutProductoNestedInput
    versiones?: ProductoVersionesUpdateManyWithoutProductoNestedInput
    especificaciones?: ProductoEspecificacionesUpdateManyWithoutProductoNestedInput
  }

  export type ProductosUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    marca_id?: IntFieldUpdateOperationsInput | number
    rubro_id?: IntFieldUpdateOperationsInput | number
    moneda_id?: IntFieldUpdateOperationsInput | number
    producto?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    destacado?: BoolFieldUpdateOperationsInput | boolean
    activo?: BoolFieldUpdateOperationsInput | boolean
    visitas?: IntFieldUpdateOperationsInput | number
    fotos?: ProductoFotosUncheckedUpdateManyWithoutProductoNestedInput
    versiones?: ProductoVersionesUncheckedUpdateManyWithoutProductoNestedInput
    especificaciones?: ProductoEspecificacionesUncheckedUpdateManyWithoutProductoNestedInput
  }

  export type ProductosCreateManyInput = {
    id?: number
    marca_id: number
    rubro_id: number
    moneda_id: number
    producto: string
    descripcion?: string | null
    foto?: string | null
    precio: Decimal | DecimalJsLike | number | string
    stock?: number
    destacado?: boolean
    activo?: boolean
    visitas?: number
  }

  export type ProductosUpdateManyMutationInput = {
    producto?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    destacado?: BoolFieldUpdateOperationsInput | boolean
    activo?: BoolFieldUpdateOperationsInput | boolean
    visitas?: IntFieldUpdateOperationsInput | number
  }

  export type ProductosUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    marca_id?: IntFieldUpdateOperationsInput | number
    rubro_id?: IntFieldUpdateOperationsInput | number
    moneda_id?: IntFieldUpdateOperationsInput | number
    producto?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    destacado?: BoolFieldUpdateOperationsInput | boolean
    activo?: BoolFieldUpdateOperationsInput | boolean
    visitas?: IntFieldUpdateOperationsInput | number
  }

  export type ProductoFotosCreateInput = {
    epigrafe: string
    foto?: string | null
    orden?: number
    activo?: boolean
    producto: ProductosCreateNestedOneWithoutFotosInput
  }

  export type ProductoFotosUncheckedCreateInput = {
    id?: number
    producto_id: number
    epigrafe: string
    foto?: string | null
    orden?: number
    activo?: boolean
  }

  export type ProductoFotosUpdateInput = {
    epigrafe?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    orden?: IntFieldUpdateOperationsInput | number
    activo?: BoolFieldUpdateOperationsInput | boolean
    producto?: ProductosUpdateOneRequiredWithoutFotosNestedInput
  }

  export type ProductoFotosUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    producto_id?: IntFieldUpdateOperationsInput | number
    epigrafe?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    orden?: IntFieldUpdateOperationsInput | number
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductoFotosCreateManyInput = {
    id?: number
    producto_id: number
    epigrafe: string
    foto?: string | null
    orden?: number
    activo?: boolean
  }

  export type ProductoFotosUpdateManyMutationInput = {
    epigrafe?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    orden?: IntFieldUpdateOperationsInput | number
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductoFotosUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    producto_id?: IntFieldUpdateOperationsInput | number
    epigrafe?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    orden?: IntFieldUpdateOperationsInput | number
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductoVersionesCreateInput = {
    version: string
    detalle?: string | null
    orden?: number
    activo?: boolean
    producto: ProductosCreateNestedOneWithoutVersionesInput
  }

  export type ProductoVersionesUncheckedCreateInput = {
    id?: number
    producto_id: number
    version: string
    detalle?: string | null
    orden?: number
    activo?: boolean
  }

  export type ProductoVersionesUpdateInput = {
    version?: StringFieldUpdateOperationsInput | string
    detalle?: NullableStringFieldUpdateOperationsInput | string | null
    orden?: IntFieldUpdateOperationsInput | number
    activo?: BoolFieldUpdateOperationsInput | boolean
    producto?: ProductosUpdateOneRequiredWithoutVersionesNestedInput
  }

  export type ProductoVersionesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    producto_id?: IntFieldUpdateOperationsInput | number
    version?: StringFieldUpdateOperationsInput | string
    detalle?: NullableStringFieldUpdateOperationsInput | string | null
    orden?: IntFieldUpdateOperationsInput | number
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductoVersionesCreateManyInput = {
    id?: number
    producto_id: number
    version: string
    detalle?: string | null
    orden?: number
    activo?: boolean
  }

  export type ProductoVersionesUpdateManyMutationInput = {
    version?: StringFieldUpdateOperationsInput | string
    detalle?: NullableStringFieldUpdateOperationsInput | string | null
    orden?: IntFieldUpdateOperationsInput | number
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductoVersionesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    producto_id?: IntFieldUpdateOperationsInput | number
    version?: StringFieldUpdateOperationsInput | string
    detalle?: NullableStringFieldUpdateOperationsInput | string | null
    orden?: IntFieldUpdateOperationsInput | number
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductoEspecificacionesCreateInput = {
    categoria: string
    especificaciones: string
    orden?: number
    activo?: boolean
    producto: ProductosCreateNestedOneWithoutEspecificacionesInput
  }

  export type ProductoEspecificacionesUncheckedCreateInput = {
    id?: number
    producto_id: number
    categoria: string
    especificaciones: string
    orden?: number
    activo?: boolean
  }

  export type ProductoEspecificacionesUpdateInput = {
    categoria?: StringFieldUpdateOperationsInput | string
    especificaciones?: StringFieldUpdateOperationsInput | string
    orden?: IntFieldUpdateOperationsInput | number
    activo?: BoolFieldUpdateOperationsInput | boolean
    producto?: ProductosUpdateOneRequiredWithoutEspecificacionesNestedInput
  }

  export type ProductoEspecificacionesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    producto_id?: IntFieldUpdateOperationsInput | number
    categoria?: StringFieldUpdateOperationsInput | string
    especificaciones?: StringFieldUpdateOperationsInput | string
    orden?: IntFieldUpdateOperationsInput | number
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductoEspecificacionesCreateManyInput = {
    id?: number
    producto_id: number
    categoria: string
    especificaciones: string
    orden?: number
    activo?: boolean
  }

  export type ProductoEspecificacionesUpdateManyMutationInput = {
    categoria?: StringFieldUpdateOperationsInput | string
    especificaciones?: StringFieldUpdateOperationsInput | string
    orden?: IntFieldUpdateOperationsInput | number
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductoEspecificacionesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    producto_id?: IntFieldUpdateOperationsInput | number
    categoria?: StringFieldUpdateOperationsInput | string
    especificaciones?: StringFieldUpdateOperationsInput | string
    orden?: IntFieldUpdateOperationsInput | number
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PedidosCreateInput = {
    datos: JsonNullValueInput | InputJsonValue
    total: Decimal | DecimalJsLike | number | string
    metodo_pago: string
    comprador_nombre: string
    comprador_email: string
    comprador_telefono?: string | null
    direccion_envio?: string | null
    mp_payment_id?: string | null
    transferencia_ref?: string | null
    tarjeta_last4?: string | null
    tarjeta_payment_method?: string | null
    mp_error_code?: string | null
    mp_error_message?: string | null
    mp_response?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    estadoRel?: CfgEstadoPedidoCreateNestedOneWithoutPedidosInput
  }

  export type PedidosUncheckedCreateInput = {
    id?: number
    datos: JsonNullValueInput | InputJsonValue
    total: Decimal | DecimalJsLike | number | string
    estado?: string
    metodo_pago: string
    comprador_nombre: string
    comprador_email: string
    comprador_telefono?: string | null
    direccion_envio?: string | null
    mp_payment_id?: string | null
    transferencia_ref?: string | null
    tarjeta_last4?: string | null
    tarjeta_payment_method?: string | null
    mp_error_code?: string | null
    mp_error_message?: string | null
    mp_response?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PedidosUpdateInput = {
    datos?: JsonNullValueInput | InputJsonValue
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodo_pago?: StringFieldUpdateOperationsInput | string
    comprador_nombre?: StringFieldUpdateOperationsInput | string
    comprador_email?: StringFieldUpdateOperationsInput | string
    comprador_telefono?: NullableStringFieldUpdateOperationsInput | string | null
    direccion_envio?: NullableStringFieldUpdateOperationsInput | string | null
    mp_payment_id?: NullableStringFieldUpdateOperationsInput | string | null
    transferencia_ref?: NullableStringFieldUpdateOperationsInput | string | null
    tarjeta_last4?: NullableStringFieldUpdateOperationsInput | string | null
    tarjeta_payment_method?: NullableStringFieldUpdateOperationsInput | string | null
    mp_error_code?: NullableStringFieldUpdateOperationsInput | string | null
    mp_error_message?: NullableStringFieldUpdateOperationsInput | string | null
    mp_response?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    estadoRel?: CfgEstadoPedidoUpdateOneWithoutPedidosNestedInput
  }

  export type PedidosUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    datos?: JsonNullValueInput | InputJsonValue
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estado?: StringFieldUpdateOperationsInput | string
    metodo_pago?: StringFieldUpdateOperationsInput | string
    comprador_nombre?: StringFieldUpdateOperationsInput | string
    comprador_email?: StringFieldUpdateOperationsInput | string
    comprador_telefono?: NullableStringFieldUpdateOperationsInput | string | null
    direccion_envio?: NullableStringFieldUpdateOperationsInput | string | null
    mp_payment_id?: NullableStringFieldUpdateOperationsInput | string | null
    transferencia_ref?: NullableStringFieldUpdateOperationsInput | string | null
    tarjeta_last4?: NullableStringFieldUpdateOperationsInput | string | null
    tarjeta_payment_method?: NullableStringFieldUpdateOperationsInput | string | null
    mp_error_code?: NullableStringFieldUpdateOperationsInput | string | null
    mp_error_message?: NullableStringFieldUpdateOperationsInput | string | null
    mp_response?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PedidosCreateManyInput = {
    id?: number
    datos: JsonNullValueInput | InputJsonValue
    total: Decimal | DecimalJsLike | number | string
    estado?: string
    metodo_pago: string
    comprador_nombre: string
    comprador_email: string
    comprador_telefono?: string | null
    direccion_envio?: string | null
    mp_payment_id?: string | null
    transferencia_ref?: string | null
    tarjeta_last4?: string | null
    tarjeta_payment_method?: string | null
    mp_error_code?: string | null
    mp_error_message?: string | null
    mp_response?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PedidosUpdateManyMutationInput = {
    datos?: JsonNullValueInput | InputJsonValue
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodo_pago?: StringFieldUpdateOperationsInput | string
    comprador_nombre?: StringFieldUpdateOperationsInput | string
    comprador_email?: StringFieldUpdateOperationsInput | string
    comprador_telefono?: NullableStringFieldUpdateOperationsInput | string | null
    direccion_envio?: NullableStringFieldUpdateOperationsInput | string | null
    mp_payment_id?: NullableStringFieldUpdateOperationsInput | string | null
    transferencia_ref?: NullableStringFieldUpdateOperationsInput | string | null
    tarjeta_last4?: NullableStringFieldUpdateOperationsInput | string | null
    tarjeta_payment_method?: NullableStringFieldUpdateOperationsInput | string | null
    mp_error_code?: NullableStringFieldUpdateOperationsInput | string | null
    mp_error_message?: NullableStringFieldUpdateOperationsInput | string | null
    mp_response?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PedidosUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    datos?: JsonNullValueInput | InputJsonValue
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estado?: StringFieldUpdateOperationsInput | string
    metodo_pago?: StringFieldUpdateOperationsInput | string
    comprador_nombre?: StringFieldUpdateOperationsInput | string
    comprador_email?: StringFieldUpdateOperationsInput | string
    comprador_telefono?: NullableStringFieldUpdateOperationsInput | string | null
    direccion_envio?: NullableStringFieldUpdateOperationsInput | string | null
    mp_payment_id?: NullableStringFieldUpdateOperationsInput | string | null
    transferencia_ref?: NullableStringFieldUpdateOperationsInput | string | null
    tarjeta_last4?: NullableStringFieldUpdateOperationsInput | string | null
    tarjeta_payment_method?: NullableStringFieldUpdateOperationsInput | string | null
    mp_error_code?: NullableStringFieldUpdateOperationsInput | string | null
    mp_error_message?: NullableStringFieldUpdateOperationsInput | string | null
    mp_response?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    entity: string
    entityId: string
    action: string
    field?: string | null
    oldValue?: string | null
    newValue?: string | null
    user?: string | null
    ip?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUncheckedCreateInput = {
    id?: number
    entity: string
    entityId: string
    action: string
    field?: string | null
    oldValue?: string | null
    newValue?: string | null
    user?: string | null
    ip?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateInput = {
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    field?: NullableStringFieldUpdateOperationsInput | string | null
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    user?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    field?: NullableStringFieldUpdateOperationsInput | string | null
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    user?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: number
    entity: string
    entityId: string
    action: string
    field?: string | null
    oldValue?: string | null
    newValue?: string | null
    user?: string | null
    ip?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    field?: NullableStringFieldUpdateOperationsInput | string | null
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    user?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    field?: NullableStringFieldUpdateOperationsInput | string | null
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    user?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    id?: string
    sid: string
    data: string
    expiresAt: Date | string
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    sid: string
    data: string
    expiresAt: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sid?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sid?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    sid: string
    data: string
    expiresAt: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sid?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sid?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ProductosListRelationFilter = {
    every?: ProductosWhereInput
    some?: ProductosWhereInput
    none?: ProductosWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProductosOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CfgMarcasOrderByRelevanceInput = {
    fields: CfgMarcasOrderByRelevanceFieldEnum | CfgMarcasOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type CfgMarcasCountOrderByAggregateInput = {
    id?: SortOrder
    marca?: SortOrder
    keywords?: SortOrder
    foto?: SortOrder
    activo?: SortOrder
  }

  export type CfgMarcasAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CfgMarcasMaxOrderByAggregateInput = {
    id?: SortOrder
    marca?: SortOrder
    keywords?: SortOrder
    foto?: SortOrder
    activo?: SortOrder
  }

  export type CfgMarcasMinOrderByAggregateInput = {
    id?: SortOrder
    marca?: SortOrder
    keywords?: SortOrder
    foto?: SortOrder
    activo?: SortOrder
  }

  export type CfgMarcasSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type CfgRubrosOrderByRelevanceInput = {
    fields: CfgRubrosOrderByRelevanceFieldEnum | CfgRubrosOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type CfgRubrosCountOrderByAggregateInput = {
    id?: SortOrder
    rubro?: SortOrder
    condiciones?: SortOrder
    keywords?: SortOrder
    foto?: SortOrder
    activo?: SortOrder
  }

  export type CfgRubrosAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CfgRubrosMaxOrderByAggregateInput = {
    id?: SortOrder
    rubro?: SortOrder
    condiciones?: SortOrder
    keywords?: SortOrder
    foto?: SortOrder
    activo?: SortOrder
  }

  export type CfgRubrosMinOrderByAggregateInput = {
    id?: SortOrder
    rubro?: SortOrder
    condiciones?: SortOrder
    keywords?: SortOrder
    foto?: SortOrder
    activo?: SortOrder
  }

  export type CfgRubrosSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CfgFormasPagosOrderByRelevanceInput = {
    fields: CfgFormasPagosOrderByRelevanceFieldEnum | CfgFormasPagosOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type CfgFormasPagosCountOrderByAggregateInput = {
    id?: SortOrder
    forma_pago?: SortOrder
    descripcion?: SortOrder
    permite_cuotas?: SortOrder
    activo?: SortOrder
  }

  export type CfgFormasPagosAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CfgFormasPagosMaxOrderByAggregateInput = {
    id?: SortOrder
    forma_pago?: SortOrder
    descripcion?: SortOrder
    permite_cuotas?: SortOrder
    activo?: SortOrder
  }

  export type CfgFormasPagosMinOrderByAggregateInput = {
    id?: SortOrder
    forma_pago?: SortOrder
    descripcion?: SortOrder
    permite_cuotas?: SortOrder
    activo?: SortOrder
  }

  export type CfgFormasPagosSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CfgMonedasOrderByRelevanceInput = {
    fields: CfgMonedasOrderByRelevanceFieldEnum | CfgMonedasOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type CfgMonedasCountOrderByAggregateInput = {
    id?: SortOrder
    moneda?: SortOrder
    moneda_des?: SortOrder
    activo?: SortOrder
  }

  export type CfgMonedasAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CfgMonedasMaxOrderByAggregateInput = {
    id?: SortOrder
    moneda?: SortOrder
    moneda_des?: SortOrder
    activo?: SortOrder
  }

  export type CfgMonedasMinOrderByAggregateInput = {
    id?: SortOrder
    moneda?: SortOrder
    moneda_des?: SortOrder
    activo?: SortOrder
  }

  export type CfgMonedasSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CfgSliderOrderByRelevanceInput = {
    fields: CfgSliderOrderByRelevanceFieldEnum | CfgSliderOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type CfgSliderCountOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    thumbs?: SortOrder
    foto?: SortOrder
    orden?: SortOrder
    activo?: SortOrder
  }

  export type CfgSliderAvgOrderByAggregateInput = {
    id?: SortOrder
    orden?: SortOrder
  }

  export type CfgSliderMaxOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    thumbs?: SortOrder
    foto?: SortOrder
    orden?: SortOrder
    activo?: SortOrder
  }

  export type CfgSliderMinOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    thumbs?: SortOrder
    foto?: SortOrder
    orden?: SortOrder
    activo?: SortOrder
  }

  export type CfgSliderSumOrderByAggregateInput = {
    id?: SortOrder
    orden?: SortOrder
  }

  export type PedidosListRelationFilter = {
    every?: PedidosWhereInput
    some?: PedidosWhereInput
    none?: PedidosWhereInput
  }

  export type PedidosOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CfgEstadoPedidoOrderByRelevanceInput = {
    fields: CfgEstadoPedidoOrderByRelevanceFieldEnum | CfgEstadoPedidoOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type CfgEstadoPedidoCountOrderByAggregateInput = {
    id?: SortOrder
    descripcion?: SortOrder
    color?: SortOrder
    orden?: SortOrder
    es_final?: SortOrder
    es_cancel?: SortOrder
    activo?: SortOrder
  }

  export type CfgEstadoPedidoAvgOrderByAggregateInput = {
    orden?: SortOrder
  }

  export type CfgEstadoPedidoMaxOrderByAggregateInput = {
    id?: SortOrder
    descripcion?: SortOrder
    color?: SortOrder
    orden?: SortOrder
    es_final?: SortOrder
    es_cancel?: SortOrder
    activo?: SortOrder
  }

  export type CfgEstadoPedidoMinOrderByAggregateInput = {
    id?: SortOrder
    descripcion?: SortOrder
    color?: SortOrder
    orden?: SortOrder
    es_final?: SortOrder
    es_cancel?: SortOrder
    activo?: SortOrder
  }

  export type CfgEstadoPedidoSumOrderByAggregateInput = {
    orden?: SortOrder
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type CfgMarcasScalarRelationFilter = {
    is?: CfgMarcasWhereInput
    isNot?: CfgMarcasWhereInput
  }

  export type CfgRubrosScalarRelationFilter = {
    is?: CfgRubrosWhereInput
    isNot?: CfgRubrosWhereInput
  }

  export type CfgMonedasScalarRelationFilter = {
    is?: CfgMonedasWhereInput
    isNot?: CfgMonedasWhereInput
  }

  export type ProductoFotosListRelationFilter = {
    every?: ProductoFotosWhereInput
    some?: ProductoFotosWhereInput
    none?: ProductoFotosWhereInput
  }

  export type ProductoVersionesListRelationFilter = {
    every?: ProductoVersionesWhereInput
    some?: ProductoVersionesWhereInput
    none?: ProductoVersionesWhereInput
  }

  export type ProductoEspecificacionesListRelationFilter = {
    every?: ProductoEspecificacionesWhereInput
    some?: ProductoEspecificacionesWhereInput
    none?: ProductoEspecificacionesWhereInput
  }

  export type ProductoFotosOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductoVersionesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductoEspecificacionesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductosOrderByRelevanceInput = {
    fields: ProductosOrderByRelevanceFieldEnum | ProductosOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ProductosCountOrderByAggregateInput = {
    id?: SortOrder
    marca_id?: SortOrder
    rubro_id?: SortOrder
    moneda_id?: SortOrder
    producto?: SortOrder
    descripcion?: SortOrder
    foto?: SortOrder
    precio?: SortOrder
    stock?: SortOrder
    destacado?: SortOrder
    activo?: SortOrder
    visitas?: SortOrder
  }

  export type ProductosAvgOrderByAggregateInput = {
    id?: SortOrder
    marca_id?: SortOrder
    rubro_id?: SortOrder
    moneda_id?: SortOrder
    precio?: SortOrder
    stock?: SortOrder
    visitas?: SortOrder
  }

  export type ProductosMaxOrderByAggregateInput = {
    id?: SortOrder
    marca_id?: SortOrder
    rubro_id?: SortOrder
    moneda_id?: SortOrder
    producto?: SortOrder
    descripcion?: SortOrder
    foto?: SortOrder
    precio?: SortOrder
    stock?: SortOrder
    destacado?: SortOrder
    activo?: SortOrder
    visitas?: SortOrder
  }

  export type ProductosMinOrderByAggregateInput = {
    id?: SortOrder
    marca_id?: SortOrder
    rubro_id?: SortOrder
    moneda_id?: SortOrder
    producto?: SortOrder
    descripcion?: SortOrder
    foto?: SortOrder
    precio?: SortOrder
    stock?: SortOrder
    destacado?: SortOrder
    activo?: SortOrder
    visitas?: SortOrder
  }

  export type ProductosSumOrderByAggregateInput = {
    id?: SortOrder
    marca_id?: SortOrder
    rubro_id?: SortOrder
    moneda_id?: SortOrder
    precio?: SortOrder
    stock?: SortOrder
    visitas?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type ProductosScalarRelationFilter = {
    is?: ProductosWhereInput
    isNot?: ProductosWhereInput
  }

  export type ProductoFotosOrderByRelevanceInput = {
    fields: ProductoFotosOrderByRelevanceFieldEnum | ProductoFotosOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ProductoFotosCountOrderByAggregateInput = {
    id?: SortOrder
    producto_id?: SortOrder
    epigrafe?: SortOrder
    foto?: SortOrder
    orden?: SortOrder
    activo?: SortOrder
  }

  export type ProductoFotosAvgOrderByAggregateInput = {
    id?: SortOrder
    producto_id?: SortOrder
    orden?: SortOrder
  }

  export type ProductoFotosMaxOrderByAggregateInput = {
    id?: SortOrder
    producto_id?: SortOrder
    epigrafe?: SortOrder
    foto?: SortOrder
    orden?: SortOrder
    activo?: SortOrder
  }

  export type ProductoFotosMinOrderByAggregateInput = {
    id?: SortOrder
    producto_id?: SortOrder
    epigrafe?: SortOrder
    foto?: SortOrder
    orden?: SortOrder
    activo?: SortOrder
  }

  export type ProductoFotosSumOrderByAggregateInput = {
    id?: SortOrder
    producto_id?: SortOrder
    orden?: SortOrder
  }

  export type ProductoVersionesOrderByRelevanceInput = {
    fields: ProductoVersionesOrderByRelevanceFieldEnum | ProductoVersionesOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ProductoVersionesCountOrderByAggregateInput = {
    id?: SortOrder
    producto_id?: SortOrder
    version?: SortOrder
    detalle?: SortOrder
    orden?: SortOrder
    activo?: SortOrder
  }

  export type ProductoVersionesAvgOrderByAggregateInput = {
    id?: SortOrder
    producto_id?: SortOrder
    orden?: SortOrder
  }

  export type ProductoVersionesMaxOrderByAggregateInput = {
    id?: SortOrder
    producto_id?: SortOrder
    version?: SortOrder
    detalle?: SortOrder
    orden?: SortOrder
    activo?: SortOrder
  }

  export type ProductoVersionesMinOrderByAggregateInput = {
    id?: SortOrder
    producto_id?: SortOrder
    version?: SortOrder
    detalle?: SortOrder
    orden?: SortOrder
    activo?: SortOrder
  }

  export type ProductoVersionesSumOrderByAggregateInput = {
    id?: SortOrder
    producto_id?: SortOrder
    orden?: SortOrder
  }

  export type ProductoEspecificacionesOrderByRelevanceInput = {
    fields: ProductoEspecificacionesOrderByRelevanceFieldEnum | ProductoEspecificacionesOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ProductoEspecificacionesCountOrderByAggregateInput = {
    id?: SortOrder
    producto_id?: SortOrder
    categoria?: SortOrder
    especificaciones?: SortOrder
    orden?: SortOrder
    activo?: SortOrder
  }

  export type ProductoEspecificacionesAvgOrderByAggregateInput = {
    id?: SortOrder
    producto_id?: SortOrder
    orden?: SortOrder
  }

  export type ProductoEspecificacionesMaxOrderByAggregateInput = {
    id?: SortOrder
    producto_id?: SortOrder
    categoria?: SortOrder
    especificaciones?: SortOrder
    orden?: SortOrder
    activo?: SortOrder
  }

  export type ProductoEspecificacionesMinOrderByAggregateInput = {
    id?: SortOrder
    producto_id?: SortOrder
    categoria?: SortOrder
    especificaciones?: SortOrder
    orden?: SortOrder
    activo?: SortOrder
  }

  export type ProductoEspecificacionesSumOrderByAggregateInput = {
    id?: SortOrder
    producto_id?: SortOrder
    orden?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CfgEstadoPedidoNullableScalarRelationFilter = {
    is?: CfgEstadoPedidoWhereInput | null
    isNot?: CfgEstadoPedidoWhereInput | null
  }

  export type PedidosOrderByRelevanceInput = {
    fields: PedidosOrderByRelevanceFieldEnum | PedidosOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PedidosCountOrderByAggregateInput = {
    id?: SortOrder
    datos?: SortOrder
    total?: SortOrder
    estado?: SortOrder
    metodo_pago?: SortOrder
    comprador_nombre?: SortOrder
    comprador_email?: SortOrder
    comprador_telefono?: SortOrder
    direccion_envio?: SortOrder
    mp_payment_id?: SortOrder
    transferencia_ref?: SortOrder
    tarjeta_last4?: SortOrder
    tarjeta_payment_method?: SortOrder
    mp_error_code?: SortOrder
    mp_error_message?: SortOrder
    mp_response?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PedidosAvgOrderByAggregateInput = {
    id?: SortOrder
    total?: SortOrder
  }

  export type PedidosMaxOrderByAggregateInput = {
    id?: SortOrder
    total?: SortOrder
    estado?: SortOrder
    metodo_pago?: SortOrder
    comprador_nombre?: SortOrder
    comprador_email?: SortOrder
    comprador_telefono?: SortOrder
    direccion_envio?: SortOrder
    mp_payment_id?: SortOrder
    transferencia_ref?: SortOrder
    tarjeta_last4?: SortOrder
    tarjeta_payment_method?: SortOrder
    mp_error_code?: SortOrder
    mp_error_message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PedidosMinOrderByAggregateInput = {
    id?: SortOrder
    total?: SortOrder
    estado?: SortOrder
    metodo_pago?: SortOrder
    comprador_nombre?: SortOrder
    comprador_email?: SortOrder
    comprador_telefono?: SortOrder
    direccion_envio?: SortOrder
    mp_payment_id?: SortOrder
    transferencia_ref?: SortOrder
    tarjeta_last4?: SortOrder
    tarjeta_payment_method?: SortOrder
    mp_error_code?: SortOrder
    mp_error_message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PedidosSumOrderByAggregateInput = {
    id?: SortOrder
    total?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type AuditLogOrderByRelevanceInput = {
    fields: AuditLogOrderByRelevanceFieldEnum | AuditLogOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    action?: SortOrder
    field?: SortOrder
    oldValue?: SortOrder
    newValue?: SortOrder
    user?: SortOrder
    ip?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    action?: SortOrder
    field?: SortOrder
    oldValue?: SortOrder
    newValue?: SortOrder
    user?: SortOrder
    ip?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    action?: SortOrder
    field?: SortOrder
    oldValue?: SortOrder
    newValue?: SortOrder
    user?: SortOrder
    ip?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SessionOrderByRelevanceInput = {
    fields: SessionOrderByRelevanceFieldEnum | SessionOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    sid?: SortOrder
    data?: SortOrder
    expiresAt?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    sid?: SortOrder
    data?: SortOrder
    expiresAt?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    sid?: SortOrder
    data?: SortOrder
    expiresAt?: SortOrder
  }

  export type ProductosCreateNestedManyWithoutMarcaInput = {
    create?: XOR<ProductosCreateWithoutMarcaInput, ProductosUncheckedCreateWithoutMarcaInput> | ProductosCreateWithoutMarcaInput[] | ProductosUncheckedCreateWithoutMarcaInput[]
    connectOrCreate?: ProductosCreateOrConnectWithoutMarcaInput | ProductosCreateOrConnectWithoutMarcaInput[]
    createMany?: ProductosCreateManyMarcaInputEnvelope
    connect?: ProductosWhereUniqueInput | ProductosWhereUniqueInput[]
  }

  export type ProductosUncheckedCreateNestedManyWithoutMarcaInput = {
    create?: XOR<ProductosCreateWithoutMarcaInput, ProductosUncheckedCreateWithoutMarcaInput> | ProductosCreateWithoutMarcaInput[] | ProductosUncheckedCreateWithoutMarcaInput[]
    connectOrCreate?: ProductosCreateOrConnectWithoutMarcaInput | ProductosCreateOrConnectWithoutMarcaInput[]
    createMany?: ProductosCreateManyMarcaInputEnvelope
    connect?: ProductosWhereUniqueInput | ProductosWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ProductosUpdateManyWithoutMarcaNestedInput = {
    create?: XOR<ProductosCreateWithoutMarcaInput, ProductosUncheckedCreateWithoutMarcaInput> | ProductosCreateWithoutMarcaInput[] | ProductosUncheckedCreateWithoutMarcaInput[]
    connectOrCreate?: ProductosCreateOrConnectWithoutMarcaInput | ProductosCreateOrConnectWithoutMarcaInput[]
    upsert?: ProductosUpsertWithWhereUniqueWithoutMarcaInput | ProductosUpsertWithWhereUniqueWithoutMarcaInput[]
    createMany?: ProductosCreateManyMarcaInputEnvelope
    set?: ProductosWhereUniqueInput | ProductosWhereUniqueInput[]
    disconnect?: ProductosWhereUniqueInput | ProductosWhereUniqueInput[]
    delete?: ProductosWhereUniqueInput | ProductosWhereUniqueInput[]
    connect?: ProductosWhereUniqueInput | ProductosWhereUniqueInput[]
    update?: ProductosUpdateWithWhereUniqueWithoutMarcaInput | ProductosUpdateWithWhereUniqueWithoutMarcaInput[]
    updateMany?: ProductosUpdateManyWithWhereWithoutMarcaInput | ProductosUpdateManyWithWhereWithoutMarcaInput[]
    deleteMany?: ProductosScalarWhereInput | ProductosScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProductosUncheckedUpdateManyWithoutMarcaNestedInput = {
    create?: XOR<ProductosCreateWithoutMarcaInput, ProductosUncheckedCreateWithoutMarcaInput> | ProductosCreateWithoutMarcaInput[] | ProductosUncheckedCreateWithoutMarcaInput[]
    connectOrCreate?: ProductosCreateOrConnectWithoutMarcaInput | ProductosCreateOrConnectWithoutMarcaInput[]
    upsert?: ProductosUpsertWithWhereUniqueWithoutMarcaInput | ProductosUpsertWithWhereUniqueWithoutMarcaInput[]
    createMany?: ProductosCreateManyMarcaInputEnvelope
    set?: ProductosWhereUniqueInput | ProductosWhereUniqueInput[]
    disconnect?: ProductosWhereUniqueInput | ProductosWhereUniqueInput[]
    delete?: ProductosWhereUniqueInput | ProductosWhereUniqueInput[]
    connect?: ProductosWhereUniqueInput | ProductosWhereUniqueInput[]
    update?: ProductosUpdateWithWhereUniqueWithoutMarcaInput | ProductosUpdateWithWhereUniqueWithoutMarcaInput[]
    updateMany?: ProductosUpdateManyWithWhereWithoutMarcaInput | ProductosUpdateManyWithWhereWithoutMarcaInput[]
    deleteMany?: ProductosScalarWhereInput | ProductosScalarWhereInput[]
  }

  export type ProductosCreateNestedManyWithoutRubroInput = {
    create?: XOR<ProductosCreateWithoutRubroInput, ProductosUncheckedCreateWithoutRubroInput> | ProductosCreateWithoutRubroInput[] | ProductosUncheckedCreateWithoutRubroInput[]
    connectOrCreate?: ProductosCreateOrConnectWithoutRubroInput | ProductosCreateOrConnectWithoutRubroInput[]
    createMany?: ProductosCreateManyRubroInputEnvelope
    connect?: ProductosWhereUniqueInput | ProductosWhereUniqueInput[]
  }

  export type ProductosUncheckedCreateNestedManyWithoutRubroInput = {
    create?: XOR<ProductosCreateWithoutRubroInput, ProductosUncheckedCreateWithoutRubroInput> | ProductosCreateWithoutRubroInput[] | ProductosUncheckedCreateWithoutRubroInput[]
    connectOrCreate?: ProductosCreateOrConnectWithoutRubroInput | ProductosCreateOrConnectWithoutRubroInput[]
    createMany?: ProductosCreateManyRubroInputEnvelope
    connect?: ProductosWhereUniqueInput | ProductosWhereUniqueInput[]
  }

  export type ProductosUpdateManyWithoutRubroNestedInput = {
    create?: XOR<ProductosCreateWithoutRubroInput, ProductosUncheckedCreateWithoutRubroInput> | ProductosCreateWithoutRubroInput[] | ProductosUncheckedCreateWithoutRubroInput[]
    connectOrCreate?: ProductosCreateOrConnectWithoutRubroInput | ProductosCreateOrConnectWithoutRubroInput[]
    upsert?: ProductosUpsertWithWhereUniqueWithoutRubroInput | ProductosUpsertWithWhereUniqueWithoutRubroInput[]
    createMany?: ProductosCreateManyRubroInputEnvelope
    set?: ProductosWhereUniqueInput | ProductosWhereUniqueInput[]
    disconnect?: ProductosWhereUniqueInput | ProductosWhereUniqueInput[]
    delete?: ProductosWhereUniqueInput | ProductosWhereUniqueInput[]
    connect?: ProductosWhereUniqueInput | ProductosWhereUniqueInput[]
    update?: ProductosUpdateWithWhereUniqueWithoutRubroInput | ProductosUpdateWithWhereUniqueWithoutRubroInput[]
    updateMany?: ProductosUpdateManyWithWhereWithoutRubroInput | ProductosUpdateManyWithWhereWithoutRubroInput[]
    deleteMany?: ProductosScalarWhereInput | ProductosScalarWhereInput[]
  }

  export type ProductosUncheckedUpdateManyWithoutRubroNestedInput = {
    create?: XOR<ProductosCreateWithoutRubroInput, ProductosUncheckedCreateWithoutRubroInput> | ProductosCreateWithoutRubroInput[] | ProductosUncheckedCreateWithoutRubroInput[]
    connectOrCreate?: ProductosCreateOrConnectWithoutRubroInput | ProductosCreateOrConnectWithoutRubroInput[]
    upsert?: ProductosUpsertWithWhereUniqueWithoutRubroInput | ProductosUpsertWithWhereUniqueWithoutRubroInput[]
    createMany?: ProductosCreateManyRubroInputEnvelope
    set?: ProductosWhereUniqueInput | ProductosWhereUniqueInput[]
    disconnect?: ProductosWhereUniqueInput | ProductosWhereUniqueInput[]
    delete?: ProductosWhereUniqueInput | ProductosWhereUniqueInput[]
    connect?: ProductosWhereUniqueInput | ProductosWhereUniqueInput[]
    update?: ProductosUpdateWithWhereUniqueWithoutRubroInput | ProductosUpdateWithWhereUniqueWithoutRubroInput[]
    updateMany?: ProductosUpdateManyWithWhereWithoutRubroInput | ProductosUpdateManyWithWhereWithoutRubroInput[]
    deleteMany?: ProductosScalarWhereInput | ProductosScalarWhereInput[]
  }

  export type ProductosCreateNestedManyWithoutMonedaInput = {
    create?: XOR<ProductosCreateWithoutMonedaInput, ProductosUncheckedCreateWithoutMonedaInput> | ProductosCreateWithoutMonedaInput[] | ProductosUncheckedCreateWithoutMonedaInput[]
    connectOrCreate?: ProductosCreateOrConnectWithoutMonedaInput | ProductosCreateOrConnectWithoutMonedaInput[]
    createMany?: ProductosCreateManyMonedaInputEnvelope
    connect?: ProductosWhereUniqueInput | ProductosWhereUniqueInput[]
  }

  export type ProductosUncheckedCreateNestedManyWithoutMonedaInput = {
    create?: XOR<ProductosCreateWithoutMonedaInput, ProductosUncheckedCreateWithoutMonedaInput> | ProductosCreateWithoutMonedaInput[] | ProductosUncheckedCreateWithoutMonedaInput[]
    connectOrCreate?: ProductosCreateOrConnectWithoutMonedaInput | ProductosCreateOrConnectWithoutMonedaInput[]
    createMany?: ProductosCreateManyMonedaInputEnvelope
    connect?: ProductosWhereUniqueInput | ProductosWhereUniqueInput[]
  }

  export type ProductosUpdateManyWithoutMonedaNestedInput = {
    create?: XOR<ProductosCreateWithoutMonedaInput, ProductosUncheckedCreateWithoutMonedaInput> | ProductosCreateWithoutMonedaInput[] | ProductosUncheckedCreateWithoutMonedaInput[]
    connectOrCreate?: ProductosCreateOrConnectWithoutMonedaInput | ProductosCreateOrConnectWithoutMonedaInput[]
    upsert?: ProductosUpsertWithWhereUniqueWithoutMonedaInput | ProductosUpsertWithWhereUniqueWithoutMonedaInput[]
    createMany?: ProductosCreateManyMonedaInputEnvelope
    set?: ProductosWhereUniqueInput | ProductosWhereUniqueInput[]
    disconnect?: ProductosWhereUniqueInput | ProductosWhereUniqueInput[]
    delete?: ProductosWhereUniqueInput | ProductosWhereUniqueInput[]
    connect?: ProductosWhereUniqueInput | ProductosWhereUniqueInput[]
    update?: ProductosUpdateWithWhereUniqueWithoutMonedaInput | ProductosUpdateWithWhereUniqueWithoutMonedaInput[]
    updateMany?: ProductosUpdateManyWithWhereWithoutMonedaInput | ProductosUpdateManyWithWhereWithoutMonedaInput[]
    deleteMany?: ProductosScalarWhereInput | ProductosScalarWhereInput[]
  }

  export type ProductosUncheckedUpdateManyWithoutMonedaNestedInput = {
    create?: XOR<ProductosCreateWithoutMonedaInput, ProductosUncheckedCreateWithoutMonedaInput> | ProductosCreateWithoutMonedaInput[] | ProductosUncheckedCreateWithoutMonedaInput[]
    connectOrCreate?: ProductosCreateOrConnectWithoutMonedaInput | ProductosCreateOrConnectWithoutMonedaInput[]
    upsert?: ProductosUpsertWithWhereUniqueWithoutMonedaInput | ProductosUpsertWithWhereUniqueWithoutMonedaInput[]
    createMany?: ProductosCreateManyMonedaInputEnvelope
    set?: ProductosWhereUniqueInput | ProductosWhereUniqueInput[]
    disconnect?: ProductosWhereUniqueInput | ProductosWhereUniqueInput[]
    delete?: ProductosWhereUniqueInput | ProductosWhereUniqueInput[]
    connect?: ProductosWhereUniqueInput | ProductosWhereUniqueInput[]
    update?: ProductosUpdateWithWhereUniqueWithoutMonedaInput | ProductosUpdateWithWhereUniqueWithoutMonedaInput[]
    updateMany?: ProductosUpdateManyWithWhereWithoutMonedaInput | ProductosUpdateManyWithWhereWithoutMonedaInput[]
    deleteMany?: ProductosScalarWhereInput | ProductosScalarWhereInput[]
  }

  export type PedidosCreateNestedManyWithoutEstadoRelInput = {
    create?: XOR<PedidosCreateWithoutEstadoRelInput, PedidosUncheckedCreateWithoutEstadoRelInput> | PedidosCreateWithoutEstadoRelInput[] | PedidosUncheckedCreateWithoutEstadoRelInput[]
    connectOrCreate?: PedidosCreateOrConnectWithoutEstadoRelInput | PedidosCreateOrConnectWithoutEstadoRelInput[]
    createMany?: PedidosCreateManyEstadoRelInputEnvelope
    connect?: PedidosWhereUniqueInput | PedidosWhereUniqueInput[]
  }

  export type PedidosUncheckedCreateNestedManyWithoutEstadoRelInput = {
    create?: XOR<PedidosCreateWithoutEstadoRelInput, PedidosUncheckedCreateWithoutEstadoRelInput> | PedidosCreateWithoutEstadoRelInput[] | PedidosUncheckedCreateWithoutEstadoRelInput[]
    connectOrCreate?: PedidosCreateOrConnectWithoutEstadoRelInput | PedidosCreateOrConnectWithoutEstadoRelInput[]
    createMany?: PedidosCreateManyEstadoRelInputEnvelope
    connect?: PedidosWhereUniqueInput | PedidosWhereUniqueInput[]
  }

  export type PedidosUpdateManyWithoutEstadoRelNestedInput = {
    create?: XOR<PedidosCreateWithoutEstadoRelInput, PedidosUncheckedCreateWithoutEstadoRelInput> | PedidosCreateWithoutEstadoRelInput[] | PedidosUncheckedCreateWithoutEstadoRelInput[]
    connectOrCreate?: PedidosCreateOrConnectWithoutEstadoRelInput | PedidosCreateOrConnectWithoutEstadoRelInput[]
    upsert?: PedidosUpsertWithWhereUniqueWithoutEstadoRelInput | PedidosUpsertWithWhereUniqueWithoutEstadoRelInput[]
    createMany?: PedidosCreateManyEstadoRelInputEnvelope
    set?: PedidosWhereUniqueInput | PedidosWhereUniqueInput[]
    disconnect?: PedidosWhereUniqueInput | PedidosWhereUniqueInput[]
    delete?: PedidosWhereUniqueInput | PedidosWhereUniqueInput[]
    connect?: PedidosWhereUniqueInput | PedidosWhereUniqueInput[]
    update?: PedidosUpdateWithWhereUniqueWithoutEstadoRelInput | PedidosUpdateWithWhereUniqueWithoutEstadoRelInput[]
    updateMany?: PedidosUpdateManyWithWhereWithoutEstadoRelInput | PedidosUpdateManyWithWhereWithoutEstadoRelInput[]
    deleteMany?: PedidosScalarWhereInput | PedidosScalarWhereInput[]
  }

  export type PedidosUncheckedUpdateManyWithoutEstadoRelNestedInput = {
    create?: XOR<PedidosCreateWithoutEstadoRelInput, PedidosUncheckedCreateWithoutEstadoRelInput> | PedidosCreateWithoutEstadoRelInput[] | PedidosUncheckedCreateWithoutEstadoRelInput[]
    connectOrCreate?: PedidosCreateOrConnectWithoutEstadoRelInput | PedidosCreateOrConnectWithoutEstadoRelInput[]
    upsert?: PedidosUpsertWithWhereUniqueWithoutEstadoRelInput | PedidosUpsertWithWhereUniqueWithoutEstadoRelInput[]
    createMany?: PedidosCreateManyEstadoRelInputEnvelope
    set?: PedidosWhereUniqueInput | PedidosWhereUniqueInput[]
    disconnect?: PedidosWhereUniqueInput | PedidosWhereUniqueInput[]
    delete?: PedidosWhereUniqueInput | PedidosWhereUniqueInput[]
    connect?: PedidosWhereUniqueInput | PedidosWhereUniqueInput[]
    update?: PedidosUpdateWithWhereUniqueWithoutEstadoRelInput | PedidosUpdateWithWhereUniqueWithoutEstadoRelInput[]
    updateMany?: PedidosUpdateManyWithWhereWithoutEstadoRelInput | PedidosUpdateManyWithWhereWithoutEstadoRelInput[]
    deleteMany?: PedidosScalarWhereInput | PedidosScalarWhereInput[]
  }

  export type CfgMarcasCreateNestedOneWithoutProductoInput = {
    create?: XOR<CfgMarcasCreateWithoutProductoInput, CfgMarcasUncheckedCreateWithoutProductoInput>
    connectOrCreate?: CfgMarcasCreateOrConnectWithoutProductoInput
    connect?: CfgMarcasWhereUniqueInput
  }

  export type CfgRubrosCreateNestedOneWithoutProductoInput = {
    create?: XOR<CfgRubrosCreateWithoutProductoInput, CfgRubrosUncheckedCreateWithoutProductoInput>
    connectOrCreate?: CfgRubrosCreateOrConnectWithoutProductoInput
    connect?: CfgRubrosWhereUniqueInput
  }

  export type CfgMonedasCreateNestedOneWithoutProductoInput = {
    create?: XOR<CfgMonedasCreateWithoutProductoInput, CfgMonedasUncheckedCreateWithoutProductoInput>
    connectOrCreate?: CfgMonedasCreateOrConnectWithoutProductoInput
    connect?: CfgMonedasWhereUniqueInput
  }

  export type ProductoFotosCreateNestedManyWithoutProductoInput = {
    create?: XOR<ProductoFotosCreateWithoutProductoInput, ProductoFotosUncheckedCreateWithoutProductoInput> | ProductoFotosCreateWithoutProductoInput[] | ProductoFotosUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: ProductoFotosCreateOrConnectWithoutProductoInput | ProductoFotosCreateOrConnectWithoutProductoInput[]
    createMany?: ProductoFotosCreateManyProductoInputEnvelope
    connect?: ProductoFotosWhereUniqueInput | ProductoFotosWhereUniqueInput[]
  }

  export type ProductoVersionesCreateNestedManyWithoutProductoInput = {
    create?: XOR<ProductoVersionesCreateWithoutProductoInput, ProductoVersionesUncheckedCreateWithoutProductoInput> | ProductoVersionesCreateWithoutProductoInput[] | ProductoVersionesUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: ProductoVersionesCreateOrConnectWithoutProductoInput | ProductoVersionesCreateOrConnectWithoutProductoInput[]
    createMany?: ProductoVersionesCreateManyProductoInputEnvelope
    connect?: ProductoVersionesWhereUniqueInput | ProductoVersionesWhereUniqueInput[]
  }

  export type ProductoEspecificacionesCreateNestedManyWithoutProductoInput = {
    create?: XOR<ProductoEspecificacionesCreateWithoutProductoInput, ProductoEspecificacionesUncheckedCreateWithoutProductoInput> | ProductoEspecificacionesCreateWithoutProductoInput[] | ProductoEspecificacionesUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: ProductoEspecificacionesCreateOrConnectWithoutProductoInput | ProductoEspecificacionesCreateOrConnectWithoutProductoInput[]
    createMany?: ProductoEspecificacionesCreateManyProductoInputEnvelope
    connect?: ProductoEspecificacionesWhereUniqueInput | ProductoEspecificacionesWhereUniqueInput[]
  }

  export type ProductoFotosUncheckedCreateNestedManyWithoutProductoInput = {
    create?: XOR<ProductoFotosCreateWithoutProductoInput, ProductoFotosUncheckedCreateWithoutProductoInput> | ProductoFotosCreateWithoutProductoInput[] | ProductoFotosUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: ProductoFotosCreateOrConnectWithoutProductoInput | ProductoFotosCreateOrConnectWithoutProductoInput[]
    createMany?: ProductoFotosCreateManyProductoInputEnvelope
    connect?: ProductoFotosWhereUniqueInput | ProductoFotosWhereUniqueInput[]
  }

  export type ProductoVersionesUncheckedCreateNestedManyWithoutProductoInput = {
    create?: XOR<ProductoVersionesCreateWithoutProductoInput, ProductoVersionesUncheckedCreateWithoutProductoInput> | ProductoVersionesCreateWithoutProductoInput[] | ProductoVersionesUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: ProductoVersionesCreateOrConnectWithoutProductoInput | ProductoVersionesCreateOrConnectWithoutProductoInput[]
    createMany?: ProductoVersionesCreateManyProductoInputEnvelope
    connect?: ProductoVersionesWhereUniqueInput | ProductoVersionesWhereUniqueInput[]
  }

  export type ProductoEspecificacionesUncheckedCreateNestedManyWithoutProductoInput = {
    create?: XOR<ProductoEspecificacionesCreateWithoutProductoInput, ProductoEspecificacionesUncheckedCreateWithoutProductoInput> | ProductoEspecificacionesCreateWithoutProductoInput[] | ProductoEspecificacionesUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: ProductoEspecificacionesCreateOrConnectWithoutProductoInput | ProductoEspecificacionesCreateOrConnectWithoutProductoInput[]
    createMany?: ProductoEspecificacionesCreateManyProductoInputEnvelope
    connect?: ProductoEspecificacionesWhereUniqueInput | ProductoEspecificacionesWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type CfgMarcasUpdateOneRequiredWithoutProductoNestedInput = {
    create?: XOR<CfgMarcasCreateWithoutProductoInput, CfgMarcasUncheckedCreateWithoutProductoInput>
    connectOrCreate?: CfgMarcasCreateOrConnectWithoutProductoInput
    upsert?: CfgMarcasUpsertWithoutProductoInput
    connect?: CfgMarcasWhereUniqueInput
    update?: XOR<XOR<CfgMarcasUpdateToOneWithWhereWithoutProductoInput, CfgMarcasUpdateWithoutProductoInput>, CfgMarcasUncheckedUpdateWithoutProductoInput>
  }

  export type CfgRubrosUpdateOneRequiredWithoutProductoNestedInput = {
    create?: XOR<CfgRubrosCreateWithoutProductoInput, CfgRubrosUncheckedCreateWithoutProductoInput>
    connectOrCreate?: CfgRubrosCreateOrConnectWithoutProductoInput
    upsert?: CfgRubrosUpsertWithoutProductoInput
    connect?: CfgRubrosWhereUniqueInput
    update?: XOR<XOR<CfgRubrosUpdateToOneWithWhereWithoutProductoInput, CfgRubrosUpdateWithoutProductoInput>, CfgRubrosUncheckedUpdateWithoutProductoInput>
  }

  export type CfgMonedasUpdateOneRequiredWithoutProductoNestedInput = {
    create?: XOR<CfgMonedasCreateWithoutProductoInput, CfgMonedasUncheckedCreateWithoutProductoInput>
    connectOrCreate?: CfgMonedasCreateOrConnectWithoutProductoInput
    upsert?: CfgMonedasUpsertWithoutProductoInput
    connect?: CfgMonedasWhereUniqueInput
    update?: XOR<XOR<CfgMonedasUpdateToOneWithWhereWithoutProductoInput, CfgMonedasUpdateWithoutProductoInput>, CfgMonedasUncheckedUpdateWithoutProductoInput>
  }

  export type ProductoFotosUpdateManyWithoutProductoNestedInput = {
    create?: XOR<ProductoFotosCreateWithoutProductoInput, ProductoFotosUncheckedCreateWithoutProductoInput> | ProductoFotosCreateWithoutProductoInput[] | ProductoFotosUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: ProductoFotosCreateOrConnectWithoutProductoInput | ProductoFotosCreateOrConnectWithoutProductoInput[]
    upsert?: ProductoFotosUpsertWithWhereUniqueWithoutProductoInput | ProductoFotosUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: ProductoFotosCreateManyProductoInputEnvelope
    set?: ProductoFotosWhereUniqueInput | ProductoFotosWhereUniqueInput[]
    disconnect?: ProductoFotosWhereUniqueInput | ProductoFotosWhereUniqueInput[]
    delete?: ProductoFotosWhereUniqueInput | ProductoFotosWhereUniqueInput[]
    connect?: ProductoFotosWhereUniqueInput | ProductoFotosWhereUniqueInput[]
    update?: ProductoFotosUpdateWithWhereUniqueWithoutProductoInput | ProductoFotosUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: ProductoFotosUpdateManyWithWhereWithoutProductoInput | ProductoFotosUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: ProductoFotosScalarWhereInput | ProductoFotosScalarWhereInput[]
  }

  export type ProductoVersionesUpdateManyWithoutProductoNestedInput = {
    create?: XOR<ProductoVersionesCreateWithoutProductoInput, ProductoVersionesUncheckedCreateWithoutProductoInput> | ProductoVersionesCreateWithoutProductoInput[] | ProductoVersionesUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: ProductoVersionesCreateOrConnectWithoutProductoInput | ProductoVersionesCreateOrConnectWithoutProductoInput[]
    upsert?: ProductoVersionesUpsertWithWhereUniqueWithoutProductoInput | ProductoVersionesUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: ProductoVersionesCreateManyProductoInputEnvelope
    set?: ProductoVersionesWhereUniqueInput | ProductoVersionesWhereUniqueInput[]
    disconnect?: ProductoVersionesWhereUniqueInput | ProductoVersionesWhereUniqueInput[]
    delete?: ProductoVersionesWhereUniqueInput | ProductoVersionesWhereUniqueInput[]
    connect?: ProductoVersionesWhereUniqueInput | ProductoVersionesWhereUniqueInput[]
    update?: ProductoVersionesUpdateWithWhereUniqueWithoutProductoInput | ProductoVersionesUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: ProductoVersionesUpdateManyWithWhereWithoutProductoInput | ProductoVersionesUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: ProductoVersionesScalarWhereInput | ProductoVersionesScalarWhereInput[]
  }

  export type ProductoEspecificacionesUpdateManyWithoutProductoNestedInput = {
    create?: XOR<ProductoEspecificacionesCreateWithoutProductoInput, ProductoEspecificacionesUncheckedCreateWithoutProductoInput> | ProductoEspecificacionesCreateWithoutProductoInput[] | ProductoEspecificacionesUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: ProductoEspecificacionesCreateOrConnectWithoutProductoInput | ProductoEspecificacionesCreateOrConnectWithoutProductoInput[]
    upsert?: ProductoEspecificacionesUpsertWithWhereUniqueWithoutProductoInput | ProductoEspecificacionesUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: ProductoEspecificacionesCreateManyProductoInputEnvelope
    set?: ProductoEspecificacionesWhereUniqueInput | ProductoEspecificacionesWhereUniqueInput[]
    disconnect?: ProductoEspecificacionesWhereUniqueInput | ProductoEspecificacionesWhereUniqueInput[]
    delete?: ProductoEspecificacionesWhereUniqueInput | ProductoEspecificacionesWhereUniqueInput[]
    connect?: ProductoEspecificacionesWhereUniqueInput | ProductoEspecificacionesWhereUniqueInput[]
    update?: ProductoEspecificacionesUpdateWithWhereUniqueWithoutProductoInput | ProductoEspecificacionesUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: ProductoEspecificacionesUpdateManyWithWhereWithoutProductoInput | ProductoEspecificacionesUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: ProductoEspecificacionesScalarWhereInput | ProductoEspecificacionesScalarWhereInput[]
  }

  export type ProductoFotosUncheckedUpdateManyWithoutProductoNestedInput = {
    create?: XOR<ProductoFotosCreateWithoutProductoInput, ProductoFotosUncheckedCreateWithoutProductoInput> | ProductoFotosCreateWithoutProductoInput[] | ProductoFotosUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: ProductoFotosCreateOrConnectWithoutProductoInput | ProductoFotosCreateOrConnectWithoutProductoInput[]
    upsert?: ProductoFotosUpsertWithWhereUniqueWithoutProductoInput | ProductoFotosUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: ProductoFotosCreateManyProductoInputEnvelope
    set?: ProductoFotosWhereUniqueInput | ProductoFotosWhereUniqueInput[]
    disconnect?: ProductoFotosWhereUniqueInput | ProductoFotosWhereUniqueInput[]
    delete?: ProductoFotosWhereUniqueInput | ProductoFotosWhereUniqueInput[]
    connect?: ProductoFotosWhereUniqueInput | ProductoFotosWhereUniqueInput[]
    update?: ProductoFotosUpdateWithWhereUniqueWithoutProductoInput | ProductoFotosUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: ProductoFotosUpdateManyWithWhereWithoutProductoInput | ProductoFotosUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: ProductoFotosScalarWhereInput | ProductoFotosScalarWhereInput[]
  }

  export type ProductoVersionesUncheckedUpdateManyWithoutProductoNestedInput = {
    create?: XOR<ProductoVersionesCreateWithoutProductoInput, ProductoVersionesUncheckedCreateWithoutProductoInput> | ProductoVersionesCreateWithoutProductoInput[] | ProductoVersionesUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: ProductoVersionesCreateOrConnectWithoutProductoInput | ProductoVersionesCreateOrConnectWithoutProductoInput[]
    upsert?: ProductoVersionesUpsertWithWhereUniqueWithoutProductoInput | ProductoVersionesUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: ProductoVersionesCreateManyProductoInputEnvelope
    set?: ProductoVersionesWhereUniqueInput | ProductoVersionesWhereUniqueInput[]
    disconnect?: ProductoVersionesWhereUniqueInput | ProductoVersionesWhereUniqueInput[]
    delete?: ProductoVersionesWhereUniqueInput | ProductoVersionesWhereUniqueInput[]
    connect?: ProductoVersionesWhereUniqueInput | ProductoVersionesWhereUniqueInput[]
    update?: ProductoVersionesUpdateWithWhereUniqueWithoutProductoInput | ProductoVersionesUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: ProductoVersionesUpdateManyWithWhereWithoutProductoInput | ProductoVersionesUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: ProductoVersionesScalarWhereInput | ProductoVersionesScalarWhereInput[]
  }

  export type ProductoEspecificacionesUncheckedUpdateManyWithoutProductoNestedInput = {
    create?: XOR<ProductoEspecificacionesCreateWithoutProductoInput, ProductoEspecificacionesUncheckedCreateWithoutProductoInput> | ProductoEspecificacionesCreateWithoutProductoInput[] | ProductoEspecificacionesUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: ProductoEspecificacionesCreateOrConnectWithoutProductoInput | ProductoEspecificacionesCreateOrConnectWithoutProductoInput[]
    upsert?: ProductoEspecificacionesUpsertWithWhereUniqueWithoutProductoInput | ProductoEspecificacionesUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: ProductoEspecificacionesCreateManyProductoInputEnvelope
    set?: ProductoEspecificacionesWhereUniqueInput | ProductoEspecificacionesWhereUniqueInput[]
    disconnect?: ProductoEspecificacionesWhereUniqueInput | ProductoEspecificacionesWhereUniqueInput[]
    delete?: ProductoEspecificacionesWhereUniqueInput | ProductoEspecificacionesWhereUniqueInput[]
    connect?: ProductoEspecificacionesWhereUniqueInput | ProductoEspecificacionesWhereUniqueInput[]
    update?: ProductoEspecificacionesUpdateWithWhereUniqueWithoutProductoInput | ProductoEspecificacionesUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: ProductoEspecificacionesUpdateManyWithWhereWithoutProductoInput | ProductoEspecificacionesUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: ProductoEspecificacionesScalarWhereInput | ProductoEspecificacionesScalarWhereInput[]
  }

  export type ProductosCreateNestedOneWithoutFotosInput = {
    create?: XOR<ProductosCreateWithoutFotosInput, ProductosUncheckedCreateWithoutFotosInput>
    connectOrCreate?: ProductosCreateOrConnectWithoutFotosInput
    connect?: ProductosWhereUniqueInput
  }

  export type ProductosUpdateOneRequiredWithoutFotosNestedInput = {
    create?: XOR<ProductosCreateWithoutFotosInput, ProductosUncheckedCreateWithoutFotosInput>
    connectOrCreate?: ProductosCreateOrConnectWithoutFotosInput
    upsert?: ProductosUpsertWithoutFotosInput
    connect?: ProductosWhereUniqueInput
    update?: XOR<XOR<ProductosUpdateToOneWithWhereWithoutFotosInput, ProductosUpdateWithoutFotosInput>, ProductosUncheckedUpdateWithoutFotosInput>
  }

  export type ProductosCreateNestedOneWithoutVersionesInput = {
    create?: XOR<ProductosCreateWithoutVersionesInput, ProductosUncheckedCreateWithoutVersionesInput>
    connectOrCreate?: ProductosCreateOrConnectWithoutVersionesInput
    connect?: ProductosWhereUniqueInput
  }

  export type ProductosUpdateOneRequiredWithoutVersionesNestedInput = {
    create?: XOR<ProductosCreateWithoutVersionesInput, ProductosUncheckedCreateWithoutVersionesInput>
    connectOrCreate?: ProductosCreateOrConnectWithoutVersionesInput
    upsert?: ProductosUpsertWithoutVersionesInput
    connect?: ProductosWhereUniqueInput
    update?: XOR<XOR<ProductosUpdateToOneWithWhereWithoutVersionesInput, ProductosUpdateWithoutVersionesInput>, ProductosUncheckedUpdateWithoutVersionesInput>
  }

  export type ProductosCreateNestedOneWithoutEspecificacionesInput = {
    create?: XOR<ProductosCreateWithoutEspecificacionesInput, ProductosUncheckedCreateWithoutEspecificacionesInput>
    connectOrCreate?: ProductosCreateOrConnectWithoutEspecificacionesInput
    connect?: ProductosWhereUniqueInput
  }

  export type ProductosUpdateOneRequiredWithoutEspecificacionesNestedInput = {
    create?: XOR<ProductosCreateWithoutEspecificacionesInput, ProductosUncheckedCreateWithoutEspecificacionesInput>
    connectOrCreate?: ProductosCreateOrConnectWithoutEspecificacionesInput
    upsert?: ProductosUpsertWithoutEspecificacionesInput
    connect?: ProductosWhereUniqueInput
    update?: XOR<XOR<ProductosUpdateToOneWithWhereWithoutEspecificacionesInput, ProductosUpdateWithoutEspecificacionesInput>, ProductosUncheckedUpdateWithoutEspecificacionesInput>
  }

  export type CfgEstadoPedidoCreateNestedOneWithoutPedidosInput = {
    create?: XOR<CfgEstadoPedidoCreateWithoutPedidosInput, CfgEstadoPedidoUncheckedCreateWithoutPedidosInput>
    connectOrCreate?: CfgEstadoPedidoCreateOrConnectWithoutPedidosInput
    connect?: CfgEstadoPedidoWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CfgEstadoPedidoUpdateOneWithoutPedidosNestedInput = {
    create?: XOR<CfgEstadoPedidoCreateWithoutPedidosInput, CfgEstadoPedidoUncheckedCreateWithoutPedidosInput>
    connectOrCreate?: CfgEstadoPedidoCreateOrConnectWithoutPedidosInput
    upsert?: CfgEstadoPedidoUpsertWithoutPedidosInput
    disconnect?: CfgEstadoPedidoWhereInput | boolean
    delete?: CfgEstadoPedidoWhereInput | boolean
    connect?: CfgEstadoPedidoWhereUniqueInput
    update?: XOR<XOR<CfgEstadoPedidoUpdateToOneWithWhereWithoutPedidosInput, CfgEstadoPedidoUpdateWithoutPedidosInput>, CfgEstadoPedidoUncheckedUpdateWithoutPedidosInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ProductosCreateWithoutMarcaInput = {
    producto: string
    descripcion?: string | null
    foto?: string | null
    precio: Decimal | DecimalJsLike | number | string
    stock?: number
    destacado?: boolean
    activo?: boolean
    visitas?: number
    rubro: CfgRubrosCreateNestedOneWithoutProductoInput
    moneda: CfgMonedasCreateNestedOneWithoutProductoInput
    fotos?: ProductoFotosCreateNestedManyWithoutProductoInput
    versiones?: ProductoVersionesCreateNestedManyWithoutProductoInput
    especificaciones?: ProductoEspecificacionesCreateNestedManyWithoutProductoInput
  }

  export type ProductosUncheckedCreateWithoutMarcaInput = {
    id?: number
    rubro_id: number
    moneda_id: number
    producto: string
    descripcion?: string | null
    foto?: string | null
    precio: Decimal | DecimalJsLike | number | string
    stock?: number
    destacado?: boolean
    activo?: boolean
    visitas?: number
    fotos?: ProductoFotosUncheckedCreateNestedManyWithoutProductoInput
    versiones?: ProductoVersionesUncheckedCreateNestedManyWithoutProductoInput
    especificaciones?: ProductoEspecificacionesUncheckedCreateNestedManyWithoutProductoInput
  }

  export type ProductosCreateOrConnectWithoutMarcaInput = {
    where: ProductosWhereUniqueInput
    create: XOR<ProductosCreateWithoutMarcaInput, ProductosUncheckedCreateWithoutMarcaInput>
  }

  export type ProductosCreateManyMarcaInputEnvelope = {
    data: ProductosCreateManyMarcaInput | ProductosCreateManyMarcaInput[]
    skipDuplicates?: boolean
  }

  export type ProductosUpsertWithWhereUniqueWithoutMarcaInput = {
    where: ProductosWhereUniqueInput
    update: XOR<ProductosUpdateWithoutMarcaInput, ProductosUncheckedUpdateWithoutMarcaInput>
    create: XOR<ProductosCreateWithoutMarcaInput, ProductosUncheckedCreateWithoutMarcaInput>
  }

  export type ProductosUpdateWithWhereUniqueWithoutMarcaInput = {
    where: ProductosWhereUniqueInput
    data: XOR<ProductosUpdateWithoutMarcaInput, ProductosUncheckedUpdateWithoutMarcaInput>
  }

  export type ProductosUpdateManyWithWhereWithoutMarcaInput = {
    where: ProductosScalarWhereInput
    data: XOR<ProductosUpdateManyMutationInput, ProductosUncheckedUpdateManyWithoutMarcaInput>
  }

  export type ProductosScalarWhereInput = {
    AND?: ProductosScalarWhereInput | ProductosScalarWhereInput[]
    OR?: ProductosScalarWhereInput[]
    NOT?: ProductosScalarWhereInput | ProductosScalarWhereInput[]
    id?: IntFilter<"Productos"> | number
    marca_id?: IntFilter<"Productos"> | number
    rubro_id?: IntFilter<"Productos"> | number
    moneda_id?: IntFilter<"Productos"> | number
    producto?: StringFilter<"Productos"> | string
    descripcion?: StringNullableFilter<"Productos"> | string | null
    foto?: StringNullableFilter<"Productos"> | string | null
    precio?: DecimalFilter<"Productos"> | Decimal | DecimalJsLike | number | string
    stock?: IntFilter<"Productos"> | number
    destacado?: BoolFilter<"Productos"> | boolean
    activo?: BoolFilter<"Productos"> | boolean
    visitas?: IntFilter<"Productos"> | number
  }

  export type ProductosCreateWithoutRubroInput = {
    producto: string
    descripcion?: string | null
    foto?: string | null
    precio: Decimal | DecimalJsLike | number | string
    stock?: number
    destacado?: boolean
    activo?: boolean
    visitas?: number
    marca: CfgMarcasCreateNestedOneWithoutProductoInput
    moneda: CfgMonedasCreateNestedOneWithoutProductoInput
    fotos?: ProductoFotosCreateNestedManyWithoutProductoInput
    versiones?: ProductoVersionesCreateNestedManyWithoutProductoInput
    especificaciones?: ProductoEspecificacionesCreateNestedManyWithoutProductoInput
  }

  export type ProductosUncheckedCreateWithoutRubroInput = {
    id?: number
    marca_id: number
    moneda_id: number
    producto: string
    descripcion?: string | null
    foto?: string | null
    precio: Decimal | DecimalJsLike | number | string
    stock?: number
    destacado?: boolean
    activo?: boolean
    visitas?: number
    fotos?: ProductoFotosUncheckedCreateNestedManyWithoutProductoInput
    versiones?: ProductoVersionesUncheckedCreateNestedManyWithoutProductoInput
    especificaciones?: ProductoEspecificacionesUncheckedCreateNestedManyWithoutProductoInput
  }

  export type ProductosCreateOrConnectWithoutRubroInput = {
    where: ProductosWhereUniqueInput
    create: XOR<ProductosCreateWithoutRubroInput, ProductosUncheckedCreateWithoutRubroInput>
  }

  export type ProductosCreateManyRubroInputEnvelope = {
    data: ProductosCreateManyRubroInput | ProductosCreateManyRubroInput[]
    skipDuplicates?: boolean
  }

  export type ProductosUpsertWithWhereUniqueWithoutRubroInput = {
    where: ProductosWhereUniqueInput
    update: XOR<ProductosUpdateWithoutRubroInput, ProductosUncheckedUpdateWithoutRubroInput>
    create: XOR<ProductosCreateWithoutRubroInput, ProductosUncheckedCreateWithoutRubroInput>
  }

  export type ProductosUpdateWithWhereUniqueWithoutRubroInput = {
    where: ProductosWhereUniqueInput
    data: XOR<ProductosUpdateWithoutRubroInput, ProductosUncheckedUpdateWithoutRubroInput>
  }

  export type ProductosUpdateManyWithWhereWithoutRubroInput = {
    where: ProductosScalarWhereInput
    data: XOR<ProductosUpdateManyMutationInput, ProductosUncheckedUpdateManyWithoutRubroInput>
  }

  export type ProductosCreateWithoutMonedaInput = {
    producto: string
    descripcion?: string | null
    foto?: string | null
    precio: Decimal | DecimalJsLike | number | string
    stock?: number
    destacado?: boolean
    activo?: boolean
    visitas?: number
    marca: CfgMarcasCreateNestedOneWithoutProductoInput
    rubro: CfgRubrosCreateNestedOneWithoutProductoInput
    fotos?: ProductoFotosCreateNestedManyWithoutProductoInput
    versiones?: ProductoVersionesCreateNestedManyWithoutProductoInput
    especificaciones?: ProductoEspecificacionesCreateNestedManyWithoutProductoInput
  }

  export type ProductosUncheckedCreateWithoutMonedaInput = {
    id?: number
    marca_id: number
    rubro_id: number
    producto: string
    descripcion?: string | null
    foto?: string | null
    precio: Decimal | DecimalJsLike | number | string
    stock?: number
    destacado?: boolean
    activo?: boolean
    visitas?: number
    fotos?: ProductoFotosUncheckedCreateNestedManyWithoutProductoInput
    versiones?: ProductoVersionesUncheckedCreateNestedManyWithoutProductoInput
    especificaciones?: ProductoEspecificacionesUncheckedCreateNestedManyWithoutProductoInput
  }

  export type ProductosCreateOrConnectWithoutMonedaInput = {
    where: ProductosWhereUniqueInput
    create: XOR<ProductosCreateWithoutMonedaInput, ProductosUncheckedCreateWithoutMonedaInput>
  }

  export type ProductosCreateManyMonedaInputEnvelope = {
    data: ProductosCreateManyMonedaInput | ProductosCreateManyMonedaInput[]
    skipDuplicates?: boolean
  }

  export type ProductosUpsertWithWhereUniqueWithoutMonedaInput = {
    where: ProductosWhereUniqueInput
    update: XOR<ProductosUpdateWithoutMonedaInput, ProductosUncheckedUpdateWithoutMonedaInput>
    create: XOR<ProductosCreateWithoutMonedaInput, ProductosUncheckedCreateWithoutMonedaInput>
  }

  export type ProductosUpdateWithWhereUniqueWithoutMonedaInput = {
    where: ProductosWhereUniqueInput
    data: XOR<ProductosUpdateWithoutMonedaInput, ProductosUncheckedUpdateWithoutMonedaInput>
  }

  export type ProductosUpdateManyWithWhereWithoutMonedaInput = {
    where: ProductosScalarWhereInput
    data: XOR<ProductosUpdateManyMutationInput, ProductosUncheckedUpdateManyWithoutMonedaInput>
  }

  export type PedidosCreateWithoutEstadoRelInput = {
    datos: JsonNullValueInput | InputJsonValue
    total: Decimal | DecimalJsLike | number | string
    metodo_pago: string
    comprador_nombre: string
    comprador_email: string
    comprador_telefono?: string | null
    direccion_envio?: string | null
    mp_payment_id?: string | null
    transferencia_ref?: string | null
    tarjeta_last4?: string | null
    tarjeta_payment_method?: string | null
    mp_error_code?: string | null
    mp_error_message?: string | null
    mp_response?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PedidosUncheckedCreateWithoutEstadoRelInput = {
    id?: number
    datos: JsonNullValueInput | InputJsonValue
    total: Decimal | DecimalJsLike | number | string
    metodo_pago: string
    comprador_nombre: string
    comprador_email: string
    comprador_telefono?: string | null
    direccion_envio?: string | null
    mp_payment_id?: string | null
    transferencia_ref?: string | null
    tarjeta_last4?: string | null
    tarjeta_payment_method?: string | null
    mp_error_code?: string | null
    mp_error_message?: string | null
    mp_response?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PedidosCreateOrConnectWithoutEstadoRelInput = {
    where: PedidosWhereUniqueInput
    create: XOR<PedidosCreateWithoutEstadoRelInput, PedidosUncheckedCreateWithoutEstadoRelInput>
  }

  export type PedidosCreateManyEstadoRelInputEnvelope = {
    data: PedidosCreateManyEstadoRelInput | PedidosCreateManyEstadoRelInput[]
    skipDuplicates?: boolean
  }

  export type PedidosUpsertWithWhereUniqueWithoutEstadoRelInput = {
    where: PedidosWhereUniqueInput
    update: XOR<PedidosUpdateWithoutEstadoRelInput, PedidosUncheckedUpdateWithoutEstadoRelInput>
    create: XOR<PedidosCreateWithoutEstadoRelInput, PedidosUncheckedCreateWithoutEstadoRelInput>
  }

  export type PedidosUpdateWithWhereUniqueWithoutEstadoRelInput = {
    where: PedidosWhereUniqueInput
    data: XOR<PedidosUpdateWithoutEstadoRelInput, PedidosUncheckedUpdateWithoutEstadoRelInput>
  }

  export type PedidosUpdateManyWithWhereWithoutEstadoRelInput = {
    where: PedidosScalarWhereInput
    data: XOR<PedidosUpdateManyMutationInput, PedidosUncheckedUpdateManyWithoutEstadoRelInput>
  }

  export type PedidosScalarWhereInput = {
    AND?: PedidosScalarWhereInput | PedidosScalarWhereInput[]
    OR?: PedidosScalarWhereInput[]
    NOT?: PedidosScalarWhereInput | PedidosScalarWhereInput[]
    id?: IntFilter<"Pedidos"> | number
    datos?: JsonFilter<"Pedidos">
    total?: DecimalFilter<"Pedidos"> | Decimal | DecimalJsLike | number | string
    estado?: StringFilter<"Pedidos"> | string
    metodo_pago?: StringFilter<"Pedidos"> | string
    comprador_nombre?: StringFilter<"Pedidos"> | string
    comprador_email?: StringFilter<"Pedidos"> | string
    comprador_telefono?: StringNullableFilter<"Pedidos"> | string | null
    direccion_envio?: StringNullableFilter<"Pedidos"> | string | null
    mp_payment_id?: StringNullableFilter<"Pedidos"> | string | null
    transferencia_ref?: StringNullableFilter<"Pedidos"> | string | null
    tarjeta_last4?: StringNullableFilter<"Pedidos"> | string | null
    tarjeta_payment_method?: StringNullableFilter<"Pedidos"> | string | null
    mp_error_code?: StringNullableFilter<"Pedidos"> | string | null
    mp_error_message?: StringNullableFilter<"Pedidos"> | string | null
    mp_response?: JsonNullableFilter<"Pedidos">
    createdAt?: DateTimeFilter<"Pedidos"> | Date | string
    updatedAt?: DateTimeFilter<"Pedidos"> | Date | string
  }

  export type CfgMarcasCreateWithoutProductoInput = {
    marca: string
    keywords?: string | null
    foto?: string | null
    activo?: boolean
  }

  export type CfgMarcasUncheckedCreateWithoutProductoInput = {
    id?: number
    marca: string
    keywords?: string | null
    foto?: string | null
    activo?: boolean
  }

  export type CfgMarcasCreateOrConnectWithoutProductoInput = {
    where: CfgMarcasWhereUniqueInput
    create: XOR<CfgMarcasCreateWithoutProductoInput, CfgMarcasUncheckedCreateWithoutProductoInput>
  }

  export type CfgRubrosCreateWithoutProductoInput = {
    rubro: string
    condiciones?: string | null
    keywords?: string | null
    foto?: string | null
    activo?: boolean
  }

  export type CfgRubrosUncheckedCreateWithoutProductoInput = {
    id?: number
    rubro: string
    condiciones?: string | null
    keywords?: string | null
    foto?: string | null
    activo?: boolean
  }

  export type CfgRubrosCreateOrConnectWithoutProductoInput = {
    where: CfgRubrosWhereUniqueInput
    create: XOR<CfgRubrosCreateWithoutProductoInput, CfgRubrosUncheckedCreateWithoutProductoInput>
  }

  export type CfgMonedasCreateWithoutProductoInput = {
    moneda: string
    moneda_des: string
    activo?: boolean
  }

  export type CfgMonedasUncheckedCreateWithoutProductoInput = {
    id?: number
    moneda: string
    moneda_des: string
    activo?: boolean
  }

  export type CfgMonedasCreateOrConnectWithoutProductoInput = {
    where: CfgMonedasWhereUniqueInput
    create: XOR<CfgMonedasCreateWithoutProductoInput, CfgMonedasUncheckedCreateWithoutProductoInput>
  }

  export type ProductoFotosCreateWithoutProductoInput = {
    epigrafe: string
    foto?: string | null
    orden?: number
    activo?: boolean
  }

  export type ProductoFotosUncheckedCreateWithoutProductoInput = {
    id?: number
    epigrafe: string
    foto?: string | null
    orden?: number
    activo?: boolean
  }

  export type ProductoFotosCreateOrConnectWithoutProductoInput = {
    where: ProductoFotosWhereUniqueInput
    create: XOR<ProductoFotosCreateWithoutProductoInput, ProductoFotosUncheckedCreateWithoutProductoInput>
  }

  export type ProductoFotosCreateManyProductoInputEnvelope = {
    data: ProductoFotosCreateManyProductoInput | ProductoFotosCreateManyProductoInput[]
    skipDuplicates?: boolean
  }

  export type ProductoVersionesCreateWithoutProductoInput = {
    version: string
    detalle?: string | null
    orden?: number
    activo?: boolean
  }

  export type ProductoVersionesUncheckedCreateWithoutProductoInput = {
    id?: number
    version: string
    detalle?: string | null
    orden?: number
    activo?: boolean
  }

  export type ProductoVersionesCreateOrConnectWithoutProductoInput = {
    where: ProductoVersionesWhereUniqueInput
    create: XOR<ProductoVersionesCreateWithoutProductoInput, ProductoVersionesUncheckedCreateWithoutProductoInput>
  }

  export type ProductoVersionesCreateManyProductoInputEnvelope = {
    data: ProductoVersionesCreateManyProductoInput | ProductoVersionesCreateManyProductoInput[]
    skipDuplicates?: boolean
  }

  export type ProductoEspecificacionesCreateWithoutProductoInput = {
    categoria: string
    especificaciones: string
    orden?: number
    activo?: boolean
  }

  export type ProductoEspecificacionesUncheckedCreateWithoutProductoInput = {
    id?: number
    categoria: string
    especificaciones: string
    orden?: number
    activo?: boolean
  }

  export type ProductoEspecificacionesCreateOrConnectWithoutProductoInput = {
    where: ProductoEspecificacionesWhereUniqueInput
    create: XOR<ProductoEspecificacionesCreateWithoutProductoInput, ProductoEspecificacionesUncheckedCreateWithoutProductoInput>
  }

  export type ProductoEspecificacionesCreateManyProductoInputEnvelope = {
    data: ProductoEspecificacionesCreateManyProductoInput | ProductoEspecificacionesCreateManyProductoInput[]
    skipDuplicates?: boolean
  }

  export type CfgMarcasUpsertWithoutProductoInput = {
    update: XOR<CfgMarcasUpdateWithoutProductoInput, CfgMarcasUncheckedUpdateWithoutProductoInput>
    create: XOR<CfgMarcasCreateWithoutProductoInput, CfgMarcasUncheckedCreateWithoutProductoInput>
    where?: CfgMarcasWhereInput
  }

  export type CfgMarcasUpdateToOneWithWhereWithoutProductoInput = {
    where?: CfgMarcasWhereInput
    data: XOR<CfgMarcasUpdateWithoutProductoInput, CfgMarcasUncheckedUpdateWithoutProductoInput>
  }

  export type CfgMarcasUpdateWithoutProductoInput = {
    marca?: StringFieldUpdateOperationsInput | string
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CfgMarcasUncheckedUpdateWithoutProductoInput = {
    id?: IntFieldUpdateOperationsInput | number
    marca?: StringFieldUpdateOperationsInput | string
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CfgRubrosUpsertWithoutProductoInput = {
    update: XOR<CfgRubrosUpdateWithoutProductoInput, CfgRubrosUncheckedUpdateWithoutProductoInput>
    create: XOR<CfgRubrosCreateWithoutProductoInput, CfgRubrosUncheckedCreateWithoutProductoInput>
    where?: CfgRubrosWhereInput
  }

  export type CfgRubrosUpdateToOneWithWhereWithoutProductoInput = {
    where?: CfgRubrosWhereInput
    data: XOR<CfgRubrosUpdateWithoutProductoInput, CfgRubrosUncheckedUpdateWithoutProductoInput>
  }

  export type CfgRubrosUpdateWithoutProductoInput = {
    rubro?: StringFieldUpdateOperationsInput | string
    condiciones?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CfgRubrosUncheckedUpdateWithoutProductoInput = {
    id?: IntFieldUpdateOperationsInput | number
    rubro?: StringFieldUpdateOperationsInput | string
    condiciones?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CfgMonedasUpsertWithoutProductoInput = {
    update: XOR<CfgMonedasUpdateWithoutProductoInput, CfgMonedasUncheckedUpdateWithoutProductoInput>
    create: XOR<CfgMonedasCreateWithoutProductoInput, CfgMonedasUncheckedCreateWithoutProductoInput>
    where?: CfgMonedasWhereInput
  }

  export type CfgMonedasUpdateToOneWithWhereWithoutProductoInput = {
    where?: CfgMonedasWhereInput
    data: XOR<CfgMonedasUpdateWithoutProductoInput, CfgMonedasUncheckedUpdateWithoutProductoInput>
  }

  export type CfgMonedasUpdateWithoutProductoInput = {
    moneda?: StringFieldUpdateOperationsInput | string
    moneda_des?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CfgMonedasUncheckedUpdateWithoutProductoInput = {
    id?: IntFieldUpdateOperationsInput | number
    moneda?: StringFieldUpdateOperationsInput | string
    moneda_des?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductoFotosUpsertWithWhereUniqueWithoutProductoInput = {
    where: ProductoFotosWhereUniqueInput
    update: XOR<ProductoFotosUpdateWithoutProductoInput, ProductoFotosUncheckedUpdateWithoutProductoInput>
    create: XOR<ProductoFotosCreateWithoutProductoInput, ProductoFotosUncheckedCreateWithoutProductoInput>
  }

  export type ProductoFotosUpdateWithWhereUniqueWithoutProductoInput = {
    where: ProductoFotosWhereUniqueInput
    data: XOR<ProductoFotosUpdateWithoutProductoInput, ProductoFotosUncheckedUpdateWithoutProductoInput>
  }

  export type ProductoFotosUpdateManyWithWhereWithoutProductoInput = {
    where: ProductoFotosScalarWhereInput
    data: XOR<ProductoFotosUpdateManyMutationInput, ProductoFotosUncheckedUpdateManyWithoutProductoInput>
  }

  export type ProductoFotosScalarWhereInput = {
    AND?: ProductoFotosScalarWhereInput | ProductoFotosScalarWhereInput[]
    OR?: ProductoFotosScalarWhereInput[]
    NOT?: ProductoFotosScalarWhereInput | ProductoFotosScalarWhereInput[]
    id?: IntFilter<"ProductoFotos"> | number
    producto_id?: IntFilter<"ProductoFotos"> | number
    epigrafe?: StringFilter<"ProductoFotos"> | string
    foto?: StringNullableFilter<"ProductoFotos"> | string | null
    orden?: IntFilter<"ProductoFotos"> | number
    activo?: BoolFilter<"ProductoFotos"> | boolean
  }

  export type ProductoVersionesUpsertWithWhereUniqueWithoutProductoInput = {
    where: ProductoVersionesWhereUniqueInput
    update: XOR<ProductoVersionesUpdateWithoutProductoInput, ProductoVersionesUncheckedUpdateWithoutProductoInput>
    create: XOR<ProductoVersionesCreateWithoutProductoInput, ProductoVersionesUncheckedCreateWithoutProductoInput>
  }

  export type ProductoVersionesUpdateWithWhereUniqueWithoutProductoInput = {
    where: ProductoVersionesWhereUniqueInput
    data: XOR<ProductoVersionesUpdateWithoutProductoInput, ProductoVersionesUncheckedUpdateWithoutProductoInput>
  }

  export type ProductoVersionesUpdateManyWithWhereWithoutProductoInput = {
    where: ProductoVersionesScalarWhereInput
    data: XOR<ProductoVersionesUpdateManyMutationInput, ProductoVersionesUncheckedUpdateManyWithoutProductoInput>
  }

  export type ProductoVersionesScalarWhereInput = {
    AND?: ProductoVersionesScalarWhereInput | ProductoVersionesScalarWhereInput[]
    OR?: ProductoVersionesScalarWhereInput[]
    NOT?: ProductoVersionesScalarWhereInput | ProductoVersionesScalarWhereInput[]
    id?: IntFilter<"ProductoVersiones"> | number
    producto_id?: IntFilter<"ProductoVersiones"> | number
    version?: StringFilter<"ProductoVersiones"> | string
    detalle?: StringNullableFilter<"ProductoVersiones"> | string | null
    orden?: IntFilter<"ProductoVersiones"> | number
    activo?: BoolFilter<"ProductoVersiones"> | boolean
  }

  export type ProductoEspecificacionesUpsertWithWhereUniqueWithoutProductoInput = {
    where: ProductoEspecificacionesWhereUniqueInput
    update: XOR<ProductoEspecificacionesUpdateWithoutProductoInput, ProductoEspecificacionesUncheckedUpdateWithoutProductoInput>
    create: XOR<ProductoEspecificacionesCreateWithoutProductoInput, ProductoEspecificacionesUncheckedCreateWithoutProductoInput>
  }

  export type ProductoEspecificacionesUpdateWithWhereUniqueWithoutProductoInput = {
    where: ProductoEspecificacionesWhereUniqueInput
    data: XOR<ProductoEspecificacionesUpdateWithoutProductoInput, ProductoEspecificacionesUncheckedUpdateWithoutProductoInput>
  }

  export type ProductoEspecificacionesUpdateManyWithWhereWithoutProductoInput = {
    where: ProductoEspecificacionesScalarWhereInput
    data: XOR<ProductoEspecificacionesUpdateManyMutationInput, ProductoEspecificacionesUncheckedUpdateManyWithoutProductoInput>
  }

  export type ProductoEspecificacionesScalarWhereInput = {
    AND?: ProductoEspecificacionesScalarWhereInput | ProductoEspecificacionesScalarWhereInput[]
    OR?: ProductoEspecificacionesScalarWhereInput[]
    NOT?: ProductoEspecificacionesScalarWhereInput | ProductoEspecificacionesScalarWhereInput[]
    id?: IntFilter<"ProductoEspecificaciones"> | number
    producto_id?: IntFilter<"ProductoEspecificaciones"> | number
    categoria?: StringFilter<"ProductoEspecificaciones"> | string
    especificaciones?: StringFilter<"ProductoEspecificaciones"> | string
    orden?: IntFilter<"ProductoEspecificaciones"> | number
    activo?: BoolFilter<"ProductoEspecificaciones"> | boolean
  }

  export type ProductosCreateWithoutFotosInput = {
    producto: string
    descripcion?: string | null
    foto?: string | null
    precio: Decimal | DecimalJsLike | number | string
    stock?: number
    destacado?: boolean
    activo?: boolean
    visitas?: number
    marca: CfgMarcasCreateNestedOneWithoutProductoInput
    rubro: CfgRubrosCreateNestedOneWithoutProductoInput
    moneda: CfgMonedasCreateNestedOneWithoutProductoInput
    versiones?: ProductoVersionesCreateNestedManyWithoutProductoInput
    especificaciones?: ProductoEspecificacionesCreateNestedManyWithoutProductoInput
  }

  export type ProductosUncheckedCreateWithoutFotosInput = {
    id?: number
    marca_id: number
    rubro_id: number
    moneda_id: number
    producto: string
    descripcion?: string | null
    foto?: string | null
    precio: Decimal | DecimalJsLike | number | string
    stock?: number
    destacado?: boolean
    activo?: boolean
    visitas?: number
    versiones?: ProductoVersionesUncheckedCreateNestedManyWithoutProductoInput
    especificaciones?: ProductoEspecificacionesUncheckedCreateNestedManyWithoutProductoInput
  }

  export type ProductosCreateOrConnectWithoutFotosInput = {
    where: ProductosWhereUniqueInput
    create: XOR<ProductosCreateWithoutFotosInput, ProductosUncheckedCreateWithoutFotosInput>
  }

  export type ProductosUpsertWithoutFotosInput = {
    update: XOR<ProductosUpdateWithoutFotosInput, ProductosUncheckedUpdateWithoutFotosInput>
    create: XOR<ProductosCreateWithoutFotosInput, ProductosUncheckedCreateWithoutFotosInput>
    where?: ProductosWhereInput
  }

  export type ProductosUpdateToOneWithWhereWithoutFotosInput = {
    where?: ProductosWhereInput
    data: XOR<ProductosUpdateWithoutFotosInput, ProductosUncheckedUpdateWithoutFotosInput>
  }

  export type ProductosUpdateWithoutFotosInput = {
    producto?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    destacado?: BoolFieldUpdateOperationsInput | boolean
    activo?: BoolFieldUpdateOperationsInput | boolean
    visitas?: IntFieldUpdateOperationsInput | number
    marca?: CfgMarcasUpdateOneRequiredWithoutProductoNestedInput
    rubro?: CfgRubrosUpdateOneRequiredWithoutProductoNestedInput
    moneda?: CfgMonedasUpdateOneRequiredWithoutProductoNestedInput
    versiones?: ProductoVersionesUpdateManyWithoutProductoNestedInput
    especificaciones?: ProductoEspecificacionesUpdateManyWithoutProductoNestedInput
  }

  export type ProductosUncheckedUpdateWithoutFotosInput = {
    id?: IntFieldUpdateOperationsInput | number
    marca_id?: IntFieldUpdateOperationsInput | number
    rubro_id?: IntFieldUpdateOperationsInput | number
    moneda_id?: IntFieldUpdateOperationsInput | number
    producto?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    destacado?: BoolFieldUpdateOperationsInput | boolean
    activo?: BoolFieldUpdateOperationsInput | boolean
    visitas?: IntFieldUpdateOperationsInput | number
    versiones?: ProductoVersionesUncheckedUpdateManyWithoutProductoNestedInput
    especificaciones?: ProductoEspecificacionesUncheckedUpdateManyWithoutProductoNestedInput
  }

  export type ProductosCreateWithoutVersionesInput = {
    producto: string
    descripcion?: string | null
    foto?: string | null
    precio: Decimal | DecimalJsLike | number | string
    stock?: number
    destacado?: boolean
    activo?: boolean
    visitas?: number
    marca: CfgMarcasCreateNestedOneWithoutProductoInput
    rubro: CfgRubrosCreateNestedOneWithoutProductoInput
    moneda: CfgMonedasCreateNestedOneWithoutProductoInput
    fotos?: ProductoFotosCreateNestedManyWithoutProductoInput
    especificaciones?: ProductoEspecificacionesCreateNestedManyWithoutProductoInput
  }

  export type ProductosUncheckedCreateWithoutVersionesInput = {
    id?: number
    marca_id: number
    rubro_id: number
    moneda_id: number
    producto: string
    descripcion?: string | null
    foto?: string | null
    precio: Decimal | DecimalJsLike | number | string
    stock?: number
    destacado?: boolean
    activo?: boolean
    visitas?: number
    fotos?: ProductoFotosUncheckedCreateNestedManyWithoutProductoInput
    especificaciones?: ProductoEspecificacionesUncheckedCreateNestedManyWithoutProductoInput
  }

  export type ProductosCreateOrConnectWithoutVersionesInput = {
    where: ProductosWhereUniqueInput
    create: XOR<ProductosCreateWithoutVersionesInput, ProductosUncheckedCreateWithoutVersionesInput>
  }

  export type ProductosUpsertWithoutVersionesInput = {
    update: XOR<ProductosUpdateWithoutVersionesInput, ProductosUncheckedUpdateWithoutVersionesInput>
    create: XOR<ProductosCreateWithoutVersionesInput, ProductosUncheckedCreateWithoutVersionesInput>
    where?: ProductosWhereInput
  }

  export type ProductosUpdateToOneWithWhereWithoutVersionesInput = {
    where?: ProductosWhereInput
    data: XOR<ProductosUpdateWithoutVersionesInput, ProductosUncheckedUpdateWithoutVersionesInput>
  }

  export type ProductosUpdateWithoutVersionesInput = {
    producto?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    destacado?: BoolFieldUpdateOperationsInput | boolean
    activo?: BoolFieldUpdateOperationsInput | boolean
    visitas?: IntFieldUpdateOperationsInput | number
    marca?: CfgMarcasUpdateOneRequiredWithoutProductoNestedInput
    rubro?: CfgRubrosUpdateOneRequiredWithoutProductoNestedInput
    moneda?: CfgMonedasUpdateOneRequiredWithoutProductoNestedInput
    fotos?: ProductoFotosUpdateManyWithoutProductoNestedInput
    especificaciones?: ProductoEspecificacionesUpdateManyWithoutProductoNestedInput
  }

  export type ProductosUncheckedUpdateWithoutVersionesInput = {
    id?: IntFieldUpdateOperationsInput | number
    marca_id?: IntFieldUpdateOperationsInput | number
    rubro_id?: IntFieldUpdateOperationsInput | number
    moneda_id?: IntFieldUpdateOperationsInput | number
    producto?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    destacado?: BoolFieldUpdateOperationsInput | boolean
    activo?: BoolFieldUpdateOperationsInput | boolean
    visitas?: IntFieldUpdateOperationsInput | number
    fotos?: ProductoFotosUncheckedUpdateManyWithoutProductoNestedInput
    especificaciones?: ProductoEspecificacionesUncheckedUpdateManyWithoutProductoNestedInput
  }

  export type ProductosCreateWithoutEspecificacionesInput = {
    producto: string
    descripcion?: string | null
    foto?: string | null
    precio: Decimal | DecimalJsLike | number | string
    stock?: number
    destacado?: boolean
    activo?: boolean
    visitas?: number
    marca: CfgMarcasCreateNestedOneWithoutProductoInput
    rubro: CfgRubrosCreateNestedOneWithoutProductoInput
    moneda: CfgMonedasCreateNestedOneWithoutProductoInput
    fotos?: ProductoFotosCreateNestedManyWithoutProductoInput
    versiones?: ProductoVersionesCreateNestedManyWithoutProductoInput
  }

  export type ProductosUncheckedCreateWithoutEspecificacionesInput = {
    id?: number
    marca_id: number
    rubro_id: number
    moneda_id: number
    producto: string
    descripcion?: string | null
    foto?: string | null
    precio: Decimal | DecimalJsLike | number | string
    stock?: number
    destacado?: boolean
    activo?: boolean
    visitas?: number
    fotos?: ProductoFotosUncheckedCreateNestedManyWithoutProductoInput
    versiones?: ProductoVersionesUncheckedCreateNestedManyWithoutProductoInput
  }

  export type ProductosCreateOrConnectWithoutEspecificacionesInput = {
    where: ProductosWhereUniqueInput
    create: XOR<ProductosCreateWithoutEspecificacionesInput, ProductosUncheckedCreateWithoutEspecificacionesInput>
  }

  export type ProductosUpsertWithoutEspecificacionesInput = {
    update: XOR<ProductosUpdateWithoutEspecificacionesInput, ProductosUncheckedUpdateWithoutEspecificacionesInput>
    create: XOR<ProductosCreateWithoutEspecificacionesInput, ProductosUncheckedCreateWithoutEspecificacionesInput>
    where?: ProductosWhereInput
  }

  export type ProductosUpdateToOneWithWhereWithoutEspecificacionesInput = {
    where?: ProductosWhereInput
    data: XOR<ProductosUpdateWithoutEspecificacionesInput, ProductosUncheckedUpdateWithoutEspecificacionesInput>
  }

  export type ProductosUpdateWithoutEspecificacionesInput = {
    producto?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    destacado?: BoolFieldUpdateOperationsInput | boolean
    activo?: BoolFieldUpdateOperationsInput | boolean
    visitas?: IntFieldUpdateOperationsInput | number
    marca?: CfgMarcasUpdateOneRequiredWithoutProductoNestedInput
    rubro?: CfgRubrosUpdateOneRequiredWithoutProductoNestedInput
    moneda?: CfgMonedasUpdateOneRequiredWithoutProductoNestedInput
    fotos?: ProductoFotosUpdateManyWithoutProductoNestedInput
    versiones?: ProductoVersionesUpdateManyWithoutProductoNestedInput
  }

  export type ProductosUncheckedUpdateWithoutEspecificacionesInput = {
    id?: IntFieldUpdateOperationsInput | number
    marca_id?: IntFieldUpdateOperationsInput | number
    rubro_id?: IntFieldUpdateOperationsInput | number
    moneda_id?: IntFieldUpdateOperationsInput | number
    producto?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    destacado?: BoolFieldUpdateOperationsInput | boolean
    activo?: BoolFieldUpdateOperationsInput | boolean
    visitas?: IntFieldUpdateOperationsInput | number
    fotos?: ProductoFotosUncheckedUpdateManyWithoutProductoNestedInput
    versiones?: ProductoVersionesUncheckedUpdateManyWithoutProductoNestedInput
  }

  export type CfgEstadoPedidoCreateWithoutPedidosInput = {
    id: string
    descripcion: string
    color?: string | null
    orden?: number
    es_final?: boolean
    es_cancel?: boolean
    activo?: boolean
  }

  export type CfgEstadoPedidoUncheckedCreateWithoutPedidosInput = {
    id: string
    descripcion: string
    color?: string | null
    orden?: number
    es_final?: boolean
    es_cancel?: boolean
    activo?: boolean
  }

  export type CfgEstadoPedidoCreateOrConnectWithoutPedidosInput = {
    where: CfgEstadoPedidoWhereUniqueInput
    create: XOR<CfgEstadoPedidoCreateWithoutPedidosInput, CfgEstadoPedidoUncheckedCreateWithoutPedidosInput>
  }

  export type CfgEstadoPedidoUpsertWithoutPedidosInput = {
    update: XOR<CfgEstadoPedidoUpdateWithoutPedidosInput, CfgEstadoPedidoUncheckedUpdateWithoutPedidosInput>
    create: XOR<CfgEstadoPedidoCreateWithoutPedidosInput, CfgEstadoPedidoUncheckedCreateWithoutPedidosInput>
    where?: CfgEstadoPedidoWhereInput
  }

  export type CfgEstadoPedidoUpdateToOneWithWhereWithoutPedidosInput = {
    where?: CfgEstadoPedidoWhereInput
    data: XOR<CfgEstadoPedidoUpdateWithoutPedidosInput, CfgEstadoPedidoUncheckedUpdateWithoutPedidosInput>
  }

  export type CfgEstadoPedidoUpdateWithoutPedidosInput = {
    id?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    orden?: IntFieldUpdateOperationsInput | number
    es_final?: BoolFieldUpdateOperationsInput | boolean
    es_cancel?: BoolFieldUpdateOperationsInput | boolean
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CfgEstadoPedidoUncheckedUpdateWithoutPedidosInput = {
    id?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    orden?: IntFieldUpdateOperationsInput | number
    es_final?: BoolFieldUpdateOperationsInput | boolean
    es_cancel?: BoolFieldUpdateOperationsInput | boolean
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductosCreateManyMarcaInput = {
    id?: number
    rubro_id: number
    moneda_id: number
    producto: string
    descripcion?: string | null
    foto?: string | null
    precio: Decimal | DecimalJsLike | number | string
    stock?: number
    destacado?: boolean
    activo?: boolean
    visitas?: number
  }

  export type ProductosUpdateWithoutMarcaInput = {
    producto?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    destacado?: BoolFieldUpdateOperationsInput | boolean
    activo?: BoolFieldUpdateOperationsInput | boolean
    visitas?: IntFieldUpdateOperationsInput | number
    rubro?: CfgRubrosUpdateOneRequiredWithoutProductoNestedInput
    moneda?: CfgMonedasUpdateOneRequiredWithoutProductoNestedInput
    fotos?: ProductoFotosUpdateManyWithoutProductoNestedInput
    versiones?: ProductoVersionesUpdateManyWithoutProductoNestedInput
    especificaciones?: ProductoEspecificacionesUpdateManyWithoutProductoNestedInput
  }

  export type ProductosUncheckedUpdateWithoutMarcaInput = {
    id?: IntFieldUpdateOperationsInput | number
    rubro_id?: IntFieldUpdateOperationsInput | number
    moneda_id?: IntFieldUpdateOperationsInput | number
    producto?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    destacado?: BoolFieldUpdateOperationsInput | boolean
    activo?: BoolFieldUpdateOperationsInput | boolean
    visitas?: IntFieldUpdateOperationsInput | number
    fotos?: ProductoFotosUncheckedUpdateManyWithoutProductoNestedInput
    versiones?: ProductoVersionesUncheckedUpdateManyWithoutProductoNestedInput
    especificaciones?: ProductoEspecificacionesUncheckedUpdateManyWithoutProductoNestedInput
  }

  export type ProductosUncheckedUpdateManyWithoutMarcaInput = {
    id?: IntFieldUpdateOperationsInput | number
    rubro_id?: IntFieldUpdateOperationsInput | number
    moneda_id?: IntFieldUpdateOperationsInput | number
    producto?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    destacado?: BoolFieldUpdateOperationsInput | boolean
    activo?: BoolFieldUpdateOperationsInput | boolean
    visitas?: IntFieldUpdateOperationsInput | number
  }

  export type ProductosCreateManyRubroInput = {
    id?: number
    marca_id: number
    moneda_id: number
    producto: string
    descripcion?: string | null
    foto?: string | null
    precio: Decimal | DecimalJsLike | number | string
    stock?: number
    destacado?: boolean
    activo?: boolean
    visitas?: number
  }

  export type ProductosUpdateWithoutRubroInput = {
    producto?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    destacado?: BoolFieldUpdateOperationsInput | boolean
    activo?: BoolFieldUpdateOperationsInput | boolean
    visitas?: IntFieldUpdateOperationsInput | number
    marca?: CfgMarcasUpdateOneRequiredWithoutProductoNestedInput
    moneda?: CfgMonedasUpdateOneRequiredWithoutProductoNestedInput
    fotos?: ProductoFotosUpdateManyWithoutProductoNestedInput
    versiones?: ProductoVersionesUpdateManyWithoutProductoNestedInput
    especificaciones?: ProductoEspecificacionesUpdateManyWithoutProductoNestedInput
  }

  export type ProductosUncheckedUpdateWithoutRubroInput = {
    id?: IntFieldUpdateOperationsInput | number
    marca_id?: IntFieldUpdateOperationsInput | number
    moneda_id?: IntFieldUpdateOperationsInput | number
    producto?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    destacado?: BoolFieldUpdateOperationsInput | boolean
    activo?: BoolFieldUpdateOperationsInput | boolean
    visitas?: IntFieldUpdateOperationsInput | number
    fotos?: ProductoFotosUncheckedUpdateManyWithoutProductoNestedInput
    versiones?: ProductoVersionesUncheckedUpdateManyWithoutProductoNestedInput
    especificaciones?: ProductoEspecificacionesUncheckedUpdateManyWithoutProductoNestedInput
  }

  export type ProductosUncheckedUpdateManyWithoutRubroInput = {
    id?: IntFieldUpdateOperationsInput | number
    marca_id?: IntFieldUpdateOperationsInput | number
    moneda_id?: IntFieldUpdateOperationsInput | number
    producto?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    destacado?: BoolFieldUpdateOperationsInput | boolean
    activo?: BoolFieldUpdateOperationsInput | boolean
    visitas?: IntFieldUpdateOperationsInput | number
  }

  export type ProductosCreateManyMonedaInput = {
    id?: number
    marca_id: number
    rubro_id: number
    producto: string
    descripcion?: string | null
    foto?: string | null
    precio: Decimal | DecimalJsLike | number | string
    stock?: number
    destacado?: boolean
    activo?: boolean
    visitas?: number
  }

  export type ProductosUpdateWithoutMonedaInput = {
    producto?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    destacado?: BoolFieldUpdateOperationsInput | boolean
    activo?: BoolFieldUpdateOperationsInput | boolean
    visitas?: IntFieldUpdateOperationsInput | number
    marca?: CfgMarcasUpdateOneRequiredWithoutProductoNestedInput
    rubro?: CfgRubrosUpdateOneRequiredWithoutProductoNestedInput
    fotos?: ProductoFotosUpdateManyWithoutProductoNestedInput
    versiones?: ProductoVersionesUpdateManyWithoutProductoNestedInput
    especificaciones?: ProductoEspecificacionesUpdateManyWithoutProductoNestedInput
  }

  export type ProductosUncheckedUpdateWithoutMonedaInput = {
    id?: IntFieldUpdateOperationsInput | number
    marca_id?: IntFieldUpdateOperationsInput | number
    rubro_id?: IntFieldUpdateOperationsInput | number
    producto?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    destacado?: BoolFieldUpdateOperationsInput | boolean
    activo?: BoolFieldUpdateOperationsInput | boolean
    visitas?: IntFieldUpdateOperationsInput | number
    fotos?: ProductoFotosUncheckedUpdateManyWithoutProductoNestedInput
    versiones?: ProductoVersionesUncheckedUpdateManyWithoutProductoNestedInput
    especificaciones?: ProductoEspecificacionesUncheckedUpdateManyWithoutProductoNestedInput
  }

  export type ProductosUncheckedUpdateManyWithoutMonedaInput = {
    id?: IntFieldUpdateOperationsInput | number
    marca_id?: IntFieldUpdateOperationsInput | number
    rubro_id?: IntFieldUpdateOperationsInput | number
    producto?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    destacado?: BoolFieldUpdateOperationsInput | boolean
    activo?: BoolFieldUpdateOperationsInput | boolean
    visitas?: IntFieldUpdateOperationsInput | number
  }

  export type PedidosCreateManyEstadoRelInput = {
    id?: number
    datos: JsonNullValueInput | InputJsonValue
    total: Decimal | DecimalJsLike | number | string
    metodo_pago: string
    comprador_nombre: string
    comprador_email: string
    comprador_telefono?: string | null
    direccion_envio?: string | null
    mp_payment_id?: string | null
    transferencia_ref?: string | null
    tarjeta_last4?: string | null
    tarjeta_payment_method?: string | null
    mp_error_code?: string | null
    mp_error_message?: string | null
    mp_response?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PedidosUpdateWithoutEstadoRelInput = {
    datos?: JsonNullValueInput | InputJsonValue
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodo_pago?: StringFieldUpdateOperationsInput | string
    comprador_nombre?: StringFieldUpdateOperationsInput | string
    comprador_email?: StringFieldUpdateOperationsInput | string
    comprador_telefono?: NullableStringFieldUpdateOperationsInput | string | null
    direccion_envio?: NullableStringFieldUpdateOperationsInput | string | null
    mp_payment_id?: NullableStringFieldUpdateOperationsInput | string | null
    transferencia_ref?: NullableStringFieldUpdateOperationsInput | string | null
    tarjeta_last4?: NullableStringFieldUpdateOperationsInput | string | null
    tarjeta_payment_method?: NullableStringFieldUpdateOperationsInput | string | null
    mp_error_code?: NullableStringFieldUpdateOperationsInput | string | null
    mp_error_message?: NullableStringFieldUpdateOperationsInput | string | null
    mp_response?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PedidosUncheckedUpdateWithoutEstadoRelInput = {
    id?: IntFieldUpdateOperationsInput | number
    datos?: JsonNullValueInput | InputJsonValue
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodo_pago?: StringFieldUpdateOperationsInput | string
    comprador_nombre?: StringFieldUpdateOperationsInput | string
    comprador_email?: StringFieldUpdateOperationsInput | string
    comprador_telefono?: NullableStringFieldUpdateOperationsInput | string | null
    direccion_envio?: NullableStringFieldUpdateOperationsInput | string | null
    mp_payment_id?: NullableStringFieldUpdateOperationsInput | string | null
    transferencia_ref?: NullableStringFieldUpdateOperationsInput | string | null
    tarjeta_last4?: NullableStringFieldUpdateOperationsInput | string | null
    tarjeta_payment_method?: NullableStringFieldUpdateOperationsInput | string | null
    mp_error_code?: NullableStringFieldUpdateOperationsInput | string | null
    mp_error_message?: NullableStringFieldUpdateOperationsInput | string | null
    mp_response?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PedidosUncheckedUpdateManyWithoutEstadoRelInput = {
    id?: IntFieldUpdateOperationsInput | number
    datos?: JsonNullValueInput | InputJsonValue
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodo_pago?: StringFieldUpdateOperationsInput | string
    comprador_nombre?: StringFieldUpdateOperationsInput | string
    comprador_email?: StringFieldUpdateOperationsInput | string
    comprador_telefono?: NullableStringFieldUpdateOperationsInput | string | null
    direccion_envio?: NullableStringFieldUpdateOperationsInput | string | null
    mp_payment_id?: NullableStringFieldUpdateOperationsInput | string | null
    transferencia_ref?: NullableStringFieldUpdateOperationsInput | string | null
    tarjeta_last4?: NullableStringFieldUpdateOperationsInput | string | null
    tarjeta_payment_method?: NullableStringFieldUpdateOperationsInput | string | null
    mp_error_code?: NullableStringFieldUpdateOperationsInput | string | null
    mp_error_message?: NullableStringFieldUpdateOperationsInput | string | null
    mp_response?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductoFotosCreateManyProductoInput = {
    id?: number
    epigrafe: string
    foto?: string | null
    orden?: number
    activo?: boolean
  }

  export type ProductoVersionesCreateManyProductoInput = {
    id?: number
    version: string
    detalle?: string | null
    orden?: number
    activo?: boolean
  }

  export type ProductoEspecificacionesCreateManyProductoInput = {
    id?: number
    categoria: string
    especificaciones: string
    orden?: number
    activo?: boolean
  }

  export type ProductoFotosUpdateWithoutProductoInput = {
    epigrafe?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    orden?: IntFieldUpdateOperationsInput | number
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductoFotosUncheckedUpdateWithoutProductoInput = {
    id?: IntFieldUpdateOperationsInput | number
    epigrafe?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    orden?: IntFieldUpdateOperationsInput | number
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductoFotosUncheckedUpdateManyWithoutProductoInput = {
    id?: IntFieldUpdateOperationsInput | number
    epigrafe?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    orden?: IntFieldUpdateOperationsInput | number
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductoVersionesUpdateWithoutProductoInput = {
    version?: StringFieldUpdateOperationsInput | string
    detalle?: NullableStringFieldUpdateOperationsInput | string | null
    orden?: IntFieldUpdateOperationsInput | number
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductoVersionesUncheckedUpdateWithoutProductoInput = {
    id?: IntFieldUpdateOperationsInput | number
    version?: StringFieldUpdateOperationsInput | string
    detalle?: NullableStringFieldUpdateOperationsInput | string | null
    orden?: IntFieldUpdateOperationsInput | number
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductoVersionesUncheckedUpdateManyWithoutProductoInput = {
    id?: IntFieldUpdateOperationsInput | number
    version?: StringFieldUpdateOperationsInput | string
    detalle?: NullableStringFieldUpdateOperationsInput | string | null
    orden?: IntFieldUpdateOperationsInput | number
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductoEspecificacionesUpdateWithoutProductoInput = {
    categoria?: StringFieldUpdateOperationsInput | string
    especificaciones?: StringFieldUpdateOperationsInput | string
    orden?: IntFieldUpdateOperationsInput | number
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductoEspecificacionesUncheckedUpdateWithoutProductoInput = {
    id?: IntFieldUpdateOperationsInput | number
    categoria?: StringFieldUpdateOperationsInput | string
    especificaciones?: StringFieldUpdateOperationsInput | string
    orden?: IntFieldUpdateOperationsInput | number
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductoEspecificacionesUncheckedUpdateManyWithoutProductoInput = {
    id?: IntFieldUpdateOperationsInput | number
    categoria?: StringFieldUpdateOperationsInput | string
    especificaciones?: StringFieldUpdateOperationsInput | string
    orden?: IntFieldUpdateOperationsInput | number
    activo?: BoolFieldUpdateOperationsInput | boolean
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}