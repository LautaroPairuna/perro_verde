//src/app/api/admin/structure/route.ts

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Crear un tipo que capture la estructura básica de un modelo de Prisma
// con un método findMany que devuelve una promesa
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PrismaModel = { findMany: (args?: any) => Promise<any[]> }

// Mapeo explícito de tablas a modelos de Prisma
const models: Record<string, PrismaModel> = {
  CfgMarcas: prisma.cfgMarcas,
  CfgRubros: prisma.cfgRubros,
  CfgFormasPagos: prisma.cfgFormasPagos,
  CfgMonedas: prisma.cfgMonedas,
  CfgSlider: prisma.cfgSlider,
  Productos: prisma.productos,
  ProductoFotos: prisma.productoFotos,
  ProductoVersiones: prisma.productoVersiones,
  ProductoEspecificaciones: prisma.productoEspecificaciones,
  Pedidos: prisma.pedidos,
  // Nota: 'session' no está disponible en PrismaClient según el error
};

interface TableStructure {
  tableName: string;
  data: any[];
}

export async function GET(req: Request): Promise<Response> {
  try {
    const tableInfo: TableStructure[] = [];
    // Lista de nombres de tablas
    const tableNames = Object.keys(models);
    
    for (const tableName of tableNames) {
      console.log(`Obteniendo datos de la tabla: ${tableName}`);
      // Ahora TypeScript sabe que tableName es una clave válida de models
      const data = await models[tableName].findMany();
      console.log(`Registros de ${tableName}:`, data);
      tableInfo.push({
        tableName,
        data,
      });
    }
    
    // Verificamos la respuesta antes de enviarla
    console.log("Estructura final de las tablas:", tableInfo);
    return new Response(JSON.stringify(tableInfo), { status: 200 });
  } catch (error) {
    console.error('Error al obtener los datos de las tablas:', error);
    return new Response(JSON.stringify({ error: 'Error fetching database structure' }), { status: 500 });
  }
}