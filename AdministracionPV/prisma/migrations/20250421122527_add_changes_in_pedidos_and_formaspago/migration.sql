/*
  Warnings:

  - You are about to drop the `pedido` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `producto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `productoespecificacione` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `productofoto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `productoversione` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `pedido`;

-- DropTable
DROP TABLE `producto`;

-- DropTable
DROP TABLE `productoespecificacione`;

-- DropTable
DROP TABLE `productofoto`;

-- DropTable
DROP TABLE `productoversione`;

-- CreateTable
CREATE TABLE `Productos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `marca_id` INTEGER NOT NULL,
    `rubro_id` INTEGER NOT NULL,
    `moneda_id` INTEGER NOT NULL,
    `producto` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `foto` VARCHAR(191) NULL,
    `precio` DECIMAL(10, 2) NOT NULL,
    `stock` INTEGER NOT NULL DEFAULT 0,
    `destacado` BOOLEAN NOT NULL DEFAULT false,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `visitas` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductoFotos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `producto_id` INTEGER NOT NULL,
    `epigrafe` VARCHAR(191) NOT NULL,
    `foto` VARCHAR(191) NOT NULL,
    `orden` INTEGER NOT NULL DEFAULT 1,
    `activo` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductoVersiones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `producto_id` INTEGER NOT NULL,
    `version` VARCHAR(191) NOT NULL,
    `detalle` VARCHAR(191) NULL,
    `orden` INTEGER NOT NULL DEFAULT 5,
    `activo` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductoEspecificaciones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `producto_id` INTEGER NOT NULL,
    `categoria` VARCHAR(191) NOT NULL,
    `especificaciones` VARCHAR(191) NOT NULL,
    `orden` INTEGER NOT NULL DEFAULT 1,
    `activo` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pedidos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `datos` JSON NOT NULL,
    `total` DECIMAL(10, 2) NOT NULL,
    `estado` VARCHAR(191) NOT NULL DEFAULT 'pendiente',
    `metodo_pago` VARCHAR(191) NOT NULL,
    `comprador_nombre` VARCHAR(191) NOT NULL,
    `comprador_email` VARCHAR(191) NOT NULL,
    `comprador_telefono` VARCHAR(191) NULL,
    `direccion_envio` VARCHAR(191) NULL,
    `mp_payment_id` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Productos` ADD CONSTRAINT `Productos_marca_id_fkey` FOREIGN KEY (`marca_id`) REFERENCES `CfgMarcas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Productos` ADD CONSTRAINT `Productos_rubro_id_fkey` FOREIGN KEY (`rubro_id`) REFERENCES `CfgRubros`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Productos` ADD CONSTRAINT `Productos_moneda_id_fkey` FOREIGN KEY (`moneda_id`) REFERENCES `CfgMonedas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductoFotos` ADD CONSTRAINT `ProductoFotos_producto_id_fkey` FOREIGN KEY (`producto_id`) REFERENCES `Productos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductoVersiones` ADD CONSTRAINT `ProductoVersiones_producto_id_fkey` FOREIGN KEY (`producto_id`) REFERENCES `Productos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductoEspecificaciones` ADD CONSTRAINT `ProductoEspecificaciones_producto_id_fkey` FOREIGN KEY (`producto_id`) REFERENCES `Productos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
