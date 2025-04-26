-- DropIndex
DROP INDEX `ProductoEspecificaciones_producto_id_fkey` ON `productoespecificaciones`;

-- DropIndex
DROP INDEX `ProductoFotos_producto_id_fkey` ON `productofotos`;

-- DropIndex
DROP INDEX `Productos_marca_id_fkey` ON `productos`;

-- DropIndex
DROP INDEX `Productos_moneda_id_fkey` ON `productos`;

-- DropIndex
DROP INDEX `Productos_rubro_id_fkey` ON `productos`;

-- DropIndex
DROP INDEX `ProductoVersiones_producto_id_fkey` ON `productoversiones`;

-- AlterTable
ALTER TABLE `pedidos` ADD COLUMN `tarjeta_last4` VARCHAR(191) NULL,
    ADD COLUMN `tarjeta_payment_method` VARCHAR(191) NULL,
    ADD COLUMN `transferencia_ref` VARCHAR(191) NULL;

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
