/*
  Warnings:

  - You are about to drop the column `cod_pro` on the `producto` table. All the data in the column will be lost.
  - You are about to drop the column `codigo` on the `producto` table. All the data in the column will be lost.
  - You are about to drop the column `cuotas_max_fp` on the `producto` table. All the data in the column will be lost.
  - You are about to drop the column `estado_id` on the `producto` table. All the data in the column will be lost.
  - You are about to drop the column `extracto` on the `producto` table. All the data in the column will be lost.
  - You are about to drop the column `financiacion_id` on the `producto` table. All the data in the column will be lost.
  - You are about to drop the column `ganancia` on the `producto` table. All the data in the column will be lost.
  - You are about to drop the column `garantia` on the `producto` table. All the data in the column will be lost.
  - You are about to drop the column `incremento_iva` on the `producto` table. All the data in the column will be lost.
  - You are about to drop the column `keywords` on the `producto` table. All the data in the column will be lost.
  - You are about to drop the column `pre_costo` on the `producto` table. All the data in the column will be lost.
  - You are about to drop the column `pre_costo_usd` on the `producto` table. All the data in the column will be lost.
  - You are about to drop the column `pre_neto` on the `producto` table. All the data in the column will be lost.
  - You are about to alter the column `foto` on the `producto` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `visitas` on the `producto` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to drop the `productos_especificaciones` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `productosfotos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `productosversiones` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `precio` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Producto` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Producto_marca_id_fkey` ON `producto`;

-- DropIndex
DROP INDEX `Producto_moneda_id_fkey` ON `producto`;

-- DropIndex
DROP INDEX `Producto_rubro_id_fkey` ON `producto`;

-- AlterTable
ALTER TABLE `cfgformaspagos` MODIFY `forma_pago` VARCHAR(191) NOT NULL,
    MODIFY `descripcion` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `cfgmarcas` MODIFY `marca` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `cfgmonedas` MODIFY `moneda` VARCHAR(191) NOT NULL,
    MODIFY `moneda_des` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `cfgrubros` MODIFY `rubro` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `producto` DROP COLUMN `cod_pro`,
    DROP COLUMN `codigo`,
    DROP COLUMN `cuotas_max_fp`,
    DROP COLUMN `estado_id`,
    DROP COLUMN `extracto`,
    DROP COLUMN `financiacion_id`,
    DROP COLUMN `ganancia`,
    DROP COLUMN `garantia`,
    DROP COLUMN `incremento_iva`,
    DROP COLUMN `keywords`,
    DROP COLUMN `pre_costo`,
    DROP COLUMN `pre_costo_usd`,
    DROP COLUMN `pre_neto`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `precio` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `stock` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `producto` VARCHAR(191) NOT NULL,
    MODIFY `foto` VARCHAR(191) NULL,
    MODIFY `visitas` INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `productos_especificaciones`;

-- DropTable
DROP TABLE `productosfotos`;

-- DropTable
DROP TABLE `productosversiones`;

-- CreateTable
CREATE TABLE `CfgSlider` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `thumbs` VARCHAR(191) NULL,
    `foto` VARCHAR(191) NOT NULL,
    `orden` INTEGER NOT NULL DEFAULT 5,
    `activo` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductoFoto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `producto_id` INTEGER NOT NULL,
    `epigrafe` VARCHAR(191) NOT NULL,
    `foto` VARCHAR(191) NOT NULL,
    `orden` INTEGER NOT NULL DEFAULT 1,
    `activo` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductoVersione` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `producto_id` INTEGER NOT NULL,
    `version` VARCHAR(191) NOT NULL,
    `detalle` VARCHAR(191) NULL,
    `orden` INTEGER NOT NULL DEFAULT 5,
    `activo` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductoEspecificacione` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `producto_id` INTEGER NOT NULL,
    `categoria` VARCHAR(191) NOT NULL,
    `especificaciones` VARCHAR(191) NOT NULL,
    `orden` INTEGER NOT NULL DEFAULT 1,
    `activo` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pedido` (
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
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_marca_id_fkey` FOREIGN KEY (`marca_id`) REFERENCES `CfgMarcas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_rubro_id_fkey` FOREIGN KEY (`rubro_id`) REFERENCES `CfgRubros`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_moneda_id_fkey` FOREIGN KEY (`moneda_id`) REFERENCES `CfgMonedas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductoFoto` ADD CONSTRAINT `ProductoFoto_producto_id_fkey` FOREIGN KEY (`producto_id`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductoVersione` ADD CONSTRAINT `ProductoVersione_producto_id_fkey` FOREIGN KEY (`producto_id`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductoEspecificacione` ADD CONSTRAINT `ProductoEspecificacione_producto_id_fkey` FOREIGN KEY (`producto_id`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
